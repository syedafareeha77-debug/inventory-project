const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  restockAllProducts, // naya controller function
} = require("../controllers/productController");
const auth = require("../middleware/auth");

// Protected routes
router.get("/", auth, getProducts);
router.post("/", auth, addProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

// --- New Route for Restock All ---
router.put("/restock-all", auth, restockAllProducts);

module.exports = router;
