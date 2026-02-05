const express = require("express");
const router = express.Router();
const ConsejoRural = require("../models/Consejo-rural");

// ✅ GET /api/consejos-rurales  (listar)
router.get("/", async (req, res) => {
  try {
    const data = await ConsejoRural.find().sort({ createdAt: -1 });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({
      mensaje: "Error al obtener consejos rurales",
      error: err.message,
    });
  }
});

// ✅ GET /api/consejos-rurales/_count  (debug)
router.get("/_count", async (req, res) => {
  try {
    const count = await ConsejoRural.countDocuments();
    return res.json({ count });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ✅ GET /api/consejos-rurales/:id  (obtener por id)
router.get("/:id", async (req, res) => {
  try {
    const item = await ConsejoRural.findById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    return res.json(item);
  } catch (err) {
    return res.status(400).json({ mensaje: "ID inválido", error: err.message });
  }
});

// ✅ POST /api/consejos-rurales  (crear)
router.post("/", async (req, res) => {
  try {
    const creado = await ConsejoRural.create(req.body);
    return res.status(201).json(creado);
  } catch (err) {
    // duplicado por unique:true en "codigo"
    if (err.code === 11000) {
      return res.status(409).json({ mensaje: "Código duplicado" });
    }
    return res.status(400).json({ mensaje: "Error al crear", error: err.message });
  }
});

// ✅ PATCH /api/consejos-rurales/:id  (actualizar)
router.patch("/:id", async (req, res) => {
  try {
    const actualizado = await ConsejoRural.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!actualizado) return res.status(404).json({ mensaje: "No encontrado" });
    return res.json(actualizado);
  } catch (err) {
    return res.status(400).json({ mensaje: "Error al actualizar", error: err.message });
  }
});

// ✅ DELETE /api/consejos-rurales/:id  (eliminar)
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await ConsejoRural.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "No encontrado" });
    return res.json({ mensaje: "Consejo Rural eliminado" });
  } catch (err) {
    return res.status(500).json({ mensaje: "Error al eliminar", error: err.message });
  }
});

module.exports = router;


