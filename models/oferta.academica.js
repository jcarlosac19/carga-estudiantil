const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ofertaAcademica = new mongoose.Schema(
  {
    idTrimestre         : { type: ObjectId, default: null },
    idMateria           : { type: ObjectId, default: null },
    ciudad              : { type: String, default: null },
    sede                : { type: String, default: null },
    tipoDeAsistencia    : { type: String, default: null },
    codigoMateria       : { type: String, default: null },
    horarioClase        : { type: String, default: null },
    dias                : { type: Number, default: null },
    duracion            : { type: Number, default: null },
    cupos               : { type: Number, default: null },
    area                : { type: String, default: null },
    seccionSistema      : { type: String, default: null },
    aulaSistema         : { type: String, default: null },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

module.exports = mongoose.model("ofertaAcademica", ofertaAcademica);
