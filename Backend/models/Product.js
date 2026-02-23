const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productSku: { 
    type: String, 
    unique: true, 
    index: true 
  },

  title: { 
    type: String, 
    required: true 
  },

  brand: { 
    type: String, 
    required: true 
  },

  category: { 
    type: String, 
    required: true 
  },

  metalType: {
    type: String,
    required: true,
    enum: ["Gold", "Silver", "Platinum", "Diamond"]
  },

  purity: {
    type: String
  },

  description: { 
    type: String, 
    required: true 
  },

  images: [
    {
      type: String,
      required: true
    }
  ],

  price: { 
    type: Number, 
    required: true 
  },

  discountedPrice: { 
    type: Number 
  },

  discount: { 
    type: Number 
  },

  stock: {
    type: Number,
    default: 0,
    required: true
  },


  tag: {
    type: String
  },

  ratings: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "ratings" 
  }],

  reviews: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "reviews" 
  }],

  numRatings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },

  createdAt: { 
    type: Date, 
    default: Date.now 
  }

});

const Product = mongoose.models.products || mongoose.model("products", productSchema);

module.exports = Product;