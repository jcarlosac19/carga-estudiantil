const { Router } = require("express");
const controller = require("../controllers/user.controller");
const token = require('../middleware/jwt.auth');
const app = Router();

app.get("/:id", token.verifyToken, controller.findUserById);


module.exports = app;
