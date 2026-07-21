import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';

export const HeroSlider = () => {
  const { navigateToHome, navigateToProduct, products } = useStore();

  const slides = [
    {
      id: 1,
      title: "MUSAMAM BLACK INTENSE",
      subtitle: "ALTA PERFUMERÍA LATTAFA",
      cta: "COMPRAR AHORA",
      bgImage: "https://www.lattafa-usa.com/cdn/shop/files/COVER_MAIN_UP_4-5.png?v=1769829986",
      query: "Musamam"
    },
    {
      id: 2,
      title: "ANGHAM SECOND SONG",
      subtitle: "NUEVA COLECCIÓN EXCLUSIVA",
      cta: "EXPLORAR COLECCIÓN",
      bgImage: "https://www.lattafa-usa.com/cdn/shop/files/JPEG_image-41C4-8874-82-0.png?v=1769830090",
      query: "Angham"
    },
    {
      id: 3,
      title: "KHAMRAH WAHA",
      subtitle: "DESCUBRE TU OASIS",
      cta: "DESCUBRIR AHORA",
      bgImage: "https://www.lattafa-usa.com/cdn/shop/files/Khamrah_Waha_edp.png?v=1779478380",
      query: "Khamrah"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);

  const handleNext = () => setCurrent((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
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
    <div className="relative w-full bg-white overflow-hidden select-none">
      
      {/* 1. TOP HERO CAMPAIGN IMAGE STAGE (Ken Burns Smooth Zoom-Out Effect & Swipe Gestures) */}
      <div 
        onMouseDown={(e) => {
          setDragStart(e.clientX);
          setIsDragging(true);
        }}
        onMouseUp={(e) => {
          if (isDragging) {
            const diff = e.clientX - dragStart;
            if (diff < -40) handleNext();
            else if (diff > 40) handlePrev();
          }
          setIsDragging(false);
        }}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchMove={(e) => setTouchEnd(e.touches[0].clientX)}
        onTouchEnd={() => {
          if (!touchStart || !touchEnd) return;
          const diff = touchStart - touchEnd;
          if (diff > 40) handleNext();
          else if (diff < -40) handlePrev();
          setTouchStart(0);
          setTouchEnd(0);
        }}
        className="relative w-full h-[420px] xs:h-[480px] sm:h-[580px] lg:h-[680px] bg-stone-900 overflow-hidden cursor-grab active:cursor-grabbing group"
      >
        {slides.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Image Container with Ken Burns Zoom-Out Animation */}
              <div className="w-full h-full overflow-hidden relative pointer-events-none">
                <img
                  src={slide.bgImage}
                  alt={slide.title}
                  className={`w-full h-full object-cover transition-transform duration-[3000ms] cubic-bezier(0.25, 1, 0.5, 1) ${
                    isActive ? 'scale-100' : 'scale-115 duration-0'
                  }`}
                />
                
                {/* Overlay text on top of image */}
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

        {/* Hover Arrow Controls for Desktop Navigation */}
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/20 hover:bg-white/80 text-white hover:text-stone-900 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
          title="Previous slide"
        >
          ‹
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/20 hover:bg-white/80 text-white hover:text-stone-900 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
          title="Next slide"
        >
          ›
        </button>
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
