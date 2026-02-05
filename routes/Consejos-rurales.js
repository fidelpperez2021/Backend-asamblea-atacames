const express = require("express");
const router = express.Router();
const ConsejoRural = require("../models/Consejo-rural");

// GET todos
router.get("/", async (req, res) => {
  try {
    const data = await ConsejoRural.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al obtener consejos rurales", error: err.message });
  }
});

// GET por ID
router.get("/:id", async (req, res) => {
  try {
    const item = await ConsejoRural.findById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ mensaje: "ID inválido", error: err.message });
  }
});

// POST crear
router.post("/", async (req, res) => {
  try {
    const creado = await ConsejoRural.create(req.body);
    res.status(201).json(creado);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ mensaje: "Código duplicado" });
    }
    res.status(400).json({ mensaje: "Error al crear", error: err.message });
  }
});

// PATCH actualizar
router.patch("/:id", async (req, res) => {
  try {
    const actualizado = await ConsejoRural.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!actualizado) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ mensaje: "Error al actualizar", error: err.message });
  }
});

// DELETE eliminar
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await ConsejoRural.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "Consejo Rural eliminado" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al eliminar", error: err.message });
  }
});

module.exports = router;
