const mongoose = require("mongoose");

const AsambleistaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    sector: { type: String, default: "", trim: true },
    cargo: { type: String, default: "", trim: true },
    partido: { type: String, default: "", trim: true },
    fotoUrl: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Asambleista", AsambleistaSchema);
