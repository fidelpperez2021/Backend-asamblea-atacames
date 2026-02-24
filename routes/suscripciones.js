const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

/* =========================
   GET → contador
   ========================= */
router.get("/count", async (req, res) => {
  try {
    const total = await Subscriber.countDocuments();
    res.json({ ok: true, total });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error al contar",
      error: err.message,
    });
  }
});

/* =========================
   GET → listar todos
   ========================= */
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json({ ok: true, data: subscribers });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error al listar",
      error: err.message,
    });
  }
});

/* =========================
   GET → obtener uno por ID
   ========================= */
router.get("/:id", async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ ok: false, message: "No encontrado" });
    }
    res.json({ ok: true, data: subscriber });
  } catch (err) {
    res.status(400).json({ ok: false, message: "ID inválido" });
  }
});

/* =========================
   POST → crear
   ========================= */
router.post("/", async (req, res) => {
  try {
    const name = (req.body.name || "").trim();
    const cedula = (req.body.cedula || "").trim();

    if (!name || !cedula) {
      return res.status(400).json({
        ok: false,
        message: "Nombre y cédula obligatorios",
      });
    }

    const created = await Subscriber.create({ name, cedula });

    res.status(201).json({
      ok: true,
      message: "Suscripción creada",
      data: created,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        ok: false,
        message: "Cédula ya registrada",
      });
    }

    res.status(500).json({
      ok: false,
      message: "Error al crear",
      error: err.message,
    });
  }
});

/* =========================
   PUT → actualizar
   ========================= */
router.put("/:id", async (req, res) => {
  try {
    const update = {
      name: req.body.name,
      cedula: req.body.cedula,
    };

    const updated = await Subscriber.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ ok: false, message: "No encontrado" });
    }

    res.json({
      ok: true,
      message: "Actualizado",
      data: updated,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        ok: false,
        message: "Cédula ya registrada",
      });
    }

    res.status(500).json({
      ok: false,
      message: "Error al actualizar",
      error: err.message,
    });
  }
});

/* =========================
   DELETE → eliminar
   ========================= */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Subscriber.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ ok: false, message: "No encontrado" });
    }

    res.json({ ok: true, message: "Eliminado correctamente" });
  } catch (err) {
    res.status(400).json({ ok: false, message: "ID inválido" });
  }
});

module.exports = router;

