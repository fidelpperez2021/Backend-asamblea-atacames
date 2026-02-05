const express = require("express");
const router = express.Router();
const ConsejoRural = require("../models/Consejo-rural");

router.get("/", async (req, res) => {
  try {
    const data = await ConsejoRural.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

});

module.exports = router;

