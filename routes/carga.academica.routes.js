const { Router } = require("express");
const controller = require("../controllers/carga.academica.controller");

const app = Router();

app.post("/", controller.crearCargaAcademica);

app.delete("/", controller.eliminarCargaAcademica);

app.get("/", controller.obtenerCargaAcademica);

module.exports = app;
