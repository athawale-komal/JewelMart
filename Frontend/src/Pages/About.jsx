import React from 'react';
import { Award, Users, Heart, Shield, Gem, Sparkles, Clock, Globe } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We uphold the highest standards of craftsmanship in every piece we create.",
      gradient: "from-amber-500 to-yellow-600"
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Our love for jewelry drives us to create pieces that touch hearts.",
      gradient: "from-rose-500 to-pink-600"
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Transparency and honesty in every transaction and relationship.",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Blending traditional craftsmanship with modern design aesthetics.",
      gradient: "from-purple-500 to-indigo-600"
    }
  ];

  const milestones = [
    { year: "1999", event: "JewelMart Founded", desc: "Started our journey with a vision to make luxury accessible" },
    { year: "2005", event: "First Flagship Store", desc: "Opened our iconic boutique in the heart of the city" },
    { year: "2012", event: "Global Expansion", desc: "Expanded to serve customers across 25 countries" },
    { year: "2018", event: "Sustainable Initiative", desc: "Launched our ethical sourcing program" },
    { year: "2024", event: "AI Innovation", desc: "Introduced AI-powered personalized jewelry recommendations" },
    { year: "2026", event: "10,000+ Happy Customers", desc: "Celebrating trust and excellence" }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Master Jeweler",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      bio: "30+ years of crafting exquisite jewelry pieces"
    },
    {
      name: "Priya Sharma",
      role: "Design Director",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
      bio: "Award-winning designer with a passion for innovation"
    },
    {
      name: "Amit Patel",
      role: "Quality Assurance",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
      bio: "Ensuring every piece meets our highest standards"
    },
    {
      name: "Sneha Reddy",
      role: "Customer Experience",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
      bio: "Dedicated to making your jewelry journey memorable"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      {/* HERO SECTION */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=2000"
            alt="Jewelry Workshop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent"></div>
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-20 w-full">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 px-4 py-2 rounded-full mb-6">
                <Gem className="w-5 h-5 text-amber-300" />
                <span className="text-amber-100 font-semibold text-sm tracking-wide">SINCE 1999</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                Crafting Dreams
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 mt-2">
                  Into Reality
                </span>
              </h1>

              <p className="text-xl text-amber-100 leading-relaxed">
                For over 25 years, we've been creating timeless pieces that celebrate life's most precious moments.
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

      {/* OUR STORY */}
      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-4 py-2 rounded-full mb-6">
                <Users className="w-5 h-5" />
                <span className="text-sm font-bold tracking-wide">OUR STORY</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  A Legacy of
                </span>
                <br />
                <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                  Excellence
                </span>
              </h2>

              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  JewelMart was born from a simple dream: to make exquisite jewelry accessible to everyone. What started as a small workshop in 1999 has grown into a trusted name in the jewelry industry.
                </p>
                <p>
                  Our founder, inspired by generations of master jewelers, believed that every piece of jewelry should tell a story. Today, we continue that tradition, combining time-honored craftsmanship with contemporary design.
                </p>
                <p>
                  Every piece that leaves our workshop carries with it the dedication of our artisans, the purity of our materials, and the trust of thousands of satisfied customers worldwide.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl blur-2xl opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800"
                alt="Artisan at work"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-20 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                Our Core Values
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2">
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>

                  <div className="relative mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="relative">
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-amber-300 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 px-6 lg:px-20 bg-gradient-to-b from-white to-amber-50/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-4 py-2 rounded-full mb-6">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-bold tracking-wide">OUR JOURNEY</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Milestones That
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                Define Us
              </span>
            </h2>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex gap-6 group"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {milestone.year}
                  </div>
                  {index !== milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-amber-300 to-transparent mt-2"></div>
                  )}
                </div>

                <div className="flex-1 pb-8">
                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-amber-100 group-hover:border-amber-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                      {milestone.event}
                    </h3>
                    <p className="text-gray-600">
                      {milestone.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR TEAM */}
      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-4 py-2 rounded-full mb-6">
              <Users className="w-5 h-5" />
              <span className="text-sm font-bold tracking-wide">MEET THE TEAM</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                The Artisans Behind
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                Your Treasures
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-amber-600 font-semibold mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 bg-gradient-to-r from-amber-500 to-yellow-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-20 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: "25+", label: "Years of Excellence" },
              { number: "10,000+", label: "Happy Customers" },
              { number: "500+", label: "Unique Designs" },
              { number: "50+", label: "Countries Served" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-5xl md:text-6xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold opacity-90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-20 bg-gradient-to-b from-amber-50/30 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <Globe className="w-16 h-16 text-amber-600 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Ready to Find Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
              Perfect Piece?
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Explore our collections and let us help you create memories that last forever.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Gem className="w-5 h-5" />
              Explore Collections
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-white border-2 border-amber-500 text-amber-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-amber-50 transition-all duration-300 transform hover:scale-105"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;