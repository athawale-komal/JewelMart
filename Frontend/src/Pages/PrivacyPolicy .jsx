import React from 'react';
import { Shield, Lock, Eye, Users, Database, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
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
            <Shield className="w-10 h-10 text-amber-400" />
            <h1 className="text-5xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Your privacy and security are our top priorities. Learn how we protect your information.
          </p>
          <p className="text-sm text-gray-400 mt-4">Last updated: February 1, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Introduction */}
        <section className="mb-12 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Commitment to Privacy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            At JewelMart Luxury Jewellery, we understand the importance of protecting your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
            visit our website, make a purchase, or interact with our services.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By using our website or services, you agree to the collection and use of information in accordance 
            with this policy. If you do not agree with our policies and practices, please do not use our services.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-12">
          <div className="bg-linear-to-br from-slate-900 to-gray-900 rounded-2xl p-8 shadow-lg text-white mb-6">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Database className="text-amber-400" />
              Information We Collect
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-amber-500">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-600" />
                Personal Information
              </h3>
              <p className="text-gray-700 mb-3">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="space-y-2 text-gray-700 text-sm ml-4">
                <li>• Name, email address, and phone number</li>
                <li>• Billing and shipping addresses</li>
                <li>• Payment information (processed securely through our payment providers)</li>
                <li>• Account credentials (username and password)</li>
                <li>• Purchase history and preferences</li>
                <li>• Communication preferences</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                Automatically Collected Information
              </h3>
              <p className="text-gray-700 mb-3">
                When you visit our website, we automatically collect certain information:
              </p>
              <ul className="space-y-2 text-gray-700 text-sm ml-4">
                <li>• IP address and device information</li>
                <li>• Browser type and version</li>
                <li>• Pages visited and time spent on our site</li>
                <li>• Referring website addresses</li>
                <li>• Cookie data and similar tracking technologies</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How We Use Information */}
        <section className="mb-12 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">How We Use Your Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h3 className="font-bold text-slate-900 mb-3">Order Processing</h3>
              <p className="text-sm text-gray-700">
                Process and fulfill your orders, manage payments, arrange shipping, and provide customer support.
              </p>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h3 className="font-bold text-slate-900 mb-3">Communication</h3>
              <p className="text-sm text-gray-700">
                Send order confirmations, shipping updates, respond to inquiries, and provide customer service.
              </p>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h3 className="font-bold text-slate-900 mb-3">Marketing</h3>
              <p className="text-sm text-gray-700">
                Send promotional emails about new products and special offers (with your consent, and you can opt out anytime).
              </p>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h3 className="font-bold text-slate-900 mb-3">Improvement</h3>
              <p className="text-sm text-gray-700">
                Analyze usage patterns to improve our website, products, and services for a better customer experience.
              </p>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h3 className="font-bold text-slate-900 mb-3">Security</h3>
              <p className="text-sm text-gray-700">
                Detect, prevent, and address fraud, security issues, and violations of our terms of service.
              </p>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h3 className="font-bold text-slate-900 mb-3">Legal Compliance</h3>
              <p className="text-sm text-gray-700">
                Comply with legal obligations, respond to legal requests, and protect our rights and property.
              </p>
            </div>
          </div>
        </section>

        {/* Data Security */}
        <section className="mb-12 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Lock className="text-amber-600" />
            Data Security
          </h2>
          
          <p className="text-gray-700 mb-6">
            We implement appropriate technical and organizational security measures to protect your personal information.
          </p>

          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-gray-700">
              <span className="font-bold text-slate-900">Please note:</span> While we strive to protect your personal 
              information, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Contact Us About Privacy</h2>
          <p className="text-gray-700 mb-6">
            If you have questions about this Privacy Policy, please contact us at privacy@jewelmart.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;