import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const HERO_SLIDES = [
    {
        id: 1,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=2000',
        title: 'Timeless Elegance',
        subtitle: 'Discover Our Exquisite Diamond Collection',
        description: 'Each piece tells a story of passion, beauty, and timeless style.',
        cta: 'Explore Diamonds'
    },
    {
        id: 2,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=2000',
        title: 'Golden Moments',
        subtitle: 'Handcrafted Gold Jewelry',
        description: "Celebrate life's precious moments with our stunning gold collections.",
        cta: 'Shop Gold Collection'
    },
    {
        id: 3,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=2000',
        title: 'Bridal Splendor',
        subtitle: 'Your Perfect Wedding Collection',
        description: 'Make your special day unforgettable with our bridal masterpieces.',
        cta: 'View Bridal Sets'
    },
    {
        id: 4,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=2000',
        title: 'Modern Luxury',
        subtitle: 'Contemporary Designer Pieces',
        description: 'Where tradition meets innovation in every design.',
        cta: 'Discover Collection'
    }
];

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    return (
        <section className="relative h-150 md:h-175 lg:h-200 overflow-hidden ">
            {/* Carousel Slides */}
            <div className="relative h-full">
                {HERO_SLIDES.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-105'
                            }`}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src={slide.url}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent"></div>
                        </div>

                        {/* Content */}
                        <div className="relative h-full flex items-center">
                            <div className="w-full px-6 lg:px-14">
                                <div className="max-w-2xl space-y-6 animate-fadeIn">
                                    {/* Badge */}
                                    <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 px-4 py-2 rounded-full">
                                        <Sparkles className="w-5 h-5 text-amber-300" />
                                        <span className="text-amber-100 font-semibold text-sm tracking-wide">
                                            NEW COLLECTION
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                                        {slide.title}
                                        <span className="block text-transparent bg-clip-text bg-linear-to-r from-amber-300 via-yellow-300 to-amber-400 mt-2">
                                            {slide.subtitle}
                                        </span>
                                    </h1>

                                    {/* Description */}
                                    <p className="text-lg md:text-xl text-amber-100 max-w-xl leading-relaxed">
                                        {slide.description}
                                    </p>

                                    {/* CTA Buttons */}
                                    <div className="flex flex-wrap gap-4 pt-4">
                                        <Link
                                            to="/products"
                                            className="inline-flex items-center gap-3 bg-linear-to-r from-amber-50 to-yellow-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-amber-60 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl group"
                                        >
                                            {slide.cta}
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                        <Link
                                            to="/ai-stylist"
                                            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group"
                                        >
                                            <Sparkles className="w-5 h-5" />
                                            Try AI Stylist
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {HERO_SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${index === currentSlide
                            ? 'w-12 h-3 bg-amber-400'
                            : 'w-3 h-3 bg-white/50 hover:bg-white/80'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Decorative Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
                </svg>
            </div>
        </section>
    );
};

export default HeroSection;
