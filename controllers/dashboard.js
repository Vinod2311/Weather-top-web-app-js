"use strict";

const logger = require("../utils/logger");
const stationCollection = require('../models/readings-store.js');

const dashboard = {
  index(request, response) {
    
    const viewData = {
      title: "Dashboard",
      stations: stationCollection,
    };
    logger.info("dashboard rendering",stationCollection);
    response.render("dashboard", viewData);
  },
};


module.exports = dashboard;
