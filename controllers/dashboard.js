"use strict";

const logger = require("../utils/logger");

const accounts = require("./accounts.js")
const stationStore = require("../models/station-store.js");
const uuid = require("uuid");
global.loggedInUser = accounts.getCurrentUser(ra);

const dashboard = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const dummy = stationStore.getUserStations(loggedInUser.userId);
    const viewData = {
      title: "Dashboard",
      stations: stationStore.getUserStations(loggedInUser.userId)
    };
    logger.info("dashboard rendering",);
    response.render("dashboard", {viewData, loggedInUser});
  },
  
  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },
  
  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingId;
    stationStore.removeReading(stationId,readingId);
    logger.info("station id", );
    response.redirect("/dashboard");
  },
  
  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userId: loggedInUser.userId,
      name: request.body.name,
      readings: []
    };
    logger.info("Creating a new Station", newStation);
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  }
};


module.exports = dashboard;
