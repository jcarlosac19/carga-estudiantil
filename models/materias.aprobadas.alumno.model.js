const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const materiasAprobadasAlumno = new mongoose.Schema(
  {
    materia : { type: ObjectId, ref: 'cargaAcademica', required: true },
    usuario    : { type: ObjectId, ref: 'usuario', required: true},
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

materiasAprobadasAlumno.index({materia: 1, usuario: 1}, {unique: true});

module.exports = mongoose.model("materiasAprobadasAlumno", materiasAprobadasAlumno);
