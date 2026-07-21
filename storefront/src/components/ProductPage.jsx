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
  Gift
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductPage = () => {
  const { activeProduct, navigateToHome, addToCart, toggleWishlist, wishlist } = useStore();

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);

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

      {/* Breadcrumb Navigation */}
      <div className="w-full px-3 sm:px-10 lg:px-14 pt-3 sm:pt-4 pb-2">
        <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
          <button onClick={navigateToHome} className="hover:text-stone-900 transition-colors">
            Home
          </button>
          <span>›</span>
          <button onClick={navigateToHome} className="hover:text-stone-900 transition-colors">
            All Fragrances
          </button>
          <span>›</span>
          <span className="text-stone-900 font-semibold">{activeProduct.title}</span>
        </div>
      </div>

      {/* Main PDP Content Container */}
      <div className="w-full px-2 sm:px-10 lg:px-14 py-1 sm:py-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: IMAGE GALLERY (7 Columns in LG - STICKY ON SCROLL) */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start lg:sticky lg:top-24 lg:self-start">
            
            {/* Desktop & Tablet Vertical/Horizontal Thumbnails List (hidden on small mobile) */}
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

            {/* Main Image Stage Container - Edge-to-Edge on Mobile */}
            <div className="relative flex-1 bg-[#f5f5f5] rounded-2xl sm:rounded-3xl p-4 sm:p-10 flex items-center justify-center border border-gray-100/60 h-[380px] xs:h-[420px] sm:h-[500px] lg:h-[540px] w-full overflow-hidden">
              
              {/* Zoom Search Button Top-Right */}
              <button className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 bg-white/90 hover:bg-white text-stone-800 rounded-full flex items-center justify-center shadow-xs transition-all">
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Carousel Prev/Next Arrow Buttons (Desktop/Tablet) */}
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

              {/* Active Image View */}
              <img
                src={images[currentImgIdx] || activeProduct.main_image}
                alt={activeProduct.title}
                className="max-h-[340px] xs:max-h-[380px] sm:max-h-[440px] lg:max-h-[460px] w-auto h-auto object-contain transition-all duration-300"
              />
            </div>

            {/* Mobile Pagination Counter Controls (< 1/3 >) */}
            {images.length > 1 && (
              <div className="flex sm:hidden items-center justify-center space-x-6 text-xs font-semibold text-stone-900 w-full py-1">
                <button onClick={handlePrevImg} className="p-1 text-stone-700 hover:text-stone-900">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span>{currentImgIdx + 1} / {images.length}</span>
                <button onClick={handleNextImg} className="p-1 text-stone-700 hover:text-stone-900">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: SPECS & BUY SECTION (5 Columns in LG - COMPACT TIGHT LAYOUT) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Vendor */}
            <span className="text-xs font-medium text-stone-500 block">
              {activeProduct.vendor || "Lattafa"}
            </span>

            {/* Stock Pill Badge */}
            <div>
              {!activeProduct.is_available ? (
                <span className="bg-stone-300 text-stone-700 text-xs font-bold px-3.5 py-1 rounded-md uppercase tracking-wider inline-block">
                  Sold out
                </span>
              ) : (
                <span className="inline-flex items-center space-x-1.5 bg-[#e8f5e9] text-[#2e7d32] px-3.5 py-1 rounded-full text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#4caf50]"></span>
                  <span>In stock</span>
                </span>
              )}
            </div>

            {/* Product Title */}
            <h1 className="font-serif text-4xl sm:text-5xl font-normal text-stone-900 tracking-tight leading-tight">
              {activeProduct.title}
            </h1>

            {/* Star Rating Header */}
            <div className="flex items-center space-x-1.5 text-xs sm:text-sm">
              <div className="flex items-center text-stone-900">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <a href="#reviews-section" className="text-stone-700 hover:underline font-medium">
                173 reviews
              </a>
            </div>

            {/* Stock status indicator */}
            <div className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-500">
              <span className={`w-2.5 h-2.5 rounded-full ${activeProduct.is_available ? 'bg-emerald-500' : 'bg-stone-400'}`}></span>
              <span>{activeProduct.is_available ? 'In stock' : 'Out of stock'}</span>
            </div>

            {/* Price & Installments */}
            <div className="pt-1">
              <div className="text-3xl font-bold text-stone-900">
                ${price.toFixed(2)} USD
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                <u>Shipping</u> calculated at checkout.
              </p>
              <div className="text-xs sm:text-sm text-stone-700 mt-1 flex items-center space-x-1.5">
                <span>Pay in 2 interest-free installments of <b>${(price/2).toFixed(2)}</b> with</span>
                <span className="font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded text-[11px]">shopPay</span>
                <u className="cursor-pointer font-medium">Learn more</u>
              </div>
            </div>

            {/* Size Variant Picker */}
            {activeProduct.variants && activeProduct.variants.length > 0 && (
              <div className="pt-2">
                <label className="block text-xs font-semibold text-stone-900 mb-1.5">
                  Size: <span className="font-normal">{selectedVariant?.variant_title || "100ML"}</span>
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

            {/* Description & Bullet points */}
            <div className="text-sm text-stone-700 leading-relaxed space-y-2.5 pt-2">
              <p className="font-semibold text-stone-900 text-base">
                Power. Confidence. Masculine luxury.
              </p>
              <p>
                {activeProduct.description_plain || "The Asad Collection by Lattafa is the ultimate fragrance set for men who want variety, strength, and presence in every spray."}
              </p>
              
              {/* Bullet points format matching screenshots */}
              <ul className="space-y-1.5 text-sm text-stone-800 font-medium pt-1">
                <li>• <b>Asad Original</b> – bold and commanding</li>
                <li>• <b>Asad Zanzibar</b> – fresh, modern, and confident</li>
                <li>• <b>Asad Bourbon</b> – deep, warm, and masculine</li>
                <li>• <b>Asad Elixir</b> – intense, refined, and powerful</li>
              </ul>
            </div>

            {/* Wishlist Link */}
            <div className="pt-2">
              <button
                onClick={() => toggleWishlist(activeProduct.id)}
                className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-stone-800 hover:text-amber-800 tracking-wider uppercase cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-amber-600 text-amber-600' : ''}`} />
                <span>{isWishlisted ? 'ADDED TO WISHLIST' : 'ADD TO WISHLIST'}</span>
              </button>
            </div>

            {/* Quantity Selector + Add to Cart CTA */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center space-x-4">
                
                {/* Quantity */}
                <div className="flex items-center border border-gray-300 rounded-full bg-stone-50 px-4 py-2.5">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-2 font-bold text-stone-600 hover:text-stone-900 text-sm">-</button>
                  <span className="px-3 text-sm font-bold text-stone-900">{quantity}</span>
                  <button onClick={() => setQuantity((q) => q + 1)} className="px-2 font-bold text-stone-600 hover:text-stone-900 text-sm">+</button>
                </div>

                {/* Add to Cart Rounded Button */}
                <button
                  onClick={() => addToCart(activeProduct, selectedVariant, quantity)}
                  disabled={!activeProduct.is_available}
                  className={`flex-1 py-4 px-10 rounded-full font-bold text-xs sm:text-sm uppercase tracking-widest transition-all shadow-md ${
                    activeProduct.is_available
                      ? 'bg-[#121212] hover:bg-stone-800 text-white'
                      : 'bg-[#808080] text-white cursor-not-allowed'
                  }`}
                >
                  {activeProduct.is_available ? 'ADD TO CART' : 'SOLD OUT'}
                </button>
              </div>
            </div>

            {/* Trust Perks List */}
            <div className="space-y-2 pt-3 border-t border-gray-100 text-xs text-stone-700">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-stone-800" />
                <span>Free Shipping in orders over $60</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-stone-800" />
                <span>Easy Return</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-stone-800" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-3 pt-1">
                <div className="flex items-center space-x-1 hover:underline cursor-pointer">
                  <Share2 className="w-3.5 h-3.5 text-stone-700" />
                  <span>Share</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1 hover:underline cursor-pointer">
                  <HelpCircle className="w-3.5 h-3.5 text-stone-700" />
                  <span>Ask a question</span>
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
            <h4 className="font-serif font-bold text-sm text-stone-900">100% Authentic Fragrances</h4>
            <p className="text-xs text-gray-500">Direct from Lattafa</p>
          </div>

          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-11 h-11 rounded-full border-2 border-stone-900 flex items-center justify-center mb-1">
              <Package className="w-5 h-5 text-stone-900" />
            </div>
            <h4 className="font-serif font-bold text-sm text-stone-900">Easy Returns</h4>
            <p className="text-xs text-gray-500">Satisfaction Guarantee</p>
          </div>

          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-11 h-11 rounded-full border-2 border-stone-900 flex items-center justify-center mb-1">
              <Truck className="w-5 h-5 text-stone-900" />
            </div>
            <h4 className="font-serif font-bold text-sm text-stone-900">Free Shipping</h4>
            <p className="text-xs text-gray-500">On orders over $100</p>
          </div>

          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-11 h-11 rounded-full border-2 border-stone-900 flex items-center justify-center mb-1">
              <Lock className="w-5 h-5 text-stone-900" />
            </div>
            <h4 className="font-serif font-bold text-sm text-stone-900">Secure Checkout</h4>
            <p className="text-xs text-gray-500">Apple Pay, PayPal & Stripe</p>
          </div>

        </div>
      </section>

      {/* CUSTOMER REVIEWS SECTION */}
      <section id="reviews-section" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h3 className="font-serif font-semibold text-2xl text-center text-stone-900 mb-8">
          Customer Reviews
        </h3>

        {/* Rating Overview Summary Box */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-1 text-stone-900 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-bold text-base text-stone-900">4.43 out of 5</span>
            <span className="text-xs text-gray-500">Based on 7 reviews ✓</span>
          </div>

          {/* Progress Distribution Bars */}
          <div className="w-full max-w-xs space-y-1.5 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-12 font-medium text-gray-600">5 stars</span>
              <div className="flex-1 bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-stone-900 h-full w-[85%]"></div>
              </div>
              <span className="w-6 text-right font-semibold">6</span>
            </div>

            <div className="flex items-center space-x-2 text-gray-400">
              <span className="w-12 font-medium">4 stars</span>
              <div className="flex-1 bg-gray-100 h-2.5 rounded-full"></div>
              <span className="w-6 text-right">0</span>
            </div>

            <div className="flex items-center space-x-2 text-gray-400">
              <span className="w-12 font-medium">3 stars</span>
              <div className="flex-1 bg-gray-100 h-2.5 rounded-full"></div>
              <span className="w-6 text-right">0</span>
            </div>

            <div className="flex items-center space-x-2 text-gray-400">
              <span className="w-12 font-medium">2 stars</span>
              <div className="flex-1 bg-gray-100 h-2.5 rounded-full"></div>
              <span className="w-6 text-right">0</span>
            </div>

            <div className="flex items-center space-x-2 text-gray-400">
              <span className="w-12 font-medium">1 star</span>
              <div className="flex-1 bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-stone-400 h-full w-[15%]"></div>
              </div>
              <span className="w-6 text-right">1</span>
            </div>
          </div>

          <div>
            <button className="bg-[#121212] hover:bg-stone-800 text-white font-bold text-xs px-6 py-3 rounded-lg uppercase tracking-wider shadow-md transition-all">
              Write a review
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
                      Verified
                    </span>
                  )}
                </div>

                <h5 className="font-bold text-stone-900 text-sm mb-1">{rev.title}</h5>
                <p className="text-xs text-gray-600 leading-relaxed">{rev.body}</p>
              </div>
            </div>
          ))}
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
              <span className="font-bold text-xs text-stone-900">${price.toFixed(2)} USD</span>
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
                    {v.variant_title} - ${v.price}
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
