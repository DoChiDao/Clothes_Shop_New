const express = require("express")
const route = express.Router();
const homeController = require("../app/controllers/HomeController")
const managerUS = require("../app/controllers/ManagerUSController")



route.post("/createUS", managerUS.createUS)
route.delete("/deleteUS",managerUS.deleteUS)
route.patch("/updateUS", managerUS.updateUS)
route.get("/createUI", homeController.createUI)
route.post("/getcode",homeController.getCode)
route.post("/checkcode",homeController.checkCode)
route.post("/sign-out", homeController.signOut)
route.use("/list-user", homeController.getLstUS)
route.post("/login", homeController.login)
route.post("/log-out", homeController.logout)
route.get("/", homeController.admin)

module.exports = route