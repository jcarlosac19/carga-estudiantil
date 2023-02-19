const mongoose = require("mongoose");

const cargaAcademica = new mongoose.Schema(
  {
    codigoMateria                 : { type: String, unique: true, default: null },
    nombreMateria                 : { type: String, unique: true, default: null },
    codigoCarrera                 : { type: String, default: null },
    nombreCarrera                 : { type: String, default: null },
    requisitoUno                  : { type: String, default: null },
    requisitoDos                  : { type: String, default: null },
    anio                          : { type: Number, default: null },
    requisitoUnidadesValorativas  : { type: String, default: null },
    unidadesValorativas           : { type: Number, default: null },
    plan                          : { type: Number, default: null },
    requerimientoIndiceGraduacion : { type: Number, default: 0 }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

module.exports = mongoose.model("cargaAcademica", cargaAcademica);
