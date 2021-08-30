"use strict";

const logger = require("../utils/logger");
const stationCollection = require('../models/readings-store.js');
const accounts = require("accounts.js")
const userStore = require("../models/user-store.js");

const dashboard = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Dashboard",
      stations: userStore.getUser,
    };
    logger.info("dashboard rendering",stationCollection);
    response.render("dashboard", viewData);
  },
};


module.exports = dashboard;
