import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ChevronRight, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const CollectionPage = () => {
  const { products, activeCollection, navigateToHome, navigateToCollection, setIsFilterOpen } = useStore();
  const [sortBy, setSortBy] = useState('best-selling');

  const collectionHandle = activeCollection?.handle || 'all';
  const collectionTitle = activeCollection?.title || 'All Fragrances';

  // Category cards configuration matching Lattafa USA official site
  const categoryCards = [
    {
      handle: 'men',
      title: "Para Hombre",
      image: 'https://www.lattafa-usa.com/cdn/shop/files/Asad-1_ceed76c7-7a80-46b3-b372-68cc309137f4.png',
      filterFn: (p) => p.gender?.toLowerCase() === 'men' || p.tags?.includes('men') || p.title.toLowerCase().includes('men')
    },
    {
      handle: 'women',
      title: "Para Mujer",
      image: 'https://www.lattafa-usa.com/cdn/shop/files/Yara-Candy-1_86796aee-3226-4653-ba72-dd51d747c7f4.png',
      filterFn: (p) => p.gender?.toLowerCase() === 'women' || p.tags?.includes('women') || p.title.toLowerCase().includes('women')
    },
    {
      handle: 'unisex',
      title: "Fragancias Unisex",
      image: 'https://www.lattafa-usa.com/cdn/shop/files/Khamrah-1_0ffa4f52-30e3-4dea-9399-9bae4b8cb4af.png',
      filterFn: (p) => p.gender?.toLowerCase() === 'unisex' || p.tags?.includes('unisex')
    },
    {
      handle: 'lattafa',
      title: "Colección Lattafa",
      image: 'https://www.lattafa-usa.com/cdn/shop/files/COVER_MAIN_UP_4-5.png?v=1769829986',
      filterFn: (p) => p.vendor?.toLowerCase() === 'lattafa' || !p.title.toLowerCase().includes('pride')
    },
    {
      handle: 'pride',
      title: "Lattafa Pride",
      image: 'https://www.lattafa-usa.com/cdn/shop/files/Atheeri-1_f93156cf-73d9-4455-8540-5665a4312efb.png',
      filterFn: (p) => p.title.toLowerCase().includes('pride') || p.vendor?.toLowerCase().includes('pride')
    },
    {
      handle: 'bundles',
      title: "Packs Exclusivos",
      image: 'https://www.lattafa-usa.com/cdn/shop/files/myyaragiftset.png?v=1750374217',
      filterFn: (p) => p.is_bundle || p.title.toLowerCase().includes('set') || p.title.toLowerCase().includes('collection') || p.title.toLowerCase().includes('bundle')
    }
  ];

  // Filter products according to collection handle
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    let result = [...products];
    const h = collectionHandle.toLowerCase();

    if (h === 'bundles') {
      result = result.filter(p => p.is_bundle || p.title.toLowerCase().includes('set') || p.title.toLowerCase().includes('collection') || p.title.toLowerCase().includes('bundle'));
    } else if (h === 'men') {
      result = result.filter(p => p.gender?.toLowerCase() === 'men' || p.tags?.includes('men') || p.title.toLowerCase().includes('men'));
    } else if (h === 'women') {
      result = result.filter(p => p.gender?.toLowerCase() === 'women' || p.tags?.includes('women') || p.title.toLowerCase().includes('women'));
    } else if (h === 'unisex') {
      result = result.filter(p => p.gender?.toLowerCase() === 'unisex' || p.tags?.includes('unisex'));
    } else if (h === 'pride') {
      result = result.filter(p => p.title.toLowerCase().includes('pride') || p.vendor?.toLowerCase().includes('pride'));
    } else if (h === 'lattafa') {
      result = result.filter(p => p.vendor?.toLowerCase() === 'lattafa');
    } else if (h === 'best-sellers' || h === 'bestsellers') {
      result = result.filter(p => p.rating >= 4.5 || p.review_count > 40);
    } else if (h === 'new-arrivals') {
      result = result.slice(0, 12);
    } else if (h === 'yara') {
      result = result.filter(p => p.title.toLowerCase().includes('yara'));
    } else if (h === 'asad') {
      result = result.filter(p => p.title.toLowerCase().includes('asad'));
    } else if (h === 'khamrah') {
      result = result.filter(p => p.title.toLowerCase().includes('khamrah'));
    } else if (h === 'badee-al-oud' || h === 'badee') {
      result = result.filter(p => p.title.toLowerCase().includes('badee') || p.title.toLowerCase().includes('oud'));
    } else if (h === 'layaan') {
      result = result.filter(p => p.title.toLowerCase().includes('layaan'));
    }

    // Apply Sorting
    if (sortBy === 'price-low-high') {
      result.sort((a, b) => (parseFloat(a.min_price) || 0) - (parseFloat(b.min_price) || 0));
    } else if (sortBy === 'price-high-low') {
      result.sort((a, b) => (parseFloat(b.min_price) || 0) - (parseFloat(a.min_price) || 0));
    } else if (sortBy === 'title-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'title-desc') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [products, collectionHandle, sortBy]);

  return (
    <div className="bg-white min-h-screen text-stone-900 pb-20 animate-fadeIn">
      
      {/* 1. BREADCRUMBS NAVIGATION */}
      <div className="w-full px-4 sm:px-10 lg:px-14 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-center space-x-2 text-xs text-stone-500 font-medium">
          <button onClick={navigateToHome} className="hover:text-stone-900 transition-colors">
            Inicio
          </button>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span>Colección</span>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="text-stone-900 font-semibold uppercase tracking-wider">{collectionTitle}</span>
        </div>
      </div>

      <div className="w-full px-4 sm:px-10 lg:px-14 py-8 space-y-10">
        
        {/* 2. PAGE TITLE */}
        <div className="text-center sm:text-left">
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-stone-900 capitalize tracking-tight">
            {collectionTitle}
          </h1>
        </div>

        {/* 3. CATEGORY CARDS SCROLL ROW (Matching Official Lattafa USA Screenshots) */}
        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
          {categoryCards.map((cat) => {
            const count = products.filter(cat.filterFn).length;
            const isActive = collectionHandle.toLowerCase() === cat.handle;
            return (
              <div
                key={cat.handle}
                onClick={() => navigateToCollection(cat.handle, cat.title)}
                className={`bg-[#f8f6f2] rounded-2xl p-3 sm:p-4 text-center cursor-pointer transition-all border group ${
                  isActive ? 'ring-2 ring-stone-900 border-stone-900 bg-white shadow-sm' : 'border-stone-200/60 hover:shadow-md hover:bg-white'
                }`}
              >
                <div className="aspect-square w-full rounded-xl bg-white overflow-hidden p-2 mb-3 flex items-center justify-center border border-gray-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-serif font-semibold text-stone-900 text-xs sm:text-sm line-clamp-1">
                  {cat.title}
                </h4>
                <span className="text-[11px] text-stone-500 font-medium mt-0.5 block">
                  {count} fragancias
                </span>
              </div>
            );
          })}
        </div>

        {/* 4. FILTER & SORT BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-y border-stone-200/80 py-4">
          
          {/* Left: Filter Toggle Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs px-5 py-2.5 rounded-full uppercase tracking-wider transition-all border border-stone-200 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>FILTRAR</span>
          </button>

          {/* Right: Products Count + Sort Dropdown */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-6 text-xs font-semibold text-stone-700">
            <span>{filteredProducts.length} productos</span>
            
            <div className="flex items-center space-x-2">
              <span className="text-stone-500 font-normal hidden xs:inline">Ordenar por:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-stone-50 hover:bg-stone-100 border border-stone-300 text-stone-900 text-xs font-semibold rounded-full pl-4 pr-8 py-2 focus:outline-none cursor-pointer"
                >
                  <option value="best-selling">Los Más Vendidos</option>
                  <option value="price-low-high">Precio: Menor a Mayor</option>
                  <option value="price-high-low">Precio: Mayor a Menor</option>
                  <option value="title-asc">Nombre: A a la Z</option>
                  <option value="title-desc">Nombre: Z a la A</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-stone-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

        </div>

        {/* 5. PRODUCT GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-y-4">
            <h3 className="font-serif text-2xl text-stone-600 font-normal">No se encontraron productos en esta colección.</h3>
            <button
              onClick={() => navigateToCollection('all', 'Todas las Fragancias')}
              className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs px-8 py-3 rounded-full uppercase tracking-widest shadow-md transition-all cursor-pointer"
            >
              Ver Todas las Fragancias
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
