const mongoose = require('mongoose');

const NoticiaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    resumen: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },

    // ✅ NUEVO CAMPO (opcional)
    video: {
        type: String,
        default: ""
    },

    categoria: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    autor: {
        type: String,
        default: "Comunicación GAD"
    }
});

module.exports = mongoose.model('Noticia', NoticiaSchema);
