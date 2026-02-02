const mongoose = require('mongoose');

const ConsejoBarrialSchema = new mongoose.Schema({
    codigo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    parroquia: { type: String, required: true },
    barrioSector: { type: String, required: true },
    direccionReferencia: String,
    
    // Ubicación GeoJSON para mapas
    ubicacion: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true } // [longitud, latitud]
    },

    estado: { type: String, enum: ['ACTIVO', 'INACTIVO', 'EN_PROCESO'], default: 'ACTIVO' },
    fechaConformacion: Date,
    periodo: {
        inicio: Date,
        fin: Date
    },

    directiva: {
        presidente: {
            nombres: String,
            cedula: String,
            telefono: String,
            email: String
        },
        secretario: { nombres: String, telefono: String },
        tesorero: { nombres: String, telefono: String },
        vocales: [{ nombres: String, telefono: String }]
    },

    poblacionAprox: Number,
    numFamiliasAprox: Number,
    prioridades: [String],
    problematicas: [String],

    enlaceInstitucional: {
        nombres: String,
        telefono: String,
        email: String
    },

    docs: [{
        tipo: String,
        nombreArchivo: String,
        url: String,
        fecha: { type: Date, default: Date.now }
    }],

    observaciones: String,
    tags: [String]
}, { 
    timestamps: true // Crea automáticamente createdAt y updatedAt
});

// Índice para permitir búsquedas por cercanía geográfica
ConsejoBarrialSchema.index({ ubicacion: "2dsphere" });

module.exports = mongoose.model('ConsejoBarrial', ConsejoBarrialSchema);