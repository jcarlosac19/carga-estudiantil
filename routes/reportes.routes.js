const { Router } = require("express");
const controller = require("../controllers/reportes.controller");

const app = Router();

// app.post("/", controller.crearCargaAcademica);

// app.delete("/", controller.eliminarCargaAcademica);

app.get("/", controller.reporte);

module.exports = app;
