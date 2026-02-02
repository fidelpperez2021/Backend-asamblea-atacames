const express = require("express");
const router = express.Router();
const ConsejoBarrial = require("../models/Consejo-barrial");

// ✅ Responder preflight OPTIONS (navegador)
router.options("*", (req, res) => {
  res.sendStatus(204);
});

// OBTENER TODOS LOS CONSEJOS
router.get("/", async (req, res) => {
  try {
    const consejos = await ConsejoBarrial.find().sort({ createdAt: -1 });
    res.json(consejos);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al obtener los consejos", error: err.message });
  }
});

// OBTENER POR ID
router.get("/:id", async (req, res) => {
  try {
    const consejo = await ConsejoBarrial.findById(req.params.id);
    if (!consejo) return res.status(404).json({ mensaje: "Consejo no encontrado" });
    res.json(consejo);
  } catch (err) {
    res.status(400).json({ mensaje: "ID inválido", error: err.message });
  }
});

// CREAR NUEVO CONSEJO BARRIAL
router.post("/", async (req, res) => {
  try {
    const guardado = await ConsejoBarrial.create(req.body);
    res.status(201).json(guardado);
  } catch (err) {
    // Duplicado por unique codigo
    if (err.code === 11000) {
      return res.status(409).json({ mensaje: "El código ya existe. Usa otro.", error: err.message });
    }
    res.status(400).json({ mensaje: "Error al guardar el consejo", error: err.message });
  }
});

// ✅ EDITAR (PATCH) - recomendado para tu frontend
router.patch("/:id", async (req, res) => {
  try {
    const actualizado = await ConsejoBarrial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!actualizado) return res.status(404).json({ mensaje: "Consejo no encontrado" });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ mensaje: "Error al actualizar", error: err.message });
  }
});

// ✅ También dejamos PUT por compatibilidad
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await ConsejoBarrial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!actualizado) return res.status(404).json({ mensaje: "Consejo no encontrado" });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ mensaje: "Error al actualizar", error: err.message });
  }
});

// ELIMINAR CONSEJO
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await ConsejoBarrial.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "Consejo no encontrado" });
    res.json({ mensaje: "Consejo Barrial eliminado con éxito" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al eliminar", error: err.message });
  }
});

module.exports = router;
