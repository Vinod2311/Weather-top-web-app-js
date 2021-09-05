"use strict";

const logger = require("../utils/logger");

const accounts = require("./accounts.js")
const stationStore = require("../models/station-store.js");
const uuid = require("uuid");
const stationAnalytics = require("../utils/stationAnalytics.js")
const axios = require("axios");

const stationCtrl = {
    index(request, response) {
        const id = request.params.id;
        const station = stationStore.getStation(id);
        const loggedInUser = accounts.getCurrentUser(request);
        if (station.readings.length > 0) {
            stationAnalytics.computeStationAnalytics(station);
        }
        const viewData = {
            title: "Station",
            station: station,
            loggedInUser: loggedInUser
        };
        logger.info("station rendering");
        response.render("station", viewData);
    },

    async addReport(request, response) {
        logger.info("rendering new report");
        let report = {};
        const stationId = request.params.id;
        const station = stationStore.getStation(stationId);
        const lat = station.latitude;
        const lng = station.longitude;
        const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=06a976c90f6936726abb162971557f6d`
        const result = await axios.get(requestUrl);
        if (result.status == 200) {
            const reading = result.data.current;
            const d = new Date();
            const date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " +
                d.getHours() + ":" + d.getMinutes();
            report.id = uuid.v1();
            report.date = date;
            report.code = +reading.weather[0].id;
            report.temperature = +reading.temp;
            report.windSpeed = +reading.wind_speed;
            report.pressure = +reading.pressure;
            report.windDirection = +reading.wind_deg;

        }
        stationStore.addReading(stationId, report);
        console.log(report);
        response.redirect(`/stations/${stationId}`);
    },


    addReading(request, response) {
        const stationId = request.params.id;
        const d = new Date();
        const date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " +
            stationAnalytics.addZero(d.getHours()) + ":" + stationAnalytics.addZero(d.getMinutes());
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
        stationStore.removeReading(stationId, readingId);
        logger.info("station id",);
        response.redirect(`/stations/${stationId}`);
    },


};

module.exports = stationCtrl;