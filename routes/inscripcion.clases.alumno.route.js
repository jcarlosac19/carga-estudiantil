const { Router } = require("express");
const controller = require("../controllers/inscripcion.clases.alumno.controller");

const app = Router();

app.post("/", controller.crearInscripcion);

app.delete("/:id", controller.eliminarProyeccionTrimestreActual);

app.get("/ofertadas/inscripcion/:id", controller.obtenerClasesOfertadasAlumnoTrimestresActivos);

app.get("/ofertadas/proyeccion/:id", controller.obtenerInscripcionesTrimestreActual);

app.get("/alumnoTrimestreActual/:id", controller.obtenerInscripcionActualAlumno);

module.exports = app;
