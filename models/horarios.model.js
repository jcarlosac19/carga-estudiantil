const mongoose = require("mongoose");

const horarios = new mongoose.Schema(
  {
    horario: { type: String, required: true },
    duracionMinutos: { type: Number, required: true }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  }
);

module.exports = mongoose.model("horarios", horarios);