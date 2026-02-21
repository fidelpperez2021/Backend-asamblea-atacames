const mongoose = require("mongoose");

/* ===============================
   SUB-SCHEMAS PARA ACTIVIDADES
================================ */

const ImagenActividadSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    titulo: { type: String, trim: true, default: "" }
  },
  { _id: false }
);

const ActividadSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    descripcion: { type: String, trim: true, default: "" },
    fecha: { type: Date },
    lugar: { type: String, trim: true, default: "" },

    estado: {
      type: String,
      enum: ["PROGRAMADA", "REALIZADA", "CANCELADA"],
      default: "PROGRAMADA"
    },

    // ✅ hasta 20 imágenes
    imagenes: {
      type: [ImagenActividadSchema],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 20,
        message: "Una actividad no puede tener más de 20 imágenes"
      }
    }
  },
  { timestamps: true }
);

/* ===============================
   SCHEMA PRINCIPAL
================================ */

const ConsejoBarrialSchema = new mongoose.Schema(
  {
    codigo: { type: String, required: true, unique: true, trim: true },
    nombre: { type: String, required: true, trim: true },
    parroquia: { type: String, required: true, trim: true },
    barrioSector: { type: String, required: true, trim: true },
    direccionReferencia: { type: String, trim: true },

    ubicacion: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }
    },

    estado: {
      type: String,
      enum: ["ACTIVO", "INACTIVO", "EN_PROCESO"],
      default: "ACTIVO"
    },

    fechaConformacion: { type: String },

    periodo: {
      inicio: { type: Date },
      fin: { type: Date }
    },

    /* ===============================
       DIRECTIVA
    ================================ */

    directiva: {
      presidente: {
        nombres: String,
        cedula: String,
        telefono: String,

        // compatibles con frontend
        foto: String,     // legacy
        Perfil: String,   // foto perfil
        Portada: String   // banner
      },

      Vicepresidente: { nombres: String, telefono: String, cedula: String },
      Secretario: { nombres: String, telefono: String, cedula: String },
      Tesorero: { nombres: String, telefono: String, cedula: String },

      "Vicepresidente:": { nombres: String, telefono: String, cedula: String },

      "1er-vocal": { nombres: String, telefono: String, cedula: String },
      "2do-vocal": { nombres: String, telefono: String, cedula: String },
      "3er-vocal": { nombres: String, telefono: String, cedula: String },

      vocales: [
        { nombres: String, telefono: String, cargo: String, cedula: String }
      ]
    },

    /* ===============================
       DATOS SOCIALES
    ================================ */

    poblacionAprox: { type: Number, default: 0 },
    numFamiliasAprox: { type: Number, default: 0 },

    prioridades: [{ type: String, trim: true }],
    problematicas: [{ type: String, trim: true }],

    /* ===============================
       ACTIVIDADES DEL BARRIO
    ================================ */

    actividades: {
      type: [ActividadSchema],
      default: []
    },

    /* ===============================
       DOCUMENTOS Y EXTRAS
    ================================ */

    tags: [{ type: String, trim: true }],

    docs: [
      {
        tipo: { type: String, trim: true },
        nombreArchivo: { type: String, trim: true },
        url: { type: String, trim: true },
        fecha: { type: String, trim: true }
      }
    ],

    observaciones: { type: String, trim: true },

    enlaceInstitucional: {
      nombres: { type: String, trim: true },
      telefono: { type: String, trim: true },
      email: { type: String, trim: true }
    }
  },
  { timestamps: true }
);

/* ===============================
   ÍNDICES
================================ */

ConsejoBarrialSchema.index({ ubicacion: "2dsphere" });

module.exports = mongoose.model(
  "ConsejoBarrial",
  ConsejoBarrialSchema,
  "Consejos-barriales"
);
