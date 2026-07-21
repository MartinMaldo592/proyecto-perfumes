import React from 'react';
import { Search, ShoppingBag, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductCard = ({ product }) => {
  const { addToCart, setSelectedProduct, navigateToProduct, toggleWishlist, wishlist } = useStore();

  const isWishlisted = wishlist.includes(product.id);
  const minPrice = parseFloat(product.min_price) || 0;
  const comparePrice = parseFloat(product.compare_at_price) || 0;
  const discount = product.discount_percent || 0;

  const mainImage = product.main_image || "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&auto=format&fit=crop";
  const hoverImage = (product.all_images && product.all_images.length > 1)
    ? product.all_images[1]
    : mainImage;

  return (
    <div className="group relative bg-transparent overflow-hidden transition-all duration-300 flex flex-col justify-between h-full">
      
      {/* Top Media Stage & Hover Cross-Fade Images (Clean Borderless Soft Gray Stage matching original site) */}
      <div 
        onClick={() => navigateToProduct(product)}
        className="relative aspect-square bg-[#f4f4f4] rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center p-5 cursor-pointer"
      >
        
        {/* Badges (Sold out / Stock) */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 pointer-events-none">
          {!product.is_available ? (
            <span className="bg-[#121212]/80 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider">
              Agotado
            </span>
          ) : discount > 0 ? (
            <span className="bg-amber-700 text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
              -{discount}% OFF
            </span>
          ) : null}
        </div>

        {/* Floating Quick View (Search Icon Button Top-Right on Hover) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProduct(product);
          }}
          className="absolute top-3 right-3 z-30 w-9 h-9 bg-white text-stone-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 shadow-md hover:bg-stone-900 hover:text-white"
          title="Vista Rápida"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Primary Image (Bottle Only - Fades Out on Hover) */}
        <img
          src={mainImage}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0 pointer-events-none select-none max-h-full"
          loading="lazy"
        />

        {/* Secondary Image (Bottle + Box Packaging - Fades In on Hover) */}
        <img
          src={hoverImage}
          alt={`${product.title} con empaque de caja`}
          className="absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-105 transition-transform duration-700 pointer-events-none select-none max-h-full"
          loading="lazy"
        />

        {/* Mobile Quick Add Bag Icon Button (Floating Bottom-Right on Stage) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          disabled={!product.is_available}
          className="sm:hidden absolute bottom-3 right-3 z-30 w-9 h-9 bg-white text-stone-900 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all"
          title="Añadir al Carrito"
        >
          <ShoppingBag className="w-4 h-4 text-stone-900 stroke-[2]" />
        </button>

        {/* White Pill ADD TO CART Button at Bottom on Hover (Desktop) */}
        <div className="hidden sm:flex absolute bottom-4 inset-x-4 z-20 justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            disabled={!product.is_available}
            className={`w-full max-w-[200px] py-3 px-5 rounded-full font-bold text-xs tracking-widest uppercase shadow-xl transition-all duration-300 ${
              product.is_available
                ? 'bg-white text-[#121212] hover:bg-[#121212] hover:text-white border border-gray-200'
                : 'bg-stone-300 text-stone-500 cursor-not-allowed'
            }`}
          >
            {product.is_available ? 'AÑADIR AL CARRITO' : 'AGOTADO'}
          </button>
        </div>

      </div>

      {/* Card Body Details Below Image Stage Container */}
      <div className="pt-3 pb-1 bg-transparent flex flex-col flex-grow justify-between text-left">
        <div>
          {/* Vendor */}
          <span className="text-[12px] text-stone-500 font-normal block mb-0.5">
            {product.vendor || "Lattafa"}
          </span>

          {/* Title */}
          <h3
            onClick={() => navigateToProduct(product)}
            className="font-serif font-bold text-stone-900 text-sm sm:text-base hover:text-amber-800 cursor-pointer line-clamp-1 transition-colors"
          >
            {product.title}
          </h3>
        </div>

        {/* Price & Wishlist */}
        <div className="pt-1 flex items-center justify-between mt-1">
          <div className="flex items-baseline space-x-2">
            <span className="text-xs sm:text-sm font-bold text-stone-900">
              {comparePrice > minPrice ? (
                <>
                  <span className="text-red-700 font-bold">S/ {minPrice.toFixed(2)}</span>
                  <span className="text-xs text-gray-400 line-through ml-1.5">S/ {comparePrice.toFixed(2)}</span>
                </>
              ) : (
                <span>S/ {minPrice.toFixed(2)}</span>
              )}
            </span>
          </div>

          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-1.5 rounded-full transition-colors ${
              isWishlisted ? 'text-amber-600' : 'text-gray-400 hover:text-stone-800'
            }`}
          >
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
          </button>
        </div>

      </div>
    </div>
  );
};
