"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");
const logger = require("../utils/logger");

const stationStore = {
    store: new JsonStore("./models/station-store.json", {
        stationCollection: []
    }),
    collection: "stationCollection",

    getAllStations() {
        return this.store.findAll(this.collection);
    },

    getStation(id) {
        return this.store.findOneBy(this.collection, {id: id});
    },

    getUserStations(userId) {
        return this.store.findBy(this.collection, {userId: userId});
    },

    addStation(station) {
        this.store.add(this.collection, station);
        this.store.save();
    },

    removeStation(id) {
        const station = this.getStation(id);
        this.store.remove(this.collection, station);
        this.store.save();
    },

    removeAllStations() {
        this.store.removeAll(this.collection);
        this.store.save();
    },

    addReading(id, reading) {
        const station = this.getStation(id);
        station.readings.push(reading);
        this.store.save();
    },

    removeReading(id, readingId) {
        const station = this.getStation(id);
        const readings = station.readings;
        _.remove(readings, {id: readingId});
        this.store.save();
    },

    dummy(id, readingId) {
        const stationId = id;
        const reading_Id = readingId;
        //const readings = station.readings;
        logger.info("readings", stationId)
    },

    getReading(id, readingId) {
        const station = this.store.findOneBy(this.collection, {id: id});
        const readings = station.readings.filter(reading => reading.id == readingId);
        return readings[0];
    },


};

module.exports = stationStore;
