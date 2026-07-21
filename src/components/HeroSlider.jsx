import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useStore } from '../context/StoreContext';

export const HeroSlider = () => {
  const { navigateToHome, navigateToProduct, products } = useStore();

  const slides = [
    {
      id: 0,
      title: "MAKANAKY LA REALEZA",
      subtitle: "EDICIÓN ESPECIAL EXCLUSIVA",
      cta: "COMPRAR AHORA",
      bgImage: "/makanaky_user.jpg",
      query: "Asad"
    },
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

  const timerRef = useRef(null);

  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      handleNext();
    }, 5000);
  }, [handleNext]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, resetTimer]);

  const manualGoNext = () => {
    handleNext();
  };

  const manualGoPrev = () => {
    handlePrev();
  };

  const manualGoTo = (idx) => {
    setCurrent(idx);
  };

  const handleCtaClick = (query) => {
    const found = products.find((p) => p.title.toLowerCase().includes(query.toLowerCase()));
    if (found) {
      navigateToProduct(found);
    } else {
      navigateToHome();
    }
  };

  return (
    <div className="relative w-full bg-white overflow-hidden select-none min-h-[calc(100svh-80px)] flex flex-col justify-between">
      
      {/* 1. TOP HERO CAMPAIGN STAGE */}
      <div 
        onMouseDown={(e) => {
          setDragStart(e.clientX);
          setIsDragging(true);
        }}
        onMouseUp={(e) => {
          if (isDragging) {
            const diff = e.clientX - dragStart;
            if (diff < -40) manualGoNext();
            else if (diff > 40) manualGoPrev();
          }
          setIsDragging(false);
        }}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchMove={(e) => setTouchEnd(e.touches[0].clientX)}
        onTouchEnd={() => {
          if (!touchStart || !touchEnd) return;
          const diff = touchStart - touchEnd;
          if (diff > 40) manualGoNext();
          else if (diff < -40) manualGoPrev();
          setTouchStart(0);
          setTouchEnd(0);
        }}
        className="relative w-full flex-1 min-h-[360px] xs:min-h-[420px] sm:min-h-[500px] lg:h-[620px] bg-stone-900 overflow-hidden cursor-grab active:cursor-grabbing group"
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
              {/* Image Container with Ken Burns Zoom-Out Animation restarting on active slide */}
              <div className="w-full h-full overflow-hidden relative pointer-events-none">
                <img
                  src={slide.bgImage}
                  alt={slide.title}
                  className={`w-full h-full object-cover transition-transform duration-[5000ms] cubic-bezier(0.25, 1, 0.5, 1) ${
                    isActive ? 'scale-100 transform-gpu' : 'scale-115 duration-0'
                  }`}
                />
              </div>

            </div>
          );
        })}

        {/* Hover Arrow Controls for Desktop Navigation */}
        <button
          onClick={(e) => { e.stopPropagation(); manualGoPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/20 hover:bg-white/80 text-white hover:text-stone-900 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
          title="Previous slide"
        >
          ‹
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); manualGoNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/20 hover:bg-white/80 text-white hover:text-stone-900 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
          title="Next slide"
        >
          ›
        </button>
      </div>

      {/* 2. BOTTOM ACTION & PAGINATION SECTION ON CLEAN WHITE CANVAS (Matches official mobile screenshots) */}
      <div className="w-full bg-white py-5 sm:py-6 px-4 flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 flex-shrink-0">
        
        {/* Title for Current Slide */}
        <h2 className="font-serif text-lg xs:text-xl sm:text-3xl text-stone-900 tracking-wider font-normal uppercase max-w-xl">
          {slides[current].title}
        </h2>

        {/* Gold Action Pill Button */}
        <button
          onClick={() => handleCtaClick(slides[current].query)}
          className="bg-[#d4b068] hover:bg-[#c5a057] text-stone-950 font-bold px-9 py-3 rounded-lg text-xs tracking-[0.2em] uppercase shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          {slides[current].cta}
        </button>

        {/* Slider Pagination Indicator Dots / Progress Pills (Sincronizados con la carga del slide) */}
        <div className="flex items-center justify-center space-x-2 pt-1">
          {slides.map((_, idx) => {
            const isActive = idx === current;
            return (
              <button
                key={idx}
                onClick={() => manualGoTo(idx)}
                className={`relative h-2.5 rounded-full overflow-hidden transition-all duration-300 ${
                  isActive ? 'w-10 bg-stone-200' : 'w-2.5 bg-stone-300 hover:bg-stone-400'
                }`}
                title={`Slide ${idx + 1}`}
              >
                {isActive && (
                  <span
                    key={current}
                    className="absolute inset-0 bg-stone-900 rounded-full"
                    style={{
                      animation: 'slideProgress 5000ms linear forwards'
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
};
