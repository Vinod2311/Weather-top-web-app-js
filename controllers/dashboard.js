"use strict";

const logger = require("../utils/logger");
const stationAnalytics = require("../utils/stationAnalytics.js")
const accounts = require("./accounts.js")
const stationStore = require("../models/station-store.js");
const uuid = require("uuid");


const dashboard = {
    index(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        const stations = stationStore.getUserStations(loggedInUser.userId);
        stationAnalytics.sortStationsAlphabetically(stations);
        for (let i = 0; i < stations.length; i++) {
            if (stations[i].readings.length > 0) {
                stationAnalytics.computeStationAnalytics(stations[i]);
            }
        }

        const viewData = {
            title: "Dashboard",
            stations: stations,
            loggedInUser: loggedInUser,
        };
        logger.info("latest rendering", stations);
        response.render("dashboard", viewData);
    },


    deleteStation(request, response) {
        const stationId = request.params.id;
        logger.debug(`Deleting station ${stationId}`);
        stationStore.removeStation(stationId);
        response.redirect("/dashboard");
    },


    addStation(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        const newStation = {
            id: uuid.v1(),
            userId: loggedInUser.userId,
            name: request.body.name,
            latitude: +request.body.lat,
            longitude: +request.body.lng,
            readings: []
        };
        logger.info("Creating a new Station", newStation);
        stationStore.addStation(newStation);
        response.redirect("/dashboard");
    }
};


module.exports = dashboard;
