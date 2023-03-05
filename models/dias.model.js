const mongoose = require("mongoose");

const dias = new mongoose.Schema(
  {
    dias: { type: String, required: true}
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  }
);

module.exports = mongoose.model("dias", dias);