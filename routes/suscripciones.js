const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

router.post("/", async (req, res) => {
  try {
    const name = (req.body.name || "").trim();
    const email = (req.body.email || "").trim().toLowerCase();

    if (!name || !email) {
      return res.status(400).json({ ok: false, message: "Nombre y correo son obligatorios." });
    }

    const created = await Subscriber.create({ name, email });

    return res.status(201).json({
      ok: true,
      message: "¡Suscripción creada!",
      data: { id: created._id, name: created.name, email: created.email },
    });
  } catch (err) {
    // Error típico cuando el email ya existe (duplicate key)
    if (err?.code === 11000) {
      return res.status(409).json({ ok: false, message: "Ese correo ya está suscrito." });
    }

    // Validaciones de mongoose (email inválido, etc.)
    if (err?.name === "ValidationError") {
      return res.status(400).json({ ok: false, message: err.message });
    }

    console.error(err);
    return res.status(500).json({ ok: false, message: "Error interno del servidor." });
  }
});

module.exports = router;
