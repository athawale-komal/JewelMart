import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../States/Products/Action";
import { addToWishlist } from "../States/Wishlist/Action";
import { addItemToCart } from "../States/Cart/Action";
import { useNavigate } from "react-router-dom";
import { Heart, Loader2, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import ProductCard from "../Components/Product/ProductCard";

const OurProduct = () => {
  const [search, setSearch] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });
  const [selectedPurities, setSelectedPurities] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(findProducts());
  }, [dispatch]);

  // Get unique categories and purities
  const categories = ["All", "Ring", "Necklace", "Earrings", "Bangle", "Bracelet", "Mangalsutra", "Anklet", "Nose Pin", "Pendant", "Chain", "Toe Ring", "Kada"];
  const purities = ["22K", "18K", "925", "Natural"];

  // Toggle purity filter
  const togglePurity = (purity) => {
    setSelectedPurities(prev =>
      prev.includes(purity)
        ? prev.filter(p => p !== purity)
        : [...prev, purity]
    );
  };

  // Filter + Search + Sort logic
  const filteredProducts = (products || [])
    .filter(item =>
      (item.title || item.name || "").toLowerCase().includes(search.toLowerCase())
    )
    .filter(item =>
      item.price >= priceRange.min && item.price <= priceRange.max
    )
    .filter(item =>
      selectedPurities.length === 0 || selectedPurities.includes(item.purity)
    )
    .sort((a, b) => {
      if (sortPrice === "low") return a.price - b.price;
      if (sortPrice === "high") return b.price - a.price;
      return 0;
    });

  // Reset all filters
  const resetFilters = () => {
    setCategory("All");
    setPriceRange({ min: 0, max: 200000 });
    setSelectedPurities([]);
    setSortPrice("");
    setSearch("");
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[450px] object-cover"
        >
          <source src="\canva-URFOXqRL62M.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-transparent flex items-center px-8 md:px-16">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold font-serif text-white mb-4">
              <span className="text-rose-500 text-6xl md:text-7xl">Jewel</span>Mart
            </h1>
            <p className="text-xl md:text-2xl text-amber-200 italic mb-6">
              "Tradition with a Modern Shine..."
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-amber-400 font-serif italic">
              Our Exclusive Collection
            </h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT FILTER SIDEBAR */}
          <aside className="lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                </h2>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                  Price Range
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Min: ₹{priceRange.min.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="1000"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gradient-to-r from-indigo-200 to-indigo-400 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />

                  <div className="flex items-center justify-between text-sm text-slate-600 mt-4">
                    <span>Max: ₹{priceRange.max.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="1000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gradient-to-r from-indigo-200 to-indigo-600 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>

              {/* Purity Checkboxes */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                  Purity
                </h3>
                <div className="space-y-2">
                  {purities.map((purity) => (
                    <label
                      key={purity}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPurities.includes(purity)}
                        onChange={() => togglePurity(purity)}
                        className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                      />
                      <span className="text-slate-700 group-hover:text-amber-600 transition-colors">
                        {purity}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                  Category
                </h3>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-700 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 cursor-pointer hover:border-amber-300"
                >
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetFilters}
                className="w-full bg-gradient-to-r from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 text-amber-800 font-semibold py-3 px-6 rounded-xl border-2 border-amber-200 transition-all duration-200 hover:shadow-md"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* RIGHT CONTENT AREA */}
          <main className="flex-1">

            {/* Top Bar - Search & Sort */}
            <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-4 md:p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

                {/* Results Count */}
                <div className="text-slate-700 font-semibold text-lg">
                  <span className="text-2xl text-amber-600">{filteredProducts.length}</span> products found
                </div>

                {/* Search Bar */}
                <div className="relative flex-1 max-w-md w-full">
                  <input
                    type="text"
                    placeholder="🔍 Search your elegance..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border-2 border-slate-200 rounded-xl px-5 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  />
                </div>

                {/* Sort & View Toggle */}
                <div className="flex items-center gap-3">
                  <select
                    value={sortPrice}
                    onChange={(e) => setSortPrice(e.target.value)}
                    className="border-2 border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium cursor-pointer"
                  >
                    <option value="">Featured</option>
                    <option value="low">Low to High</option>
                    <option value="high">High to Low</option>
                  </select>

                  {/* View Mode Toggle */}
                  <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded transition-all ${viewMode === "grid"
                        ? "bg-amber-500 text-white shadow-md"
                        : "text-slate-600 hover:text-amber-600"
                        }`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded transition-all ${viewMode === "list"
                        ? "bg-amber-500 text-white shadow-md"
                        : "text-slate-600 hover:text-amber-600"
                        }`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
              }`}>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
                </div>
              ) : (
                filteredProducts.map((item) => (
                  <div key={item._id || item.id} className={viewMode === "list" ? "w-full" : ""}>
                    {viewMode === "grid" ? (
                      <ProductCard product={item} />
                    ) : (
                      <div className="group bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-row">
                        {/* List View Image */}
                        <div className="w-64 shrink-0 relative overflow-hidden">
                          <img
                            src={item.images?.[0] || item.image}
                            alt={item.title || item.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onClick={() => navigate(`/product/${item._id || item.id}`)}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                        {/* List View Details */}
                        <div className="p-6 flex-1 flex flex-col">
                          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full w-fit mb-3">
                            {item.category || "Jewellery"}
                          </span>
                          <h3
                            onClick={() => navigate(`/product/${item._id || item.id}`)}
                            className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors cursor-pointer"
                          >
                            {item.title || item.name}
                          </h3>
                          <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-grow">
                            {item.description}
                          </p>
                          <div className="mb-4">
                            <div className="flex items-baseline gap-3">
                              <span className="text-3xl font-bold text-slate-900">
                                ₹{item.discountedPrice?.toLocaleString() || item.price?.toLocaleString()}
                              </span>
                              {item.price > item.discountedPrice && (
                                <span className="text-lg text-slate-400 line-through">
                                  ₹{item.price?.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <button
                              onClick={() => {
                                dispatch(addItemToCart({ productId: item._id, quantity: 1 }));
                                toast.success("Added to Cart!");
                              }}
                              className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-600 transition-all flex items-center gap-2"
                            >
                              <ShoppingCart className="w-4 h-4" /> Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* No Results Message */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-block p-8 bg-gradient-to-br from-amber-50 to-rose-50 rounded-3xl">
                  <svg className="w-20 h-20 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-2xl font-semibold text-slate-600 mb-2">No items found</p>
                  <p className="text-slate-500">Try adjusting your filters or search terms</p>
                  <button
                    onClick={resetFilters}
                    className="mt-6 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-xl transition-all"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default OurProduct;