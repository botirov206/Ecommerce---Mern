import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// To take the all products from the database
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.log("Error in get products:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// To create a new product in the database
app.post("/api/products", async (req, res) => {
  const product = req.body; // user will send this data

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the required fields",
    });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error("Error in create product:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// To update a product in the database
// Note: To update all fields we use PUT method,
// if we want to update only some fields we can use PATCH method
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error in update product:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// To delete a product from the database
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error in delete product:", error.message);
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
