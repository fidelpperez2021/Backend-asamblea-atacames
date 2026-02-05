// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 1) CONFIGURACIÓN (CORS + JSON)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Preflight (Express moderno)
app.options(/.*/, cors());

// Body parsers
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

// (Opcional) Debug de requests (te ayuda a ver si llega el POST/PATCH)
// app.use((req, res, next) => {
//   console.log(`➡️  ${req.method} ${req.originalUrl}`);
//   next();
// });

// 2) RUTA DE PRUEBA
app.get("/", (req, res) => res.send("✅ Backend Asamblea Atacames: TODO FUNCIONANDO"));

// 3) RUTAS (🔥 RECOMENDADO: TODO EN MINÚSCULAS)
app.use("/api/asambleistas", require("./routes/asambleistas"));
app.use("/api/actividades", require("./routes/actividades"));
app.use("/api/noticias", require("./routes/noticias"));

// ✅ IMPORTANTE:
// En tu repo RENOMBRA los archivos a minúsculas para que Render no falle:
// routes/consejos-barriales.js
// routes/consejos-rurales.js
app.use("/api/consejos-barriales", require("./routes/Consejos-barriales"));
app.use("/api/consejos-rurales", require("./routes/Consejos-rurales"));

// 4) 404 para rutas no encontradas (esto te muestra rápido el error)
app.use((req, res) => {
  res.status(404).json({
    mensaje: "Ruta no encontrada",
    ruta: req.originalUrl,
    metodo: req.method
  });
});

// 5) CONEXIÓN A MONGO + ARRANQUE
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Error de conexión:", err.message);
    process.exit(1);
  });
