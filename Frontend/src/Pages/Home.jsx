import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Clock, Award, Heart, Star, ChevronLeft, ChevronRight, CheckCircle, Gem, Gift, HeadphonesIcon } from 'lucide-react';
import { products } from '../Data/Product';

// Extract unique categories
const CATEGORIES = [...new Set(products.map(p => p.category))];

// Hero carousel slides data
const HERO_SLIDES = [
  {
    id: 1,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=2000',
    title: 'Timeless Elegance',
    subtitle: 'Discover Our Exquisite Diamond Collection',
    description: 'Each piece tells a story of passion, beauty, and timeless style.',
    cta: 'Explore Diamonds'
  },
  {
    id: 2,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=2000',
    title: 'Golden Moments',
    subtitle: 'Handcrafted Gold Jewelry',
    description: 'Celebrate life\'s precious moments with our stunning gold collections.',
    cta: 'Shop Gold Collection'
  },
  {
    id: 3,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=2000',
    title: 'Bridal Splendor',
    subtitle: 'Your Perfect Wedding Collection',
    description: 'Make your special day unforgettable with our bridal masterpieces.',
    cta: 'View Bridal Sets'
  },
  {
    id: 4,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=2000',
    title: 'Modern Luxury',
    subtitle: 'Contemporary Designer Pieces',
    description: 'Where tradition meets innovation in every design.',
    cta: 'Discover Collection'
  }
];

