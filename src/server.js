import dotenv from "dotenv";
dotenv.config(); // ⬅️ SIEMPRE PRIMERO

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 8080;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
});
