const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ofertaAcademica = new mongoose.Schema(
  {
    trimestre           : { type: ObjectId, ref: 'trimestres', required: true },
    materia             : { type: ObjectId, ref: 'cargaAcademica', required: true },
    horario             : { type: String, required: true },
    ciudad              : { type: String, default: null },
    sede                : { type: String, default: null },
    tipoDeAsistencia    : { type: String, default: null },
    dias                : { type: String, enum: ['13','6','24','7','5','135','12345'], default: null },
    duracion            : { type: Number, default: null },
    cupos               : { type: Number, default: null },
    area                : { type: String, default: null },
    seccionSistema      : { type: String, default: null },
    aulaSistema         : { type: String, default: null },
    creadoPor           : { type: String, default: null }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

module.exports = mongoose.model("ofertaAcademica", ofertaAcademica);
