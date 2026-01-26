const express = require('express');
const router = express.Router();
const Actividad = require('../models/Actividad'); // IMPORTANTE: Sin la 's' y con 'A' mayúscula

// POST: Guardar actividad
router.post('/', async (req, res) => {
    try {
        const { titulo, descripcion, categoria, fecha, hora, lugar, imagenes } = req.body;
        const listaUrls = Array.isArray(imagenes) ? imagenes : (imagenes ? [imagenes] : []);

        const nuevaActividad = new Actividad({
            titulo, descripcion, categoria, fecha, hora, lugar, imagenes: listaUrls
        });

        await nuevaActividad.save();
        res.status(201).json({ mensaje: "Actividad guardada con éxito", data: nuevaActividad });
    } catch (error) {
        res.status(500).json({ error: "Error interno", detalle: error.message });
    }
});

// GET: Listar actividades
router.get('/', async (req, res) => {
    try {
        const actividades = await Actividad.find().sort({ fecha: -1 });
        res.json(actividades);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener datos" });
    }
});

module.exports = router;