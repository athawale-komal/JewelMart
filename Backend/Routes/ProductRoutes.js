const express = require ("express");
const router = express.Router();
const authenticate = require('../Middleware/Authenticate.js');
const admin = require ("../Middleware/admin.js");
const Product_Controller  = require ("../Controllers/ProductController.js");
const { uploadProduct } = require ("../Config/cloudinary.js");

router.get("/product/all", Product_Controller.getAllProducts);

/* ADMIN */
router.post(
  "/product/create",
  authenticate,
  admin("ADMIN"),
  uploadProduct,
  Product_Controller.createProduct
);

router.put(
  "/product/update/:id",
  authenticate,
  admin("ADMIN"),
  uploadProduct,
  Product_Controller.updateProduct
);

router.delete(
  "/product/delete/:id",
  authenticate,
  admin("ADMIN"),
  Product_Controller.deleteProduct
);

/* PUBLIC */
router.get("/product/hot-deals", Product_Controller.getHotDeals);
router.get("/product/category/:category", Product_Controller.getProductsByCategory);
router.get("/product/related/:id", Product_Controller.getRelatedProducts);
router.get("/product/:id", Product_Controller.findProductById);

module.exports = router;