const mongoose = require('mongoose');

const ConsejoBarrialSchema = new mongoose.Schema(
  {
    codigo: { type: String, required: true, unique: true, trim: true },
    nombre: { type: String, required: true, trim: true },
    parroquia: { type: String, required: true, trim: true },
    barrioSector: { type: String, required: true, trim: true },
    direccionReferencia: { type: String, trim: true },
    ubicacion: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true }
    },
    estado: { type: String, enum: ['ACTIVO', 'INACTIVO', 'EN_PROCESO'], default: 'ACTIVO' },
    fechaConformacion: { type: String }, 
    periodo: {
      inicio: { type: Date },
      fin: { type: Date }
    },
    directiva: {
      // Estructura flexible para coincidir con Atlas (Mayúsculas y guiones)
      presidente: { nombres: String, cedula: String, telefono: String, foto: String },
      Vicepresidente: { nombres: String, telefono: String },
      Secretario: { nombres: String, telefono: String },
      Tesorero: { nombres: String, telefono: String },
      "1er-vocal": { nombres: String, telefono: String },
      "2do-vocal": { nombres: String, telefono: String },
      "3er-vocal": { nombres: String, telefono: String },
      // Mantenemos vocales como array por compatibilidad con el esquema anterior
      vocales: [{ nombres: String, telefono: String, cargo: String }]
    },
    poblacionAprox: { type: Number, default: 0 },
    numFamiliasAprox: { type: Number, default: 0 },
    prioridades: [{ type: String, trim: true }],
    problematicas: [{ type: String, trim: true }]
  },
  { timestamps: true }
);

ConsejoBarrialSchema.index({ ubicacion: '2dsphere' });

module.exports = mongoose.model('ConsejoBarrial', ConsejoBarrialSchema, 'Consejos-barriales');

