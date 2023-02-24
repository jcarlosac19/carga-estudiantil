const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const cargaAcademica = new mongoose.Schema(
  {
    version                       : {type: ObjectId, ref: 'cargaAcademicaVersion', required: true },
    codigoMateria                 : { type: String, default: null },
    nombreMateria                 : { type: String, default: null },
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
