const mongoose = require("mongoose");

const ConsejoRuralSchema = new mongoose.Schema(
  {
    codigo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    parroquia: String,
    comunidad: String,

    ubicacion: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true } // [lng, lat]
    },

    directiva: {
      presidente: {
        nombres: { type: String, default: "" },
        telefono: { type: String, default: "" },
        email: { type: String, default: "" },

        // ✅ NUEVOS CAMPOS (IMÁGENES)
        Perfil: { type: String, default: "" },   // URL imagen perfil
        Portada: { type: String, default: "" }   // URL imagen portada
      }
    },

    estado: {
      type: String,
      enum: ["ACTIVO", "INACTIVO", "EN_PROCESO"],
      default: "ACTIVO"
    }
  },
  { timestamps: true }
);

// (Opcional pero recomendado si usas mapas)
ConsejoRuralSchema.index({ ubicacion: "2dsphere" });

// 👇 MODELO CON NOMBRE EXACTO DE LA COLECCIÓN
module.exports = mongoose.model(
  "ConsejoRural",
  ConsejoRuralSchema,
  "Consejos-rurales"
);
