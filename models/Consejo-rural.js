const mongoose = require("mongoose");

const ConsejoRuralSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },

  parroquia: { type: String, required: true },
  comunidad: { type: String, required: true },
  recinto: String,
  direccionReferencia: String,

  // 📍 Ubicación geográfica
  ubicacion: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true } // [lng, lat]
  },

  estado: {
    type: String,
    enum: ["ACTIVO", "INACTIVO", "EN_PROCESO"],
    default: "ACTIVO"
  },

  periodo: {
    inicio: Date,
    fin: Date
  },

  directiva: {
    presidente: {
      nombres: String,
      telefono: String,
      email: String
    },
    secretario: {
      nombres: String,
      telefono: String
    },
    tesorero: {
      nombres: String,
      telefono: String
    },
    vocales: [
      {
        nombres: String,
        telefono: String
      }
    ]
  },

  poblacionAprox: Number,
  numFamiliasAprox: Number,

  observaciones: String,
  tags: [String]

}, { timestamps: true });

// 🌍 Índice espacial
ConsejoRuralSchema.index({ ubicacion: "2dsphere" });

module.exports = mongoose.model("ConsejoRural", ConsejoRuralSchema);
