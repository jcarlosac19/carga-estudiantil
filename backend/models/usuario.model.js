const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String, default: null },
    role: { type: String, default: 'user' },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

module.exports = mongoose.model("usuario", usuarioSchema);
