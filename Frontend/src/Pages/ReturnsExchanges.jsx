import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, ShieldCheck, Calendar, Gift, ArrowRight, CheckCircle2 } from 'lucide-react';

const ReturnsExchanges = () => {
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
            <RefreshCw className="w-10 h-10 text-amber-400" />
            <h1 className="text-5xl font-bold">Returns & Exchanges</h1>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Your satisfaction is our priority. Shop with complete confidence.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Key Policies */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-amber-100 hover:border-amber-300 transition-colors">
            <Calendar className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="font-bold text-slate-900 mb-2">30-Day Returns</h3>
            <p className="text-sm text-gray-600">
              Return any item within 30 days of delivery for a full refund
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-amber-100 hover:border-amber-300 transition-colors">
            <RefreshCw className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="font-bold text-slate-900 mb-2">Free Exchanges</h3>
            <p className="text-sm text-gray-600">
              Exchange for a different size or style at no extra cost
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-amber-100 hover:border-amber-300 transition-colors">
            <ShieldCheck className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="font-bold text-slate-900 mb-2">Lifetime Warranty</h3>
            <p className="text-sm text-gray-600">
              Manufacturing defects covered for the life of the product
            </p>
          </div>
        </div>

        {/* Return Process */}
        <section className="mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">How to Return an Item</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-linear-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Initiate Your Return</h3>
                <p className="text-gray-700">
                  Contact our customer service team or log into your account to start the return process. You'll receive a return authorization number and prepaid shipping label.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-linear-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Package Your Item</h3>
                <p className="text-gray-700">
                  Carefully package the item in its original packaging with all accessories, certificates, and documentation. Items must be unworn and in pristine condition.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-linear-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Ship It Back</h3>
                <p className="text-gray-700">
                  Attach the prepaid label and drop off at any authorized shipping location. We recommend insuring valuable items for peace of mind.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-linear-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white font-bold">
                4
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Receive Your Refund</h3>
                <p className="text-gray-700">
                  Once we receive and inspect your return, we'll process your refund within 5-7 business days to your original payment method.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Exchange Information */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Exchanges Made Easy</h2>
          
          <div className="bg-linear-to-br from-slate-900 to-gray-900 rounded-2xl p-8 shadow-lg text-white">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-amber-400 mb-4">Size Exchanges</h3>
                <ul className="space-y-3 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                    <span>Free resizing for rings within 30 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                    <span>Expedited processing for exchanges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                    <span>Keep your original while we ship the new size</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-amber-400 mb-4">Style Exchanges</h3>
                <ul className="space-y-3 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                    <span>Exchange for equal or greater value</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                    <span>Credit issued for price differences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                    <span>Personal stylist assistance available</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Special Cases */}
        <section className="mb-16 bg-amber-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Gift className="text-amber-600" />
            Special Circumstances
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Custom & Personalized Items</h3>
              <p className="text-gray-700 text-sm">
                Due to their unique nature, custom-made and engraved items cannot be returned unless there is a defect or error on our part. We'll work with you to ensure complete satisfaction before production begins.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Gift Returns</h3>
              <p className="text-gray-700 text-sm">
                Items purchased as gifts can be returned for store credit or exchanged. We never disclose the original purchase price to gift recipients.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Sale Items</h3>
              <p className="text-gray-700 text-sm">
                Items purchased during sales are eligible for returns and exchanges with the same 30-day policy. Final sale items are marked as such and cannot be returned.
              </p>
            </div>
          </div>
        </section>

        {/* Warranty Information */}
        <section className="mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Lifetime Warranty</h2>
          <p className="text-gray-700 mb-6">
            Every piece of jewelry from JewelMart comes with our lifetime warranty covering manufacturing defects, including:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Stone loss or damage due to defective settings</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Metal breakage or tarnishing</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Clasp or closure failures</span>
              </li>
            </ul>
            
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Plating issues on gold-plated items</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Structural defects in the piece</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Any workmanship errors</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-gray-700">
              <span className="font-bold text-slate-900">Note:</span> Normal wear and tear, damage from accidents or misuse, and loss are not covered under warranty. We offer affordable maintenance and repair services for these situations.
            </p>
          </div>
        </section>

        {/* Contact CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Need help with a return or exchange?</p>
          <Link 
            to="/contact" 
            className="inline-block bg-linear-to-r from-amber-500 to-yellow-600 text-white px-8 py-3 rounded-lg font-bold hover:from-amber-600 hover:to-yellow-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Contact Customer Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReturnsExchanges;