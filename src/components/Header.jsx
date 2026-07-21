import React, { useState } from 'react';
import { Search, ShoppingBag, User, ChevronDown, ArrowUpRight, ChevronLeft, ChevronRight, Menu, X, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header = () => {
  const { cartItemCount, setIsCartOpen, setIsSearchOpen, wishlist, navigateToHome, navigateToProduct, products } = useStore();
  const [activeMenu, setActiveMenu] = useState(null);
  const [trendIndex, setTrendIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileSubmenu, setExpandedMobileSubmenu] = useState(null);

  // Trending items for SHOP menu
  const trendItems = [
    { title: "Afeef", price: "$49.99 USD", soldOut: true, image: "https://cdn.shopify.com/s/files/1/0556/4101/4371/files/Afeef.png?v=1700000000" },
    { title: "Asad", price: "From $14.99 USD", soldOut: false, image: "https://cdn.shopify.com/s/files/1/0556/4101/4371/files/Asad.png?v=1700000000" },
    { title: "Khamrah Waha", price: "$49.99 USD", soldOut: false, image: "https://cdn.shopify.com/s/files/1/0556/4101/4371/files/Khamrah_Waha.png?v=1700000000" }
  ];

  const newArrivalsCards = [
    { title: "Art of Universe", image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600&auto=format&fit=crop" },
    { title: "Atheeri", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&auto=format&fit=crop" },
    { title: "Khamrah Dukhan", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&auto=format&fit=crop" },
    { title: "Victoria", image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&auto=format&fit=crop" }
  ];

  const bestSellersCards = [
    { title: "Badee Al Oud Amethyst", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop" },
    { title: "Asad", image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600&auto=format&fit=crop" },
    { title: "Yara Candy", image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&auto=format&fit=crop" },
    { title: "Fakhar Black", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&auto=format&fit=crop" }
  ];

  const collectionsCards = [
    { title: "Lattafa Pride", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop" },
    { title: "Asad", image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600&auto=format&fit=crop" },
    { title: "Khamrah", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&auto=format&fit=crop" },
    { title: "Badee Al Oud", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&auto=format&fit=crop" },
    { title: "Yara", image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&auto=format&fit=crop" }
  ];

  const handleCardClick = (title) => {
    const found = products.find((p) => p.title.toLowerCase().includes(title.toLowerCase()));
    if (found) {
      navigateToProduct(found);
    } else {
      navigateToHome();
    }
    setActiveMenu(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-2xs transition-all duration-200">

      {/* Full-width container with compact side padding and height matching original Lattafa site */}
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-13 sm:h-16 lg:h-18">

          {/* Logo on Left Edge */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src="/logo.avif"
              alt="Lattafa Perfumes"
              onClick={navigateToHome}
              className="h-10 sm:h-12 lg:h-13 w-auto object-contain cursor-pointer hover:opacity-90 transition-opacity"
            />
          </div>

          {/* Centered Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-9 text-xs font-semibold uppercase tracking-wider text-[#121212]">

            {/* 1. SHOP MEGA MENU */}
            <div
              className="py-6"
              onMouseEnter={() => setActiveMenu('shop')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center space-x-1 hover:text-[#c5a059] transition-colors py-1 cursor-pointer">
                <span>SHOP</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-700 group-hover:rotate-180 transition-transform" />
              </button>

              {activeMenu === 'shop' && (
                <div className="fixed top-[88px] inset-x-0 bg-white border-t border-b border-gray-100 shadow-2xl py-8 px-8 sm:px-16 lg:px-24 animate-fadeIn z-50">
                  <div className="w-full grid grid-cols-12 gap-8 items-start">

                    {/* Left Sidebar Links */}
                    <div className="col-span-2 space-y-4 font-serif text-lg text-stone-900 border-r border-gray-100 pr-6">
                      <div onClick={navigateToHome} className="hover:text-[#c5a059] cursor-pointer transition-colors">Best Sellers</div>
                      <div onClick={navigateToHome} className="hover:text-[#c5a059] cursor-pointer transition-colors">New Arrivals</div>
                      <div onClick={navigateToHome} className="hover:text-[#c5a059] cursor-pointer transition-colors">Bundles</div>
                    </div>

                    {/* Middle Categories */}
                    <div className="col-span-6 grid grid-cols-3 gap-6 text-xs">
                      <div>
                        <h4 className="font-serif font-bold text-stone-900 text-xs mb-3 text-gray-400">By Category</h4>
                        <ul className="space-y-2.5 text-stone-700 font-medium">
                          <li><a href="#all" onClick={navigateToHome} className="hover:text-[#c5a059] transition-colors">All Fragrances</a></li>
                          <li><a href="#women" onClick={navigateToHome} className="hover:text-[#c5a059] transition-colors">Women's Fragrances</a></li>
                          <li><a href="#men" onClick={navigateToHome} className="hover:text-[#c5a059] transition-colors">Men's Fragrances</a></li>
                          <li><a href="#unisex" onClick={navigateToHome} className="hover:text-[#c5a059] transition-colors">Unisex Fragrances</a></li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-serif font-bold text-stone-900 text-xs mb-3 text-gray-400">By Type</h4>
                        <ul className="space-y-2.5 text-stone-700 font-medium">
                          <li><a href="#edp" onClick={navigateToHome} className="hover:text-[#c5a059] transition-colors">Eau de Parfum (EDP)</a></li>
                          <li><a href="#deodorants" onClick={navigateToHome} className="hover:text-[#c5a059] transition-colors">Deodorant</a></li>
                          <li><a href="#air" onClick={navigateToHome} className="hover:text-[#c5a059] transition-colors">Air Freshener</a></li>
                          <li><a href="#body" onClick={navigateToHome} className="hover:text-[#c5a059] transition-colors">All Over Spray</a></li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-serif font-bold text-stone-900 text-xs mb-3 text-gray-400">By Brand</h4>
                        <ul className="space-y-2.5 text-stone-700 font-medium">
                          <li><a href="#lattafa" onClick={navigateToHome} className="hover:text-[#c5a059] transition-colors font-semibold">Lattafa</a></li>
                          <li><a href="#pride" onClick={navigateToHome} className="hover:text-[#c5a059] transition-colors font-semibold">Lattafa Pride</a></li>
                        </ul>
                      </div>
                    </div>

                    {/* Right Featured Trend Carousel */}
                    <div className="col-span-4 pl-4 border-l border-gray-100">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-serif font-semibold text-stone-900 text-sm">Trend This Week</h4>
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
                                  Sold out
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

            {/* 2. NEW ARRIVALS MEGA MENU */}
            <div
              className="py-6"
              onMouseEnter={() => setActiveMenu('new')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center space-x-1 hover:text-[#c5a059] transition-colors py-1 cursor-pointer">
                <span>NEW ARRIVALS</span>
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
              <button className="flex items-center space-x-1 hover:text-[#c5a059] transition-colors py-1 cursor-pointer">
                <span>BEST SELLERS</span>
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
              <button className="flex items-center space-x-1 hover:text-[#c5a059] transition-colors py-1 cursor-pointer">
                <span>COLLECTIONS</span>
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

            <button onClick={navigateToHome} className="hover:text-[#c5a059] transition-colors py-1 cursor-pointer">
              BUNDLES
            </button>
            <button onClick={navigateToHome} className="hover:text-[#c5a059] transition-colors py-1 cursor-pointer">
              TRACK MY ORDER
            </button>
          </nav>

          {/* Right Action Icons on Right Edge (Search, User, Cart, Mobile Menu) */}
          <div className="flex items-center space-x-3.5 sm:space-x-5">

            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1 text-stone-900 hover:text-[#c5a059] transition-colors rounded-full"
              title="Search"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            <button
              className="p-1 text-stone-900 hover:text-[#c5a059] transition-colors rounded-full hidden sm:block"
              title="Account"
            >
              <User className="w-5 h-5 stroke-[1.75]" />
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1 text-stone-900 hover:text-[#c5a059] transition-colors rounded-full flex items-center justify-center group"
              title="Bag"
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
              className="p-1 text-stone-900 hover:text-[#c5a059] transition-colors rounded-full md:hidden"
              title="Menu"
            >
              <Menu className="w-5 h-5 stroke-[1.75]" />
            </button>
          </div>

        </div>
      </div>

      {/* FULL-SCREEN MOBILE NAVIGATION DRAWER (Matching Lattafa USA Image 2) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white animate-fadeIn text-stone-900 md:hidden">
          
          {/* Drawer Top Header (Logo + Close X) */}
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
                <span>Shop</span>
                <ChevronRightIcon className={`w-4 h-4 text-stone-600 transition-transform ${expandedMobileSubmenu === 'shop' ? 'rotate-90' : ''}`} />
              </div>
              {expandedMobileSubmenu === 'shop' && (
                <div className="pl-4 py-2 space-y-3 text-sm font-medium text-stone-700 bg-stone-50 rounded-xl my-2">
                  <div onClick={() => { navigateToHome(); setIsMobileMenuOpen(false); }} className="py-1 hover:text-amber-800 cursor-pointer">All Fragrances</div>
                  <div onClick={() => { navigateToHome(); setIsMobileMenuOpen(false); }} className="py-1 hover:text-amber-800 cursor-pointer">Eau de Parfum</div>
                  <div onClick={() => { navigateToHome(); setIsMobileMenuOpen(false); }} className="py-1 hover:text-amber-800 cursor-pointer">Home Fragrances</div>
                  <div onClick={() => { navigateToHome(); setIsMobileMenuOpen(false); }} className="py-1 hover:text-amber-800 cursor-pointer">Concentrated Perfume Oils</div>
                </div>
              )}
            </div>

            {/* 2. New Arrivals */}
            <div>
              <div 
                onClick={() => setExpandedMobileSubmenu(expandedMobileSubmenu === 'new' ? null : 'new')}
                className="flex items-center justify-between py-4 border-b border-gray-100 font-serif text-lg text-stone-900 cursor-pointer"
              >
                <span>New Arrivals</span>
                <ChevronRightIcon className={`w-4 h-4 text-stone-600 transition-transform ${expandedMobileSubmenu === 'new' ? 'rotate-90' : ''}`} />
              </div>
              {expandedMobileSubmenu === 'new' && (
                <div className="pl-4 py-2 space-y-3 text-sm font-medium text-stone-700 bg-stone-50 rounded-xl my-2">
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
                <span>Best Sellers</span>
                <ChevronRightIcon className={`w-4 h-4 text-stone-600 transition-transform ${expandedMobileSubmenu === 'bestsellers' ? 'rotate-90' : ''}`} />
              </div>
              {expandedMobileSubmenu === 'bestsellers' && (
                <div className="pl-4 py-2 space-y-3 text-sm font-medium text-stone-700 bg-stone-50 rounded-xl my-2">
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
                <span>Collections</span>
                <ChevronRightIcon className={`w-4 h-4 text-stone-600 transition-transform ${expandedMobileSubmenu === 'collections' ? 'rotate-90' : ''}`} />
              </div>
              {expandedMobileSubmenu === 'collections' && (
                <div className="pl-4 py-2 space-y-3 text-sm font-medium text-stone-700 bg-stone-50 rounded-xl my-2">
                  <div onClick={() => { navigateToHome(); setIsMobileMenuOpen(false); }} className="py-1 hover:text-amber-800 cursor-pointer">Lattafa Pride</div>
                  <div onClick={() => { navigateToHome(); setIsMobileMenuOpen(false); }} className="py-1 hover:text-amber-800 cursor-pointer">Teryaq</div>
                </div>
              )}
            </div>

            {/* 5. Bundles */}
            <div 
              onClick={() => { navigateToHome(); setIsMobileMenuOpen(false); }}
              className="py-4 border-b border-gray-100 font-serif text-lg text-stone-900 cursor-pointer"
            >
              Bundles
            </div>

            {/* 6. Track My Order */}
            <div 
              onClick={() => { navigateToHome(); setIsMobileMenuOpen(false); }}
              className="py-4 border-b border-gray-100 font-serif text-lg text-stone-900 cursor-pointer"
            >
              Track My Order
            </div>

          </div>

          {/* Drawer Bottom Footer */}
          <div className="p-6 border-t border-gray-100 space-y-4 text-center bg-white">
            
            {/* Country Selector */}
            <div className="inline-flex items-center justify-center space-x-2 text-xs font-semibold text-stone-900 cursor-pointer">
              <span>🇺🇸 United States (USD $)</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-600" />
            </div>

            {/* LOG IN Pill Button */}
            <button className="w-full bg-black hover:bg-stone-800 text-white font-bold text-xs py-3.5 rounded-full uppercase tracking-widest transition-all shadow-md">
              LOG IN
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
