"use strict";

const userstore = require("../models/user-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {

  user(request,response){
    const userEmail = request.cookies.user;
    const loggedInUser = userstore.getUserByEmail(userEmail);
    const viewData = {
      title: "User",
      loggedInUser: loggedInUser

    };
    response.render("user",viewData);
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.user;
    return userstore.getUserByEmail(userEmail);
  },

  editUserDetails(request,response){
    const userEmail = request.cookies.user;
    const loggedInUser = userstore.getUserByEmail(userEmail);
    const updatedUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
    }
    userstore.updateUser(loggedInUser, updatedUser);
    response.redirect("/user");

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

  

  
};

module.exports = accounts;