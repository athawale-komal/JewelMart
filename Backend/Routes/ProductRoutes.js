const express = require ("express");
const router = express.Router();
const admin = require ("../Middleware/admin.js");
const Product_Controller  = require ("../Controllers/ProductController.js");
const { uploadProduct } = require ("../Config/cloudinary.js");
const authenticate = require('../middleware/Authenticate');

/* ADMIN */
router.post(
  "/create",
  authenticate,
  admin("ADMIN"),
  uploadProduct,
  Product_Controller.createProduct
);

router.put(
  "/:id",
  authenticate,
  admin("ADMIN"),
  uploadProduct,
  Product_Controller.updateProduct
);

router.delete(
  "/:id",
  authenticate,
  admin("ADMIN"),
  Product_Controller.deleteProduct
);

/* PUBLIC */
router.get("/hot-deals", Product_Controller.getHotDeals);
router.get("/category/:category", Product_Controller.getProductsByCategory);
router.get("/:id/related", Product_Controller.getRelatedProducts);
router.get("/:id", Product_Controller.findProductById);
router.get("/", Product_Controller.getAllProducts);

module.exports = router;