const mongoose = require('mongoose');

/**
 * Esquema para la gestión de Consejos Barriales - Atacames
 */
const ConsejoBarrialSchema = new mongoose.Schema(
  {
    codigo: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true 
    },
    nombre: { 
      type: String, 
      required: true, 
      trim: true 
    },
    parroquia: { 
      type: String, 
      required: true, 
      trim: true 
    },
    barrioSector: { 
      type: String, 
      required: true, 
      trim: true 
    },
    direccionReferencia: { 
      type: String, 
      trim: true 
    },

    // Ubicación GeoJSON para integración con Google Maps o Leaflet
    ubicacion: {
      type: { 
        type: String, 
        enum: ['Point'], 
        default: 'Point' 
      },
      coordinates: { 
        type: [Number], 
        required: true 
      } // [longitud, latitud]
    },

    estado: {
      type: String,
      enum: ['ACTIVO', 'INACTIVO', 'EN_PROCESO'],
      default: 'ACTIVO'
    },

    fechaConformacion: { type: Date },

    periodo: {
      inicio: { type: Date },
      fin: { type: Date }
    },

    directiva: {
      presidente: {
        nombres: { type: String, trim: true },
        cedula: { type: String, trim: true },
        telefono: { type: String, trim: true },
        email: { type: String, trim: true, lowercase: true },
        // URL de la imagen (Cloudinary, Firebase, etc.)
        foto: { type: String, trim: true, default: "" } 
      },
      secretario: {
        nombres: { type: String, trim: true },
        telefono: { type: String, trim: true }
      },
      tesorero: {
        nombres: { type: String, trim: true },
        telefono: { type: String, trim: true }
      },
      vocales: [
        {
          nombres: { type: String, trim: true },
          telefono: { type: String, trim: true },
          cargo: { type: String, trim: true } // Ejemplo: "Primer Vocal"
        }
      ]
    },

    // Registro de eventos del barrio
    actividades: [
      {
        titulo: { type: String },
        fecha: { type: String },
        descripcion: { type: String },
        imagenes: [{ type: String }]
      }
    ],

    poblacionAprox: { type: Number, default: 0 },
    numFamiliasAprox: { type: Number, default: 0 },
    prioridades: [{ type: String, trim: true }],
    problematicas: [{ type: String, trim: true }],

    enlaceInstitucional: {
      nombres: { type: String, trim: true },
      telefono: { type: String, trim: true },
      email: { type: String, trim: true, lowercase: true }
    },

    // Almacenamiento de documentos legales o actas
    docs: [
      {
        tipo: { type: String, trim: true },
        nombreArchivo: { type: String, trim: true },
        url: { type: String, trim: true },
        fecha: { type: Date, default: Date.now }
      }
    ],

    observaciones: { type: String, trim: true },
    tags: [{ type: String, trim: true }]
  },
  {
    // Crea automáticamente los campos createdAt y updatedAt
    timestamps: true 
  }
);

// Índice geoespacial para permitir búsquedas por cercanía
ConsejoBarrialSchema.index({ ubicacion: '2dsphere' });

/**
 * EXPORTACIÓN
 * Forzamos el nombre de la colección a 'Consejos-barriales' 
 * para que coincida exactamente con tu base de datos en Atlas.
 */
module.exports = mongoose.model(
  'ConsejoBarrial',
  ConsejoBarrialSchema,
  'Consejos-barriales'
);
