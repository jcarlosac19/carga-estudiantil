const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const materiasAprobadasAlumno = new mongoose.Schema(
  {
    idMateria   : { type: ObjectId, default: null},
    userId      : { type: String,   default: null},
    trimestreId : { type: ObjectId, default: null}
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

module.exports = mongoose.model("materiasAprobadasAlumno", materiasAprobadasAlumno);
