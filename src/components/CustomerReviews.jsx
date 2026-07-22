import React, { useRef } from 'react';
import { Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CustomerReviews = () => {
  const { products, navigateToProduct, navigateToCollection } = useStore();
  const scrollRef = useRef(null);

  const reviews = [
    {
      id: 1,
      author: "S.",
      verified: true,
      rating: 5,
      comment: "Packaging 10/10. The scent is like nothing else I've smelled — it gives luxury and new money. Very strong!",
      productTitle: "Khamrah Waha",
      photo: "https://review-images.judge.me/lattafa/1784315019__img_3801__original.jpeg?quality=80&width=1024",
      productThumb: "https://www.lattafa-usa.com/cdn/shop/files/Khamrah-1_0ffa4f52-30e3-4dea-9399-9bae4b8cb4af.png"
    },
    {
      id: 2,
      author: "Sherry Burns",
      verified: true,
      rating: 5,
      comment: "Shout out for recommending this fragrance. BABE!!! She's a 10 out of 10 and yes she's backup bottle worthy!",
      productTitle: "Atheeri",
      photo: "https://review-images.judge.me/lattafa/1784655442__image__original.jpg?quality=80&width=1024",
      productThumb: "https://www.lattafa-usa.com/cdn/shop/files/Atheeri-1_f93156cf-73d9-4455-8540-5665a4312efb.png"
    },
    {
      id: 3,
      author: "Olga Cruz",
      verified: true,
      rating: 5,
      comment: "Cómprenlo está muy rico. La fijación es excelente y las notas dulces son súper delicadas y atractivas.",
      productTitle: "Ameerat Al Arab Sugar Crown",
      photo: "https://review-images.judge.me/lattafa/1780084298__image__original.jpg?quality=80&width=1024",
      productThumb: "https://www.lattafa-usa.com/cdn/shop/files/AmeeratAlArabSugarCrown-1.png"
    },
    {
      id: 4,
      author: "Marie",
      verified: true,
      rating: 5,
      comment: "It smells so good! Tried Khamrah — labeled unisex, but smells bold, warm, spicy-sweet and attractive.",
      productTitle: "Khamrah",
      photo: "https://review-images.judge.me/lattafa/1780304437__1780304433640-image__original.jpg?quality=80&width=1024",
      productThumb: "https://www.lattafa-usa.com/cdn/shop/files/Khamrah-1_0ffa4f52-30e3-4dea-9399-9bae4b8cb4af.png"
    },
    {
      id: 5,
      author: "Jonathan",
      verified: true,
      rating: 5,
      comment: "Perfectly balanced aroma, soft and warm scent that draws you in. Projects 3 hours, lasts around 8. Recommended!",
      productTitle: "Teriaq Intense",
      photo: "https://review-images.judge.me/lattafa/1777553302__1777553263147-img_7785__original.jpeg?quality=80&width=1024",
      productThumb: "https://www.lattafa-usa.com/cdn/shop/files/Teriaq-Intense-1_b9408dff-5346-4542-a598-cfffb8454d81.png"
    },
    {
      id: 6,
      author: "Anthony",
      verified: true,
      rating: 5,
      comment: "ASAD starts off a bit harsh and synthetic, but the dry-down is truly beautiful with warm spicy vanilla.",
      productTitle: "Asad",
      photo: "https://review-images.judge.me/lattafa/1784315028__img_3775__original.jpeg?quality=80&width=1024",
      productThumb: "https://www.lattafa-usa.com/cdn/shop/files/Asad-1_ceed76c7-7a80-46b3-b372-68cc309137f4.png"
    },
    {
      id: 7,
      author: "Sophia",
      verified: true,
      rating: 5,
      comment: "Yara Candy is sweet, fruity and delicious. Highly recommend! Customer photo shows exact packaging.",
      productTitle: "Yara Candy",
      photo: "https://review-images.judge.me/lattafa/1784315025__img_3804__original.jpeg?quality=80&width=1024",
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

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
  };

  return (
    <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#f4f1ea] py-12 my-12 overflow-hidden">
      
      {/* Header with Title and Scroll Controls */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 mb-8 flex items-end justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-900 block mb-1">
            Reseñas Reales de Compradores
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-normal text-stone-900">
            Lo Que Dicen Nuestros Clientes
          </h2>
        </div>

        {/* Desktop & Mobile Scroll Arrows */}
        <div className="flex items-center space-x-3">
          <button
            onClick={scrollLeft}
            className="w-10 h-10 rounded-full bg-white border border-stone-300 flex items-center justify-center text-stone-900 hover:bg-stone-900 hover:text-white transition-colors cursor-pointer shadow-xs"
            title="Anterior"
          >
            ‹
          </button>
          <button
            onClick={scrollRight}
            className="w-10 h-10 rounded-full bg-white border border-stone-300 flex items-center justify-center text-stone-900 hover:bg-stone-900 hover:text-white transition-colors cursor-pointer shadow-xs"
            title="Siguiente"
          >
            ›
          </button>
        </div>
      </div>

      {/* 100% Edge-to-Edge Full Width Carousel Row */}
      <div 
        ref={scrollRef}
        className="w-full px-6 sm:px-12 lg:px-16 flex space-x-6 overflow-x-auto scrollbar-none scroll-smooth py-3"
      >
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="w-[285px] sm:w-[315px] md:w-[340px] flex-shrink-0 bg-white rounded-2xl shadow-xs overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300"
          >
            {/* Top Photo filling full width of card edge-to-edge */}
            <div 
              onClick={() => handleProductClick(rev.productTitle)}
              className="w-full aspect-square bg-[#f0eee8] overflow-hidden cursor-pointer relative glass-hover-shine"
            >
              <img
                src={rev.photo}
                alt={rev.author}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
                <div className="flex items-center space-x-0.5 text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
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
