import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.Image) {
    return res
      .status(400)
      .json({ 
        success: false, 
        message: "Please fill all the required fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201)
    .json({
      success: true,
      data: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error("Error in create product:", error.message);
    res.status(500)
    .json({
      success: false,
      message: "Internal server error",
    });
  }
});

console.log(process.env.MONGO_URI);

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
