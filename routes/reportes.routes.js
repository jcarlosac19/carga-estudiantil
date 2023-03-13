const { Router } = require("express");
const controller = require("../controllers/reportes.controller");

const app = Router();

app.get("/ofertas", controller.reporte);
app.get("/solicitudes", controller.reporte);

module.exports = app;
