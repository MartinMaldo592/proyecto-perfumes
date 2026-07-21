import React, { useState } from 'react';
import { Search, ShoppingBag, User, ChevronDown, ArrowUpRight, ChevronLeft, ChevronRight, Menu, X, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header = () => {
  const { cartItemCount, setIsCartOpen, setIsSearchOpen, wishlist, navigateToHome, navigateToProduct, navigateToCollection, products } = useStore();
  const [activeMenu, setActiveMenu] = useState(null);
  const [trendIndex, setTrendIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileSubmenu, setExpandedMobileSubmenu] = useState(null);

  // Trending items for SHOP menu
  const trendItems = [
    { title: "Afeef", price: "S/ 187.50", soldOut: true, image: "https://cdn.shopify.com/s/files/1/0556/4101/4371/files/Afeef.png?v=1700000000" },
    { title: "Asad", price: "Desde S/ 56.20", soldOut: false, image: "https://cdn.shopify.com/s/files/1/0556/4101/4371/files/Asad.png?v=1700000000" },
    { title: "Khamrah Waha", price: "S/ 187.50", soldOut: false, image: "https://cdn.shopify.com/s/files/1/0556/4101/4371/files/Khamrah_Waha.png?v=1700000000" }
  ];

  const newArrivalsCards = [
    { title: "Atheeri", image: "https://www.lattafa-usa.com/cdn/shop/files/Atheeri-1_f93156cf-73d9-4455-8540-5665a4312efb.png" },
    { title: "Khamrah Dukhan", image: "https://www.lattafa-usa.com/cdn/shop/files/Khamrah-Dukhan-1_a62cb1af-0737-4709-86c2-f275a5f5b023.png" },
    { title: "Teriaq Intense", image: "https://www.lattafa-usa.com/cdn/shop/files/Teriaq-Intense-1_b9408dff-5346-4542-a598-cfffb8454d81.png" },
    { title: "His Confession", image: "https://www.lattafa-usa.com/cdn/shop/files/His-Confession-1_2614a68d-8561-4a94-9c54-7739ae06f986.png" }
  ];

  const bestSellersCards = [
    { title: "Badee Al Oud Noble Blush", image: "https://www.lattafa-usa.com/cdn/shop/files/Badee-Al-Oud-Noble-Blush-1_efc7268e-6d5c-413d-ae1e-ef7c9873bb6e.png" },
    { title: "Asad", image: "https://www.lattafa-usa.com/cdn/shop/files/Asad-1_ceed76c7-7a80-46b3-b372-68cc309137f4.png" },
    { title: "Yara Candy", image: "https://www.lattafa-usa.com/cdn/shop/files/Yara-Candy-1_86796aee-3226-4653-ba72-dd51d747c7f4.png" },
    { title: "Eclaire", image: "https://www.lattafa-usa.com/cdn/shop/files/Eclaire-1_5803282e-ea5b-4de5-99a5-7d06f5cbae33.png" }
  ];

  const collectionsCards = [
    { title: "Badee Al Oud", image: "https://www.lattafa-usa.com/cdn/shop/files/Badee-Al-Oud-Noble-Blush-1_efc7268e-6d5c-413d-ae1e-ef7c9873bb6e.png" },
    { title: "Asad", image: "https://www.lattafa-usa.com/cdn/shop/files/Asad-1_ceed76c7-7a80-46b3-b372-68cc309137f4.png" },
    { title: "Khamrah", image: "https://www.lattafa-usa.com/cdn/shop/files/Khamrah-1_0ffa4f52-30e3-4dea-9399-9bae4b8cb4af.png" },
    { title: "Yara", image: "https://www.lattafa-usa.com/cdn/shop/files/myyaragiftset.png?v=1750374217" }
  ];

  const handleCardClick = (title) => {
    const found = products.find((p) => p.title.toLowerCase().includes(title.toLowerCase()));
    if (found) {
      navigateToProduct(found);
    } else {
      navigateToCollection('all', 'All Fragrances');
    }
    setActiveMenu(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-2xs transition-all duration-200">

      {/* Full-width container with edge-aligned padding matching official store layout */}
      <div className="w-full px-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between h-13 sm:h-16 lg:h-18">

          {/* Logo on Left Edge */}
          <div className="flex-shrink-0 flex items-center mr-2 sm:mr-4 lg:mr-6">
            <img
              src="/logo.avif"
              alt="Lattafa Perfumes"
              onClick={navigateToHome}
              className="h-9 sm:h-11 lg:h-12 w-auto object-contain cursor-pointer hover:opacity-90 transition-opacity"
            />
          </div>

          {/* Centered Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-4 lg:space-x-6 xl:space-x-8 text-[11px] xl:text-xs font-semibold uppercase tracking-wider text-[#121212]">

            {/* 1. SHOP MEGA MENU */}
            <div
              className="py-6"
              onMouseEnter={() => setActiveMenu('shop')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button 
                onClick={() => { navigateToCollection('all', 'Todas las Fragancias'); setActiveMenu(null); }}
                className="flex items-center space-x-1 hover:text-[#c5a059] transition-colors py-1 cursor-pointer"
              >
                <span>CATÁLOGO</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-700 group-hover:rotate-180 transition-transform" />
              </button>

              {activeMenu === 'shop' && (
                <div className="fixed top-[88px] inset-x-0 bg-white border-t border-b border-gray-100 shadow-2xl py-8 px-8 sm:px-16 lg:px-24 animate-fadeIn z-50">
                  <div className="w-full grid grid-cols-12 gap-8 items-start">

                    {/* Left Sidebar Links */}
                    <div className="col-span-2 space-y-4 font-serif text-lg text-stone-900 border-r border-gray-100 pr-6">
                      <div onClick={() => { navigateToCollection('best-sellers', 'Los Más Vendidos'); setActiveMenu(null); }} className="hover:text-[#c5a059] cursor-pointer transition-colors">Los Más Vendidos</div>
                      <div onClick={() => { navigateToCollection('new-arrivals', 'Nuevos Lanzamientos'); setActiveMenu(null); }} className="hover:text-[#c5a059] cursor-pointer transition-colors">Nuevos Lanzamientos</div>
                      <div onClick={() => { navigateToCollection('bundles', 'Packs Exclusivos'); setActiveMenu(null); }} className="hover:text-[#c5a059] cursor-pointer transition-colors">Packs Exclusivos</div>
                    </div>

                    {/* Middle Categories */}
                    <div className="col-span-6 grid grid-cols-3 gap-6 text-xs">
                      <div>
                        <h4 className="font-serif font-bold text-stone-900 text-xs mb-3 text-gray-400">Por Categoría</h4>
                        <ul className="space-y-2.5 text-stone-700 font-medium">
                          <li><span onClick={() => { navigateToCollection('all', 'Todas las Fragancias'); setActiveMenu(null); }} className="hover:text-[#c5a059] cursor-pointer transition-colors">Todas las Fragancias</span></li>
                          <li><span onClick={() => { navigateToCollection('women', 'Fragancias para Mujer'); setActiveMenu(null); }} className="hover:text-[#c5a059] cursor-pointer transition-colors">Fragancias para Mujer</span></li>
                          <li><span onClick={() => { navigateToCollection('men', 'Fragancias para Hombre'); setActiveMenu(null); }} className="hover:text-[#c5a059] cursor-pointer transition-colors">Fragancias para Hombre</span></li>
                          <li><span onClick={() => { navigateToCollection('unisex', 'Fragancias Unisex'); setActiveMenu(null); }} className="hover:text-[#c5a059] cursor-pointer transition-colors">Fragancias Unisex</span></li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-serif font-bold text-stone-900 text-xs mb-3 text-gray-400">Por Presentación</h4>
                        <ul className="space-y-2.5 text-stone-700 font-medium">
                          <li><span onClick={() => { navigateToCollection('edp', 'Eau de Parfum'); setActiveMenu(null); }} className="hover:text-[#c5a059] cursor-pointer transition-colors">Eau de Parfum (EDP)</span></li>
                          <li><span onClick={() => { navigateToCollection('deodorant', 'Desodorantes'); setActiveMenu(null); }} className="hover:text-[#c5a059] cursor-pointer transition-colors">Desodorantes</span></li>
                          <li><span onClick={() => { navigateToCollection('air-freshener', 'Aromatizadores'); setActiveMenu(null); }} className="hover:text-[#c5a059] cursor-pointer transition-colors">Aromatizadores</span></li>
                          <li><span onClick={() => { navigateToCollection('body-spray', 'Sprays Corporales'); setActiveMenu(null); }} className="hover:text-[#c5a059] cursor-pointer transition-colors">Sprays Corporales</span></li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-serif font-bold text-stone-900 text-xs mb-3 text-gray-400">Por Línea</h4>
                        <ul className="space-y-2.5 text-stone-700 font-medium">
                          <li><span onClick={() => { navigateToCollection('lattafa', 'Colección Lattafa'); setActiveMenu(null); }} className="hover:text-[#c5a059] cursor-pointer transition-colors font-semibold">Lattafa</span></li>
                          <li><span onClick={() => { navigateToCollection('pride', 'Lattafa Pride'); setActiveMenu(null); }} className="hover:text-[#c5a059] cursor-pointer transition-colors font-semibold">Lattafa Pride</span></li>
                        </ul>
                      </div>
                    </div>

                    {/* Right Featured Trend Carousel */}
                    <div className="col-span-4 pl-4 border-l border-gray-100">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-serif font-semibold text-stone-900 text-sm">Tendencias de la Semana</h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <button onClick={() => setTrendIndex((t) => Math.max(0, t - 1))} className="p-1 hover:text-stone-900"><ChevronLeft className="w-4 h-4" /></button>
                          <span>1/5</span>
                          <button onClick={() => setTrendIndex((t) => (t + 1) % trendItems.length)} className="p-1 hover:text-stone-900"><ChevronRight className="w-4 h-4" /></button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {trendItems.slice(0, 2).map((item, idx) => (
                          <div key={idx} onClick={() => handleCardClick(item.title)} className="group cursor-pointer">
                            <div className="relative aspect-square bg-[#f4f4f4] rounded-2xl p-4 flex items-center justify-center overflow-hidden mb-2">
                              {item.soldOut && (
                                <span className="absolute top-2 left-2 bg-stone-700 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                                  Agotado
                                </span>
                              )}
                              <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                            </div>
                            <span className="text-[10px] text-gray-500 block">Lattafa</span>
                            <h5 className="font-serif font-bold text-stone-900 text-xs">{item.title}</h5>
                            <span className="text-xs font-bold text-stone-900">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* 2. NEW ARRIVALS */}
            <div
              className="py-6"
              onMouseEnter={() => setActiveMenu('new')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button 
                onClick={() => { navigateToCollection('new-arrivals', 'Nuevos Lanzamientos'); setActiveMenu(null); }}
                className="flex items-center space-x-1 hover:text-[#c5a059] transition-colors py-1 cursor-pointer"
              >
                <span>NOVEDADES</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-700 group-hover:rotate-180 transition-transform" />
              </button>

              {activeMenu === 'new' && (
                <div className="fixed top-[88px] inset-x-0 bg-white border-t border-b border-gray-100 shadow-2xl py-8 px-8 sm:px-16 lg:px-24 animate-fadeIn z-50">
                  <div className="w-full grid grid-cols-4 gap-6">
                    {newArrivalsCards.map((card, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleCardClick(card.title)}
                        className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-900 cursor-pointer shadow-md"
                      >
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5 justify-between">
                          <span className="font-serif text-white font-bold text-base tracking-wide">{card.title}</span>
                          <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-900 flex items-center justify-center group-hover:bg-[#121212] group-hover:text-white transition-colors">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. BEST SELLERS MEGA MENU */}
            <div
              className="py-6"
              onMouseEnter={() => setActiveMenu('bestsellers')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button 
                onClick={() => { navigateToCollection('best-sellers', 'Los Más Vendidos'); setActiveMenu(null); }}
                className="flex items-center space-x-1 hover:text-[#c5a059] transition-colors py-1 cursor-pointer"
              >
                <span>MÁS VENDIDOS</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-700 group-hover:rotate-180 transition-transform" />
              </button>

              {activeMenu === 'bestsellers' && (
                <div className="fixed top-[88px] inset-x-0 bg-white border-t border-b border-gray-100 shadow-2xl py-8 px-8 sm:px-16 lg:px-24 animate-fadeIn z-50">
                  <div className="w-full grid grid-cols-4 gap-6">
                    {bestSellersCards.map((card, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleCardClick(card.title)}
                        className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-900 cursor-pointer shadow-md"
                      >
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5 justify-between">
                          <span className="font-serif text-white font-bold text-base tracking-wide">{card.title}</span>
                          <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-900 flex items-center justify-center group-hover:bg-[#121212] group-hover:text-white transition-colors">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 4. COLLECTIONS MEGA MENU */}
            <div
              className="py-6"
              onMouseEnter={() => setActiveMenu('collections')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button 
                onClick={() => { navigateToCollection('all', 'Todas las Colecciones'); setActiveMenu(null); }}
                className="flex items-center space-x-1 hover:text-[#c5a059] transition-colors py-1 cursor-pointer"
              >
                <span>COLECCIONES</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-700 group-hover:rotate-180 transition-transform" />
              </button>

              {activeMenu === 'collections' && (
                <div className="fixed top-[88px] inset-x-0 bg-white border-t border-b border-gray-100 shadow-2xl py-8 px-8 sm:px-16 lg:px-24 animate-fadeIn z-50">
                  <div className="w-full grid grid-cols-5 gap-5">
                    {collectionsCards.map((card, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleCardClick(card.title)}
                        className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-900 cursor-pointer shadow-md"
                      >
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 justify-between">
                          <span className="font-serif text-white font-bold text-sm tracking-wide">{card.title}</span>
                          <div className="w-7 h-7 rounded-full bg-stone-100 text-stone-900 flex items-center justify-center group-hover:bg-[#121212] group-hover:text-white transition-colors">
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => navigateToCollection('bundles', 'Packs Exclusivos')} className="hover:text-[#c5a059] transition-colors py-1 cursor-pointer">
              PACKS Y KITS
            </button>
            <button onClick={() => setIsSearchOpen(true)} className="hover:text-[#c5a059] transition-colors py-1 cursor-pointer">
              SEGUIR MI PEDIDO
            </button>
          </nav>

          {/* Right Action Icons on Right Edge (Search, User, Cart, Mobile Menu) */}
          <div className="flex items-center space-x-3.5 sm:space-x-5">

            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1 text-stone-900 hover:text-[#c5a059] transition-colors rounded-full"
              title="Buscar"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            <button
              className="p-1 text-stone-900 hover:text-[#c5a059] transition-colors rounded-full hidden sm:block"
              title="Mi Cuenta"
            >
              <User className="w-5 h-5 stroke-[1.75]" />
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1 text-stone-900 hover:text-[#c5a059] transition-colors rounded-full flex items-center justify-center group"
              title="Bolsa de Compras"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75] group-hover:scale-110 transition-transform" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1 text-stone-900 hover:text-[#c5a059] transition-colors rounded-full lg:hidden"
              title="Menú"
            >
              <Menu className="w-5 h-5 stroke-[1.75]" />
            </button>
          </div>

        </div>
      </div>

      {/* FULL-SCREEN MOBILE NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white animate-fadeIn text-stone-900 lg:hidden">
          
          {/* Drawer Top Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <img src="/logo.avif" alt="Lattafa" className="h-8 w-auto object-contain" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-stone-900 hover:text-amber-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Main Link List */}
          <div className="flex-1 overflow-y-auto px-6 py-2">
            
            {/* 1. Shop */}
            <div>
              <div 
                onClick={() => setExpandedMobileSubmenu(expandedMobileSubmenu === 'shop' ? null : 'shop')}
                className="flex items-center justify-between py-4 border-b border-gray-100 font-serif text-lg text-stone-900 cursor-pointer"
              >
                <span>Catálogo Completo</span>
                <ChevronRightIcon className={`w-4 h-4 text-stone-600 transition-transform ${expandedMobileSubmenu === 'shop' ? 'rotate-90' : ''}`} />
              </div>
              {expandedMobileSubmenu === 'shop' && (
                <div className="pl-4 py-2 space-y-3 text-sm font-medium text-stone-700 bg-stone-50 rounded-xl my-2">
                  <div onClick={() => { navigateToCollection('all', 'Todas las Fragancias'); setIsMobileMenuOpen(false); }} className="py-1 hover:text-amber-800 cursor-pointer">Todas las Fragancias</div>
                  <div onClick={() => { navigateToCollection('edp', 'Eau de Parfum'); setIsMobileMenuOpen(false); }} className="py-1 hover:text-amber-800 cursor-pointer">Eau de Parfum</div>
                  <div onClick={() => { navigateToCollection('air-freshener', 'Aromatizadores'); setIsMobileMenuOpen(false); }} className="py-1 hover:text-amber-800 cursor-pointer">Aromatizadores</div>
                  <div onClick={() => { navigateToCollection('body-spray', 'Sprays Corporales'); setIsMobileMenuOpen(false); }} className="py-1 hover:text-amber-800 cursor-pointer">Sprays Corporales</div>
                </div>
              )}
            </div>

            {/* 2. New Arrivals */}
            <div>
              <div 
                onClick={() => setExpandedMobileSubmenu(expandedMobileSubmenu === 'new' ? null : 'new')}
                className="flex items-center justify-between py-4 border-b border-gray-100 font-serif text-lg text-stone-900 cursor-pointer"
              >
                <span>Novedades</span>
                <ChevronRightIcon className={`w-4 h-4 text-stone-600 transition-transform ${expandedMobileSubmenu === 'new' ? 'rotate-90' : ''}`} />
              </div>
              {expandedMobileSubmenu === 'new' && (
                <div className="pl-4 py-2 space-y-3 text-sm font-medium text-stone-700 bg-stone-50 rounded-xl my-2">
                  <div onClick={() => { navigateToCollection('new-arrivals', 'Nuevos Lanzamientos'); setIsMobileMenuOpen(false); }} className="py-1 hover:text-amber-800 cursor-pointer font-bold">Ver Todas las Novedades</div>
                  <div onClick={() => { handleCardClick('Khamrah Waha'); setIsMobileMenuOpen(false); }} className="py-1 hover:text-amber-800 cursor-pointer">Khamrah Waha</div>
                  <div onClick={() => { handleCardClick('Art of Universe'); setIsMobileMenuOpen(false); }} className="py-1 hover:text-amber-800 cursor-pointer">Art of Universe</div>
                  <div onClick={() => { handleCardClick('Atheeri'); setIsMobileMenuOpen(false); }} className="py-1 hover:text-amber-800 cursor-pointer">Atheeri</div>
                </div>
              )}
            </div>

            {/* 3. Best Sellers */}
            <div>
              <div 
                onClick={() => setExpandedMobileSubmenu(expandedMobileSubmenu === 'bestsellers' ? null : 'bestsellers')}
                className="flex items-center justify-between py-4 border-b border-gray-100 font-serif text-lg text-stone-900 cursor-pointer"
              >
                <span>Los Más Vendidos</span>
                <ChevronRightIcon className={`w-4 h-4 text-stone-600 transition-transform ${expandedMobileSubmenu === 'bestsellers' ? 'rotate-90' : ''}`} />
              </div>
              {expandedMobileSubmenu === 'bestsellers' && (
                <div className="pl-4 py-2 space-y-3 text-sm font-medium text-stone-700 bg-stone-50 rounded-xl my-2">
                  <div onClick={() => { navigateToCollection('best-sellers', 'Los Más Vendidos'); setIsMobileMenuOpen(false); }} className="py-1 hover:text-amber-800 cursor-pointer font-bold">Ver Todos Los Más Vendidos</div>
                  <div onClick={() => { handleCardClick('Asad'); setIsMobileMenuOpen(false); }} className="py-1 hover:text-amber-800 cursor-pointer">Asad</div>
                  <div onClick={() => { handleCardClick('Yara'); setIsMobileMenuOpen(false); }} className="py-1 hover:text-amber-800 cursor-pointer">Yara Candy</div>
                  <div onClick={() => { handleCardClick('Badee'); setIsMobileMenuOpen(false); }} className="py-1 hover:text-amber-800 cursor-pointer">Badee Al Oud</div>
                </div>
              )}
            </div>

            {/* 4. Collections */}
            <div>
              <div 
                onClick={() => setExpandedMobileSubmenu(expandedMobileSubmenu === 'collections' ? null : 'collections')}
                className="flex items-center justify-between py-4 border-b border-gray-100 font-serif text-lg text-stone-900 cursor-pointer"
              >
                <span>Colecciones</span>
                <ChevronRightIcon className={`w-4 h-4 text-stone-600 transition-transform ${expandedMobileSubmenu === 'collections' ? 'rotate-90' : ''}`} />
              </div>
              {expandedMobileSubmenu === 'collections' && (
                <div className="pl-4 py-2 space-y-3 text-sm font-medium text-stone-700 bg-stone-50 rounded-xl my-2">
                  <div onClick={() => { navigateToCollection('pride', 'Lattafa Pride'); setIsMobileMenuOpen(false); }} className="py-1 hover:text-amber-800 cursor-pointer">Lattafa Pride</div>
                  <div onClick={() => { navigateToCollection('badee-al-oud', 'Badee Al Oud Collection'); setIsMobileMenuOpen(false); }} className="py-1 hover:text-amber-800 cursor-pointer">Badee Al Oud</div>
                  <div onClick={() => { navigateToCollection('asad', 'Asad Collection'); setIsMobileMenuOpen(false); }} className="py-1 hover:text-amber-800 cursor-pointer">Asad</div>
                </div>
              )}
            </div>

            {/* 5. Bundles */}
            <div 
              onClick={() => { navigateToCollection('bundles', 'Packs Exclusivos'); setIsMobileMenuOpen(false); }}
              className="py-4 border-b border-gray-100 font-serif text-lg text-stone-900 cursor-pointer"
            >
              Packs y Kits
            </div>

            {/* 6. Track My Order */}
            <div 
              onClick={() => { setIsSearchOpen(true); setIsMobileMenuOpen(false); }}
              className="py-4 border-b border-gray-100 font-serif text-lg text-stone-900 cursor-pointer"
            >
              Seguir Mi Pedido
            </div>

          </div>

          {/* Drawer Bottom Footer */}
          <div className="p-6 border-t border-gray-100 space-y-4 text-center bg-white">
            
            {/* Country Selector */}
            <div className="inline-flex items-center justify-center space-x-2 text-xs font-semibold text-stone-900 cursor-pointer">
              <span>🇵🇪 Perú (PEN S/)</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-600" />
            </div>

            {/* LOG IN Pill Button */}
            <button className="w-full bg-black hover:bg-stone-800 text-white font-bold text-xs py-3.5 rounded-full uppercase tracking-widest transition-all shadow-md">
              INICIAR SESIÓN
            </button>

            {/* Social Media Icons */}
            <div className="flex items-center justify-center space-x-6 text-stone-800 pt-1">
              <a href="#facebook" className="hover:text-amber-800" title="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#instagram" className="hover:text-amber-800" title="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#tiktok" className="font-bold text-xs hover:text-amber-800" title="TikTok">🎵</a>
            </div>

          </div>

        </div>
      )}
    </header>
  );
};
