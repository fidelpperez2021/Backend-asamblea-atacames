const express = require('express');
const router = express.Router();
const Actividad = require('../models/Actividades');

// POST: Guardar actividad
router.post('/', async (req, res) => {
    try {
        console.log("Datos recibidos en el server:", req.body);
        
        const { titulo, descripcion, categoria, fecha, hora, lugar, imagenes } = req.body;

        // Asegurar que imagenes sea un array
        const listaUrls = Array.isArray(imagenes) ? imagenes : (imagenes ? [imagenes] : []);

        const nuevaActividad = new Actividad({
            titulo,
            descripcion,
            categoria,
            fecha,
            hora,
            lugar,
            imagenes: listaUrls
        });

        await nuevaActividad.save();
        res.status(201).json({ mensaje: "Actividad guardada con éxito", data: nuevaActividad });
    } catch (error) {
        console.error("Error al guardar:", error);
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

// DELETE: Eliminar actividad
router.delete('/:id', async (req, res) => {
    try {
        await Actividad.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "No se pudo eliminar" });
    }
});

module.exports = router;