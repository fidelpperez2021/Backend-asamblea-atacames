const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 1) CONFIGURACIÓN (CORS + JSON)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Preflight sin usar app.options("*", ...), para evitar el error en Render
app.use((req, res, next) => {
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2) RUTA DE PRUEBA
app.get("/", (req, res) => res.send("✅ Backend Asamblea Atacames: TODO FUNCIONANDO"));

// 3) REGISTRO DE TODAS LAS RUTAS (minúsculas recomendado)
app.use("/api/asambleistas", require("./routes/asambleistas"));
app.use("/api/actividades", require("./routes/actividades"));
app.use("/api/noticias", require("./routes/noticias"));

// ✅ Consejos Barriales en minúsculas (para que coincida con el frontend)
app.use("/api/consejos-barriales", require("./routes/Consejos-barriales"));

// 4) CONEXIÓN A MONGO
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ Error de conexión:", err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
