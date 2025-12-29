const Stock = require("../models/Stock");

// Get all stock entries
exports.getStock = async (req, res) => {
  try {
    const stock = await Stock.find().populate("productId", "name price");
    res.json(stock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new stock entry
exports.addStock = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const stockEntry = new Stock({ productId, quantity });
    await stockEntry.save();
    res.status(201).json(stockEntry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update stock entry
exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Stock.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
