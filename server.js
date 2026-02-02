const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 1) CONFIGURACIÓN (CORS + JSON)
// ✅ CORS completo (necesario para POST/PATCH/DELETE desde navegador)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Preflight para navegador (MUY IMPORTANTE)
app.options("*", cors());

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2) RUTA DE PRUEBA
app.get("/", (req, res) => res.send("✅ Backend Asamblea Atacames: TODO FUNCIONANDO"));

// 3) REGISTRO DE TODAS LAS RUTAS (recomendado todo en minúsculas)
app.use("/api/asambleistas", require("./routes/asambleistas"));
app.use("/api/actividades", require("./routes/actividades"));
app.use("/api/noticias", require("./routes/noticias"));

// ✅ NUEVA RUTA: Consejos Barriales (MINÚSCULAS para que coincida con el frontend)
app.use("/api/consejos-barriales", require("./routes/Consejos-barriales"));

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
