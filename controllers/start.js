"use strict";

const logger = require("../utils/logger");
const accounts = require("./accounts.js")

const start = {
  index(request,response){
    logger.info("start rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Start"
    };
    response.render("start",{viewData, loggedInUser})
  }  
};

module.exports = start;