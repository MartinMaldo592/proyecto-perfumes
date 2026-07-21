import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductModal = () => {
  const { selectedProduct, setSelectedProduct, addToCart, toggleWishlist, wishlist } = useStore();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (selectedProduct) {
      const defaultVariant = (selectedProduct.variants && selectedProduct.variants[0]) || null;
      setSelectedVariant(defaultVariant);
      setActiveImage(selectedProduct.main_image || '');
      setQuantity(1);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const isWishlisted = wishlist.includes(selectedProduct.id);
  const price = selectedVariant ? parseFloat(selectedVariant.price) : parseFloat(selectedProduct.min_price);
  const compareAt = selectedVariant ? parseFloat(selectedVariant.compare_at_price) : parseFloat(selectedProduct.compare_at_price);

  const images = selectedProduct.all_images && selectedProduct.all_images.length > 0
    ? selectedProduct.all_images
    : [selectedProduct.main_image];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      
      {/* Modal Card Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-gray-100 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 bg-[#f8f8f8] p-6 flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-gray-100">
          <div className="w-full aspect-square relative flex items-center justify-center">
            <img
              src={activeImage || selectedProduct.main_image}
              alt={selectedProduct.title}
              className="max-h-80 w-auto object-contain drop-shadow-lg"
            />
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pt-4 max-w-full">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === img ? 'border-amber-600 scale-105 shadow' : 'border-gray-200 opacity-60'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Olfactory Pyramid */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            
            {/* Vendor & Category */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
                {selectedProduct.vendor || "Lattafa Parfums"}
              </span>
              <span className="text-[11px] bg-amber-100 text-amber-900 font-semibold px-2.5 py-0.5 rounded-full">
                {selectedProduct.gender || "Unisex"}
              </span>
            </div>

            {/* Product Title */}
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1 mb-2">
              {selectedProduct.title}
            </h2>

            {/* Ratings & Status */}
            <div className="flex items-center space-x-3 mb-4 text-xs text-gray-500">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="ml-1.5 font-bold text-stone-800">4.9</span>
              </div>
              <span>•</span>
              <span className="text-emerald-700 font-semibold flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1" /> In Stock (Direct USA)
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline space-x-3 mb-6 p-3 bg-stone-50 rounded-xl border border-stone-100">
              <span className="text-2xl font-bold text-stone-900">
                S/ {price.toFixed(2)}
              </span>
              {compareAt > price && (
                <span className="text-sm text-gray-400 line-through">
                  S/ {compareAt.toFixed(2)}
                </span>
              )}
              {selectedProduct.discount_percent > 0 && (
                <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                  Save {selectedProduct.discount_percent}%
                </span>
              )}
            </div>

            {/* Variant Picker */}
            {selectedProduct.variants && selectedProduct.variants.length > 1 && (
              <div className="mb-6">
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Select Size / Volume:
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.variants.map((v) => (
                    <button
                      key={v.variant_id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all ${
                        selectedVariant?.variant_id === v.variant_id
                          ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-sm'
                          : 'border-gray-200 text-stone-600 hover:border-gray-400'
                      }`}
                    >
                      {v.variant_title} - S/ {parseFloat(v.price).toFixed(2)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* OLFACTORY PYRAMID (FRAGRANCE NOTES) */}
            <div className="mb-6 bg-[#fcfbfa] p-4 rounded-xl border border-amber-900/10 space-y-2.5">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-widest flex items-center gap-1.5 border-b pb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Olfactory Notes Pyramid
              </h4>

              <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
                <div className="bg-amber-100/50 p-2 rounded-lg">
                  <span className="text-[10px] font-bold text-amber-900 block uppercase">Top Notes</span>
                  <p className="text-gray-700 text-[11px] font-medium leading-snug mt-0.5">
                    {selectedProduct.top_notes || "Bergamot, Citrus Accord"}
                  </p>
                </div>
                <div className="bg-amber-100/50 p-2 rounded-lg">
                  <span className="text-[10px] font-bold text-amber-900 block uppercase">Heart Notes</span>
                  <p className="text-gray-700 text-[11px] font-medium leading-snug mt-0.5">
                    {selectedProduct.heart_notes || "Lavender, Patchouli"}
                  </p>
                </div>
                <div className="bg-amber-100/50 p-2 rounded-lg">
                  <span className="text-[10px] font-bold text-amber-900 block uppercase">Base Notes</span>
                  <p className="text-gray-700 text-[11px] font-medium leading-snug mt-0.5">
                    {selectedProduct.base_notes || "Amber, Vanilla, Oud"}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <div className="flex items-center space-x-3">
              
              {/* Quantity Adjuster */}
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-stone-600 hover:bg-gray-200 font-bold"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-bold text-stone-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-stone-600 hover:bg-gray-200 font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={() => {
                  addToCart(selectedProduct, selectedVariant, quantity);
                  setSelectedProduct(null);
                }}
                className="flex-1 bg-[#121212] hover:bg-amber-700 text-white py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Shopping Cart</span>
              </button>

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className={`p-3.5 border rounded-xl transition-colors ${
                  isWishlisted ? 'border-amber-600 bg-amber-50 text-amber-600' : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-gray-500 pt-1">
              <Truck className="w-3.5 h-3.5 text-amber-600" />
              <span>Spend $60 for <b>FREE Shipping</b> across North America.</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
