import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ChevronRight, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const CollectionPage = () => {
  const { products, activeCollection, navigateToHome, navigateToCollection, setIsFilterOpen } = useStore();
  const [sortBy, setSortBy] = useState('best-selling');

  const collectionHandle = activeCollection?.handle || 'all';
  const collectionTitle = activeCollection?.title || 'Todas las Colecciones';
  const isAllCollections = collectionHandle.toLowerCase() === 'all';

  // Total available collections configuration
  const categoryCards = [
    {
      handle: 'khamrah',
      title: "Colección Khamrah",
      subtitle: "Gourmand dulce con canela, vainilla, ámbar y notas licorosas",
      image: 'https://www.lattafa-usa.com/cdn/shop/files/Khamrah-1_0ffa4f52-30e3-4dea-9399-9bae4b8cb4af.png',
      filterFn: (p) => p.title.toLowerCase().includes('khamrah')
    },
    {
      handle: 'yara',
      title: "Colección Yara",
      subtitle: "Aromas femeninos cremosos, florales y dulces irresistibles",
      image: 'https://www.lattafa-usa.com/cdn/shop/files/Yara-Candy-1_86796aee-3226-4653-ba72-dd51d747c7f4.png',
      filterFn: (p) => p.title.toLowerCase().includes('yara')
    },
    {
      handle: 'asad',
      title: "Colección Asad",
      subtitle: "Esencias amaderadas y especiadas de máxima masculinidad",
      image: 'https://www.lattafa-usa.com/cdn/shop/files/Asad-1_ceed76c7-7a80-46b3-b372-68cc309137f4.png',
      filterFn: (p) => p.title.toLowerCase().includes('asad')
    },
    {
      handle: 'badee-al-oud',
      title: "Badee Al Oud",
      subtitle: "La expresión más pura del Oud místico y la alta perfumería",
      image: 'https://www.lattafa-usa.com/cdn/shop/files/Badee-Al-Oud-Noble-Blush-1_efc7268e-6d5c-413d-ae1e-ef7c9873bb6e.png',
      filterFn: (p) => p.title.toLowerCase().includes('badee') || p.title.toLowerCase().includes('oud')
    },
    {
      handle: 'men',
      title: "Para Hombre",
      subtitle: "Perfumes intensos y elegantes de larga duración para caballero",
      image: 'https://www.lattafa-usa.com/cdn/shop/files/Asad-1_ceed76c7-7a80-46b3-b372-68cc309137f4.png',
      filterFn: (p) => p.gender?.toLowerCase() === 'men' || p.tags?.includes('men') || p.title.toLowerCase().includes('men')
    },
    {
      handle: 'women',
      title: "Para Mujer",
      subtitle: "Fragancias deslumbrantes, delicadas y cautivadoras",
      image: 'https://www.lattafa-usa.com/cdn/shop/files/Yara-Candy-1_86796aee-3226-4653-ba72-dd51d747c7f4.png',
      filterFn: (p) => p.gender?.toLowerCase() === 'women' || p.tags?.includes('women') || p.title.toLowerCase().includes('women')
    },
    {
      handle: 'unisex',
      title: "Fragancias Unisex",
      subtitle: "Creaciones sofisticadas y equilibradas para todos",
      image: 'https://www.lattafa-usa.com/cdn/shop/files/Khamrah-1_0ffa4f52-30e3-4dea-9399-9bae4b8cb4af.png',
      filterFn: (p) => p.gender?.toLowerCase() === 'unisex' || p.tags?.includes('unisex')
    },
    {
      handle: 'lattafa',
      title: "Colección Lattafa",
      subtitle: "Iconos clásicos reconocidos de la perfumería árabe",
      image: 'https://www.lattafa-usa.com/cdn/shop/files/COVER_MAIN_UP_4-5.png?v=1769829986',
      filterFn: (p) => p.vendor?.toLowerCase() === 'lattafa' || !p.title.toLowerCase().includes('pride')
    },
    {
      handle: 'pride',
      title: "Lattafa Pride",
      subtitle: "Línea premium exclusiva de frascos y extractos de lujo",
      image: 'https://www.lattafa-usa.com/cdn/shop/files/Atheeri-1_f93156cf-73d9-4455-8540-5665a4312efb.png',
      filterFn: (p) => p.title.toLowerCase().includes('pride') || p.vendor?.toLowerCase().includes('pride')
    },
    {
      handle: 'bundles',
      title: "Packs Exclusivos",
      subtitle: "Sets de regalo y cofres especiales de edicion limitada",
      image: 'https://www.lattafa-usa.com/cdn/shop/files/myyaragiftset.png?v=1750374217',
      filterFn: (p) => p.is_bundle || p.title.toLowerCase().includes('set') || p.title.toLowerCase().includes('collection') || p.title.toLowerCase().includes('bundle')
    }
  ];

  // Filter products according to collection handle
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0 || isAllCollections) return [];
    
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
  }, [products, collectionHandle, sortBy, isAllCollections]);

  return (
    <div className="bg-white min-h-screen text-stone-900 pb-20 animate-fadeIn">
      
      {/* 1. BREADCRUMBS NAVIGATION */}
      <div className="w-full px-4 sm:px-10 lg:px-14 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-center space-x-2 text-xs text-stone-500 font-medium">
          <button onClick={navigateToHome} className="hover:text-stone-900 hover:underline transition-colors cursor-pointer">
            Inicio
          </button>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          {isAllCollections ? (
            <span className="text-stone-900 font-semibold uppercase tracking-wider">Todas las Colecciones</span>
          ) : (
            <>
              <button 
                onClick={() => navigateToCollection('all', 'Todas las Colecciones')} 
                className="hover:text-stone-900 hover:underline transition-colors cursor-pointer"
              >
                Colección
              </button>
              <ChevronRight className="w-3 h-3 text-stone-400" />
              <span className="text-stone-900 font-semibold uppercase tracking-wider">{collectionTitle}</span>
            </>
          )}
        </div>
      </div>

      <div className="w-full px-4 sm:px-10 lg:px-14 py-8 space-y-10">
        
        {/* VISTA 1: PÁGINA GENERAL DE TODAS LAS COLECCIONES (SOLO MUESTRA LAS COLECCIONES, SIN PRODUCTOS) */}
        {isAllCollections ? (
          <div className="space-y-10">
            {/* Encabezado Principal */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200/80 px-4 py-1.5 rounded-full text-amber-900 text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Catálogo Completo de Colecciones</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl font-normal text-stone-900 tracking-tight">
                Nuestras Colecciones
              </h1>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light">
                Selecciona una colección a continuación para explorar los perfumes y fragancias exclusivas pertenecientes a esa línea.
              </p>
            </div>

            {/* Grid de Tarjetas de Colecciones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {categoryCards.map((cat) => {
                const count = products.filter(cat.filterFn).length;
                return (
                  <div
                    key={cat.handle}
                    onClick={() => navigateToCollection(cat.handle, cat.title)}
                    className="group bg-[#fcfbf9] hover:bg-white rounded-3xl p-6 border border-stone-200/80 hover:border-amber-500/50 transition-all duration-300 shadow-xs hover:shadow-xl cursor-pointer flex flex-col justify-between relative overflow-hidden"
                  >
                    <div>
                      <div className="aspect-4/3 w-full rounded-2xl bg-white overflow-hidden p-4 mb-5 flex items-center justify-center border border-stone-100 group-hover:scale-102 transition-transform duration-500">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-serif text-2xl font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">
                          {cat.title}
                        </h3>
                        <span className="bg-amber-100/70 text-amber-900 text-[11px] font-bold px-3 py-1 rounded-full">
                          {count} fragancias
                        </span>
                      </div>
                      
                      <p className="text-stone-500 text-xs leading-relaxed font-normal mb-6">
                        {cat.subtitle}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-900 group-hover:text-amber-700 transition-colors">
                      <span>Ver Perfumes</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* VISTA 2: VISTA DE UNA COLECCIÓN ESPECÍFICA (MUESTRA ÚNICAMENTE LOS PERFUMES DE ESA COLECCIÓN) */
          <div className="space-y-10">
            {/* Encabezado de la Colección Seleccionada */}
            <div className="text-center sm:text-left">
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-stone-900 capitalize tracking-tight">
                {collectionTitle}
              </h1>
            </div>

            {/* Sub-selector de tarjetas de colecciones para rápido cambio */}
            <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
              {categoryCards.slice(0, 6).map((cat) => {
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

            {/* Barra de Filtros y Ordenamiento */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-y border-stone-200/80 py-4">
              
              <button
                onClick={() => setIsFilterOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs px-5 py-2.5 rounded-full uppercase tracking-wider transition-all border border-stone-200 cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>FILTRAR</span>
              </button>

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

            {/* Grid de Productos de la Colección Seleccionada */}
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
                  onClick={() => navigateToCollection('all', 'Todas las Colecciones')}
                  className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs px-8 py-3 rounded-full uppercase tracking-widest shadow-md transition-all cursor-pointer"
                >
                  Ver Todas las Colecciones
                </button>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
