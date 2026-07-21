import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export const FREE_SHIPPING_THRESHOLD = 225.00; // S/ 225.00 PEN (approx $60 USD)
export const EXCHANGE_RATE = 3.75; // 1 USD = 3.75 PEN

export const formatCurrency = (amount) => {
  const num = parseFloat(amount) || 0;
  return `S/ ${num.toFixed(2)}`;
};

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const COLLECTION_TITLES = {
    all: 'Todas las Fragancias',
    men: 'Colección de Hombres',
    women: 'Colección de Mujeres',
    unisex: 'Fragancias Unisex',
    lattafa: 'Colección Lattafa',
    pride: 'Colección Lattafa Pride',
    bundles: 'Kits y Packs Exclusivos',
    bestsellers: 'Los Más Vendidos',
    new: 'Nuevos Lanzamientos'
  };

  // Real URL Router, Active Product & Active Collection
  const [activePage, setActivePage] = useState('home'); // 'home' | 'product' | 'collection'
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeCollection, setActiveCollection] = useState({ handle: 'all', title: 'Todas las Fragancias' });

  // Quick View Modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [wishlist, setWishlist] = useState([]);
  const [includeShipInsure, setIncludeShipInsure] = useState(true);

  const formatTitle = (handle) => {
    if (!handle || handle === 'all') return 'Todas las Fragancias';
    const key = handle.toLowerCase();
    if (COLLECTION_TITLES[key]) return COLLECTION_TITLES[key];
    const words = handle.replace(/-/g, ' ').split(' ');
    return words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

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
    } else if (path.startsWith('/collections/')) {
      const handle = path.replace('/collections/', '').replace(/\/$/, '');
      setActiveCollection({ handle, title: formatTitle(handle) });
      setActivePage('collection');
      return;
    }
    setActivePage('home');
    setActiveProduct(null);
  };

  // Load scraped products JSON on mount & convert prices to Peruvian Soles (PEN) at 3.75 exchange rate
  useEffect(() => {
    fetch('/data/lattafa_perfumes.json')
      .then((res) => res.json())
      .then((data) => {
        const convertedData = data.map((p) => {
          const minPricePen = p.min_price ? (parseFloat(p.min_price) * EXCHANGE_RATE).toFixed(2) : '0.00';
          const maxPricePen = p.max_price ? (parseFloat(p.max_price) * EXCHANGE_RATE).toFixed(2) : '0.00';
          const comparePricePen = p.compare_at_price ? (parseFloat(p.compare_at_price) * EXCHANGE_RATE).toFixed(2) : '';
          const discount = comparePricePen && parseFloat(comparePricePen) > parseFloat(minPricePen)
            ? Math.round(((parseFloat(comparePricePen) - parseFloat(minPricePen)) / parseFloat(comparePricePen)) * 100)
            : 0;

          return {
            ...p,
            min_price: minPricePen,
            max_price: maxPricePen,
            compare_at_price: comparePricePen,
            discount_percent: discount,
            variants: (p.variants || []).map((v) => ({
              ...v,
              price: v.price ? (parseFloat(v.price) * EXCHANGE_RATE).toFixed(2) : minPricePen,
              compare_at_price: v.compare_at_price ? (parseFloat(v.compare_at_price) * EXCHANGE_RATE).toFixed(2) : ''
            }))
          };
        });

        setProducts(convertedData);
        setLoading(false);
        syncRouteWithLocation(convertedData);
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

  const [ambientTheme, setAmbientTheme] = useState({
    bg: '#ffffff',
    glow: 'rgba(212, 175, 55, 0.08)',
    accent: '#d4b068'
  });

  const getFragrancePalette = (product) => {
    if (!product) return { bg: '#ffffff', glow: 'rgba(212, 175, 55, 0.08)', accent: '#d4b068' };
    const name = (product.title || '').toLowerCase();
    const handle = (product.handle || '').toLowerCase();

    if (name.includes('black') || name.includes('oud') || handle.includes('badee')) {
      return { bg: '#171615', glow: 'rgba(212, 175, 55, 0.15)', accent: '#d4b068', textDark: false };
    }
    if (name.includes('yara') || name.includes('candy') || name.includes('pink')) {
      return { bg: '#faf4f6', glow: 'rgba(244, 182, 194, 0.25)', accent: '#e07a93', textDark: true };
    }
    if (name.includes('khamrah') || name.includes('vanille') || name.includes('amber')) {
      return { bg: '#fdf8f2', glow: 'rgba(217, 149, 70, 0.2)', accent: '#c87c2b', textDark: true };
    }
    if (name.includes('his confession') || name.includes('blue') || name.includes('musam')) {
      return { bg: '#f4f6fa', glow: 'rgba(92, 128, 188, 0.18)', accent: '#4a6fa5', textDark: true };
    }
    return { bg: '#fcfbf9', glow: 'rgba(212, 175, 55, 0.12)', accent: '#d4b068', textDark: true };
  };

  const [pageTransitioning, setPageTransitioning] = useState(false);

  /**
   * CONFIGURACIÓN DE DURACIÓN DEL SKELETON (TRANSICIÓN DE PÁGINA)
   * 
   * NOTA PARA FUTURA MODIFICACIÓN A "CARGA AUTOMÁTICA REAL":
   * Para hacer que el skeleton desaparezca exactamente cuando las imágenes de alta resolución
   * del producto o colección terminen de cargar (onLoad real del DOM), puedes:
   * 1. Eliminar los timeouts fijos de abajo.
   * 2. Mantener setPageTransitioning(true) en el evento onClick.
   * 3. Escuchar el evento onLoad de la imagen principal en ProductPage.jsx / CollectionPage.jsx
   *    y llamar a setPageTransitioning(false).
   */
  const triggerPageTransition = (callback) => {
    setPageTransitioning(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      callback();
      setTimeout(() => {
        setPageTransitioning(false);
      }, 450); // Duración moderada actual (450ms)
    }, 450);
  };

  const navigateToProduct = (product) => {
    triggerPageTransition(() => {
      const palette = getFragrancePalette(product);
      setAmbientTheme(palette);
      document.documentElement.style.setProperty('--page-bg-color', palette.bg);

      const targetUrl = `/products/${product.handle || product.id}`;
      window.history.pushState({ handle: product.handle }, '', targetUrl);
      setActiveProduct(product);
      setActivePage('product');
    });
  };

  const navigateToCollection = (handle = 'all', title = null) => {
    triggerPageTransition(() => {
      const palette = { bg: '#ffffff', glow: 'rgba(212, 175, 55, 0.08)', accent: '#d4b068', textDark: true };
      setAmbientTheme(palette);
      document.documentElement.style.setProperty('--page-bg-color', '#ffffff');

      const targetUrl = `/collections/${handle}`;
      const displayTitle = title || formatTitle(handle);
      window.history.pushState({ handle }, '', targetUrl);
      setActiveCollection({ handle, title: displayTitle });
      setActivePage('collection');
    });
  };

  const navigateToHome = () => {
    triggerPageTransition(() => {
      const palette = { bg: '#ffffff', glow: 'rgba(212, 175, 55, 0.08)', accent: '#d4b068', textDark: true };
      setAmbientTheme(palette);
      document.documentElement.style.setProperty('--page-bg-color', '#ffffff');

      window.history.pushState(null, '', '/');
      setActivePage('home');
      setActiveProduct(null);
    });
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
  
  const shipInsureCost = includeShipInsure && cart.length > 0 ? 4.90 : 0.00;
  const cartGrandTotal = cartSubtotal + shipInsureCost;
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <StoreContext.Provider
      value={{
        products,
        loading,
        pageTransitioning,
        ambientTheme,
        cart,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isFilterOpen,
        setIsFilterOpen,
        activePage,
        activeProduct,
        activeCollection,
        navigateToProduct,
        navigateToCollection,
        navigateToHome,
        formatCurrency,
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
