const express = require("express");
const router = express.Router();
const { getProducts, addProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const auth = require("../middleware/auth");

// Protected routes
router.get("/", auth, getProducts);
router.post("/", auth, addProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;
