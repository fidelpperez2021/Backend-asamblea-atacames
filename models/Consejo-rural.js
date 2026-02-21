const mongoose = require("mongoose");

const PersonaSchema = new mongoose.Schema(
  {
    nombres: { type: String, default: "" },
    telefono: { type: String, default: "" },
    email: { type: String, default: "" },

    // ✅ Imágenes (como URL)
    Perfil: { type: String, default: "" },   // foto perfil
    Portada: { type: String, default: "" },  // portada
  },
  { _id: false }
);

const ConsejoRuralSchema = new mongoose.Schema(
  {
    codigo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    parroquia: { type: String, default: "" },
    comunidad: { type: String, default: "" },

    ubicacion: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, // [lng, lat]
    },

    // ✅ Directiva completa
    directiva: {
      presidente: { type: PersonaSchema, default: () => ({}) },
      vicepresidente: { type: PersonaSchema, default: () => ({}) },
      secretario: { type: PersonaSchema, default: () => ({}) },
      tesorero: { type: PersonaSchema, default: () => ({}) },
    },

    estado: {
      type: String,
      enum: ["ACTIVO", "INACTIVO", "EN_PROCESO"],
      default: "ACTIVO",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ConsejoRural",
  ConsejoRuralSchema,
  "Consejos-rurales"
);
