const express = require("express");
const router = express.Router();
const ConsejoBarrial = require("../models/Consejo-barrial");

// ✅ Preflight OPTIONS (navegador) sin usar "*"
router.use((req, res, next) => {
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
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

// ===============================
// ✅ AGREGAR ACTIVIDAD A UN CONSEJO
// PUT /api/consejos-barriales/:id/actividades
// Body: { actividad: { titulo, descripcion, fecha, lugar, estado, imagenes:[{url,titulo}] } }
// ===============================
router.put("/:id/actividades", async (req, res) => {
  try {
    const { id } = req.params;
    const { actividad } = req.body;

    if (!actividad || !actividad.titulo) {
      return res.status(400).json({ mensaje: "Datos de actividad incompletos" });
    }

    if (actividad.imagenes && actividad.imagenes.length > 20) {
      return res.status(400).json({ mensaje: "Máximo 20 imágenes por actividad" });
    }

    const consejo = await ConsejoBarrial.findById(id);
    if (!consejo) {
      return res.status(404).json({ mensaje: "Consejo Barrial no encontrado" });
    }

    // ✅ seguridad: si no existe el array, lo crea
    if (!consejo.actividades) consejo.actividades = [];

    consejo.actividades.push({
      titulo: actividad.titulo,
      descripcion: actividad.descripcion || "",
      fecha: actividad.fecha ? new Date(actividad.fecha) : null,
      lugar: actividad.lugar || "",
      estado: actividad.estado || "PROGRAMADA",
      imagenes: (actividad.imagenes || []).map((img) => ({
        url: img.url,
        titulo: img.titulo || ""
      }))
    });

    await consejo.save();

    res.json({
      mensaje: "Actividad agregada correctamente",
      actividad: consejo.actividades[consejo.actividades.length - 1]
    });
  } catch (err) {
    res.status(500).json({
      mensaje: "Error al agregar actividad",
      error: err.message
    });
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
