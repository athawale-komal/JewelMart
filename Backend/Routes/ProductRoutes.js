const express = require("express");
const router = express.Router();

const authenticate = require("../Middleware/Authenticate.js");
const admin = require("../Middleware/admin.js");
const Product_Controller = require("../Controllers/ProductController.js");
const { uploadProduct } = require("../Config/cloudinary.js");

/* ================= PUBLIC ROUTES ================= */

// Get all products
router.get("/products", Product_Controller.getAllProducts);

// Hot deals
router.get("/products/hot-deals", Product_Controller.getHotDeals);

// Get by category
router.get("/products/category/:category", Product_Controller.getProductsByCategory);

// Related products
router.get("/products/related/:id", Product_Controller.getRelatedProducts);

// Get single product
router.get("/products/:id", Product_Controller.findProductById);


/* ================= ADMIN ROUTES ================= */

// Create product
router.post(
  "/products",
  authenticate,
  admin("ADMIN"),
  uploadProduct,
  Product_Controller.createProduct
);

// Update product
router.put(
  "/products/:id",
  authenticate,
  admin("ADMIN"),
  uploadProduct,
  Product_Controller.updateProduct
);

// Delete product
router.delete(
  "/products/:id",
  authenticate,
  admin("ADMIN"),
  Product_Controller.deleteProduct
);

module.exports = router;