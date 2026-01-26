const express = require('express');
const router = express.Router();
const Noticia = require('../models/Noticia');

// @route   GET /api/noticias
// @desc    Obtener todas las noticias (Ordenadas por la más reciente)
router.get('/', async (req, res) => {
    try {
        const noticias = await Noticia.find().sort({ fecha: -1 });
        res.json(noticias);
    } catch (err) {
        res.status(500).json({ mensaje: 'Error al obtener noticias', error: err.message });
    }
});

// @route   GET /api/noticias/:id
// @desc    Obtener una noticia específica por ID
router.get('/:id', async (req, res) => {
    try {
        const noticia = await Noticia.findById(req.params.id);
        if (!noticia) return res.status(404).json({ mensaje: 'Noticia no encontrada' });
        res.json(noticia);
    } catch (err) {
        res.status(500).json({ mensaje: 'Error al buscar la noticia', error: err.message });
    }
});

// @route   POST /api/noticias
// @desc    Publicar una nueva noticia
router.post('/', async (req, res) => {
    const { titulo, resumen, contenido, imagen, categoria, fecha, autor } = req.body;

    try {
        const nuevaNoticia = new Noticia({
            titulo,
            resumen,
            contenido,
            imagen,
            categoria,
            fecha,
            autor
        });

        const noticiaGuardada = await nuevaNoticia.save();
        res.status(201).json(noticiaGuardada);
    } catch (err) {
        res.status(400).json({ mensaje: 'Error al publicar noticia', error: err.message });
    }
});

// @route   DELETE /api/noticias/:id
// @desc    Eliminar una noticia (Solo desde el panel admin)
router.delete('/:id', async (req, res) => {
    try {
        const noticia = await Noticia.findByIdAndDelete(req.params.id);
        if (!noticia) return res.status(404).json({ mensaje: 'Noticia no existente' });
        res.json({ mensaje: 'Noticia eliminada correctamente del servidor' });
    } catch (err) {
        res.status(500).json({ mensaje: 'Error al eliminar', error: err.message });
    }
});

module.exports = router;