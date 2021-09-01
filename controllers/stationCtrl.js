"use strict";

const logger = require("../utils/logger");

const accounts = require("./accounts.js")
const stationStore = require("../models/station-store.js");
const uuid = require("uuid");

const stationCtrl = {
  index(request,response){
    const id = request.params.id;
    const station = stationStore.getStation(id);
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Station",
      station: station
    };
    logger.info("station rendering");
    response.render("station",{viewData,loggedInUser});
  },
  
  register(request, response) {
    const user = request.body;
    user.userId = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect("/login");
  },
  
  addReading(request,response){
    const reading = request.body;
    reading.id = uuid.v1();
    stationStore.addStation(reading);
    logger.info('adding reading')
    response.redirect("station")
  }
    
};

module.exports = stationCtrl;