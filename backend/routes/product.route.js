import express from "express";
import {
  getProducts,
  createProduct,
  updatedProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// To take the all products from the database
router.get("/", getProducts);

// To create a new product in the database
router.post("/", createProduct);

// To update a product in the database
// Note: To update all fields we use PUT method,
// if we want to update only some fields we can use PATCH method
router.put("/:id", updatedProduct);

// To delete a product from the database
router.delete("/:id", deleteProduct);

export default router;
