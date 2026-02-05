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

// Preflight
app.options(/.*/, cors());

// Body parsers
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

// 2) RUTA DE PRUEBA
app.get("/", (req, res) => res.send("✅ Backend Asamblea Atacames: TODO FUNCIONANDO"));

// 3) RUTAS
app.use("/api/asambleistas", require("./routes/asambleistas"));
app.use("/api/actividades", require("./routes/actividades"));
app.use("/api/noticias", require("./routes/noticias"));

// ✅ RECOMENDADO: archivos en minúsculas
app.use("/api/consejos-barriales", require("./routes/consejos-barriales"));
app.use("/api/consejos-rurales", require("./routes/consejos-rurales"));

// 4) CONEXIÓN A MONGO
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ Error de conexión:", err.message);
    process.exit(1);
  });

// 5) PUERTO
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));

