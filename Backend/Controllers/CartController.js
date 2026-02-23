const CartService = require("../Services/CartService");

/* ================= GET USER CART ================= */
const getUserCart = async (req, res) => {
  try {
    const data = await CartService.findUserCart(req.user._id);

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


/* ================= ADD ITEM ================= */
const addItemToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId is required",
      });
    }

    const data = await CartService.addCartItem(
      req.user._id,
      productId
    );

    return res.status(200).json({
      success: true,
      message: "Item added to cart",
      data,
    });

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


/* ================= UPDATE QUANTITY ================= */
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity) {
      return res.status(400).json({
        success: false,
        message: "Quantity is required",
      });
    }

    const item = await CartService.updateCartItemQuantity(
      req.user._id,
      req.params.id,
      quantity
    );

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: item,
    });

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


/* ================= REMOVE ITEM ================= */
const removeCartItem = async (req, res) => {
  try {
    const result = await CartService.removeCartItem(
      req.user._id,
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: result.message,
    });

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getUserCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
};