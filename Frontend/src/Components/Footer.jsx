
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gem, CheckCircle, AlertCircle } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setSubscriptionStatus('error');
      setTimeout(() => setSubscriptionStatus(''), 3000);
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscriptionStatus('success');
      setEmail('');
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
    <footer className="bg-linear-to-br from-slate-900 via-slate-900 to-gray-900 text-stone-400 py-16 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-linear-to-br from-amber-500 to-yellow-600 p-2 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <Gem className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                Jewel<span className="text-amber-500">Mart</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Creating timeless elegance since 1994. Our commitment to quality and ethical sourcing makes every piece a treasure to keep.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-3">
              {['facebook', 'instagram', 'twitter', 'pinterest'].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-linear-to-br hover:from-amber-500 hover:to-yellow-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group"
                  aria-label={social}
                >
                  <span className="text-gray-400 group-hover:text-white text-xs font-bold uppercase">
                    {social[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Shop Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/ourproducts" className="hover:text-amber-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/category/rings" className="hover:text-amber-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Wedding Bands
                </Link>
              </li>
              <li>
                <Link to="/category/necklaces" className="hover:text-amber-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Luxury Necklaces
                </Link>
              </li>
              <li>
                <Link to="/ai-stylist" className="hover:text-amber-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  AI Style Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/shipping-policy" className="hover:text-amber-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns-exchanges" className="hover:text-amber-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/diamond-education" className="hover:text-amber-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Diamond Education
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Stay Connected</h4>
            <p className="text-sm mb-4 text-gray-400 leading-relaxed">
              Join our newsletter for exclusive collections and event invitations.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex gap-2">
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email" 
                  className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm grow outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                  disabled={isSubmitting}
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-linear-to-r from-amber-500 to-yellow-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  ) : 'Join'}
                </button>
              </div>
              
              {/* Success/Error Messages */}
              {subscriptionStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-400 text-xs animate-fadeIn bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Successfully joined!</span>
                </div>
              )}
              {subscriptionStatus === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-xs animate-fadeIn bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Invalid email address</span>
                </div>
              )}
            </form>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-400">
                🔒 Secure
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-400">
                📧 No Spam
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} JewelMart Luxury Jewellery. All rights reserved.
            </p>
            
            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">We Accept:</span>
              <div className="flex gap-2">
                {['VISA', 'MC', 'AMEX', 'PP'].map((payment) => (
                  <div
                    key={payment}
                    className="bg-slate-800 rounded px-2 py-1 text-xs font-bold text-gray-400 border border-slate-700"
                  >
                    {payment}
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex gap-4 text-xs">
              <Link to="/privacy-policy" className="text-gray-500 hover:text-amber-500 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-500 hover:text-amber-500 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
    </footer>
  );
};

export default Footer;