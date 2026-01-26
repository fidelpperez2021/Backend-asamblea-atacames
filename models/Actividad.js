const mongoose = require('mongoose');

const ActividadSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String },
    categoria: { 
        type: String, 
        enum: ['sesion', 'territorio', 'social'],
        default: 'social'
    },
    fecha: { type: Date, required: true },
    hora: { type: String }, 
    lugar: { type: String },
    imagenes: [{ type: String }], 
    fechaRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Actividad', ActividadSchema, 'actividades');