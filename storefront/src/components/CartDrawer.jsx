import React from 'react';
import { X, Trash2, ShieldCheck, Truck, ArrowRight, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartGrandTotal,
    includeShipInsure,
    setIncludeShipInsure,
    shipInsureCost,
    amountToFreeShipping,
    freeShippingProgress,
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        {/* Slide-over Panel */}
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-gray-100">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-stone-50">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-amber-800" />
              <h3 className="font-serif font-bold text-lg text-stone-900">Your Shopping Bag</h3>
              <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                {cart.length} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-gray-500 hover:text-stone-900 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* FREE SHIPPING THRESHOLD PROGRESS BAR */}
          <div className="bg-amber-950 text-white p-4 border-b border-amber-900/50">
            <div className="flex items-center space-x-2 text-xs font-semibold mb-2">
              <Truck className="w-4 h-4 text-amber-400" />
              {amountToFreeShipping > 0 ? (
                <span>
                  Spend <b className="text-amber-400">${amountToFreeShipping.toFixed(2)}</b> more to unlock <b>FREE SHIPPING</b>!
                </span>
              ) : (
                <span className="text-emerald-400 font-bold">
                  🎉 Congratulations! You unlocked FREE SHIPPING!
                </span>
              )}
            </div>

            {/* Progress Bar Track */}
            <div className="w-full bg-amber-900/60 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-stone-800 text-base">Your Bag is Empty</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Discover Lattafa Arabian Eau De Parfum series and add your favorite scents.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#121212] text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-amber-700 transition-colors"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex space-x-4 p-3 bg-stone-50 rounded-xl border border-stone-100 hover:border-gray-200 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-white rounded-lg p-1 flex items-center justify-center border border-gray-100 flex-shrink-0">
                    <img
                      src={item.product.main_image}
                      alt={item.product.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif font-bold text-stone-900 text-sm line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.variant.variant_id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <span className="text-[11px] text-gray-500 block">
                        {item.variant.variant_title || "100 ml"}
                      </span>
                    </div>

                    {/* Quantity & Item Subtotal */}
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-gray-300 rounded bg-white">
                        <button
                          onClick={() => updateQuantity(item.variant.variant_id, -1)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variant.variant_id, 1)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-bold text-xs text-stone-900">
                        ${((parseFloat(item.variant.price) || 0) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-stone-50 space-y-4">
              
              {/* ShipInsure Addon */}
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-900/10 text-xs">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="font-bold text-stone-800 block">ShipInsure Protection</span>
                    <span className="text-[10px] text-gray-500">Covers loss, damage & theft for $1.30</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeShipInsure}
                  onChange={(e) => setIncludeShipInsure(e.target.checked)}
                  className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
                />
              </div>

              {/* Subtotal & Totals */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${cartSubtotal.toFixed(2)} USD</span>
                </div>
                {includeShipInsure && (
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping Protection</span>
                    <span className="font-semibold">${shipInsureCost.toFixed(2)} USD</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-900 text-sm font-bold pt-2 border-t">
                  <span>Estimated Total</span>
                  <span className="text-amber-800 text-base">${cartGrandTotal.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Checkout CTAs */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => alert(`Redirecting to Checkout! Total: $${cartGrandTotal.toFixed(2)} USD`)}
                  className="w-full bg-[#121212] hover:bg-amber-800 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg"
                >
                  <span>Checkout • ${cartGrandTotal.toFixed(2)} USD</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => alert(`Redirecting to Standard Checkout without Protection!`)}
                  className="w-full text-[11px] text-gray-500 hover:text-stone-900 underline text-center block pt-1"
                >
                  or Checkout without protection
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
