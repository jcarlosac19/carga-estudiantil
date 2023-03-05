const mongoose = require("mongoose");

const dias = new mongoose.Schema(
  {
    // numeroDias: { type: String, enum: ['13','6','24','7','5','135','12345'], required: true},
    numeroDias: { type: String, enum: ['13','6','24','7','5','135','12345'], required: true},
    dias: { type: String, required: true},
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  }
);

module.exports = mongoose.model("dias", dias);