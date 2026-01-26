const mongoose = require('mongoose');

// Este esquema define la estructura de los documentos en tu nueva colección
const ActividadSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String },
    categoria: { type: String, enum: ['sesion', 'territorio', 'social'] },
    fecha: { type: Date, required: true },
    lugar: { type: String },
    imagenes: [{ type: String }], // Array para las URLs de las 20 fotos
    fechaRegistro: { type: Date, default: Date.now }
});

// El primer argumento 'Actividad' es el nombre que MongoDB usará para crear la colección
module.exports = mongoose.model('Actividad', ActividadSchema);