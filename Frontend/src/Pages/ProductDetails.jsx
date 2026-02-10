import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../Data/Product";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Find the product by id
  const product = products.find((item) => item.id === parseInt(id));

  // If product not found, show error
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Product Not Found</h1>
          <p className="text-slate-600 mb-6">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-xl transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Mock multiple images (you can replace with actual product images array)
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to checkout with ${quantity} ${product.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => navigate("/")}
              className="text-slate-600 hover:text-amber-600 transition-colors"
            >
              Home
            </button>
            <span className="text-slate-400">/</span>
            <button
              onClick={() => navigate(-1)}
              className="text-slate-600 hover:text-amber-600 transition-colors"
            >
              Products
            </button>
            <span className="text-slate-400">/</span>
            <span className="text-amber-600 font-semibold">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Side - Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-slate-100 group">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Badges */}
              <div className="absolute top-6 right-6 flex flex-col gap-3">
                {product.purity && (
                  <span className="bg-amber-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    {product.purity}
                  </span>
                )}
                {product.discount && (
                  <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Rating Badge */}
              {product.rating && (
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-md flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold text-slate-700">{product.rating} Rating</span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-amber-500 shadow-lg scale-105"
                      : "border-slate-200 hover:border-amber-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6">
            {/* Category Badge */}
            <span className="inline-block bg-amber-100 text-amber-800 text-sm font-bold px-4 py-2 rounded-full">
              {product.category || "Ring"}
            </span>

            {/* Product Name */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Price Section */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-5xl font-bold text-slate-900">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-slate-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-green-600 font-semibold">
                  You save ₹{(product.originalPrice - product.price).toLocaleString()} ({product.discount}% off)
                </p>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Description</h3>
              <p className="text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Specifications */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Material</p>
                    <p className="text-slate-800 font-bold">{product.material || "Gold"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Weight</p>
                    <p className="text-slate-800 font-bold">{product.weight || "5g"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Purity</p>
                    <p className="text-slate-800 font-bold">{product.purity || "22K"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Category</p>
                    <p className="text-slate-800 font-bold">{product.category || "Ring"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-amber-500 hover:text-white text-slate-700 font-bold text-xl transition-all flex items-center justify-center"
                  disabled={quantity === 1}
                >
                  −
                </button>
                <span className="text-3xl font-bold text-slate-800 w-16 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-amber-500 hover:text-white text-slate-700 font-bold text-xl transition-all flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Buy Now
              </button>

              <button
                onClick={() => navigate(-1)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Products
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-600">Secure Payment</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-600">Certified Jewellery</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-600">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;