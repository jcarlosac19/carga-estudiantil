const { Router } = require("express");
const controller = require("../controllers/dias.controller");

const app = Router();

app.post("/", controller.crearDia);

app.delete("/:id", controller.eliminarDia);

app.get("/", controller.obtenerDias);

app.put("/:id", controller.actualizarDia);

module.exports = app;
