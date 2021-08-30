"use strict";

const express = require("express");
const router = express.Router();

const start = require("./controllers/start.js")
const accounts = require("./controllers/accounts.js")
const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const stationCtrl = require("./controllers/stationCtrl.js");


router.get("/", start.index);
router.get("/signup", accounts.signup);
router.get("/login", accounts.login);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);
router.post("/member/editMemberDetails", accounts.editMemberDetails);
router.get("/logout", accounts.logout);
router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/stations/:id", stationCtrl.index);
router.get("/dashboard/deleteStation/:id", dashboard.deleteStation);
router.get("/stations/:id/deleteReading/:readingId", stationCtrl.deleteReading);
router.post("/stations/:id/addReading", stationCtrl.addReading);
router.post("/dashboard/addStation", dashboard.addStation)

module.exports = router;
