const express = require("express")
const route = express.Router();

const homeController = require("../app/controllers/HomeController")


route.post("/login", homeController.login)
route.post("/log-out", homeController.logout)

module.exports = route