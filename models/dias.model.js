const mongoose = require("mongoose");

const dias = new mongoose.Schema(
  {
    dias: { type: String, enum: ['13','6','24','7','5','135','12345'], required: true}
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  }
);

module.exports = mongoose.model("dias", dias);