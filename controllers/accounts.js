"use strict";

const userstore = require("../models/user-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  index(request,response){
    const viewData = {
      title: "Login or Signup"
    }
    response.render("index");
  },
  
  login(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("login", viewData);
  },
    
  logout(request, response) {
    response.cookie("user", "");
    response.redirect("/");
  },
  
  signup(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("signUp", viewData);
  },
  
  register(request, response) {
    const user = request.body;
    user.userId = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect("/login");
  },
  
  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user) {
      response.cookie("user", user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },
  
  getCurrentUser(request) {
    const userEmail = request.cookies.user;
    return userstore.getUserByEmail(userEmail);
  },
  
  editUserDetails(request){
    const user = request.body;
    this.getCurrentUser(request);
  }
  
};

module.exports = accounts;