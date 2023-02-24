const mongoose = require("mongoose");

const version = new mongoose.Schema(
  {
    creadoPor: { type: String, default: null, ref: 'usuario' },
    estaActiva: { type: Boolean, default: true }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  }
);

module.exports = mongoose.model("cargaAcademicaVersion", version);