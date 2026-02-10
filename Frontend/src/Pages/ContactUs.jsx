import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, ArrowLeft, MessageSquare } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(''); // 'success', 'error', or ''
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 5000);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-amber-50/30 to-slate-50">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-600 hover:text-amber-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-amber-500 to-yellow-600 rounded-2xl mb-6 shadow-xl">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Get In Touch</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We're here to help with any questions about our jewelry collection, custom designs, or services
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information Cards */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-amber-100">
            <div className="w-14 h-14 bg-linear-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center mb-6">
              <Phone className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Phone</h3>
            <p className="text-slate-600 mb-4 text-sm">
              Speak directly with our jewelry specialists
            </p>
            <a href="tel:+1-800-JEWEL-99" className="text-amber-600 font-bold text-lg hover:text-amber-700 transition-colors">
              +1 (800) JEWEL-99
            </a>
            <p className="text-slate-500 text-xs mt-2">Mon-Sat: 9am-8pm EST</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-amber-100">
            <div className="w-14 h-14 bg-linear-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center mb-6">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Email</h3>
            <p className="text-slate-600 mb-4 text-sm">
              We respond within 24 hours
            </p>
            <a href="mailto:service@jewelmart.com" className="text-amber-600 font-bold text-lg hover:text-amber-700 transition-colors break-all">
              service@jewelmart.com
            </a>
            <p className="text-slate-500 text-xs mt-2">Average response: 2 hours</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-amber-100">
            <div className="w-14 h-14 bg-linear-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center mb-6">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Showroom</h3>
            <p className="text-slate-600 mb-4 text-sm">
              Visit our flagship location
            </p>
            <p className="text-slate-700 font-medium">
              123 Diamond Avenue<br />
              New York, NY 10001
            </p>
            <p className="text-slate-500 text-xs mt-2">By appointment only</p>
          </div>
        </div>

        {/* Main Contact Form */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Send Us a Message</h2>
            <p className="text-slate-600 mb-8">Fill out the form below and we'll get back to you shortly</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  placeholder="+1 (555) 000-0000"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-bold text-slate-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  disabled={isSubmitting}
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="custom">Custom Design</option>
                  <option value="order">Order Status</option>
                  <option value="appointment">Book Appointment</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us how we can help you..."
                  disabled={isSubmitting}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-linear-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-xl font-bold hover:from-amber-600 hover:to-yellow-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-center gap-3 text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3 animate-fadeIn">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium">Thank you! We'll be in touch soon.</span>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="flex items-center gap-3 text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 animate-fadeIn">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium">Please fill in all required fields.</span>
                </div>
              )}
            </form>
          </div>

          {/* Additional Info */}
          <div className="space-y-8">
            {/* Business Hours */}
            <div className="bg-linear-to-br from-amber-500 to-yellow-600 rounded-3xl p-10 text-white shadow-xl">
              <Clock className="w-12 h-12 mb-6" />
              <h3 className="text-2xl font-bold mb-6">Business Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="font-medium">Monday - Friday</span>
                  <span className="font-bold">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="font-medium">Saturday</span>
                  <span className="font-bold">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Sunday</span>
                  <span className="font-bold">Closed</span>
                </div>
              </div>
              <p className="text-amber-100 text-sm mt-6">
                *Extended hours during holiday season
              </p>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-amber-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Quick Answers</h3>
              <div className="space-y-4">
                <Link to="/shipping" className="block p-4 bg-slate-50 rounded-xl hover:bg-amber-50 transition-colors group">
                  <h4 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">Shipping Information</h4>
                  <p className="text-sm text-slate-600 mt-1">Learn about our delivery options</p>
                </Link>
                <Link to="/returns" className="block p-4 bg-slate-50 rounded-xl hover:bg-amber-50 transition-colors group">
                  <h4 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">Returns & Exchanges</h4>
                  <p className="text-sm text-slate-600 mt-1">Our 30-day return policy</p>
                </Link>
                <Link to="/diamond-education" className="block p-4 bg-slate-50 rounded-xl hover:bg-amber-50 transition-colors group">
                  <h4 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">Diamond Education</h4>
                  <p className="text-sm text-slate-600 mt-1">Everything about the 4 C's</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;