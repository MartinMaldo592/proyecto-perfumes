import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Star,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Share2,
  HelpCircle,
  CheckCircle2,
  Package,
  Lock,
  Gift,
  ShoppingBag
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductPage = () => {
  const { activeProduct, navigateToHome, navigateToProduct, addToCart, toggleWishlist, wishlist, products } = useStore();

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    if (activeProduct) {
      const defaultVariant = (activeProduct.variants && activeProduct.variants[0]) || null;
      setSelectedVariant(defaultVariant);
      setCurrentImgIdx(0);
      setQuantity(1);
    }
  }, [activeProduct]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!activeProduct) return null;

  const isWishlisted = wishlist.includes(activeProduct.id);
  const price = selectedVariant ? parseFloat(selectedVariant.price) : parseFloat(activeProduct.min_price);
  const compareAt = selectedVariant ? parseFloat(selectedVariant.compare_at_price) : parseFloat(activeProduct.compare_at_price);

  const images = (activeProduct.all_images && activeProduct.all_images.length > 0)
    ? activeProduct.all_images
    : [activeProduct.main_image];

  const handlePrevImg = () => {
    setCurrentImgIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImg = () => {
    setCurrentImgIdx((prev) => (prev + 1) % images.length);
  };

  const sampleReviews = [
    {
      id: 1,
      author: "Tareque Hashmi",
      verified: true,
      rating: 5,
      date: "07/01/2026",
      title: "Worth every",
      body: "Worth every penny. The longevity and projection of this Arabian EDP is unmatched."
    },
    {
      id: 2,
      author: "Anonymous",
      verified: true,
      rating: 1,
      date: "06/17/2026",
      title: "I still have not received my purchased",
      body: "Bought on May 26th and still waiting. Highly disappointing."
    },
    {
      id: 3,
      author: "Marci Silva",
      verified: true,
      rating: 5,
      date: "06/11/2026",
      title: "Loved!",
      body: "Loved! Smells expensive, rich, and luxurious. Gets compliments every single time."
    },
    {
      id: 4,
      author: "Anonymous",
      verified: true,
      rating: 5,
      date: "06/09/2026",
      title: "Fantastic! Highly",
      body: "Fantastic! Highly recommend for anyone looking for authentic Dubai perfumes."
    },
    {
      id: 5,
      author: "Anonymous",
      verified: true,
      rating: 5,
      date: "06/06/2026",
      title: "Great scents",
      body: "Great scents, great packaging. Premium unboxing experience."
    }
  ];

  return (
    <div className="bg-white min-h-screen text-stone-900 pb-24 animate-fadeIn relative">
      


      {/* Floating Bottom Right Rewards Button */}
      <div className="fixed right-6 bottom-6 z-30">
        <button className="bg-[#2d221c] hover:bg-[#1a1410] text-white px-4 py-2.5 rounded-full text-xs font-semibold flex items-center space-x-2 shadow-2xl transition-transform hover:scale-105">
          <Gift className="w-4 h-4 text-amber-300" />
          <span>Rewards</span>
        </button>
      </div>

      {/* 1. BREADCRUMBS NAVIGATION */}
      <div className="w-full px-4 sm:px-10 lg:px-14 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-center space-x-2 text-xs text-stone-500 font-medium">
          <button onClick={navigateToHome} className="hover:text-stone-900 transition-colors">
            Inicio
          </button>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <button onClick={() => navigateToHome()} className="hover:text-stone-900 transition-colors">
            Todas las Fragancias
          </button>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="text-stone-900 font-semibold uppercase tracking-wider">{activeProduct.title}</span>
        </div>
      </div>

      {/* Main PDP Content Container */}
      <div className="w-full px-2 sm:px-10 lg:px-14 py-1 sm:py-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: IMAGE GALLERY (7 Columns in LG - STICKY ON SCROLL) */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-start lg:sticky lg:top-24 lg:self-start w-full">
            
            {/* Desktop & Tablet Vertical/Horizontal Thumbnails List */}
            {images.length > 1 && (
              <div className="hidden sm:flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[540px] flex-shrink-0 w-full sm:w-22">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImgIdx(idx)}
                    className={`w-20 h-20 sm:w-22 sm:h-22 rounded-2xl border p-2 bg-[#f5f5f5] flex items-center justify-center transition-all ${
                      currentImgIdx === idx ? 'border-stone-900 ring-2 ring-stone-900 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image Stage Container - Drag Swipe & Smooth Fade Effect */}
            <div 
              onMouseDown={(e) => {
                setDragStart(e.clientX);
                setIsDragging(true);
              }}
              onMouseMove={(e) => {
                if (!isDragging) return;
                setDragOffset(e.clientX - dragStart);
              }}
              onMouseUp={() => {
                if (isDragging) {
                  if (dragOffset < -50) handleNextImg();
                  else if (dragOffset > 50) handlePrevImg();
                }
                setIsDragging(false);
                setDragOffset(0);
              }}
              onMouseLeave={() => {
                setIsDragging(false);
                setDragOffset(0);
              }}
              onTouchStart={(e) => {
                setTouchStart(e.touches[0].clientX);
              }}
              onTouchMove={(e) => {
                setTouchEnd(e.touches[0].clientX);
              }}
              onTouchEnd={() => {
                if (!touchStart || !touchEnd) return;
                const distance = touchStart - touchEnd;
                if (distance > 50) handleNextImg();
                else if (distance < -50) handlePrevImg();
                setTouchStart(0);
                setTouchEnd(0);
              }}
              className="relative w-full aspect-square sm:aspect-auto sm:h-[500px] lg:h-[540px] bg-[#f5f5f5] rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex items-center justify-center border border-gray-100/60 overflow-hidden select-none cursor-grab active:cursor-grabbing"
            >
              
              {/* Zoom Search Button Top-Right */}
              <button className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 bg-white/90 hover:bg-white text-stone-800 rounded-full flex items-center justify-center shadow-xs transition-all">
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Carousel Prev/Next Arrow Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImg}
                    className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white hover:bg-stone-50 text-stone-900 rounded-full items-center justify-center shadow-md transition-all border border-gray-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImg}
                    className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white hover:bg-stone-50 text-stone-900 rounded-full items-center justify-center shadow-md transition-all border border-gray-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Absolute Stacked Images for Smooth Cross-Fade Transition */}
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={activeProduct.title}
                  className={`absolute inset-0 w-full h-full object-contain p-4 sm:p-8 transition-all duration-500 ease-in-out ${
                    currentImgIdx === idx ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0 pointer-events-none'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: PRODUCT INFO & PURCHASE CONTROLS */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            
            {/* Brand Vendor */}
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-stone-400 block mb-1">
                {activeProduct.vendor || "LATTAFA"}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 leading-tight">
                {activeProduct.title}
              </h1>
            </div>

            {/* Ratings Summary */}
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center text-stone-900">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-current text-stone-900"
                  />
                ))}
              </div>
              <span className="text-stone-600 font-medium">{activeProduct.review_count || 173} reseñas</span>
            </div>

            {/* Single Pulsing Stock Status Indicator */}
            <div className="flex items-center space-x-2 pt-1">
              {activeProduct.is_available && (
                <span className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-700">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span>En stock</span>
                </span>
              )}
            </div>

            {/* Price & Installments */}
            <div className="pt-1">
              <div className="text-3xl font-bold text-stone-900">
                S/ {price.toFixed(2)}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                <u>Envío</u> calculado en la pantalla de pago.
              </p>
              <div className="text-xs sm:text-sm text-stone-700 mt-1 flex items-center space-x-1.5">
                <span>Paga en 2 cuotas sin interés de <b>S/ {(price/2).toFixed(2)}</b> con</span>
                <span className="font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded text-[11px]">shopPay</span>
                <u className="cursor-pointer font-medium font-serif">Conocer más</u>
              </div>
            </div>

            {/* Size Variant Picker */}
            {activeProduct.variants && activeProduct.variants.length > 0 && (
              <div className="pt-2">
                <label className="block text-xs font-semibold text-stone-900 mb-1.5">
                  Tamaño: <span className="font-normal">{selectedVariant?.variant_title || "100ML"}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {activeProduct.variants.map((v) => (
                    <button
                      key={v.variant_id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                        selectedVariant?.variant_id === v.variant_id
                          ? 'bg-[#121212] text-white shadow-sm'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-gray-200'
                      }`}
                    >
                      {v.variant_title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Cart */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3">
                
                {/* Quantity Controller */}
                <div className="flex items-center border border-gray-200 rounded-full bg-stone-50 px-4 py-2.5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-5 h-5 flex items-center justify-center font-bold text-stone-700 hover:text-black transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-5 h-5 flex items-center justify-center font-bold text-stone-700 hover:text-black transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Main Add to Cart Button */}
                <button
                  onClick={() => addToCart(activeProduct, selectedVariant, quantity)}
                  disabled={!activeProduct.is_available}
                  className={`flex-1 py-4 px-10 rounded-full font-bold text-xs sm:text-sm uppercase tracking-widest transition-all shadow-md ${
                    activeProduct.is_available
                      ? 'bg-[#121212] hover:bg-stone-800 text-white cursor-pointer hover:shadow-lg'
                      : 'bg-[#808080] text-white cursor-not-allowed'
                  }`}
                >
                  {activeProduct.is_available ? 'AÑADIR AL CARRITO' : 'AGOTADO'}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(activeProduct.id)}
                  className={`p-3.5 border rounded-full transition-all ${
                    isWishlisted
                      ? 'border-amber-600 bg-amber-50 text-amber-700'
                      : 'border-gray-200 text-stone-600 hover:border-gray-400'
                  }`}
                  title="Guardar en Favoritos"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-amber-600 text-amber-600' : ''}`} />
                </button>

              </div>
            </div>

            {/* Description & Perfume Notes Details */}
            <div className="pt-4 border-t border-gray-100 space-y-4">
              <h4 className="font-serif font-bold text-[#121212] text-lg sm:text-xl">
                {activeProduct.slogan || "Potencia, Confianza y Lujo Masculino."}
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {activeProduct.description_plain || "Descubre el cautivador contraste de calidez y frescura de esta exclusiva fragancia de Lattafa, elaborada para quienes aprecian la elegancia y la sofisticación moderna."}
              </p>

              {/* Notes Accordion Summary */}
              {(activeProduct.top_notes || activeProduct.heart_notes || activeProduct.base_notes) && (
                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/60 space-y-2 text-xs">
                  {activeProduct.top_notes && (
                    <div>
                      <span className="font-bold text-stone-900">Notas de Salida: </span>
                      <span className="text-stone-700">{activeProduct.top_notes}</span>
                    </div>
                  )}
                  {activeProduct.heart_notes && (
                    <div>
                      <span className="font-bold text-stone-900">Notas de Corazón: </span>
                      <span className="text-stone-700">{activeProduct.heart_notes}</span>
                    </div>
                  )}
                  {activeProduct.base_notes && (
                    <div>
                      <span className="font-bold text-stone-900">Notas de Fondo: </span>
                      <span className="text-stone-700">{activeProduct.base_notes}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Trust Perks List */}
            <div className="space-y-2 pt-3 border-t border-gray-100 text-xs text-stone-700">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-stone-800" />
                <span>Envío gratis en compras mayores a S/ 225.00</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-stone-800" />
                <span>Devoluciones sencillas</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-stone-800" />
                <span>Pago 100% Seguro</span>
              </div>
              <div className="flex items-center space-x-3 pt-1">
                <div className="flex items-center space-x-1 hover:underline cursor-pointer">
                  <Share2 className="w-3.5 h-3.5 text-stone-700" />
                  <span>Compartir</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1 hover:underline cursor-pointer">
                  <HelpCircle className="w-3.5 h-3.5 text-stone-700" />
                  <span>Hacer una pregunta</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* MIDDLE SECTION: 4 BRAND GUARANTEE PILLARS */}
      <section className="my-12 bg-[#f9f8f6] py-10 border-y border-stone-200/60">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          
          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-11 h-11 rounded-full border-2 border-stone-900 flex items-center justify-center mb-1">
              <CheckCircle2 className="w-5 h-5 text-stone-900" />
            </div>
            <h4 className="font-serif font-bold text-sm text-stone-900">Perfumes 100% Auténticos</h4>
            <p className="text-xs text-gray-500">Importado Directo de Lattafa Dubái</p>
          </div>

          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-11 h-11 rounded-full border-2 border-stone-900 flex items-center justify-center mb-1">
              <Package className="w-5 h-5 text-stone-900" />
            </div>
            <h4 className="font-serif font-bold text-sm text-stone-900">Devoluciones Sencillas</h4>
            <p className="text-xs text-gray-500">Garantía de Satisfacción</p>
          </div>

          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-11 h-11 rounded-full border-2 border-stone-900 flex items-center justify-center mb-1">
              <Truck className="w-5 h-5 text-stone-900" />
            </div>
            <h4 className="font-serif font-bold text-sm text-stone-900">Envío Gratis</h4>
            <p className="text-xs text-gray-500">En compras superiores a S/ 225.00</p>
          </div>

          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-11 h-11 rounded-full border-2 border-stone-900 flex items-center justify-center mb-1">
              <Lock className="w-5 h-5 text-stone-900" />
            </div>
            <h4 className="font-serif font-bold text-sm text-stone-900">Pago 100% Seguro</h4>
            <p className="text-xs text-gray-500">Tarjetas, Niubiz y Yape / PLIN</p>
          </div>

        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="w-full px-4 sm:px-10 lg:px-14 py-10 bg-[#fafafa]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-gray-200 gap-4">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-2">Opiniones de Clientes</h3>
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-stone-900">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-stone-900" />
                ))}
              </div>
              <span className="text-sm font-bold text-stone-900">4.9 de 5</span>
              <span className="text-xs text-gray-400 font-normal">Basado en 173 reseñas verificadas</span>
            </div>
          </div>

          {/* Rating Breakdown Bars */}
          <div className="w-full sm:w-64 space-y-1 text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="w-4">5★</span>
              <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-stone-900 h-full w-[90%]" />
              </div>
              <span className="w-6 text-right">155</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-4">4★</span>
              <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-stone-900 h-full w-[8%]" />
              </div>
              <span className="w-6 text-right">14</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-4">3★</span>
              <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-stone-900 h-full w-[2%]" />
              </div>
              <span className="w-6 text-right">3</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-4">2★</span>
              <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-stone-900 h-full w-[0%]" />
              </div>
              <span className="w-6 text-right">0</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-4">1★</span>
              <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-stone-900 h-full w-[1%]" />
              </div>
              <span className="w-6 text-right">1</span>
            </div>
          </div>

          <div>
            <button className="bg-[#121212] hover:bg-stone-800 text-white font-bold text-xs px-6 py-3 rounded-lg uppercase tracking-wider shadow-md transition-all">
              Escribir una Reseña
            </button>
          </div>

        </div>

        {/* Customer Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleReviews.map((rev) => (
            <div key={rev.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-stone-900">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium">{rev.date}</span>
                </div>

                <div className="flex items-center space-x-1.5 mb-2">
                  <span className="font-bold text-stone-900 text-xs">{rev.author}</span>
                  {rev.verified && (
                    <span className="bg-stone-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      Verificado
                    </span>
                  )}
                </div>

                <h5 className="font-bold text-stone-900 text-sm mb-1">{rev.title}</h5>
                <p className="text-xs text-gray-600 leading-relaxed">{rev.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Pagination Bar (1 2 3 > >|) */}
        <div className="flex items-center justify-center space-x-4 pt-8 text-xs font-semibold text-stone-900">
          <span className="w-7 h-7 rounded-full bg-stone-100 text-stone-900 flex items-center justify-center font-bold">1</span>
          <button className="text-stone-500 hover:text-stone-900 transition-colors">2</button>
          <button className="text-stone-500 hover:text-stone-900 transition-colors">3</button>
          <button className="text-stone-500 hover:text-stone-900 transition-colors">›</button>
          <button className="text-stone-500 hover:text-stone-900 transition-colors">»</button>
        </div>
      </section>

      {/* "YOU MAY ALSO LIKE" CAROUSEL SECTION */}
      <section className="w-full px-4 sm:px-10 lg:px-14 py-12 border-t border-gray-100">
        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 mb-6 tracking-tight">
          También te podría gustar
        </h3>

        {/* Mobile Horizontal Swipe Carousel / Desktop 4-Column Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory space-x-3.5 sm:space-x-4 pb-4 scrollbar-none sm:grid sm:grid-cols-2 md:grid-cols-4 sm:space-x-0 sm:gap-6">
          
          {/* Card 0: ShipInsure Package Protection Card */}
          <div className="w-[46%] xs:w-[44%] sm:w-auto flex-shrink-0 snap-start group cursor-pointer">
            <div className="relative aspect-[4/5] bg-[#0b0c16] rounded-2xl p-4 flex flex-col items-center justify-center overflow-hidden mb-2 border border-gray-800">
              <div className="w-14 h-14 sm:w-18 sm:h-18 bg-stone-900 rounded-xl flex items-center justify-center mb-1 border border-stone-700 shadow-md">
                <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-white stroke-[1.75]" />
              </div>
              
              {/* Quick Add Bag Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart({ id: 'shipinsure', title: 'Protección de Envío ShipInsure', min_price: 3.70, main_image: '' }, null, 1);
                }}
                className="absolute bottom-2.5 right-2.5 w-7 h-7 bg-white text-stone-900 rounded-full flex items-center justify-center shadow-xs hover:bg-stone-900 hover:text-white transition-all"
                title="Añadir Protección"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className="text-[10px] text-stone-500 font-medium block">ShipInsure</span>
            <h4 className="font-serif font-semibold text-stone-900 text-xs sm:text-sm line-clamp-2 leading-tight">Protección de Envío ShipInsure</h4>
            <span className="text-xs font-bold text-stone-900 mt-0.5 block">Desde S/ 3.70</span>
          </div>

          {/* Catalog Perfume Cards */}
          {(products || [])
            .filter((p) => p && activeProduct && p.id !== activeProduct.id)
            .slice(0, 7)
            .map((p) => (
              <div
                key={p.id}
                onClick={() => navigateToProduct(p)}
                className="w-[46%] xs:w-[44%] sm:w-auto flex-shrink-0 snap-start group cursor-pointer"
              >
                <div className="relative aspect-[4/5] bg-[#f8f6f2] rounded-2xl p-3 flex items-center justify-center overflow-hidden mb-2 border border-stone-200/50 group-hover:shadow-md transition-all">
                  <img
                    src={p.main_image}
                    alt={p.title}
                    className="max-h-full max-w-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Floating Add to Bag Icon Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p, null, 1);
                    }}
                    className="absolute bottom-2.5 right-2.5 w-7 h-7 bg-white text-stone-900 rounded-full flex items-center justify-center shadow-xs hover:bg-stone-900 hover:text-white transition-all opacity-90 group-hover:opacity-100"
                    title="Añadir a la bolsa"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-stone-500 font-medium block">Lattafa</span>
                <h4 className="font-serif font-semibold text-stone-900 text-xs sm:text-sm line-clamp-1">{p.title}</h4>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <span className="text-xs font-bold text-stone-900">S/ {p.min_price}</span>
                  {p.compare_at_price && (
                    <span className="text-[11px] text-stone-400 line-through">S/ {p.compare_at_price}</span>
                  )}
                </div>
              </div>
            ))}

        </div>
      </section>

      {/* SUBSCRIBE TO GET 10% OFF SECTION */}
      <section className="w-full bg-[#f8f6f2] py-12 px-6 sm:px-12 border-t border-stone-200/60">
        <div className="max-w-xl mx-auto text-center space-y-4">
          <h3 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 leading-tight">
            Suscríbete y recibe 10% de Descuento
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm">
            Recibe novedades exclusivas y ofertas especiales.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="pt-2">
            <div className="relative max-w-md mx-auto">
              <input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                className="w-full bg-white border border-stone-200 rounded-full pl-5 pr-12 py-3.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 shadow-2xs"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-stone-900 hover:bg-stone-800 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-xs transition-colors"
              >
                ›
              </button>
            </div>
          </form>

          <p className="text-[11px] text-stone-500 pt-2">
            Al suscribirte aceptas los <a href="#terms" className="underline hover:text-stone-900">Términos de Uso</a> y la <a href="#privacy" className="underline hover:text-stone-900">Política de Privacidad</a>.
          </p>
        </div>
      </section>

      {/* STICKY BOTTOM BAR ON SCROLL */}
      {showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 shadow-2xl p-3 px-6 sm:px-12 flex items-center justify-between animate-fadeIn">
          
          {/* Left Thumbnail & Info */}
          <div className="flex items-center space-x-3">
            <img
              src={images[0]}
              alt=""
              className="w-12 h-12 object-contain bg-[#f4f4f4] p-1 rounded-lg border border-gray-200"
            />
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-sm line-clamp-1">{activeProduct.title}</h4>
              <span className="font-bold text-xs text-stone-900">S/ {price.toFixed(2)}</span>
            </div>
          </div>

          {/* Right Size Dropdown + Quantity Counter + Add to Cart Button */}
          <div className="flex items-center space-x-3">
            
            {/* Size Dropdown */}
            {activeProduct.variants && activeProduct.variants.length > 0 && (
              <select
                value={selectedVariant?.variant_id}
                onChange={(e) => {
                  const found = activeProduct.variants.find((v) => v.variant_id.toString() === e.target.value);
                  if (found) setSelectedVariant(found);
                }}
                className="hidden sm:block text-xs font-semibold border border-gray-300 rounded-full px-4 py-2 bg-stone-50 focus:outline-none"
              >
                {activeProduct.variants.map((v) => (
                  <option key={v.variant_id} value={v.variant_id}>
                    {v.variant_title} - S/ {parseFloat(v.price).toFixed(2)}
                  </option>
                ))}
              </select>
            )}

            {/* Quantity Counter */}
            <div className="hidden sm:flex items-center border border-gray-300 rounded-full bg-stone-50 px-3 py-1.5">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-2 font-bold text-xs">-</button>
              <span className="px-2 text-xs font-bold">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="px-2 font-bold text-xs">+</button>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={() => addToCart(activeProduct, selectedVariant, quantity)}
              disabled={!activeProduct.is_available}
              className={`py-3 px-8 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg transition-all ${
                activeProduct.is_available
                  ? 'bg-[#121212] hover:bg-stone-800 text-white'
                  : 'bg-[#808080] text-white cursor-not-allowed'
              }`}
            >
              {activeProduct.is_available ? 'ADD TO CART' : 'SOLD OUT'}
            </button>

          </div>

        </div>
      )}

    </div>
  );
};
