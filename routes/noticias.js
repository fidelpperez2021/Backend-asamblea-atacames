const express = require('express');
const router = express.Router();
const Noticia = require('../models/Noticia');

// @route    GET /api/noticias
// @desc     Obtener todas las noticias (Ordenadas por la más reciente)
router.get('/', async (req, res) => {
    try {
        const noticias = await Noticia.find().sort({ fecha: -1 });
        res.json(noticias);
    } catch (err) {
        res.status(500).json({ mensaje: 'Error al obtener noticias', error: err.message });
    }
});

// @route    GET /api/noticias/:id
router.get('/:id', async (req, res) => {
    try {
        const noticia = await Noticia.findById(req.params.id);
        if (!noticia) return res.status(404).json({ mensaje: 'Noticia no encontrada' });
        res.json(noticia);
    } catch (err) {
        res.status(500).json({ mensaje: 'Error al buscar la noticia', error: err.message });
    }
});

// @route    POST /api/noticias
// @desc     Publicar una nueva noticia
router.post('/', async (req, res) => {
    const { titulo, resumen, contenido, imagen, categoria, fecha, autor } = req.body;

    try {
        const nuevaNoticia = new Noticia({
            titulo,
            resumen,
            contenido,
            imagen,
            categoria,
            fecha: fecha || Date.now(),
            autor
        });

        const noticiaGuardada = await nuevaNoticia.save();
        res.status(201).json(noticiaGuardada);
    } catch (err) {
        res.status(400).json({ mensaje: 'Error al publicar noticia', error: err.message });
    }
});

// @route    PUT /api/noticias/:id
// @desc     Actualizar una noticia existente
router.put('/:id', async (req, res) => {
    try {
        const noticiaActualizada = await Noticia.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // Para que devuelva el objeto ya editado
        );
        
        if (!noticiaActualizada) return res.status(404).json({ mensaje: 'No se encontró la noticia para editar' });
        res.json(noticiaActualizada);
    } catch (err) {
        res.status(400).json({ mensaje: 'Error al actualizar noticia', error: err.message });
    }
});

// @route    DELETE /api/noticias/:id
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
