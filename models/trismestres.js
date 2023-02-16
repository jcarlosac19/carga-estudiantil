const mongoose = require("mongoose");

const cargaAcademica = new mongoose.Schema(
  {
    anio         : { type: Number, default: null },
    trimestre    : { type: String, enum: ['Q1','Q2','Q3','Q4'], default: null}
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

module.exports = mongoose.model("cargaAcademica", cargaAcademica);
