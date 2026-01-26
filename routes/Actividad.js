const express = require('express');
const router = express.Router();
const Actividad = require('../models/Actividad'); // Tu modelo Mongoose

/**
 * @route   POST /api/actividades
 * @desc    Registrar una nueva actividad usando URLs de imágenes
 */
router.post('/', async (req, res) => {
    try {
        const { titulo, descripcion, categoria, fecha, lugar, imagenes } = req.body;

        // Validamos que 'imagenes' sea un array (incluso si viene vacío o con una sola URL)
        const listaUrls = Array.isArray(imagenes) ? imagenes : [imagenes];

        const nuevaActividad = new Actividad({
            titulo,
            descripcion,
            categoria,
            fecha,
            lugar,
            imagenes: listaUrls // Se guarda el array de strings directamente
        });

        // Al guardar, Mongoose crea la colección 'actividads' en Atlas automáticamente
        await nuevaActividad.save();
        
        res.status(201).json({ 
            mensaje: "Actividad creada exitosamente", 
            data: nuevaActividad 
        });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ 
            error: "Error al registrar la actividad",
            detalle: error.message 
        });
    }
});

/**
 * @route   GET /api/actividades
 * @desc    Obtener todas las actividades para el Frontend
 */
router.get('/', async (req, res) => {
    try {
        const actividades = await Actividad.find().sort({ fecha: -1 });
        res.json(actividades);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener actividades" });
    }
});

module.exports = router;