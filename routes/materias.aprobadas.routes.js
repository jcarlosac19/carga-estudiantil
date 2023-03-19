const { Router } = require("express");
const controller = require("../controllers/materias.aprobadas.alumno.controller");

const app = Router();

app.post("/", controller.agregarMateriasAprobadas);

app.delete("/:id", controller.eliminarMateriaAprobada);

app.get("/", controller.obtenerMateriasAprobadas);

module.exports = app;
