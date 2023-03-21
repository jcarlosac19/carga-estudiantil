const { Router } = require("express");
const controller = require("../controllers/user.controller");
const token = require('../middleware/jwt.auth');
const app = Router();

app.get("/getUserById/:id", token.verifyToken, controller.findUserById);
app.get("/currentUser", token.verifyToken, controller.currentUser);
app.get("/", token.verifyToken, controller.getAllUsers);
app.put("/:id", token.verifyToken, controller.updateUserById);

module.exports = app;
