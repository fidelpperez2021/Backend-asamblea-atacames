const express = require("express");
const router = express.Router();
const ConsejoRural = require("../models/Consejo-rural");

// ✅ GET /api/consejos-rurales
router.get("/", async (req, res) => {
  try {
    const data = await ConsejoRural.find().sort({ createdAt: -1 });
    return res.json(data);
  } catch (err) {
    return res
      .status(500)
      .json({ mensaje: "Error al obtener consejos rurales", error: err.message });
  }
});

// ✅ (Opcional) contador para debug
router.get("/_count", async (req, res) => {
  try {
    const count = await ConsejoRural.countDocuments();
    return res.json({ count });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;


