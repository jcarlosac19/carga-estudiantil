const { Router } = require("express");
const controller = require("../controllers/horarios.controller");

const app = Router();

app.post("/", controller.crearHorario);

app.delete("/:id", controller.eliminarHorario);

app.get("/", controller.obtenerHorarios);

app.put("/:id", controller.actualizarHorario);

module.exports = app;
