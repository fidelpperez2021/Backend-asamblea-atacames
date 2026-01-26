const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("✅ API Backend Asamblea Atacames funcionando");
});

// --- REGISTRO DE RUTAS ---
app.use("/api/asambleistas", require("./routes/asambleistas"));

// AGREGA ESTA LÍNEA PARA ACTIVAR LAS ACTIVIDADES
app.use("/api/actividades", require("./routes/actividades")); 

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ Error conectando a MongoDB Atlas:", err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Servidor corriendo en puerto", PORT);
});