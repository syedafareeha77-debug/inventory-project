const express = require("express");
const router = express.Router();
const { getStock, addStock, updateStock } = require("../controllers/stockController");
const auth = require("../middleware/auth");

// Protected routes
router.get("/", auth, getStock);
router.post("/", auth, addStock);
router.put("/:id", auth, updateStock);

module.exports = router;
