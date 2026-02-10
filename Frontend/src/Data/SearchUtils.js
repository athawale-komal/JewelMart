/**
 * Enhanced Search Utilities for JewelMart Menu Component
 */

/**
 * Search products with multi-field matching
 * @param {Array} products - Array of product objects
 * @param {string} query - Search query
 * @returns {Array} Filtered products
 */
export const searchProducts = (products, query) => {
  if (!query || query.trim() === '') {
    return products;
  }

  const searchLower = query.toLowerCase().trim();

  return products.filter(item => {
    // Search in product name
    const nameMatch = item.name?.toLowerCase().includes(searchLower);
    
    // Search in category
    const categoryMatch = item.category?.toLowerCase().includes(searchLower);
    
    // Search in description
    const descriptionMatch = item.description?.toLowerCase().includes(searchLower);
    
    // Search in price (e.g., "5000", "under 10000")
    let priceMatch = false;
    if (searchLower.match(/\d+/)) {
      const searchPrice = parseInt(searchLower.match(/\d+/)[0]);
      
      if (searchLower.includes('under') || searchLower.includes('below')) {
        priceMatch = item.price <= searchPrice;
      } else if (searchLower.includes('above') || searchLower.includes('over')) {
        priceMatch = item.price >= searchPrice;
      } else {
        priceMatch = item.price.toString().includes(searchPrice.toString());
      }
    }

    return nameMatch || categoryMatch || descriptionMatch || priceMatch;
  });
};

/**
 * Get search suggestions based on products and query
 * @param {Array} products - Array of products
 * @param {string} query - Current search query
 * @param {number} limit - Max suggestions to return
 * @returns {Object} Suggestions object
 */
export const getSearchSuggestions = (products, query, limit = 5) => {
  const searchLower = query.toLowerCase().trim();
  
  if (!searchLower) {
    return {
      products: [],
      categories: [],
      suggestions: []
    };
  }

  // Find matching products
  const matchingProducts = products
    .filter(item => 
      item.name.toLowerCase().includes(searchLower) ||
      item.description?.toLowerCase().includes(searchLower)
    )
    .slice(0, limit);

  // Get unique categories that match
  const allCategories = [...new Set(products.map(p => p.category))];
  const matchingCategories = allCategories
    .filter(cat => cat.toLowerCase().includes(searchLower))
    .slice(0, 3);

  // Generate smart suggestions
  const suggestions = generateSmartSuggestions(products, searchLower);

  return {
    products: matchingProducts,
    categories: matchingCategories,
    suggestions: suggestions.slice(0, limit)
  };
};

/**
 * Generate smart search suggestions
 * @param {Array} products - All products
 * @param {string} query - Search query
 * @returns {Array} Smart suggestions
 */
const generateSmartSuggestions = (products, query) => {
  const suggestions = new Set();

  products.forEach(product => {
    // Add product names that start with query
    if (product.name.toLowerCase().startsWith(query)) {
      suggestions.add(product.name);
    }

    // Add category + material combinations
    if (product.category?.toLowerCase().includes(query)) {
      suggestions.add(`${product.category}`);
    }

    // Add popular combinations
    const words = product.name.toLowerCase().split(' ');
    words.forEach(word => {
      if (word.startsWith(query) && word.length > query.length) {
        suggestions.add(product.name);
      }
    });
  });

  return Array.from(suggestions);
};

/**
 * Get popular searches (customizable)
 * @returns {Array} Popular search terms
 */
export const getPopularSearches = () => {
  return [
    "Gold Necklace",
    "Diamond Ring", 
    "Silver Earrings",
    "Bridal Set",
    "Engagement Ring",
    "Wedding Jewelry"
  ];
};

/**
 * Save search to localStorage
 * @param {string} query - Search term to save
 */
