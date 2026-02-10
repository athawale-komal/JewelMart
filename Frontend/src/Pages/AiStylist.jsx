import React, { useState } from "react";
import { Sparkles, Home } from "lucide-react";
import { Link } from "react-router-dom";

const AiStylist = () => {
  const [occasion, setOccasion] = useState("");
  const [metal, setMetal] = useState("");
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState("");

  const generateSuggestion = () => {
    if (!occasion || !metal || !budget) {
      setResult("Please select all preferences to get a recommendation ✨");
      return;
    }

    if (occasion === "Wedding" && metal === "Gold") {
      setResult(
        "✨ A traditional gold necklace set with matching bangles will elevate your wedding look."
      );
    } else if (occasion === "Party" && metal === "Diamond") {
      setResult(
        "✨ Diamond pendant paired with elegant stud earrings is perfect for a classy party look."
      );
    } else if (occasion === "Daily Wear" && metal === "Silver") {
      setResult(
        "✨ Minimal silver rings or bracelets are ideal for everyday elegance."
      );
    } else {
      setResult(
        "✨ A stylish pendant and earrings combo will beautifully complement your style."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Sparkles className="text-pink-600" size={30} />
            <h1 className="text-3xl font-bold text-gray-800">
              AI Jewelry Stylist
            </h1>
          </div>

          {/* Home Link */}
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-pink-600 hover:text-pink-700 transition"
          >
            <Home size={18} />
            Home
          </Link>
        </div>

        <p className="text-gray-600 mb-10 leading-relaxed">
          Discover jewelry tailored to your occasion, preference, and budget.
          Our AI stylist helps you choose pieces that enhance your elegance 💎
        </p>

        {/* Form */}
        <div className="space-y-6">
          {/* Occasion */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Occasion
            </label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Select occasion</option>
              <option>Wedding</option>
              <option>Party</option>
              <option>Daily Wear</option>
              <option>Festival</option>
            </select>
          </div>

          {/* Metal */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Preferred Metal
            </label>
            <select
              value={metal}
              onChange={(e) => setMetal(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Select metal</option>
              <option>Gold</option>
              <option>Diamond</option>
              <option>Silver</option>
              <option>Platinum</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Budget Range
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Select budget</option>
              <option>Below ₹10,000</option>
              <option>₹10,000 – ₹50,000</option>
              <option>Above ₹50,000</option>
            </select>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={generateSuggestion}
          className="w-full mt-8 bg-pink-600 text-white py-3.5 rounded-2xl font-semibold text-lg hover:bg-pink-700 transition shadow-md"
        >
          Get Personalized Recommendation ✨
        </button>

        {/* Result */}
        {result && (
          <div className="mt-8 bg-pink-50 border border-pink-200 rounded-2xl p-5">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">
              Our Stylist Suggests
            </h3>
            <p className="text-gray-800 leading-relaxed">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiStylist;
