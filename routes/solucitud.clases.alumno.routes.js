const { Router } = require("express");
const controller = require("../controllers/solucitud.clases.alumno.controller");

const app = Router();

app.post("/", controller.crearSolicitudClase);

app.delete("/:id", controller.eliminarSolicitud);

app.get("/", controller.obtenerSolicitudesUsuario);

module.exports = app;