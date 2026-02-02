const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 1. CONFIGURACIÓN
app.use(cors());
app.use(express.json());

// 2. RUTA DE PRUEBA
app.get("/", (req, res) => res.send("✅ Backend Asamblea Atacames: TODO FUNCIONANDO"));

// 3. REGISTRO DE TODAS LAS RUTAS
app.use("/api/asambleistas", require("./routes/asambleistas"));
app.use("/api/actividades", require("./routes/actividades"));
app.use("/api/noticias", require("./routes/noticias")); 
// NUEVA RUTA: Consejos Barriales
app.use("/api/Consejos-barriales", require("./routes/Consejos-barriales")); 

// 4. CONEXIÓN A MONGO
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ Error de conexión:", err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
