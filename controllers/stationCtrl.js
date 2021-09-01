"use strict";

const logger = require("../utils/logger");

const accounts = require("./accounts.js")
const stationStore = require("../models/station-store.js");
const uuid = require("uuid");

const stationCtrl = {
  index(request,response){
    const id = request.params.id;
    const station = stationStore.getStation(id);
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Station",
      station: station
    };
    logger.info("station rendering");
    response.render("station",{viewData,loggedInUser});
  },
  
  
  addReading(request,response){
    const id = request.params.id;
    const reading = request.body;
    reading.id = uuid.v1();
    stationStore.addReading(id, reading);
    logger.info('adding reading {{id}}');
    response.render();
  }
    
};

module.exports = stationCtrl;