const mongoose = require('mongoose');

const ConsejoBarrialSchema = new mongoose.Schema(
  {
    codigo: { type: String, required: true, unique: true, trim: true },
    nombre: { type: String, required: true, trim: true },
    parroquia: { type: String, required: true, trim: true },
    barrioSector: { type: String, required: true, trim: true },
    direccionReferencia: { type: String, trim: true },

    // Ubicación GeoJSON para mapas
    ubicacion: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true } // [longitud, latitud]
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
        email: { type: String, trim: true, lowercase: true }
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
          telefono: { type: String, trim: true }
        }
      ]
    },

    poblacionAprox: { type: Number, default: 0 },
    numFamiliasAprox: { type: Number, default: 0 },
    prioridades: [{ type: String, trim: true }],
    problematicas: [{ type: String, trim: true }],

    enlaceInstitucional: {
      nombres: { type: String, trim: true },
      telefono: { type: String, trim: true },
      email: { type: String, trim: true, lowercase: true }
    },

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
    timestamps: true // createdAt y updatedAt
  }
);

// Índice para permitir búsquedas por cercanía geográfica
ConsejoBarrialSchema.index({ ubicacion: '2dsphere' });

// ✅ IMPORTANTE: forzar el nombre exacto de la colección en Atlas
module.exports = mongoose.model(
  'ConsejoBarrial',
  ConsejoBarrialSchema,
  'Consejos-barriales' // <-- esto debe coincidir EXACTO
);


// Índice para permitir búsquedas por cercanía geográfica
ConsejoBarrialSchema.index({ ubicacion: "2dsphere" });


module.exports = mongoose.model('ConsejoBarrial', ConsejoBarrialSchema);
