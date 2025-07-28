const Product = require('../models/productModel');

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getProducts = async (req, res) => {
  const products = await Product.find({},{ "__v": false});
  res.json(products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id,{ "__v": false});
  product ? res.json(product) : res.status(404).json({ message: "Not found" });
};

const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { "__v": false});
  updated ? res.json(updated) : res.status(404).json({ message: "Not found" });
};

const deleteProduct = async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id,{ "__v": false});
  deleted ? res.json({ message: "this product has been deleted" }) : res.status(404).json({ message: "Not found" });
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
