import { Router } from "express";
import passport from "passport";

import UserModel from "../models/user.model.js";
import { isValidPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

const router = Router();

// POST /api/sessions/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).send({ status: "error", error: "Usuario no existe" });

    if (!isValidPassword(user, password)) {
      return res.status(401).send({ status: "error", error: "Credenciales inválidas" });
    }

    const token = generateToken(user);

    return res
      .cookie("coderCookieToken", token, { httpOnly: true })
      .send({ status: "success", message: "Login OK" });
  } catch (err) {
    return res.status(500).send({ status: "error", error: err.message });
  }
});

// GET /api/sessions/current
router.get("/current", passport.authenticate("current", { session: false }), (req, res) => {
  return res.send({ status: "success", payload: req.user });
});

export default router;
