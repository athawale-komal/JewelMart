const Product_Service = require("../Services/ProductService");

/* CREATE */
const createProduct = async (req, res) => {
  try {
    const product = await Product_Service.createProduct(req.body, req.files); // use req.files
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    const product = await Product_Service.updateProduct(
      req.params.id,
      req.body,
      req.files // single file upload, wrap in array
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


/* GET ALL */
const getAllProducts = async (req, res) => {
  try {
    const products = await Product_Service.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* FIND BY ID */
const findProductById = async (req, res) => {
  try {
    const product = await Product_Service.findProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* DELETE */
const deleteProduct = async (req, res) => {
  try {
    const result = await Product_Service.deleteProduct(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* RELATED PRODUCTS */
const getRelatedProducts = async (req, res) => {
  try {
    const products = await Product_Service.getRelatedProducts(req.params.id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHotDeals = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const products = await Product_Service.getHotDeals(limit);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product_Service.getProductsByCategory(
      req.params.category
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  findProductById,
  deleteProduct,
  getRelatedProducts,
  updateProduct,
  getHotDeals,
  getProductsByCategory
}
