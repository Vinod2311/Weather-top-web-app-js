"use strict";

const logger = require("../utils/logger");

const start = {
  index(request,response){
    logger.info("start rendering");
    const viewData = {
      title: "Start"
    };
    response.render("start",viewData)
  }  
};

module.exports = start;