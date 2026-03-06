import { ArrowRight, Filter, SlidersHorizontal, Grid, List, Star, ShoppingCart, Sparkles, Loader2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../Components/Product/ProductCard';
import { findProducts } from '../States/Products/Action';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const { products: allProducts, loading } = useSelector(state => state.product);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });
  const [selectedPurity, setSelectedPurity] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get category display name
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  // Get unique purities from products
  // Get unique purities from products
  const purities = [...new Set(allProducts?.map(p => p.purity))].filter(Boolean);

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) {
      dispatch(findProducts({}));
      return;
    }

    // Filter products by category (case-insensitive)
    let filtered = allProducts.filter(
      p => p.category?.toLowerCase() === category?.toLowerCase()
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
                className={`p-2 rounded transition-all ${viewMode === 'grid'
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-600 hover:bg-stone-50'
                  }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-all ${viewMode === 'list'
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
          <aside className={`${showFilters ? 'block' : 'hidden'
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
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h2>
                <p className="text-gray-600 mb-8">
                  Try adjusting your filters or browse other categories
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-linear-to-r from-amber-500 to-yellow-600 text-white px-6 py-3 rounded-lg font-bold hover:from-amber-600 hover:to-yellow-700 transition-all"
                >
                  View All Products
                </Link>
              </div>
            ) : (
              <div className={`grid ${viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-1'
                } gap-6`}>
                {filteredProducts.map((product) => (
                  <div key={product._id} className={viewMode === 'list' ? 'w-full' : ''}>
                    {viewMode === 'grid' ? (
                      <ProductCard product={product} />
                    ) : (
                      <div className="group bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-row">
                        {/* Reuse the list view logic from OurProducts or simplify */}
                        <div className="w-64 shrink-0 relative overflow-hidden">
                          <img
                            src={product.images?.[0]}
                            alt={product.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onClick={() => navigate(`/product/${product._id}`)}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 onClick={() => navigate(`/product/${product._id}`)} className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors cursor-pointer">
                            {product.title}
                          </h3>
                          <p className="text-sm text-slate-600 mb-4 line-clamp-2 truncate">{product.description}</p>
                          <div className="flex items-baseline gap-3 mb-4">
                            <span className="text-3xl font-bold text-slate-900">₹{product.discountedPrice?.toLocaleString() || product.price?.toLocaleString()}</span>
                          </div>
                          <button className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-600 transition-all w-fit">Add to Cart</button>
                        </div>
                      </div>
                    )}
                  </div>
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