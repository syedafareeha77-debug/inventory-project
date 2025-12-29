const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ------------------------
// MongoDB connection
// ------------------------
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/inventory", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

// ------------------------
// Routes Import
// ------------------------
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const stockRoutes = require("./routes/stock");

// ------------------------
// Routes Setup
// ------------------------
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stock", stockRoutes);

// ------------------------
// Test Route
// ------------------------
app.get("/", (req, res) => {
  res.send("Server running");
});

// ------------------------
// Start Server
// ------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
