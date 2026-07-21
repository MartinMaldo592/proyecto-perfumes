import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const FeaturedCollections = () => {
  const { products, navigateToCollection } = useStore();
  const [activeTab, setActiveTab] = useState('new'); // 'new' | 'bestsellers'

  const collectionCards = [
    { handle: "yara", title: "Colección Yara", count: "8 fragancias", image: "https://www.lattafa-usa.com/cdn/shop/files/myyaragiftset.png?v=1750374217" },
    { handle: "badee-al-oud", title: "Badee Al Oud", count: "7 fragancias", image: "https://www.lattafa-usa.com/cdn/shop/files/Badee-Al-Oud-Noble-Blush-1_efc7268e-6d5c-413d-ae1e-ef7c9873bb6e.png" },
    { handle: "asad", title: "Colección Asad", count: "5 fragancias", image: "https://www.lattafa-usa.com/cdn/shop/files/Asad-1_ceed76c7-7a80-46b3-b372-68cc309137f4.png" },
    { handle: "khamrah", title: "Colección Khamrah", count: "5 fragancias", image: "https://www.lattafa-usa.com/cdn/shop/files/Khamrah-1_0ffa4f52-30e3-4dea-9399-9bae4b8cb4af.png" }
  ];

  const bundleProducts = products.filter((p) => p.is_bundle || p.title.toLowerCase().includes('set') || p.title.toLowerCase().includes('collection')).slice(0, 4);
  const displayBundles = bundleProducts.length > 0 ? bundleProducts : products.slice(0, 4);

  const displayedProducts = activeTab === 'new'
    ? products.slice(0, 4)
    : products.filter((p) => p.rating >= 4.5 || p.review_count > 50).slice(0, 4);

  return (
    <div className="w-full px-6 sm:px-10 lg:px-14 py-12 space-y-20">
      
      {/* 1. TABBED PRODUCTS SECTION (New Arrivals / Best Sellers with Smooth Hover Fade) */}
      <section>
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-8">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setActiveTab('new')}
              className={`font-serif text-2xl sm:text-3xl font-semibold transition-colors cursor-pointer ${
                activeTab === 'new' ? 'text-stone-900 border-b-2 border-stone-900 pb-1' : 'text-gray-400 hover:text-stone-600'
              }`}
            >
              Novedades
            </button>
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`font-serif text-2xl sm:text-3xl font-semibold transition-colors cursor-pointer ${
                activeTab === 'bestsellers' ? 'text-stone-900 border-b-2 border-stone-900 pb-1' : 'text-gray-400 hover:text-stone-600'
              }`}
            >
              Los Más Vendidos
            </button>
          </div>
          <button 
            onClick={() => navigateToCollection(activeTab === 'new' ? 'new-arrivals' : 'best-sellers', activeTab === 'new' ? 'Nuevos Lanzamientos' : 'Los Más Vendidos')} 
            className="text-xs font-bold uppercase tracking-wider text-stone-900 hover:underline cursor-pointer"
          >
            VER CATÁLOGO
          </button>
        </div>

        {/* Mobile Horizontal Swipe Carousel / Desktop 4-Card Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory space-x-4 pb-4 sm:pb-0 scrollbar-none sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:space-x-0 sm:gap-6">
          {displayedProducts.map((product) => (
            <div key={product.id} className="w-[78%] xs:w-[74%] sm:w-auto flex-shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 2. EXPLORE OUR COLLECTION (Horizontal Carousel on Mobile, Grid on Desktop) */}
      <section className="bg-[#f8f6f2] rounded-3xl p-6 sm:p-10 border border-stone-200/50">
        <div className="mb-6 max-w-xl">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 leading-tight mb-2">
            Explora Nuestras Colecciones
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            La fragancia perfecta para cuando deseas ser inolvidable.
          </p>
        </div>

        {/* Mobile Horizontal Swipe Carousel / Desktop 4-Column Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory space-x-4 pb-2 scrollbar-none sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:space-x-0 sm:gap-5">
          {collectionCards.map((col, idx) => (
            <div
              key={idx}
              onClick={() => navigateToCollection(col.handle, col.title)}
              className="w-[74%] xs:w-[70%] sm:w-auto flex-shrink-0 snap-start bg-white rounded-2xl p-3 shadow-xs hover:shadow-md transition-all group cursor-pointer border border-stone-100"
            >
              <div className="aspect-square w-full overflow-hidden rounded-xl bg-stone-100">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="pt-2 px-1">
                <h4 className="font-serif font-semibold text-stone-900 text-base">{col.title}</h4>
                <span className="text-xs text-stone-500 mt-0.5 block">{col.count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BUNDLES SECTION */}
      <section>
        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900">
            Packs y Kits Exclusivos
          </h2>
          <div className="flex items-center space-x-3">
            <button className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Swipe Carousel / Desktop 4-Card Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory space-x-4 pb-4 sm:pb-0 scrollbar-none sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:space-x-0 sm:gap-6">
          {displayBundles.map((product) => (
            <div key={product.id} className="w-[78%] xs:w-[74%] sm:w-auto flex-shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center pt-10">
          <button 
            onClick={() => navigateToCollection('bundles', 'Packs y Kits Exclusivos')} 
            className="bg-black hover:bg-stone-800 text-white font-bold text-xs px-10 py-3.5 rounded-full uppercase tracking-widest shadow-md transition-all cursor-pointer"
          >
            VER MÁS PACKS
          </button>
        </div>
      </section>

      {/* 4. "UNVEIL THE ESSENCE OF ELEGANCE" SPLIT BANNER (LAYAAN OFFICIAL) */}
      <section className="bg-[#f8f6f2] rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center border border-stone-200/60">
        <div className="h-80 sm:h-96 lg:h-[480px]">
          <img
            src="https://www.lattafa-usa.com/cdn/shop/files/layaan-12.png?v=1760222559&width=1019"
            alt="Layaan Luxury Perfume"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8 sm:p-16 space-y-4 text-center lg:text-left">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-amber-800 block">
            Descubre la Esencia de la Elegancia
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-stone-900 leading-tight">
            Elegancia Redefinida: Layaan
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
            Gracia, fuerza y sensualidad en cada nota. Diseñada para ser inolvidable, creada en el corazón de Dubái.
          </p>
          <div className="pt-4">
            <button 
              onClick={() => navigateToCollection('layaan', 'Colección Layaan')} 
              className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs px-8 py-3.5 rounded-full uppercase tracking-widest shadow-md transition-all cursor-pointer"
            >
              EXPLORAR COLECCIÓN
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
