import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Package, Globe, Shield, Clock, CheckCircle } from 'lucide-react';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-amber-50/30 to-slate-50">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-slate-900 via-slate-800 to-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="flex items-center gap-3 mb-6">
            <Truck className="w-10 h-10 text-amber-400" />
            <h1 className="text-5xl font-bold">Shipping Policy</h1>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            We deliver luxury with care to your doorstep, worldwide.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Shipping Options */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <Package className="text-amber-500" />
            Shipping Options
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-linear-to-br from-amber-500 to-yellow-600 p-3 rounded-xl">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Standard Shipping</h3>
              </div>
              <p className="text-gray-600 mb-4">5-7 business days</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <span>Free on orders over $500</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <span>$15 flat rate under $500</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <span>Signature required</span>
                </li>
              </ul>
            </div>

            <div className="bg-linear-to-br from-slate-900 to-gray-900 rounded-2xl p-8 shadow-lg text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-linear-to-br from-amber-500 to-yellow-600 p-3 rounded-xl">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Express Shipping</h3>
              </div>
              <p className="text-gray-300 mb-4">2-3 business days</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>$35 flat rate</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>Priority handling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>Real-time tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* International Shipping */}
        <section className="mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Globe className="text-amber-500" />
            International Shipping
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              We proudly ship to over 150 countries worldwide. International orders are shipped via DHL Express or FedEx International Priority.
            </p>
            <ul className="space-y-2 mb-4">
              <li>Delivery time: 7-14 business days depending on destination</li>
              <li>Customs duties and taxes may apply and are the responsibility of the recipient</li>
              <li>All international shipments include full insurance and tracking</li>
              <li>Free international shipping on orders over $2,000</li>
            </ul>
          </div>
        </section>

        {/* Processing & Security */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <Shield className="text-amber-500" />
            Security & Processing
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-amber-50 rounded-xl p-6">
              <Clock className="w-8 h-8 text-amber-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Processing Time</h3>
              <p className="text-sm text-gray-700">
                Orders are processed within 1-2 business days. Custom orders may take 2-4 weeks.
              </p>
            </div>
            
            <div className="bg-amber-50 rounded-xl p-6">
              <Shield className="w-8 h-8 text-amber-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Fully Insured</h3>
              <p className="text-sm text-gray-700">
                Every shipment is fully insured against loss, theft, or damage during transit.
              </p>
            </div>
            
            <div className="bg-amber-50 rounded-xl p-6">
              <Package className="w-8 h-8 text-amber-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Discreet Packaging</h3>
              <p className="text-sm text-gray-700">
                All orders ship in unmarked, secure packaging with no external branding.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-linear-to-br from-slate-900 to-gray-900 rounded-2xl p-8 shadow-lg text-white">
          <h2 className="text-3xl font-bold mb-6">Shipping FAQs</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-amber-400 mb-2">Do you ship to P.O. boxes?</h3>
              <p className="text-gray-300 text-sm">
                Due to the high value of our products, we require a signature upon delivery and cannot ship to P.O. boxes.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-amber-400 mb-2">Can I track my order?</h3>
              <p className="text-gray-300 text-sm">
                Yes! You'll receive a tracking number via email within 24 hours of your order shipping.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-amber-400 mb-2">What if I'm not home for delivery?</h3>
              <p className="text-gray-300 text-sm">
                Our carriers will make three delivery attempts. If unsuccessful, the package will be held at a local facility for pickup.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Have questions about shipping?</p>
          <Link 
            to="/contact" 
            className="inline-block bg-linear-to-r from-amber-500 to-yellow-600 text-white px-8 py-3 rounded-lg font-bold hover:from-amber-600 hover:to-yellow-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Contact Our Team
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;