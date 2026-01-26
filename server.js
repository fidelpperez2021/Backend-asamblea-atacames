const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Configuración de CORS para permitir conexión desde el Frontend
app.use(cors());
app.use(express.json());

// Ruta de comprobación rápida
app.get("/", (req, res) => res.send("✅ API Backend Asamblea Atacames funcionando"));

// --- REGISTRO DE RUTAS ---
// IMPORTANTE: Asegúrate que los archivos en /routes se llamen exactamente así
app.use("/api/asambleistas", require("./routes/asambleistas"));
app.use("/api/actividades", require("./routes/actividades"));

// Conexión a Base de Datos
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ Error de conexión:", err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
