const mongoose = require("mongoose");

const ConsejoBarrialSchema = new mongoose.Schema(
  {
    codigo: { type: String, required: true, unique: true, trim: true },
    nombre: { type: String, required: true, trim: true },
    parroquia: { type: String, required: true, trim: true },
    barrioSector: { type: String, required: true, trim: true },
    direccionReferencia: { type: String, trim: true },

    ubicacion: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true },
    },

    estado: {
      type: String,
      enum: ["ACTIVO", "INACTIVO", "EN_PROCESO"],
      default: "ACTIVO",
    },

    fechaConformacion: { type: String },

    periodo: {
      inicio: { type: Date },
      fin: { type: Date },
    },

    directiva: {
      presidente: {
        nombres: String,
        cedula: String,
        telefono: String,

        // ✅ compatibles con tu frontend y Atlas
        foto: String,     // legacy
        Perfil: String,   // foto de perfil
        Portada: String,  // portada/banner
      },

      // ✅ formato normal
      Vicepresidente: { nombres: String, telefono: String, cedula: String },
      Secretario: { nombres: String, telefono: String, cedula: String },
      Tesorero: { nombres: String, telefono: String, cedula: String },

      // ✅ por si en Atlas se guardó como "Vicepresidente:" (con dos puntos)
      "Vicepresidente:": { nombres: String, telefono: String, cedula: String },

      // ✅ vocales con guiones (tal como en tu frontend)
      "1er-vocal": { nombres: String, telefono: String, cedula: String },
      "2do-vocal": { nombres: String, telefono: String, cedula: String },
      "3er-vocal": { nombres: String, telefono: String, cedula: String },

      // ✅ vocales como array (compatibilidad)
      vocales: [{ nombres: String, telefono: String, cargo: String, cedula: String }],
    },

    poblacionAprox: { type: Number, default: 0 },
    numFamiliasAprox: { type: Number, default: 0 },

    prioridades: [{ type: String, trim: true }],
    problematicas: [{ type: String, trim: true }],

    // ✅ extra fields que tú ya estás usando en algunos docs (opcional pero recomendado)
    tags: [{ type: String, trim: true }],
    docs: [
      {
        tipo: { type: String, trim: true },
        nombreArchivo: { type: String, trim: true },
        url: { type: String, trim: true },
        fecha: { type: String, trim: true },
      },
    ],
    observaciones: { type: String, trim: true },

    enlaceInstitucional: {
      nombres: { type: String, trim: true },
      telefono: { type: String, trim: true },
      email: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

ConsejoBarrialSchema.index({ ubicacion: "2dsphere" });

module.exports = mongoose.model(
  "ConsejoBarrial",
  ConsejoBarrialSchema,
  "Consejos-barriales"
);
