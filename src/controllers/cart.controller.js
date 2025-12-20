import CartModel from '../models/cart.model.js';
import ProductModel from '../models/product.model.js';

export const getCartById = async (req, res, next) => {
  try {
    const { cid } = req.params;

    const cart = await CartModel.findById(cid)
      .populate('products.product')
      .lean();

    if (!cart) {
      return res.status(404).json({
        status: 'error',
        message: 'Carrito no encontrado'
      });
    }

    res.json({ status: 'success', payload: cart });
  } catch (error) {
    next(error);
  }
};

export const createCart = async (req, res, next) => {
  try {
    const cart = await CartModel.create({ products: [] });
    res.status(201).json({ status: 'success', payload: cart });
  } catch (error) {
    next(error);
  }
};

export const deleteProductFromCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;

    const cart = await CartModel.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    cart.products = cart.products.filter(
      item => item.product.toString() !== pid
    );

    await cart.save();
    await cart.populate('products.product');

    res.json({ status: 'success', payload: cart });
  } catch (error) {
    next(error);
  }
};

export const replaceCartProducts = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({
        status: 'error',
        message: 'products debe ser un array'
      });
    }

    const productIds = products.map(p => p.product);
    const count = await ProductModel.countDocuments({
      _id: { $in: productIds }
    });

    if (count !== productIds.length) {
      return res.status(400).json({
        status: 'error',
        message: 'Alguno(s) productId no existe(n)'
      });
    }

    const cart = await CartModel.findByIdAndUpdate(
      cid,
      { $set: { products } },
      { new: true, runValidators: true }
    ).populate('products.product');

    if (!cart) {
      return res.status(404).json({
        status: 'error',
        message: 'Carrito no encontrado'
      });
    }

    res.json({ status: 'success', payload: cart });
  } catch (error) {
    next(error);
  }
};

export const updateProductQuantity = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        status: 'error',
        message: 'quantity inválida'
      });
    }

    const cart = await CartModel.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    const item = cart.products.find(
      p => p.product.toString() === pid
    );

    if (!item) {
      return res.status(404).json({
        status: 'error',
        message: 'Producto no está en el carrito'
      });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate('products.product');

    res.json({ status: 'success', payload: cart });
  } catch (error) {
    next(error);
  }
};

export const emptyCart = async (req, res, next) => {
  try {
    const { cid } = req.params;

    const cart = await CartModel.findByIdAndUpdate(
      cid,
      { $set: { products: [] } },
      { new: true }
    ).populate('products.product');

    if (!cart) {
      return res.status(404).json({
        status: 'error',
        message: 'Carrito no encontrado'
      });
    }

    res.json({ status: 'success', payload: cart });
  } catch (error) {
    next(error);
  }
};
