"use strict";

const logger = require("../utils/logger");
const accounts = require("./accounts.js")

const start = {
  index(request,response){
    logger.info("start rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Start",
      loggedInUser: loggedInUser
    };
    response.render("start",viewData)
  }  
};

module.exports = start;