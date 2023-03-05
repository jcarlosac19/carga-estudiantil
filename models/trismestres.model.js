const mongoose = require("mongoose");

const trimestre = new mongoose.Schema(
  {
    anio         : { type: Number, default: null },
    trimestre    : { type: String, enum: ['Q1','Q2','Q3','Q4'], default: null },
    estaActivo   : { type: Boolean, default: false }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

module.exports = mongoose.model("trimestres", trimestre);
