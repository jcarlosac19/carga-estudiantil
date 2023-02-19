const { Router } = require("express");
const controller = require("../controllers/oferta.academica.controller");

const app = Router();

app.post("/", controller.crearOfertaAcademica);

app.delete("/", controller.eliminarOfertaAcademica);

app.get("/", controller.obtenerOfertaAcademica);

module.exports = app;
