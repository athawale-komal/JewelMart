import React from 'react';
import { FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';

const TermsOfService = () => {
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
            <FileText className="w-10 h-10 text-amber-400" />
            <h1 className="text-5xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Please read these terms carefully before using our services.
          </p>
          <p className="text-sm text-gray-400 mt-4">Last updated: February 1, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Acceptance */}
        <section className="mb-12 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to JewelMart Luxury Jewellery. By accessing or using our website, making a purchase, or engaging with our services, you agree to be bound by these Terms of Service.
          </p>
        </section>

        {/* Orders & Payment */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Orders & Payment</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-amber-600" />
                Order Acceptance
              </h3>
              <p className="text-sm text-gray-700">
                We reserve the right to refuse or cancel any order for any reason.
              </p>
            </div>

            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-amber-600" />
                Payment Processing
              </h3>
              <p className="text-sm text-gray-700">
                All payments are processed securely. You agree to provide accurate payment information.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Questions About Terms</h2>
          <p className="text-gray-700 mb-6">
            If you have questions about these Terms of Service, please contact us at legal@jewelmart.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;