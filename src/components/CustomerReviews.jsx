import React, { useRef } from 'react';
import { Star } from 'lucide-react';
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
      comment: "Mature scent opens peppery, dries down spicy-vanilla but unremarkable.",
      productTitle: "Art Of Arabia III",
      photo: "https://www.lattafa-usa.com/cdn/shop/files/Atheeri-1_f93156cf-73d9-4455-8540-5665a4312efb.png",
      productThumb: "https://www.lattafa-usa.com/cdn/shop/files/Atheeri-1_f93156cf-73d9-4455-8540-5665a4312efb.png"
    },
    {
      id: 5,
      author: "Altovise",
      verified: true,
      rating: 5,
      comment: "Love the scent, lasts all day! Second time ordering from Lattafa.",
      productTitle: "Layaan",
      photo: "https://www.lattafa-usa.com/cdn/shop/files/layaan-12.png?v=1760222559&width=1019",
      productThumb: "https://www.lattafa-usa.com/cdn/shop/files/layaan-12.png?v=1760222559&width=1019"
    },
    {
      id: 6,
      author: "Sophia",
      verified: true,
      rating: 5,
      comment: "Yara Candy is sweet, fruity and delicious. Highly recommend!",
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

  return (
    <section className="w-full bg-[#f4f1ea] py-10 my-10 overflow-hidden">
      {/* Full-width carousel row matching official Lattafa USA layout */}
      <div 
        ref={scrollRef}
        className="w-full px-4 sm:px-8 flex space-x-5 overflow-x-auto scrollbar-none scroll-smooth py-2"
      >
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="w-[280px] sm:w-[305px] md:w-[325px] flex-shrink-0 bg-white rounded-2xl shadow-xs overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-300"
          >
            {/* Top Photo filling full width of card edge-to-edge */}
            <div 
              onClick={() => handleProductClick(rev.productTitle)}
              className="w-full aspect-square bg-[#f0eee8] overflow-hidden cursor-pointer relative"
            >
              <img
                src={rev.photo}
                alt={rev.author}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                {/* Author Name + Verified Customer Tag */}
                <div className="flex items-center space-x-1.5">
                  <span className="font-semibold text-stone-900 text-sm">{rev.author}</span>
                  <span className="text-[11px] font-normal text-stone-400">Verified Customer</span>
                </div>

                {/* 5 Solid Black Stars */}
                <div className="flex items-center space-x-0.5 text-black">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-black text-black" />
                  ))}
                </div>

                {/* Review Comment */}
                <p className="text-stone-800 text-xs sm:text-[13px] font-normal leading-relaxed line-clamp-3 pt-1">
                  {rev.comment}
                </p>
              </div>

              {/* Bottom Product Pill Tag */}
              <div
                onClick={() => handleProductClick(rev.productTitle)}
                className="pt-3 border-t border-stone-100 flex items-center space-x-3 cursor-pointer group/tag hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-lg bg-[#f7f6f2] p-1 flex-shrink-0 flex items-center justify-center border border-stone-100">
                  <img src={rev.productThumb} alt={rev.productTitle} className="max-h-full max-w-full object-contain" />
                </div>
                <span className="text-stone-900 font-semibold text-xs truncate">
                  {rev.productTitle}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
