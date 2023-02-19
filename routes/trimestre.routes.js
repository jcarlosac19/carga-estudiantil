const { Router } = require("express");
const controller = require("../controllers/trimestres.controller");

const app = Router();

app.post("/", controller.crearTrimestre);

app.delete("/:id", controller.eliminarTrimestre);

app.get("/", controller.obtenerTrimestres);

app.put("/:id", controller.actualizarTrimestre);

module.exports = app;
