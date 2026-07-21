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
              <h3 className="font-serif font-bold text-lg text-stone-900">Tu Bolsa de Compras</h3>
              <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                {cart.length} productos
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
                  Agrega <b className="text-amber-400">S/ {amountToFreeShipping.toFixed(2)}</b> más para obtener <b>ENVÍO GRATIS</b>!
                </span>
              ) : (
                <span className="text-emerald-400 font-bold">
                  ¡Felicidades! ¡Desbloqueaste ENVÍO GRATIS!
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
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto stroke-[1.25]" />
                <h4 className="font-serif text-lg text-stone-700 font-medium">Tu bolsa de compras está vacía</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Explora nuestras fragancias árabes de lujo y descubre tu nuevo aroma exclusivo.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase px-6 py-3 rounded-xl tracking-wider shadow-md transition-all inline-block cursor-pointer"
                >
                  Comenzar a Comprar
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.variant.variant_id}`}
                  className="flex space-x-4 p-3 bg-stone-50 rounded-xl border border-stone-200/60 relative group"
                >
                  {/* Item Image */}
                  <img
                    src={item.product.main_image || item.variant.image}
                    alt={item.product.title}
                    className="w-20 h-20 object-contain bg-white rounded-lg p-1.5 border border-stone-200"
                  />

                  {/* Item Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif font-bold text-stone-900 text-sm line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.variant.variant_id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-[11px] text-gray-500 font-medium block">
                        Tamaño: {item.variant.variant_title}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                        <button
                          onClick={() => updateQuantity(item.variant.variant_id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-stone-100 rounded-l-lg cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variant.variant_id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-stone-100 rounded-r-lg cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-bold text-xs text-stone-900">
                        S/ {((parseFloat(item.variant.price) || 0) * item.quantity).toFixed(2)}
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
                    <span className="font-bold text-stone-800 block">Protección de Envío ShipInsure</span>
                    <span className="text-[10px] text-gray-500">Cubre pérdida, daño y robo por S/ 4.90</span>
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
                  <span className="font-semibold">S/ {cartSubtotal.toFixed(2)}</span>
                </div>
                {includeShipInsure && (
                  <div className="flex justify-between text-gray-600">
                    <span>Protección de Envío</span>
                    <span className="font-semibold">S/ {shipInsureCost.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-900 text-sm font-bold pt-2 border-t">
                  <span>Total Estimado</span>
                  <span className="text-amber-800 text-base">S/ {cartGrandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTAs */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => alert(`Procesando Compra. Total: S/ ${cartGrandTotal.toFixed(2)}`)}
                  className="w-full bg-[#121212] hover:bg-amber-800 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg cursor-pointer"
                >
                  <span>Comprar • S/ {cartGrandTotal.toFixed(2)}</span>
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
