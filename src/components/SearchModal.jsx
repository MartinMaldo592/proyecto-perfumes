import React, { useState } from 'react';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SearchModal = () => {
  const { products, isSearchOpen, setIsSearchOpen, setSelectedProduct } = useStore();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const results = query.trim() === ''
    ? []
    : products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          (p.top_notes && p.top_notes.toLowerCase().includes(q)) ||
          (p.heart_notes && p.heart_notes.toLowerCase().includes(q)) ||
          (p.base_notes && p.base_notes.toLowerCase().includes(q)) ||
          (p.tags && p.tags.toLowerCase().includes(q))
        );
      }).slice(0, 6);

  const quickSearches = ["Yara", "Asad", "Khamrah", "Maahir", "Oud", "Vanilla", "Amber"];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-start justify-center pt-16 px-4 animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-100 p-6">
        
        {/* Search Bar Input */}
        <div className="flex items-center space-x-3 border-b border-gray-200 pb-4">
          <Search className="w-5 h-5 text-amber-700" />
          <input
            type="text"
            placeholder="Search perfumes by name or notes (e.g. Oud, Vanilla, Asad)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base font-medium text-stone-900 placeholder-gray-400 focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-gray-400 hover:text-stone-900 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Chips */}
        <div className="pt-4 pb-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Popular Searches</span>
          <div className="flex flex-wrap gap-2">
            {quickSearches.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-3 py-1 bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 text-xs font-semibold rounded-full transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
          {query.trim() !== '' && results.length === 0 && (
            <div className="py-8 text-center text-xs text-gray-500">
              No perfumes found matching "{query}". Try searching for notes like "Oud", "Vanilla", or "Amber".
            </div>
          )}

          {results.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                setSelectedProduct(product);
                setIsSearchOpen(false);
              }}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer border border-transparent hover:border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product.main_image}
                  alt={product.title}
                  className="w-12 h-12 object-contain bg-white p-1 rounded-lg border border-gray-100"
                />
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-sm">{product.title}</h4>
                  <span className="text-[11px] text-amber-800 font-medium">{product.gender} • {product.volume}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-bold text-sm text-stone-900">${product.min_price} USD</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
