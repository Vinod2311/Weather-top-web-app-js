"use strict";

const logger = require("../utils/logger");

const accounts = require("./accounts.js")
const stationStore = require("../models/station-store.js");

const dashboard = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const dummy = stationStore.getAllStation();
    const viewData = {
      title: "Dashboard",
      stations: stationStore.getUserStations(loggedInUser.userId)
    };
    logger.info("dashboard rendering",dummy)
      response.render("dashboard", {viewData, loggedInUser,dummy});
  },
};


module.exports = dashboard;