export const saveRecentSearch = (query) => {
  if (!query || query.trim().length < 2) return;

  try {
    const searches = getRecentSearches();
    const updated = [
      query.trim(),
      ...searches.filter(s => s !== query.trim())
    ].slice(0, 10);

    localStorage.setItem('recentSearches', JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving search:', error);
  }
};

/**
 * Get recent searches from localStorage
 * @returns {Array} Recent searches
 */
export const getRecentSearches = () => {
  try {
    const searches = localStorage.getItem('recentSearches');
    return searches ? JSON.parse(searches) : [];
  } catch (error) {
    console.error('Error loading searches:', error);
    return [];
  }
};

/**
 * Clear all recent searches
 */
export const clearRecentSearches = () => {
  try {
    localStorage.removeItem('recentSearches');
  } catch (error) {
    console.error('Error clearing searches:', error);
  }
};

/**
 * Sort products by various criteria
 * @param {Array} products - Products to sort
 * @param {string} sortBy - Sort method
 * @returns {Array} Sorted products
 */
export const sortProducts = (products, sortBy) => {
  const sorted = [...products];

  switch (sortBy) {
    case 'low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'category':
      return sorted.sort((a, b) => a.category.localeCompare(b.category));
    default:
      return sorted;
  }
};

/**
 * Filter products by category
 * @param {Array} products - All products
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered products
 */
export const filterByCategory = (products, category) => {
  if (!category || category === 'All') {
    return products;
  }
  return products.filter(p => p.category === category);
};

/**
 * Get unique categories from products
 * @param {Array} products - All products
 * @returns {Array} Unique categories with "All" prepended
 */
export const getCategories = (products) => {
  return ['All', ...new Set(products.map(item => item.category))];
};

/**
 * Highlight matching text in search results
 * @param {string} text - Original text
 * @param {string} query - Search query
 * @returns {Array} Array of text parts for React rendering
 */
export const highlightMatch = (text, query) => {
  if (!text || !query) return [text];
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, index) => ({
    text: part,
    highlight: part.toLowerCase() === query.toLowerCase(),
    key: index
  }));
};

/**
 * Get product statistics
 * @param {Array} products - All products
 * @returns {Object} Statistics object
 */
export const getProductStats = (products) => {
  const categories = {};
  let totalValue = 0;
  let minPrice = Infinity;
  let maxPrice = -Infinity;

  products.forEach(product => {
    // Category count
    categories[product.category] = (categories[product.category] || 0) + 1;
    
    // Price stats
    totalValue += product.price;
    minPrice = Math.min(minPrice, product.price);
    maxPrice = Math.max(maxPrice, product.price);
  });

  return {
    total: products.length,
    categories,
    averagePrice: Math.round(totalValue / products.length),
    minPrice,
    maxPrice,
    priceRange: `₹${minPrice.toLocaleString()} - ₹${maxPrice.toLocaleString()}`
  };
};

/**
 * Get price range suggestions
 * @param {Array} products - All products
 * @returns {Array} Price range options
 */
export const getPriceRanges = (products) => {
  const prices = products.map(p => p.price).sort((a, b) => a - b);
  const min = prices[0];
  const max = prices[prices.length - 1];
  const step = (max - min) / 4;

  return [
    { label: 'All Prices', min: 0, max: Infinity },
    { label: `Under ₹${Math.round(min + step).toLocaleString()}`, min: 0, max: min + step },
    { label: `₹${Math.round(min + step).toLocaleString()} - ₹${Math.round(min + step * 2).toLocaleString()}`, min: min + step, max: min + step * 2 },
    { label: `₹${Math.round(min + step * 2).toLocaleString()} - ₹${Math.round(min + step * 3).toLocaleString()}`, min: min + step * 2, max: min + step * 3 },
    { label: `Above ₹${Math.round(min + step * 3).toLocaleString()}`, min: min + step * 3, max: Infinity }
  ];
};

export default {
  searchProducts,
  getSearchSuggestions,
  getPopularSearches,
  saveRecentSearch,
  getRecentSearches,
  clearRecentSearches,
  sortProducts,
  filterByCategory,
  getCategories,
  highlightMatch,
  getProductStats,
  getPriceRanges
};