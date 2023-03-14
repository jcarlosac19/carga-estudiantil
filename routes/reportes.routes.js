const { Router } = require("express");
const controller = require("../controllers/reportes.controller");

const app = Router();

app.get("/:id", controller.reporte);

module.exports = app;
