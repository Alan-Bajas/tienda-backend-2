import { Router } from "express";
import UserModel from "../models/user.model.js";
import CartModel from "../models/cart.model.js";
import { createHash } from "../utils/password.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res.status(400).send({
        status: "error",
        error: "Email ya registrado"
      });
    }

    const cart = await CartModel.create({ products: [] });

    const user = await UserModel.create({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
      cart: cart._id,
      role: "user"
    });

    return res.status(201).send({
      status: "success",
      payload: user
    });

  } catch (error) {
    return res.status(500).send({
      status: "error",
      error: error.message
    });
  }
});

export default router;
