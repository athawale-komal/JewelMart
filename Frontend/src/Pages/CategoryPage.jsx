import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../Data/Product';
import { ArrowRight, Filter, SlidersHorizontal, Grid, List, Star, ShoppingCart, Sparkles } from 'lucide-react';

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });
  const [selectedPurity, setSelectedPurity] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get category display name
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  // Get unique purities from products
  const purities = [...new Set(products.map(p => p.purity))].filter(Boolean);

  useEffect(() => {
    // Filter products by category
    let filtered = products.filter(
      p => p.category.toLowerCase() === category.toLowerCase()
    );

    // Apply purity filter
    if (selectedPurity.length > 0) {
      filtered = filtered.filter(p => selectedPurity.includes(p.purity));
    }

    // Apply price range filter
    filtered = filtered.filter(
      p => p.price >= priceRange.min && p.price <= priceRange.max
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured/default sorting
        break;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredProducts(filtered);
  }, [category, sortBy, priceRange, selectedPurity]);

  const handleAddToCart = (product) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const existingItem = existingCart.find(item => item.id === product.id);
    
    if (existingItem) {
      // Increase quantity
      existingItem.quantity += 1;
    } else {
      // Add new item
      existingCart.push({ ...product, quantity: 1 });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Show success message (you can replace this with a toast notification)
    alert(`${product.name} added to cart!`);
  };

  const ProductCard = ({ product }) => (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
      <div className="relative overflow-hidden bg-linear-to-br from-slate-50 via-white to-amber-50 h-72">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <div className="bg-linear-to-r from-amber-500 to-yellow-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            {product.purity}
          </div>
          {product.discount > 0 && (
            <div className="bg-linear-to-r from-rose-500 to-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-bold animate-pulse">
              {product.discount}% OFF
            </div>
          )}
        </div>

        {product.stock < 5 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold animate-pulse">
            Only {product.stock} Left
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <button
            onClick={() => navigate(`/products/${product.id}`)}
            className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            Quick View
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            ₹{(product.price - (product.price * product.discount / 100)).toLocaleString('en-IN')}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-600 mb-5 pb-5 border-b border-gray-100">
          <span className="font-medium">{product.metalType}</span>
          <span className="font-medium">{product.weight}g</span>
        </div>

        <button
          onClick={() => handleAddToCart(product)}
          className="w-full bg-linear-to-r from-amber-500 to-yellow-600 text-white py-3.5 rounded-xl font-bold hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl flex items-center justify-center gap-2"
        >
          Add to Cart
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-amber-50/30 to-white pt-24">
      {/* Hero Section */}
      <section className="relative h-75 overflow-hidden mb-12">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=2000"
            alt={categoryName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-900/90 via-slate-900/70 to-transparent"></div>
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-20 w-full">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span className="text-amber-100 font-semibold text-sm tracking-wide">COLLECTION</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              {categoryName}
            </h1>

            <p className="text-xl text-amber-100">
              Explore our exquisite {categoryName.toLowerCase()} collection
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 pb-24">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              <span className="font-bold text-gray-900">{filteredProducts.length}</span> products found
            </p>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-all"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center gap-2 bg-white border border-stone-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-all ${
                  viewMode === 'grid'
                    ? 'bg-amber-500 text-white'
                    : 'text-gray-600 hover:bg-stone-50'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-all ${
                  viewMode === 'list'
                    ? 'bg-amber-500 text-white'
                    : 'text-gray-600 hover:bg-stone-50'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={`${
            showFilters ? 'block' : 'hidden'
          } lg:block w-full lg:w-64 shrink-0`}>
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Filter className="w-5 h-5 text-amber-600" />
                Filters
              </h3>

              {/* Price Range */}
              <div className="mb-6 pb-6 border-b border-stone-100">
                <h4 className="font-semibold text-gray-900 mb-4">Price Range</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Min: ₹{priceRange.min.toLocaleString()}</label>
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="1000"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Max: ₹{priceRange.max.toLocaleString()}</label>
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="1000"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Purity Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">Purity</h4>
                <div className="space-y-2">
                  {purities.map((purity) => (
                    <label key={purity} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPurity.includes(purity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPurity([...selectedPurity, purity]);
                          } else {
                            setSelectedPurity(selectedPurity.filter(p => p !== purity));
                          }
                        }}
                        className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                      />
                      <span className="text-sm text-gray-700">{purity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setPriceRange({ min: 0, max: 200000 });
                  setSelectedPurity([]);
                }}
                className="w-full px-4 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg font-semibold hover:bg-amber-100 transition-all"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h2>
                <p className="text-gray-600 mb-8">
                  Try adjusting your filters or browse other categories
                </p>
                <a
                  href="/products"
                  className="inline-flex items-center gap-2 bg-linear-to-r from-amber-500 to-yellow-600 text-white px-6 py-3 rounded-lg font-bold hover:from-amber-600 hover:to-yellow-700 transition-all"
                >
                  View All Products
                </a>
              </div>
            ) : (
              <div className={`grid ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
              } gap-6`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;