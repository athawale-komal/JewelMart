const User = require("../models/User.js");
const Product = require("../models/Product.js");
const mongoose = require("mongoose");

const addToWishlist = async (userId, productId) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid product ID");
  }

  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");



  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // Prevent duplicates
  const exists = user.wishlist.some(
    (w) =>
      w.productId.toString() === productId
  );

  if (!exists) {
    user.wishlist.push({ productId });
    await user.save();
  }

  return await getWishlist(userId);
};

const removeFromWishlist = async (userId, productId) => {

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid product ID");
  }

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const originalLength = user.wishlist.length;

  // Strategy: Manual filter for maximum control and logging
  user.wishlist = user.wishlist.filter(item => {
    // productId might be an ObjectId or a string depending on state
    const itemPodIdStr = item.productId ? item.productId.toString() : "";
    const targetProdIdStr = productId.toString();

    const isMatch = itemPodIdStr === targetProdIdStr;
    if (isMatch) console.log(`[WishlistService] Found matching item to remove: ${itemPodIdStr}`);

    return !isMatch;
  });

  if (user.wishlist.length === originalLength) {
    console.warn(`[WishlistService] Match not found in array. Trying direct pull as backup.`);
    user.wishlist.pull({ productId: new mongoose.Types.ObjectId(productId) });
  }

  await user.save();
  console.log(`[WishlistService] Saved. Final count: ${user.wishlist.length}`);

  const updatedWishlist = await getWishlist(userId);
  return updatedWishlist;
};

const getWishlist = async (userId) => {
  const user = await User.findById(userId).populate("wishlist.productId");
  if (!user) throw new Error("User not found");

  return user.wishlist.map((item) => {


    return {
      product: item.productId,
    };
  });
};

module.exports = { addToWishlist, getWishlist, removeFromWishlist }