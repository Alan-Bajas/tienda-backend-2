import ProductModel from "../models/product.model.js";

// GET /api/products
export const getProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.find().lean();
    return res.json({ status: "success", payload: products });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:pid
export const getProductById = async (req, res, next) => {
  try {
    const { pid } = req.params;

    const product = await ProductModel.findById(pid).lean();
    if (!product) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }

    return res.json({ status: "success", payload: product });
  } catch (error) {
    next(error);
  }
};

// POST /api/products
export const createProduct = async (req, res, next) => {
  try {
    const data = req.body;

    // Validación mínima (si tu modelo exige más, Mongoose igual valida)
    if (!data?.title || !data?.description || data?.price == null || !data?.code || data?.stock == null || !data?.category) {
      return res.status(400).json({
        status: "error",
        message: "Faltan campos requeridos (title, description, price, code, stock, category)"
      });
    }

    const created = await ProductModel.create(data);
    return res.status(201).json({ status: "success", payload: created });
  } catch (error) {
    // Si code es unique, este error es común
    if (error?.code === 11000) {
      return res.status(400).json({
        status: "error",
        message: "El campo 'code' ya existe (debe ser único)"
      });
    }
    next(error);
  }
};

// PUT /api/products/:pid
export const updateProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const updates = req.body;

    const updated = await ProductModel.findByIdAndUpdate(
      pid,
      { $set: updates },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }

    return res.json({ status: "success", payload: updated });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/products/:pid
export const deleteProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;

    const deleted = await ProductModel.findByIdAndDelete(pid).lean();
    if (!deleted) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }

    return res.json({ status: "success", payload: deleted });
  } catch (error) {
    next(error);
  }
};
