const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const materiasSolicitudAlumno = new mongoose.Schema(
  {
    materia   : { type: ObjectId, ref: 'cargaacademica', required: true },
    usuario   : { type: ObjectId, ref: 'usuarios', required: true},
    trimestre : { type: ObjectId, ref: 'trimestres', required: true},
    horario   : { type: ObjectId, ref: 'horarios', required: true },
    dias      : { type: ObjectId, ref: 'dias', require: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

module.exports = mongoose.model("materiasSolicitudAlumno", materiasSolicitudAlumno);
