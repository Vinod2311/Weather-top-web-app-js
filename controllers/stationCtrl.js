"use strict";

const logger = require("../utils/logger");

const accounts = require("./accounts.js")
const stationStore = require("../models/station-store.js");
const uuid = require("uuid");

const stationCtrl = {
  index(request,response){
    //const id = request.params.id;
    //const station = stationStore.getStation(id);
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Station",
    };
    logger.info("station rendering");
    //response.render("start",loggedInUser);
  }
};