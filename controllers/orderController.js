const Order = require("../models/orderModels");

exports.createOrder = async (req, res) => {
  try {
    const { user, products, totalPrice } = req.body;
    const newOrder = new Order({ user, products, totalPrice });
    await newOrder.save();
    res.status(201).json({ message: "Order created", order: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.productId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};