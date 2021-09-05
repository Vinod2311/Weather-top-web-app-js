"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const accounts = require("./accounts.js")

const about = {
    index(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        logger.info("about rendering");
        const viewData = {
            title: "About",
            loggedInUser: loggedInUser
        };
        response.render("about", viewData);
    },
};

module.exports = about;
