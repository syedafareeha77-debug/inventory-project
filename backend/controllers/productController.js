const Product = require("../models/Product");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const product = new Product({ name, quantity, price });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- Restock All Products ---
exports.restockAllProducts = async (req, res) => {
  try {
    // Threshold for low stock (yahan hum <5 consider kar rahe hain)
    const lowStockThreshold = 5;
    const restockAmount = 10; // har product me kitna add hoga

    // Find all products jinka stock low hai
    const lowStockItems = await Product.find({ quantity: { $lt: lowStockThreshold } });

    // Update each low stock product
    const updatePromises = lowStockItems.map(item => {
      item.quantity += restockAmount;
      return item.save();
    });

    await Promise.all(updatePromises);

    res.json({ message: "All low stock items restocked successfully!", restockedItems: lowStockItems });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
