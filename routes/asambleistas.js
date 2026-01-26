const express = require("express");
const Asambleista = require("../models/Asambleista");

const router = express.Router();

// Crear asambleísta
router.post("/", async (req, res) => {
  try {
    const nuevo = await Asambleista.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos
router.get("/", async (req, res) => {
  try {
    const lista = await Asambleista.find().sort({ createdAt: -1 });
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Traer uno por ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Asambleista.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "No encontrado" });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: "ID inválido" });
  }
});

// Actualizar por ID
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Asambleista.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!actualizado) return res.status(404).json({ error: "No encontrado" });

    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar por ID
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await Asambleista.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ error: "No encontrado" });

    res.json({ ok: true });
  } catch (error) {
    res.status(400).json({ error: "ID inválido" });
  }
});

module.exports = router;
