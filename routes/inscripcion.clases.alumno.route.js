const { Router } = require("express");
const controller = require("../controllers/inscripcion.clases.alumno.controller");

const app = Router();

app.post("/", controller.crearInscripcion);

app.delete("/:id", controller.eliminarInscripcion);

app.get("/ofertadas/:id", controller.obtenerClasesOfertadasAlumnoTrimestresActivos);

app.get("/:id", controller.obtenerInscripciones);

module.exports = app;
