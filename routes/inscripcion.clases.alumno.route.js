const { Router } = require("express");
const controller = require("../controllers/inscripcion.clases.alumno.controller");

const app = Router();

app.post("/", controller.crearInscripcion);

app.delete("/", controller.eliminarProyeccionTrimestreActual);

app.get("/ofertadas/inscripcion", controller.obtenerClasesOfertadasAlumnoTrimestresActivos);

app.get("/ofertadas/proyeccion", controller.obtenerInscripcionesTrimestreActual);

app.get("/alumnoTrimestreActual", controller.obtenerInscripcionActualAlumno);

module.exports = app;
