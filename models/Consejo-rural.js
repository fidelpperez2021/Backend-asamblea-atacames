const mongoose = require("mongoose");

const ConsejoRuralSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  parroquia: String,
  comunidad: String,

  ubicacion: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true }
  },

  directiva: {
    presidente: {
      nombres: String,
      telefono: String,
      email: String
    }
  },

  estado: {
    type: String,
    enum: ["ACTIVO", "INACTIVO", "EN_PROCESO"],
    default: "ACTIVO"
  }
}, { timestamps: true });

// 👇 AQUÍ ESTÁ LA CLAVE
module.exports = mongoose.model(
  "ConsejoRural",
  ConsejoRuralSchema,
  "Consejos-rurales" // 👈 nombre EXACTO de la colección en Atlas
);

