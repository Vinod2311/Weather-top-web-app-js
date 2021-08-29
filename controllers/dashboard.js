"use strict";

const logger = require("../utils/logger");
const stationCollection = require('../models/readings-store.js');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Dashboard",
      stations: stationCollection,
    };
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;
