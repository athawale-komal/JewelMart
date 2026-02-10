import React, { useState } from "react";
import { products } from "../Data/Product";
import { useNavigate } from "react-router-dom";

const OurProduct = () => {
  const [search, setSearch] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });
  const [selectedPurities, setSelectedPurities] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const navigate = useNavigate();

  // Get unique categories and purities
  const categories = ["All", ...new Set(products.map(item => item.category))];
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
  const filteredProducts = products
    .filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(item =>
      category === "All" ? true : item.category === category
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

  // Navigate to product detail page
  const handleQuickView = (productId) => {
    navigate(`/product/${productId}`);
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
                      className={`p-2 rounded transition-all ${
                        viewMode === "grid" 
                          ? "bg-amber-500 text-white shadow-md" 
                          : "text-slate-600 hover:text-amber-600"
                      }`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded transition-all ${
                        viewMode === "list" 
                          ? "bg-amber-500 text-white shadow-md" 
                          : "text-slate-600 hover:text-amber-600"
                      }`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className={`group bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                    viewMode === "list" ? "flex flex-row" : "flex flex-col"
                  }`}
                >
                  {/* Product Image */}
                  <div className={`relative overflow-hidden ${
                    viewMode === "list" ? "w-64 shrink-0" : "w-full"
                  }`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                        viewMode === "list" ? "h-full w-full" : "h-72 w-full"
                      }`}
                    />
                    
                    {/* Quick View Button - Appears on Hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <button
                        onClick={() => handleQuickView(item.id)}
                        className="bg-white text-slate-800 font-bold py-3 px-6 rounded-xl shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-amber-500 hover:text-white flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Quick View
                      </button>
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {item.purity && (
                        <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          {item.purity}
                        </span>
                      )}
                      {item.discount && (
                        <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          {item.discount}% OFF
                        </span>
                      )}
                    </div>

                    {/* Rating Badge */}
                    {item.rating && (
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                        <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-semibold text-sm text-slate-700">{item.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Category Badge */}
                    <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full w-fit mb-3">
                      {item.category || "Ring"}
                    </span>

                    {/* Product Name */}
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-grow">
                      {item.description}
                    </p>

                    {/* Price Section */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-slate-900">
                          ₹{item.price.toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <span className="text-lg text-slate-400 line-through">
                            ₹{item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Material & Weight */}
                    <div className="flex items-center justify-between text-sm text-slate-600 mb-5 pb-5 border-b border-slate-100">
                      <span className="font-medium">{item.material || "Gold"}</span>
                      <span className="font-medium">{item.weight || "5g"}</span>
                    </div>

                    {/* Add to Cart Button */}
                    <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                      <span>Add to Cart</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
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