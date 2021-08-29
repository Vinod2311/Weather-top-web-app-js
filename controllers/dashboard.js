"use strict";

const logger = require("../utils/logger");
const readingsCollection = require('../models/readings-store.js');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Dashboard",
      station: readingsCollection,
    };
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;
