"use strict";

const logger = require("../utils/logger");

const accounts = require("./accounts.js")
const stationStore = require("../models/station-store.js");
const uuid = require("uuid");
const stationAnalytics = require("../utils/stationAnalytics.js")

const stationCtrl = {
  index(request,response){
    const id = request.params.id;
    const station = stationStore.getStation(id);
    const loggedInUser = accounts.getCurrentUser(request);
    stationAnalytics.computeStationAnalytics(station);
    const viewData = {
      title: "Station",
      station: station,
      loggedInUser: loggedInUser
    };
    logger.info("station rendering");
    response.render("station",viewData);
  },
  
  
  addReading(request,response){
    const stationId = request.params.id;
    const d = new Date();
    const date = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
        d.getHours() + ":" + d.getMinutes();
    const reading = {
      id: uuid.v1(),
      date: date,
      code: +request.body.code,
      temperature: +request.body.temperature,
      windSpeed: +request.body.windSpeed,
      windDirection: +request.body.windDirection,
      pressure: +request.body.pressure
    }
    stationStore.addReading(stationId, reading);
    logger.info('adding reading');
    response.redirect(`/stations/${stationId}`);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingId;
    stationStore.removeReading(stationId,readingId);
    logger.info("station id", );
    response.redirect(`/stations/${stationId}`);
  },


};

module.exports = stationCtrl;