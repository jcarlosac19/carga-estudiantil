const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const materiasIncripcionAlumno = new mongoose.Schema(
  {
    materia :{ type: ObjectId, ref: 'ofertaAcademica', required: true},
    usuario: { type: ObjectId, ref: 'usuario', required: true}
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  }
);

module.exports = mongoose.model("materiasIncripcionAlumno", materiasIncripcionAlumno);
