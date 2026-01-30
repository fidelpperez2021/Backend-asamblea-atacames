const express = require('express');
const router = express.Router();
const Actividad = require('../models/Actividad');

// POST: Guardar actividad
router.post('/', async (req, res) => {
    try {
        const { titulo, descripcion, categoria, fecha, hora, lugar, imagenes } = req.body;
        const nuevaActividad = new Actividad({
            titulo, descripcion, categoria, fecha, hora, lugar, imagenes
        });
        await nuevaActividad.save();
        res.status(201).json({ mensaje: "Actividad guardada", data: nuevaActividad });
    } catch (error) {
        res.status(500).json({ error: "Error al guardar" });
    }
});

// GET: Listar todas
router.get('/', async (req, res) => {
    try {
        const actividades = await Actividad.find().sort({ fecha: -1 });
        res.json(actividades);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener datos" });
    }
});

// PUT: Modificar actividad (NUEVO)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const actividad = await Actividad.findByIdAndUpdate(id, datosActualizados, { new: true });
        if (!actividad) return res.status(404).json({ mensaje: "No encontrada" });
        res.json({ mensaje: "Actividad actualizada", data: actividad });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar" });
    }
});

// DELETE: Eliminar actividad (NUEVO)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const actividad = await Actividad.findByIdAndDelete(id);
        if (!actividad) return res.status(404).json({ mensaje: "No encontrada" });
        res.json({ mensaje: "Actividad eliminada" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar" });
    }
});

module.exports = router;
