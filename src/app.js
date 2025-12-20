import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";

import { initializePassport } from "./config/passport.config.js";

import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import userRouter from "./routes/users.routes.js";
import sessionRouter from "./routes/sessions.routes.js";
import viewRouter from "./routes/view.routes.js";

const app = express();

// 🔧 Necesario para __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🧠 Handlebars (simple, sin helpers raros)
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// 📦 Middlewares básicos (curso)
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 🔐 Passport
initializePassport();
app.use(passport.initialize());

// 📂 Archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

// 🛣️ Rutas API
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);

// 🖥️ Vistas
app.use("/", viewRouter);

// 🧪 Test
app.get("/ping", (req, res) => {
  res.send("Backend listo 🚀");
});

export default app;
