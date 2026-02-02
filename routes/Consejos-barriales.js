const express = require('express');
const router = express.Router();
const ConsejoBarrial = require('../models/Consejo-barrial');

// OBTENER TODOS LOS CONSEJOS
router.get('/', async (req, res) => {
    try {
        const consejos = await ConsejoBarrial.find().sort({ createdAt: -1 });
        res.json(consejos);
    } catch (err) {
        res.status(500).json({ mensaje: 'Error al obtener los consejos', error: err.message });
    }
});

// CREAR NUEVO CONSEJO BARRIAL
router.post('/', async (req, res) => {
    const nuevoConsejo = new ConsejoBarrial(req.body);
    try {
        const guardado = await nuevoConsejo.save();
        res.status(201).json(guardado);
    } catch (err) {
        res.status(400).json({ mensaje: 'Error al guardar el consejo', error: err.message });
    }
});

// ACTUALIZAR CONSEJO
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await ConsejoBarrial.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(actualizado);
    } catch (err) {
        res.status(400).json({ mensaje: 'Error al actualizar', error: err.message });
    }
});

// ELIMINAR CONSEJO
router.delete('/:id', async (req, res) => {
    try {
        await ConsejoBarrial.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Consejo Barrial eliminado con éxito' });
    } catch (err) {
        res.status(500).json({ mensaje: 'Error al eliminar', error: err.message });
    }
});

module.exports = router;