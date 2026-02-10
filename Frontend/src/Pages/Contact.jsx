import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, MessageSquare, Globe } from 'lucide-react';

const Contact = () => {
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
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically make an API call to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => setSubmitStatus(''), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Showroom",
      details: [
        "123 Jewelry Lane, Diamond District",
        "Nanded, Maharashtra 431602",
        "India"
      ],
      gradient: "from-amber-500 to-yellow-600"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        "+91 98765 43210",
        "+91 87654 32109",
        "Toll Free: 1800-123-4567"
      ],
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "info@jewelmart.com",
        "support@jewelmart.com",
        "sales@jewelmart.com"
      ],
      gradient: "from-rose-500 to-pink-600"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: [
        "Monday - Saturday: 10 AM - 8 PM",
        "Sunday: 11 AM - 6 PM",
        "Public Holidays: Closed"
      ],
      gradient: "from-purple-500 to-indigo-600"
    }
  ];

  const faqs = [
    {
      question: "Do you offer custom jewelry design?",
      answer: "Yes! We specialize in custom designs. Schedule a consultation with our design team to bring your vision to life."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy on all items. Products must be in original condition with all documentation."
    },
    {
      question: "Are your diamonds certified?",
      answer: "Absolutely! All our diamonds come with certification from recognized gemological institutes."
    },
    {
      question: "Do you provide jewelry repair services?",
      answer: "Yes, we offer comprehensive repair and maintenance services for all types of jewelry."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      {/* HERO SECTION */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent"></div>
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-20 w-full">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 px-4 py-2 rounded-full mb-6">
                <MessageSquare className="w-5 h-5 text-amber-300" />
                <span className="text-amber-100 font-semibold text-sm tracking-wide">WE'RE HERE TO HELP</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                Get In
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 mt-2">
                  Touch
                </span>
              </h1>

              <p className="text-xl text-amber-100 leading-relaxed">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-stone-100 hover:border-amber-200"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${info.gradient} mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <info.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {info.title}
                </h3>

                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM & MAP */}
      <section className="py-24 px-6 lg:px-20 bg-gradient-to-b from-white to-amber-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* CONTACT FORM */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-stone-100">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Send Us a Message
                  </span>
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="product">Product Information</option>
                      <option value="custom">Custom Design</option>
                      <option value="repair">Repair Services</option>
                      <option value="order">Order Status</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 animate-fadeIn">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">Thank you! Your message has been sent successfully.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 animate-fadeIn">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">Oops! Something went wrong. Please try again.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-6 py-4 rounded-lg font-bold hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* MAP & ADDITIONAL INFO */}
            <div className="space-y-6">
              {/* Map */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100">
                <div className="aspect-video bg-gray-200 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.1234567890123!2d77.28976431490123!3d19.16078698701234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA5JzM4LjgiTiA3N8KwMTcnMjMuMiJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Visit Our Flagship Store
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Experience our exclusive collections in person and meet with our expert consultants.
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Social Connect */}
              <div className="bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl shadow-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Connect With Us
                </h3>
                <p className="mb-6 opacity-90">
                  Follow us on social media for the latest updates, exclusive offers, and design inspiration.
                </p>
                <div className="flex gap-3">
                  {['Facebook', 'Instagram', 'Twitter', 'Pinterest'].map((social) => (
                    <a
                      key={social}
                      href={`#${social}`}
                      className="w-12 h-12 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    >
                      <span className="text-xs font-bold">{social[0]}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-4 py-2 rounded-full mb-6">
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm font-bold tracking-wide">FAQ</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Frequently Asked
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-stone-100 hover:border-amber-200"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Still have questions?
            </p>
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors"
            >
              Send us a message
              <Send className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;