// Product Card Component
const ProductCard = ({ product, onAddToCart }) => {
  const discountedPrice = product.price - (product.price * product.discount / 100);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100">
      <div className="relative overflow-hidden bg-linear-to-br from-slate-50 via-white to-amber-50 h-72">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Badges */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <div className="bg-linear-to-r from-amber-500 to-yellow-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
            {product.purity}
          </div>
          {product.discount > 0 && (
            <div className="bg-linear-to-r from-rose-500 to-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
              {product.discount}% OFF
            </div>
          )}
        </div>

        {product.stock < 5 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold animate-pulse shadow-lg">
            Only {product.stock} Left
          </div>
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Link
            to={`/products/${product.id}`}
            className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            Quick View
          </Link>
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

        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors leading-tight">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            ₹{discountedPrice.toLocaleString('en-IN')}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-600 mb-5 pb-5 border-b border-gray-100">
          <span className="flex items-center gap-1.5 font-medium">
            <Gem className="w-3.5 h-3.5 text-amber-600" />
            {product.metalType}
          </span>
          <span className="font-medium">{product.weight}g</span>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-linear-to-r from-amber-500 to-yellow-600 text-white py-3.5 rounded-xl font-bold hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl flex items-center justify-center gap-2 group/btn"
        >
          Add to Cart
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const Home = ({ onAddToCart }) => {
  const featuredProducts = products.slice(0, 4);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Newsletter state
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState(''); // 'success', 'error', or ''
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Newsletter subscription handler
  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setSubscriptionStatus('error');
      setTimeout(() => setSubscriptionStatus(''), 3000);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with your actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically make an API call to your backend
      // const response = await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      
      setSubscriptionStatus('success');
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubscriptionStatus(''), 5000);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setSubscriptionStatus('error');
      setTimeout(() => setSubscriptionStatus(''), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-amber-50">
      {/* HERO CAROUSEL SECTION */}
      <section className="relative h-150 md:h-175 lg:h-200 overflow-hidden bg-black">
        {/* Carousel Slides */}
        <div className="relative h-full">
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105'
                }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.url}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="w-full px-6 lg:px-20">
                  <div className="max-w-2xl space-y-6 animate-fadeIn">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 px-4 py-2 rounded-full">
                      <Sparkles className="w-5 h-5 text-amber-300" />
                      <span className="text-amber-100 font-semibold text-sm tracking-wide">
                        NEW COLLECTION
                      </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                      {slide.title}
                      <span className="block text-transparent bg-clip-text bg-linear-to-r from-amber-300 via-yellow-300 to-amber-400 mt-2">
                        {slide.subtitle}
                      </span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-amber-100 max-w-xl leading-relaxed">
                      {slide.description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4">
                      <Link
                        to="/products"
                        className="inline-flex items-center gap-3 bg-linear-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl group"
                      >
                        {slide.cta}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link
                        to="/ai-stylist"
                        className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group"
                      >
                        <Sparkles className="w-5 h-5" />
                        Try AI Stylist
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${index === currentSlide
                  ? 'w-12 h-3 bg-amber-400'
                  : 'w-3 h-3 bg-white/50 hover:bg-white/80'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* STATS SECTION - PROFESSIONAL & REFINED */}
      <section className="py-24 bg-linear-to-b from-white via-amber-50/30 to-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full px-6 lg:px-20 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { number: "10,000+", label: "Satisfied Customers", sublabel: "Worldwide", icon: Heart, gradient: "from-rose-500 to-pink-600" },
              { number: "500+", label: "Exquisite Designs", sublabel: "Handcrafted", icon: Sparkles, gradient: "from-amber-500 to-yellow-600" },
              { number: "99.9%", label: "Certified Purity", sublabel: "Guaranteed", icon: Award, gradient: "from-blue-500 to-cyan-600" },
              { number: "25+", label: "Years of Excellence", sublabel: "Since 1999", icon: Star, gradient: "from-purple-500 to-indigo-600" }
            ].map((stat, i) => (
              <div
                key={i}
                className="relative group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Card */}
                <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden group-hover:-translate-y-2">
                  {/* Gradient Overlay on Hover */}
                  <div className={`absolute inset-0 bg-linear-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-linear-to-br ${stat.gradient} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    {/* Decorative Ring */}
                    <div className={`absolute inset-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 border-transparent group-hover:border-current opacity-0 group-hover:opacity-30 scale-110 group-hover:scale-125 transition-all duration-500 ${stat.gradient.includes('rose') ? 'text-rose-500' : stat.gradient.includes('amber') ? 'text-amber-500' : stat.gradient.includes('blue') ? 'text-blue-500' : 'text-purple-500'}`}></div>
                  </div>

                  {/* Stats Content */}
                  <div className="relative">
                    <div className="text-4xl md:text-5xl font-bold bg-linear-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-500 origin-left">
                      {stat.number}
                    </div>
                    <div className="text-base md:text-lg font-bold text-gray-800 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      {stat.sublabel}
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 bg-linear-to-r ${stat.gradient}`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badge */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-linear-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-full px-6 py-3 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span className="text-sm md:text-base font-semibold text-gray-800">
                Trusted by jewelry connoisseurs across 50+ countries
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES - WITH BLUR BACKGROUND */}
      <section className="py-24 relative overflow-hidden">
        {/* Blur Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://th.bing.com/th/id/OIP.sniF9jfsJ4NEofxLdkuVzgHaEJ?w=322&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
            alt="Background"
            className="w-full h-full object-cover"
          />
          {/* Blur and Overlay */}
          
          {/* Additional gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-white/55 via-amber-40/70 to-white/55"></div>
        </div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #d97706 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="w-full px-6 lg:px-20 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-linear-to-r from-amber-50 to-yellow-50 border border-amber-200 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <Gem className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-bold text-amber-800 tracking-wide">BROWSE BY CATEGORY</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-linear-to-r from-gray-900 via-gray-800 to-amber-900 bg-clip-text text-transparent">
                Discover Your Perfect
              </span>
              <br />
              <span className="bg-linear-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                Masterpiece
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore our curated collections, each piece meticulously crafted to perfection
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6 mb-12">
            {CATEGORIES.slice(0, 8).map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${cat}`}
                className="group relative overflow-hidden rounded-2xl aspect-square bg-linear-to-br from-slate-900 to-gray-900 hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-amber-500/90 via-yellow-600/90 to-orange-600/90 opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/30">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <span className="text-white font-bold text-base md:text-lg mb-2">{cat}</span>
                  <div className="flex items-center gap-2 text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
              </Link>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-linear-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              View All Categories
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS - PROFESSIONAL SHOWCASE */}
      <section className="py-24 bg-linear-to-b from-white via-amber-50/30 to-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5">
          <div className="absolute -top-1/2 -left-1/4 w-1/2 h-full bg-linear-to-br from-amber-400 to-yellow-600 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -right-1/4 w-1/2 h-full bg-linear-to-tl from-orange-400 to-amber-600 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-20 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-linear-to-r from-amber-500 to-yellow-600 text-white px-5 py-2.5 rounded-full mb-6 shadow-lg">
              <Star className="w-5 h-5 fill-white" />
              <span className="text-sm font-bold tracking-wide">CURATED COLLECTION</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Featured
              </span>
              <br />
              <span className="bg-linear-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                Masterpieces
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Handpicked treasures from our master jewellers, each piece a testament to timeless elegance and exceptional craftsmanship
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${index * 100}ms` }}
                className="animate-fadeIn"
              >
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                />
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-linear-to-r from-gray-900 to-gray-800 text-white px-10 py-5 rounded-full text-lg font-bold hover:from-gray-800 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl group relative overflow-hidden"
            >
              <span className="relative z-10">Explore Complete Collection</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION - LUXURY & PROFESSIONAL */}
      <section className="py-24 bg-linear-to-br from-slate-900 via-gray-900 to-slate-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-20 relative">
          {/* Section Title */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-linear-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                The Excellence You Deserve
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Uncompromising quality and service, every step of the way
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-12 h-12" />,
                title: "Certified Excellence",
                desc: "Every piece is BIS hallmarked and comes with authenticity certification",
                gradient: "from-amber-500 to-yellow-600"
              },
              {
                icon: <Truck className="w-12 h-12" />,
                title: "Secure Delivery",
                desc: "Complimentary insured shipping with real-time tracking worldwide",
                gradient: "from-blue-500 to-cyan-600"
              },
              {
                icon: <ShieldCheck className="w-12 h-12" />,
                title: "Protected Transactions",
                desc: "Bank-grade encryption and secure payment gateway for peace of mind",
                gradient: "from-green-500 to-emerald-600"
              },
              {
                icon: <Gift className="w-12 h-12" />,
                title: "Lifetime Warranty",
                desc: "Comprehensive coverage on craftsmanship and complimentary maintenance",
                gradient: "from-purple-500 to-indigo-600"
              }
            ].map((item, i) => (
              <div
                key={i}
                className="group relative"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Card */}
                <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-linear-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br ${item.gradient} shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      {item.icon}
                    </div>
                    {/* Decorative Ring */}
                    <div className={`absolute inset-0 w-20 h-20 rounded-2xl border-2 bg-linear-to-br ${item.gradient} opacity-0 group-hover:opacity-30 scale-110 group-hover:scale-125 blur-sm transition-all duration-500`}></div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Check Mark */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <CheckCircle className={`w-6 h-6 text-amber-400`} />
                  </div>

                  {/* Bottom Accent */}
                  <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 bg-linear-to-r ${item.gradient}`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Services */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <HeadphonesIcon className="w-6 h-6" />, text: "24/7 Customer Support" },
              { icon: <CheckCircle className="w-6 h-6" />, text: "30-Day Easy Returns" },
              { icon: <Gem className="w-6 h-6" />, text: "Complimentary Gift Wrapping" }
            ].map((service, i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-4 hover:bg-white/10 hover:border-amber-400/30 transition-all duration-300 group"
              >
                <div className="text-amber-400 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <span className="text-sm md:text-base font-semibold">{service.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="py-24 bg-linear-to-b from-white to-amber-50">
        <div className="w-full px-6 lg:px-20 text-center">
          <div className="bg-linear-to-br from-amber-500 to-yellow-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Join Our Exclusive Circle
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Subscribe to receive VIP access to new collections, special offers, and insider jewelry styling tips
          </p>
          
          <form onSubmit={handleSubscribe} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full border-2 border-gray-200 focus:border-amber-500 focus:outline-none text-gray-900 shadow-sm hover:shadow-md transition-shadow"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-linear-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-full font-bold hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
              </button>
            </div>
            
            {/* Success/Error Messages */}
            {subscriptionStatus === 'success' && (
              <div className="flex items-center justify-center gap-2 text-green-600 font-semibold animate-fadeIn">
                <CheckCircle className="w-5 h-5" />
                <span>Successfully subscribed! Check your email for confirmation.</span>
              </div>
            )}
            {subscriptionStatus === 'error' && (
              <div className="flex items-center justify-center gap-2 text-red-600 font-semibold animate-fadeIn">
                <span>Please enter a valid email address.</span>
              </div>
            )}
          </form>
          
          <p className="text-sm text-gray-500 mt-6">
            No spam, unsubscribe anytime. Your privacy is important to us.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;

