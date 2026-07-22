import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CustomerReviews = () => {
  const { products, navigateToProduct, navigateToCollection } = useStore();
  const scrollRef = useRef(null);

  const reviews = [
    {
      id: 1,
      author: "Anthony",
      verified: true,
      rating: 5,
      comment: "ASAD starts off a bit harsh and synthetic, but the dry-down is truly beautiful.",
      productTitle: "Asad",
      photo: "https://www.lattafa-usa.com/cdn/shop/files/Asad-1_ceed76c7-7a80-46b3-b372-68cc309137f4.png",
      productThumb: "https://www.lattafa-usa.com/cdn/shop/files/Asad-1_ceed76c7-7a80-46b3-b372-68cc309137f4.png"
    },
    {
      id: 2,
      author: "Marie",
      verified: true,
      rating: 5,
      comment: "Tried Khamrah—labeled unisex, but smells bold, masculine, and attractive.",
      productTitle: "Khamrah",
      photo: "https://www.lattafa-usa.com/cdn/shop/files/Khamrah-1_0ffa4f52-30e3-4dea-9399-9bae4b8cb4af.png",
      productThumb: "https://www.lattafa-usa.com/cdn/shop/files/Khamrah-1_0ffa4f52-30e3-4dea-9399-9bae4b8cb4af.png"
    },
    {
      id: 3,
      author: "Jonathan",
      verified: true,
      rating: 5,
      comment: "Teriaq perfume smells great, projects 3 hours, lasts around 8. Recommended!",
      productTitle: "Teriaq Intense",
      photo: "https://www.lattafa-usa.com/cdn/shop/files/Teriaq-Intense-1_b9408dff-5346-4542-a598-cfffb8454d81.png",
      productThumb: "https://www.lattafa-usa.com/cdn/shop/files/Teriaq-Intense-1_b9408dff-5346-4542-a598-cfffb8454d81.png"
    },
    {
      id: 4,
      author: "Tyron",
      verified: true,
      rating: 5,
      comment: "Mature scent opens peppery, dries down spicy-vanilla but remarkable.",
      productTitle: "Art Of Arabia III",
      photo: "https://www.lattafa-usa.com/cdn/shop/files/Atheeri-1_f93156cf-73d9-4455-8540-5665a4312efb.png",
      productThumb: "https://www.lattafa-usa.com/cdn/shop/files/Atheeri-1_f93156cf-73d9-4455-8540-5665a4312efb.png"
    },
    {
      id: 5,
      author: "Altovise",
      verified: true,
      rating: 5,
      comment: "Love the Layaan scent, lasts all day! Second time ordering from Lattafa.",
      productTitle: "Layaan",
      photo: "https://www.lattafa-usa.com/cdn/shop/files/layaan-12.png?v=1760222559&width=1019",
      productThumb: "https://www.lattafa-usa.com/cdn/shop/files/layaan-12.png?v=1760222559&width=1019"
    },
    {
      id: 6,
      author: "Sophia",
      verified: true,
      rating: 5,
      comment: "Yara Candy is sweet, fruity and delicious. Premium unboxing experience.",
      productTitle: "Yara Candy",
      photo: "https://www.lattafa-usa.com/cdn/shop/files/Yara-Candy-1_86796aee-3226-4653-ba72-dd51d747c7f4.png",
      productThumb: "https://www.lattafa-usa.com/cdn/shop/files/Yara-Candy-1_86796aee-3226-4653-ba72-dd51d747c7f4.png"
    }
  ];

  const handleProductClick = (title) => {
    const found = products.find((p) => p.title.toLowerCase().includes(title.toLowerCase()));
    if (found) {
      navigateToProduct(found);
    } else {
      navigateToCollection('all', 'Todas las Colecciones');
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#f5f3ee] py-14 px-4 sm:px-10 lg:px-14 border-t border-stone-200/60 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl sm:text-4xl text-stone-900 font-normal tracking-tight">
              Customer Reviews
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-1 font-light">
              Opiniones e imágenes reales de clientes verificados Lattafa
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-white hover:bg-stone-900 hover:text-white border border-stone-200 shadow-xs flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-white hover:bg-stone-900 hover:text-white border border-stone-200 shadow-xs flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reviews Carousel Row */}
        <div
          ref={scrollRef}
          className="flex space-x-4 sm:space-x-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="w-[270px] sm:w-[300px] flex-shrink-0 bg-white rounded-3xl p-4 sm:p-5 shadow-xs border border-stone-200/70 flex flex-col justify-between group hover:shadow-lg transition-all duration-300"
            >
              <div className="space-y-3.5">
                {/* Customer Photo */}
                <div 
                  onClick={() => handleProductClick(rev.productTitle)}
                  className="aspect-square w-full rounded-2xl bg-[#f8f6f2] overflow-hidden cursor-pointer flex items-center justify-center border border-stone-100 p-2"
                >
                  <img
                    src={rev.photo}
                    alt={rev.author}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Author Info & Verified Tag */}
                <div className="flex items-center space-x-1.5 text-stone-900 font-semibold text-sm">
                  <span>{rev.author}</span>
                  <span className="text-[11px] font-normal text-stone-400">Verified Customer</span>
                </div>

                {/* 5 Solid Black Stars */}
                <div className="flex items-center space-x-0.5 text-black">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-black text-black" />
                  ))}
                </div>

                {/* Review Comment */}
                <p className="text-stone-700 text-xs font-normal leading-relaxed line-clamp-3">
                  {rev.comment}
                </p>
              </div>

              {/* Product Thumbnail Tag at Bottom */}
              <div
                onClick={() => handleProductClick(rev.productTitle)}
                className="mt-5 pt-3 border-t border-stone-100 flex items-center space-x-3 cursor-pointer hover:bg-stone-50 p-2 rounded-xl transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#f8f6f2] p-1 border border-stone-200 flex-shrink-0 flex items-center justify-center">
                  <img src={rev.productThumb} alt={rev.productTitle} className="max-h-full max-w-full object-contain" />
                </div>
                <span className="text-stone-900 font-semibold text-xs truncate">
                  {rev.productTitle}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
