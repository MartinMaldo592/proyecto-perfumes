import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';

export const HeroSlider = () => {
  const { navigateToHome, navigateToProduct, products } = useStore();

  const slides = [
    {
      id: 1,
      title: "KHAMRAH WAHA",
      subtitle: "CHARGE YOUR OASIS",
      cta: "EXPLORE NOW",
      bgImage: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1600&auto=format&fit=crop",
      query: "Khamrah"
    },
    {
      id: 2,
      title: "MUSAMAM BLACK INTENSE",
      subtitle: "Lattafa",
      cta: "ORDER NOW",
      bgImage: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=1600&auto=format&fit=crop",
      query: "Musamam"
    },
    {
      id: 3,
      title: "ANGHAM SECOND SONG",
      subtitle: "NEW COLLECTION",
      cta: "SHOP NOW",
      bgImage: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=1600&auto=format&fit=crop",
      query: "Angham"
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleCtaClick = (query) => {
    const found = products.find((p) => p.title.toLowerCase().includes(query.toLowerCase()));
    if (found) {
      navigateToProduct(found);
    } else {
      navigateToHome();
    }
  };

  return (
    <div className="relative w-full bg-white overflow-hidden">
      
      {/* 1. TOP HERO CAMPAIGN IMAGE STAGE (Ken Burns Smooth Zoom-Out Effect) */}
      <div className="relative w-full h-[420px] xs:h-[480px] sm:h-[580px] lg:h-[680px] bg-stone-900 overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Image Container with Ken Burns Zoom-Out Animation (starts scale-115 -> zooms out smoothly to scale-100) */}
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={slide.bgImage}
                  alt={slide.title}
                  className={`w-full h-full object-cover transition-transform duration-[7000ms] cubic-bezier(0.25, 1, 0.5, 1) ${
                    isActive ? 'scale-100' : 'scale-115 duration-0'
                  }`}
                />
                
                {/* Overlay text on top of image for Slide 1 (Khamrah Waha overlay style) */}
                <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center p-6 text-center text-white">
                  <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-stone-200 drop-shadow-md mb-2">
                    {slide.subtitle}
                  </span>
                  <h1 className="font-serif text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-normal tracking-wide text-white uppercase drop-shadow-lg max-w-4xl">
                    {slide.title}
                  </h1>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* 2. BOTTOM ACTION SECTION ON CLEAN WHITE CANVAS (Matching Lattafa USA Images 1 & 2) */}
      <div className="w-full bg-white py-6 sm:py-8 px-4 flex flex-col items-center justify-center text-center space-y-4">
        
        {/* Title for Slide (if not overlayed) */}
        <h2 className="font-serif text-xl sm:text-3xl text-stone-900 tracking-wider font-normal uppercase">
          {slides[current].title}
        </h2>

        {/* Gold Action Pill Button */}
        <button
          onClick={() => handleCtaClick(slides[current].query)}
          className="bg-[#d4b068] hover:bg-[#c5a057] text-stone-950 font-bold px-10 py-3.5 rounded-lg text-xs tracking-[0.2em] uppercase shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          {slides[current].cta}
        </button>

        {/* Slider Pagination Indicator Dots (• ── •) */}
        <div className="flex items-center justify-center space-x-2 pt-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === current
                  ? 'w-8 bg-stone-900'
                  : 'w-2.5 bg-stone-300 hover:bg-stone-500'
              }`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

    </div>
  );
};
