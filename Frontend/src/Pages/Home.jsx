import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowRight, Sparkles, ShieldCheck, Truck, Clock, Award, Heart, Star,
  ChevronLeft, ChevronRight, CheckCircle, Gem, Gift, HeadphonesIcon
} from 'lucide-react';

import HeroSection from '../Components/Home/HeroSection';
import ProductCard from '../Components/Product/ProductCard';
import { findProducts } from '../States/Products/Action';

// Extract unique categories (We can also fetch these from backend later)



const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  const featuredProducts = products?.slice(0, 4) || [];

  useEffect(() => {
    dispatch(findProducts());
  }, [dispatch]);


  // Newsletter state
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState(''); // 'success', 'error', or ''
  const [isSubmitting, setIsSubmitting] = useState(false);



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
      <HeroSection />

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


      {/* FEATURED PRODUCTS - PROFESSIONAL SHOWCASE */}
      <section className="py-24 bg-linear-to-br from-amber-50/40 via-amber-50/20 to-amber-50/40 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5">
          <img
            src='https://img.freepik.com/premium-photo/store-window-displays-several-necklaces-including-one-that-says-gold_1088224-197557.jpg'
            alt={loading}
            className="w-full h-full object-cover"
          />
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
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white/5 border border-white/10 h-112.5 rounded-2xl"></div>
              ))
            ) : (
              featuredProducts.map((product, index) => (
                <div
                  key={product._id}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="animate-fadeIn"
                >
                  <ProductCard product={product} />
                </div>
              ))
            )}
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

