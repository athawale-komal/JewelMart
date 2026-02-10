import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gem, Award, Sparkles, Eye, Ruler, Palette, ShieldCheck } from 'lucide-react';

const DiamondEducation = () => {
  const [activeTab, setActiveTab] = useState('4cs');

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-amber-50/30 to-slate-50">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-slate-900 via-slate-800 to-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="flex items-center gap-3 mb-6">
            <Gem className="w-12 h-12 text-amber-400" />
            <h1 className="text-5xl md:text-6xl font-bold">Diamond Education</h1>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
            Understanding diamonds empowers you to make an informed choice. Learn about the 4 Cs and what makes each diamond unique.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-8 overflow-x-auto">
            {[
              { id: '4cs', label: 'The 4 Cs', icon: Award },
              { id: 'shapes', label: 'Diamond Shapes', icon: Gem },
              { id: 'certification', label: 'Certification', icon: ShieldCheck }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-600 hover:text-amber-600'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* The 4 Cs */}
        {activeTab === '4cs' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">The 4 Cs of Diamonds</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Cut, Color, Clarity, and Carat Weight - these four characteristics determine a diamond's quality and value.
              </p>
            </div>

            {/* Cut */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-amber-500">
              <div className="flex items-start gap-6">
                <div className="bg-linear-to-br from-amber-500 to-yellow-600 p-4 rounded-2xl shrink-0">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">Cut</h3>
                  <p className="text-gray-700 mb-6">
                    The cut is the most important factor in a diamond's beauty. It determines how well the diamond reflects light, creating its signature sparkle and brilliance.
                  </p>
                  
                  <div className="grid md:grid-cols-5 gap-4">
                    {['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'].map((grade, idx) => (
                      <div key={grade} className={`p-4 rounded-xl text-center ${
                        idx === 0 ? 'bg-linear-to-br from-amber-500 to-yellow-600 text-white' :
                        idx === 1 ? 'bg-amber-100 text-amber-900' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        <div className="font-bold mb-1">{grade}</div>
                        <div className="text-xs opacity-80">
                          {idx === 0 ? 'Maximum brilliance' :
                           idx === 1 ? 'High brilliance' :
                           idx === 2 ? 'Good brilliance' :
                           idx === 3 ? 'Some brilliance' :
                           'Little brilliance'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Color */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-500">
              <div className="flex items-start gap-6">
                <div className="bg-linear-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl shrink-0">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">Color</h3>
                  <p className="text-gray-700 mb-6">
                    Diamond color grading ranges from D (colorless) to Z (light yellow or brown). The most valuable diamonds are those with the least color.
                  </p>
                  
                  <div className="bg-linear-to-r from-white via-yellow-50 to-yellow-200 p-6 rounded-xl">
                    <div className="flex justify-between items-end mb-2">
                      <div className="text-center">
                        <div className="font-bold text-slate-900 text-lg mb-1">D-F</div>
                        <div className="text-xs text-gray-600">Colorless</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-slate-900 text-lg mb-1">G-J</div>
                        <div className="text-xs text-gray-600">Near Colorless</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-slate-900 text-lg mb-1">K-M</div>
                        <div className="text-xs text-gray-600">Faint</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-slate-900 text-lg mb-1">N-R</div>
                        <div className="text-xs text-gray-600">Very Light</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-slate-900 text-lg mb-1">S-Z</div>
                        <div className="text-xs text-gray-600">Light</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-bold text-slate-900">Pro Tip:</span> G-H color grades offer excellent value - they appear colorless to the naked eye but cost significantly less than D-F grades.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Clarity */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-purple-500">
              <div className="flex items-start gap-6">
                <div className="bg-linear-to-br from-purple-500 to-pink-600 p-4 rounded-2xl shrink-0">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">Clarity</h3>
                  <p className="text-gray-700 mb-6">
                    Clarity measures the presence of internal characteristics (inclusions) and external characteristics (blemishes). Most inclusions are microscopic and don't affect the diamond's beauty.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                    {[
                      { grade: 'FL', desc: 'Flawless' },
                      { grade: 'IF', desc: 'Internally Flawless' },
                      { grade: 'VVS1-VVS2', desc: 'Very Very Slightly Included' },
                      { grade: 'VS1-VS2', desc: 'Very Slightly Included' },
                      { grade: 'SI1-SI2', desc: 'Slightly Included' },
                      { grade: 'I1-I3', desc: 'Included' }
                    ].map((item, idx) => (
                      <div key={item.grade} className={`p-3 rounded-lg text-center ${
                        idx < 2 ? 'bg-linear-to-br from-purple-500 to-pink-600 text-white' :
                        idx < 4 ? 'bg-purple-100 text-purple-900' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        <div className="font-bold text-sm mb-1">{item.grade}</div>
                        <div className="text-xs opacity-80">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Carat Weight */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-green-500">
              <div className="flex items-start gap-6">
                <div className="bg-linear-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shrink-0">
                  <Ruler className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">Carat Weight</h3>
                  <p className="text-gray-700 mb-6">
                    Carat measures a diamond's weight, not its size. One carat equals 200 milligrams. Larger diamonds are rarer and more valuable per carat.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { weight: '0.5 ct', size: '5.2mm', relative: 'small' },
                      { weight: '1.0 ct', size: '6.5mm', relative: 'medium' },
                      { weight: '1.5 ct', size: '7.4mm', relative: 'large' },
                      { weight: '2.0 ct', size: '8.2mm', relative: 'extra large' }
                    ].map((item) => (
                      <div key={item.weight} className="bg-linear-to-br from-green-50 to-emerald-50 p-4 rounded-xl text-center border border-green-200">
                        <div className="font-bold text-slate-900 mb-1">{item.weight}</div>
                        <div className="text-sm text-gray-600 mb-2">≈ {item.size}</div>
                        <div className="inline-block px-3 py-1 bg-green-500 text-white text-xs rounded-full">
                          {item.relative}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-bold text-slate-900">Did you know?</span> A 2-carat diamond costs significantly more than twice the price of a 1-carat diamond of the same quality due to its rarity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Diamond Shapes */}
        {activeTab === 'shapes' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Popular Diamond Shapes</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Each diamond shape has its own unique character and brilliance. Choose the one that speaks to your style.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Round Brilliant', desc: 'The most popular and brilliant cut, maximizing sparkle and fire', popularity: '75%' },
                { name: 'Princess', desc: 'A modern square cut with exceptional brilliance and sharp corners', popularity: '15%' },
                { name: 'Cushion', desc: 'A romantic, vintage-inspired cut with rounded corners', popularity: '8%' },
                { name: 'Oval', desc: 'An elongated shape that makes fingers appear longer and slender', popularity: '12%' },
                { name: 'Emerald', desc: 'A sophisticated rectangular cut with step-cut facets', popularity: '5%' },
                { name: 'Pear', desc: 'A unique teardrop shape combining round and marquise cuts', popularity: '3%' },
                { name: 'Marquise', desc: 'An elongated shape with pointed ends, maximizing carat weight', popularity: '2%' },
                { name: 'Radiant', desc: 'A brilliant cut in a rectangular shape with trimmed corners', popularity: '4%' },
                { name: 'Asscher', desc: 'A square emerald cut with a vintage art deco appeal', popularity: '2%' }
              ].map((shape) => (
                <div key={shape.name} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-amber-100">
                  <div className="w-16 h-16 bg-linear-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-4">
                    <Gem className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{shape.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{shape.desc}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-linear-to-r from-amber-500 to-yellow-600 h-2 rounded-full"
                        style={{ width: shape.popularity }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{shape.popularity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certification */}
        {activeTab === 'certification' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Diamond Certification</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A diamond certificate is an independent evaluation of the diamond's characteristics, providing assurance of its quality.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Leading Certification Laboratories</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-amber-500 pl-6 py-4">
                  <h4 className="font-bold text-slate-900 mb-2">GIA (Gemological Institute of America)</h4>
                  <p className="text-gray-700 text-sm">
                    The world's most respected diamond grading laboratory. GIA created the 4 Cs system and maintains the strictest grading standards.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-6 py-4">
                  <h4 className="font-bold text-slate-900 mb-2">AGS (American Gem Society)</h4>
                  <p className="text-gray-700 text-sm">
                    Known for rigorous cut grading standards and scientific approach. AGS certificates include detailed cut quality assessments.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6 py-4">
                  <h4 className="font-bold text-slate-900 mb-2">IGI (International Gemological Institute)</h4>
                  <p className="text-gray-700 text-sm">
                    One of the largest gem certification organizations worldwide, particularly popular for laboratory-grown diamonds.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-slate-900 to-gray-900 rounded-2xl p-8 shadow-lg text-white">
              <h3 className="text-2xl font-bold mb-6">What's Included in a Certificate?</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                      <span>Exact carat weight</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                      <span>Color grade</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                      <span>Clarity grade</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                      <span>Cut grade</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                      <span>Measurements and proportions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                      <span>Fluorescence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                      <span>Polish and symmetry</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                      <span>Detailed inclusion plot</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">JewelMart Guarantee</h3>
              <p className="text-gray-700 mb-4">
                Every diamond over 0.5 carats sold at JewelMart comes with certification from GIA or AGS. We provide:
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  <span>Original certificate with every purchase</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  <span>Free certificate verification service</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  <span>Lifetime certificate replacement if lost or damaged</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center bg-linear-to-br from-slate-900 to-gray-900 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Diamond?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Armed with this knowledge, you're ready to make an informed decision. Explore our collection or speak with our diamond experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/ourproducts" 
              className="inline-block bg-linear-to-r from-amber-500 to-yellow-600 text-white px-8 py-3 rounded-lg font-bold hover:from-amber-600 hover:to-yellow-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Browse Diamonds
            </Link>
            <Link 
              to="/contact" 
              className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-3 rounded-lg font-bold hover:bg-white/20 transition-all"
            >
              Speak to an Expert
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiamondEducation;