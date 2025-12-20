import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";

const router = Router();

// GET todos los productos
router.get("/", getProducts);

// GET producto por ID
router.get("/:pid", getProductById);

// CREATE producto
router.post("/", createProduct);

// UPDATE producto
router.put("/:pid", updateProduct);

// DELETE producto
router.delete("/:pid", deleteProduct);

export default router;