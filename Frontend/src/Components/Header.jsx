import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User, ChevronDown, Gem, Sparkles, LogIn, LogOut, Package } from 'lucide-react';
import { products } from '../Data/Product';
import { logoutUser } from '../states/Auth/Action';
import { useDispatch } from 'react-redux';

const CATEGORIES = [...new Set(products.map(p => p.category))];

const Header = ({ cartCount = 0 }) => {
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const userData = localStorage.getItem('user');
      const authToken = localStorage.getItem('authToken');

      if (userData && authToken) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkLoginStatus();
  }, []);

  // Listen for scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Search logic - searches as user types
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      // eslint-disable-next-line react-hooks/immutability
      performSearch(searchTerm);
      setShowSearchDropdown(true);
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  }, [searchTerm]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Comprehensive search function
   */
  const performSearch = (query) => {
    const searchQuery = query.toLowerCase().trim();

    // Filter products based on search criteria
    const filtered = products.filter(product => {
      // Search in product name
      const nameMatch = product.name?.toLowerCase().includes(searchQuery);

      // Search in category
      const categoryMatch = product.category?.toLowerCase().includes(searchQuery);

      // Search in metal type
      const metalMatch = product.metalType?.toLowerCase().includes(searchQuery);

      // Search in description
      const descriptionMatch = product.description?.toLowerCase().includes(searchQuery);

      // Price range search (e.g., "under 5000", "above 10000")
      let priceMatch = false;
      if (searchQuery.includes('under') || searchQuery.includes('below')) {
        const priceValue = parseInt(searchQuery.match(/\d+/)?.[0]);
        if (priceValue) {
          priceMatch = product.price <= priceValue;
        }
      } else if (searchQuery.includes('above') || searchQuery.includes('over')) {
        const priceValue = parseInt(searchQuery.match(/\d+/)?.[0]);
        if (priceValue) {
          priceMatch = product.price >= priceValue;
        }
      }

      // Return true if any field matches
      return nameMatch || categoryMatch || metalMatch || descriptionMatch || priceMatch;
    });

    // Sort results by relevance
    const sorted = filtered.sort((a, b) => {
      // Prioritize exact name matches
      const aNameExact = a.name?.toLowerCase() === searchQuery;
      const bNameExact = b.name?.toLowerCase() === searchQuery;
      if (aNameExact && !bNameExact) return -1;
      if (!aNameExact && bNameExact) return 1;

      // Then prioritize name starts with
      const aNameStarts = a.name?.toLowerCase().startsWith(searchQuery);
      const bNameStarts = b.name?.toLowerCase().startsWith(searchQuery);
      if (aNameStarts && !bNameStarts) return -1;
      if (!aNameStarts && bNameStarts) return 1;

      // Then sort by rating
      return (b.rating || 0) - (a.rating || 0);
    });

    // Limit results to top 8 for dropdown
    setSearchResults(sorted.slice(0, 8));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setShowSearchDropdown(false);
      setMobileOpen(false);
    }
  };

  const handleSearchResultClick = (productId) => {
    navigate(`/products/${productId}`);
    setSearchTerm('');
    setShowSearchDropdown(false);
    setMobileOpen(false);
  };

 

  const handleLoginClick = () => {
    setMobileOpen(false);
    navigate('/auth');
  };

  // Highlight matching text in search results
  const highlightMatch = (text, query) => {
    if (!text || !query) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ?
        <span key={index} className="bg-amber-200 font-semibold">{part}</span> :
        part
    );
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled
          ? 'bg-white/98 backdrop-blur-xl shadow-xl border-b border-stone-200'
          : 'bg-transparent'
        }`}
    >
      <div className="w-full flex items-center justify-between px-8 lg:px-20 py-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className={`p-1.5 rounded-lg transition-all duration-500 ${isScrolled
              ? 'bg-amber-600 group-hover:bg-amber-700'
              : 'bg-white/95 group-hover:bg-white shadow-lg'
            }`}>
            <Gem className={`w-6 h-6 transition-colors duration-500 ${isScrolled ? 'text-white' : 'text-amber-600'
              }`} />
          </div>
          <span className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-500 ${isScrolled ? 'text-slate-800' : 'text-white drop-shadow-lg'
            }`}>
            Jewel<span className="text-amber-600">Mart</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-12">
          {/* SEARCH BAR WITH DROPDOWN */}
          <div className="relative search-container">
            <form onSubmit={handleSearch} className="relative group">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${isScrolled ? 'text-slate-400' : 'text-slate-500'
                } group-focus-within:text-amber-500`} />
              <input
                type="text"
                placeholder="Search elegance..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm && setShowSearchDropdown(true)}
                className={`pl-9 pr-4 py-2.5 rounded-full w-48 xl:w-64 focus:ring-2 focus:ring-amber-500/30 outline-none transition-all duration-500 ${isScrolled
                    ? 'bg-stone-50 border border-stone-200 focus:bg-white focus:border-amber-300 text-slate-800'
                    : 'bg-white/95 backdrop-blur-sm shadow-md border border-white/50 focus:bg-white text-slate-800'
                  }`}
              />
            </form>

            {/* SEARCH DROPDOWN */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-100 py-2 max-h-96 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-stone-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Search Results ({searchResults.length})
                  </p>
                </div>
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSearchResultClick(product.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-linear-to-r hover:from-rose-50 hover:to-pink-50 transition-all group"
                  >
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg border border-stone-200"
                      />
                    )}
                    <div className="flex-1 text-left">
                      <p className="font-medium text-slate-800 group-hover:text-amber-600">
                        {highlightMatch(product.name, searchTerm)}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500 capitalize">{product.category}</span>
                        <span className="text-xs text-amber-600 font-semibold">₹{product.price?.toLocaleString()}</span>
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 -rotate-90 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
                <div className="px-4 py-2 border-t border-stone-100 mt-1">
                  <button
                    onClick={handleSearch}
                    className="text-sm text-amber-600 hover:text-amber-700 font-semibold"
                  >
                    View all results →
                  </button>
                </div>
              </div>
            )}

            {/* NO RESULTS MESSAGE */}
            {showSearchDropdown && searchTerm && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-100 py-6 px-4 text-center animate-in fade-in slide-in-from-top-2 duration-200">
                <p className="text-slate-500">No products found for "{searchTerm}"</p>
                <p className="text-xs text-slate-400 mt-1">Try searching with different keywords</p>
              </div>
            )}
          </div>

          {/* MENU DROPDOWN */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setMenuOpen(true)}
          >
            <button className={`flex items-center gap-1.5 font-semibold px-4 py-2.5 rounded-lg transition-all duration-300 ${isScrolled
                ? 'text-slate-700 hover:text-amber-600 hover:bg-amber-50'
                : 'text-white hover:bg-white/20 backdrop-blur-sm'
              }`}>
              Collections
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`} />
            </button>

            {menuOpen && (
              <div
                className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-2xl border border-stone-100 animate-in fade-in slide-in-from-top-2 duration-200"
                onMouseEnter={() => setMenuOpen(true)}
                onMouseLeave={() => setMenuOpen(false)}
              >
                <div className="px-4 m-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Explore Collections</p>
                </div>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    to={`/category/${cat.toLowerCase()}`}
                    className="group flex items-center justify-between px-4 py-3 text-slate-700 hover:bg-linear-to-r hover:from-rose-50 hover:to-pink-50 hover:text-amber-600 transition-all duration-200"
                  >
                    <span className="font-medium">{cat}</span>
                    <ChevronDown className="w-4 h-4 -rotate-90 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                ))}
                <div className="h-px bg-linear-to-r from-transparent via-stone-200 to-transparent my-2 mx-4"></div>
                <Link
                  to="/products"
                  className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-amber-600 hover:bg-amber-50 transition-colors group"
                >
                  <span>View All Products</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Link>
              </div>
            )}
          </div>

          {/* <Link 
            to="/products" 
            className={`font-semibold px-4 py-2.5 rounded-lg transition-all duration-300 ${
              isScrolled 
                ? 'text-slate-700 hover:text-amber-600 hover:bg-amber-50' 
                : 'text-white hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            Products
          </Link> */}

          <Link
            to="/about"
            className={`font-semibold px-4 py-2.5 rounded-lg transition-all duration-300 ${isScrolled
                ? 'text-slate-700 hover:text-amber-600 hover:bg-amber-50'
                : 'text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
          >
            About
          </Link>

          <Link
            to="/contact"
            className={`font-semibold px-4 py-2.5 rounded-lg transition-all duration-300 ${isScrolled
                ? 'text-slate-700 hover:text-amber-600 hover:bg-amber-50'
                : 'text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
          >
            Contact
          </Link>

          <Link
            to="/ai-stylist"
            className={`flex items-center gap-2 font-semibold px-4 py-2.5 rounded-full border-2 transition-all duration-300 hover:scale-105 ${isScrolled
                ? 'text-amber-600 bg-amber-50 border-amber-200 hover:bg-amber-100 hover:border-amber-300'
                : 'text-white bg-amber-600 border-amber-500 hover:bg-amber-700 shadow-lg shadow-amber-500/30'
              }`}
          >
            <Sparkles className="w-4 h-4" />
            AI Stylist
          </Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* CART */}
          <Link
            to="/cart"
            className={`relative transition-all duration-300 hover:scale-110 ${isScrolled ? 'text-slate-700 hover:text-amber-600' : 'text-white hover:text-amber-100'
              }`}
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2.5 -right-2.5 bg-amber-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-lg">
                {cartCount}
              </span>
            )}
          </Link>

          {/* PROFILE OR LOGIN */}
          {isLoggedIn ? (
            <div
              className="relative hidden sm:block"
              onMouseEnter={() => setProfileOpen(true)}
            >
              <button
                className={`flex items-center gap-1.5 transition-all duration-300 ${isScrolled ? 'text-slate-700 hover:text-amber-600' : 'text-white'
                  }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 hover:scale-110 ${isScrolled
                    ? 'border-2 border-stone-200 bg-stone-50 hover:border-amber-300'
                    : 'border-2 border-white/50 bg-white/20 backdrop-blur-sm shadow-lg hover:border-white'
                  }`}>
                  <User className="w-5 h-5" />
                </div>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileOpen && (
                <div
                  className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-2xl border border-stone-100 py-3 animate-in fade-in slide-in-from-top-2 duration-200"
                  onMouseEnter={() => setProfileOpen(true)}
                  onMouseLeave={() => setProfileOpen(false)}
                >
                  <div className="px-4 py-3 bg-linear-to-r from-amber-50 to-pink-50 border-b border-amber-100">
                    <p className="font-semibold text-slate-800">{user?.name || 'Guest User'}</p>
                    <p className="text-xs text-slate-500">{user?.email || 'user@example.com'}</p>
                  </div>
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-all group"
                      onClick={() => setProfileOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span className="font-medium">My Profile</span>
                      <ChevronDown className="w-3 h-3 -rotate-90 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-all group"
                      onClick={() => setProfileOpen(false)}
                    >
                      <Package className="w-4 h-4" />
                      <span className="font-medium">My Orders</span>
                      <ChevronDown className="w-3 h-3 -rotate-90 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </div>
                  <div className="h-px bg-linear-to-r from-transparent via-stone-200 to-transparent mx-4"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 font-semibold transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className={`hidden sm:flex items-center gap-2 font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 hover:scale-105 ${isScrolled
                  ? 'text-slate-700 hover:bg-amber-50 hover:text-amber-600 border border-stone-200 hover:border-amber-300'
                  : 'text-white bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30'
                }`}
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            className={`lg:hidden p-1.5 rounded-lg transition-all duration-300 ${isScrolled
                ? 'text-slate-700 hover:bg-stone-100'
                : 'text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className={`lg:hidden border-t transition-all duration-300 ${isScrolled ? 'bg-white border-stone-200' : 'bg-white/95 backdrop-blur-lg border-white/50'
          }`}>
          <div className="p-4 space-y-4">
            {/* MOBILE SEARCH */}
            <div className="relative search-container">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search jewellery..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => searchTerm && setShowSearchDropdown(true)}
                  className="w-full pl-9 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-300 transition-all"
                />
              </form>

              {/* MOBILE SEARCH DROPDOWN */}
              {showSearchDropdown && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-stone-100 py-2 max-h-64 overflow-y-auto z-50">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSearchResultClick(product.id)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-amber-50 transition-all"
                    >
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1 text-left">
                        <p className="font-medium text-sm text-slate-800">
                          {highlightMatch(product.name, searchTerm)}
                        </p>
                        <p className="text-xs text-amber-600 font-semibold">₹{product.price?.toLocaleString()}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <nav className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl hover:bg-rose-50 font-semibold text-slate-700 hover:text-amber-600 transition-all"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl hover:bg-amber-50 font-semibold text-slate-700 hover:text-amber-600 transition-all"
              >
                Products
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl hover:bg-amber-50 font-semibold text-slate-700 hover:text-amber-600 transition-all"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl hover:bg-amber-50 font-semibold text-slate-700 hover:text-amber-600 transition-all"
              >
                Contact
              </Link>
              <Link
                to="/ai-stylist"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl bg-linear-to-r from-amber-50 to-pink-50 text-amber-600 font-bold flex items-center gap-2 border border-amber-200 hover:border-amber-300 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                AI Stylist
              </Link>

              <div className="pt-3">
                <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Collections</p>
                <div className="space-y-1">
                  {CATEGORIES.map(cat => (
                    <Link
                      key={cat}
                      to={`/category/${cat.toLowerCase()}`}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2.5 text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg font-medium transition-all"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>

              {/* MOBILE LOGIN/PROFILE SECTION */}
              <div className="pt-3 mt-3 border-t border-stone-200">
                {isLoggedIn ? (
                  <>
                    <div className="px-4 py-3 mb-2 bg-linear-to-r from-amber-50 to-pink-50 rounded-xl">
                      <p className="font-semibold text-slate-800">{user?.name || 'Guest User'}</p>
                      <p className="text-xs text-slate-500">{user?.email || 'user@example.com'}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-amber-50 text-slate-700 hover:text-amber-600 transition-all"
                    >
                      <User className="w-4 h-4" />
                      <span className="font-medium">My Profile</span>
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-amber-50 text-slate-700 hover:text-amber-600 transition-all"
                    >
                      <Package className="w-4 h-4" />
                      <span className="font-medium">My Orders</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 mt-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-semibold transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleLoginClick}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-linear-to-r from-amber-600 to-pink-600 text-white font-semibold hover:from-amber-700 hover:to-pink-700 transition-all shadow-lg"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;