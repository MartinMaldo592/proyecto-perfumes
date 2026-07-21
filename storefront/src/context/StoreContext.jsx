import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export const FREE_SHIPPING_THRESHOLD = 60.00; // USD

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Real URL Router & Active Product
  const [activePage, setActivePage] = useState('home'); // 'home' | 'product'
  const [activeProduct, setActiveProduct] = useState(null);
  
  // Quick View Modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [wishlist, setWishlist] = useState([]);
  const [includeShipInsure, setIncludeShipInsure] = useState(true);

  // Sync route based on window.location.pathname
  const syncRouteWithLocation = (catalog = products) => {
    const path = window.location.pathname;
    if (path.startsWith('/products/')) {
      const handle = path.replace('/products/', '').replace(/\/$/, '');
      if (catalog && catalog.length > 0) {
        const found = catalog.find((p) => p.handle === handle || p.id?.toString() === handle);
        if (found) {
          setActiveProduct(found);
          setActivePage('product');
          return;
        }
      }
    }
    setActivePage('home');
    setActiveProduct(null);
  };

  // Load scraped products JSON on mount & sync route
  useEffect(() => {
    fetch('/data/lattafa_perfumes.json')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
        syncRouteWithLocation(data);
      })
      .catch((err) => {
        console.error('Failed to load perfumes catalog:', err);
        setLoading(false);
      });
  }, []);

  // Listen to browser Back/Forward popstate
  useEffect(() => {
    const handlePopState = () => {
      syncRouteWithLocation(products);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [products]);

  const navigateToProduct = (product) => {
    const targetUrl = `/products/${product.handle || product.id}`;
    window.history.pushState({ handle: product.handle }, '', targetUrl);
    setActiveProduct(product);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.history.pushState(null, '', '/');
    setActivePage('home');
    setActiveProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product, selectedVariant = null, quantity = 1) => {
    const variant = selectedVariant || (product.variants && product.variants[0]) || {
      variant_id: product.id,
      variant_title: product.volume || "100 ml",
      price: product.min_price,
      sku: product.id
    };

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.variant.variant_id === variant.variant_id
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, variant, quantity }];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (variantId) => {
    setCart((prev) => prev.filter((item) => item.variant.variant_id !== variantId));
  };

  const updateQuantity = (variantId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.variant.variant_id === variantId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Calculations
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + (parseFloat(item.variant.price) || 0) * item.quantity,
    0
  );
  
  const shipInsureCost = includeShipInsure && cart.length > 0 ? 1.30 : 0.00;
  const cartGrandTotal = cartSubtotal + shipInsureCost;
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <StoreContext.Provider
      value={{
        products,
        loading,
        cart,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isFilterOpen,
        setIsFilterOpen,
        activePage,
        activeProduct,
        navigateToProduct,
        navigateToHome,
        selectedProduct,
        setSelectedProduct,
        wishlist,
        toggleWishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartGrandTotal,
        cartItemCount,
        includeShipInsure,
        setIncludeShipInsure,
        shipInsureCost,
        amountToFreeShipping,
        freeShippingProgress,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
