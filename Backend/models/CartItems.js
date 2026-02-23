const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },

    productSku: {
      type: String,
    },

    // Jewelry Info (NEW)
    metalType: {
      type: String,
    },

    purity: {
      type: String,
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
    },

    discountedPrice: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const CartItem = mongoose.model("cartItems", cartItemSchema);

module.exports = CartItem;