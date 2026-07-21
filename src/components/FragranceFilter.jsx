import React, { useState } from 'react';
import { X, SlidersHorizontal, Sparkles, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FragranceFilter = () => {
  const { isFilterOpen, setIsFilterOpen, products } = useStore();
  const [selectedGender, setSelectedGender] = useState('All');
  const [maxPrice, setMaxPrice] = useState(100);
  const [selectedNote, setSelectedNote] = useState('All');

  if (!isFilterOpen) return null;

  const olfactoryNotes = ["All", "Oud", "Vanilla", "Amber", "Rose", "Pepper", "Musk", "Patchouli", "Jasmine", "Caramel"];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col justify-between border-l border-gray-100">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-stone-50">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-5 h-5 text-amber-800" />
              <h3 className="font-serif font-bold text-lg text-stone-900">Filtros de Fragancias</h3>
            </div>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="p-2 text-gray-500 hover:text-stone-900 rounded-full hover:bg-gray-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Options */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* Gender Filter */}
            <div>
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block mb-3">Género / Uso</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Todos", value: "All" },
                  { label: "Unisex", value: "Unisex" },
                  { label: "Hombre", value: "Men" },
                  { label: "Mujer", value: "Women" }
                ].map((gender) => (
                  <button
                    key={gender.value}
                    onClick={() => setSelectedGender(gender.value)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      selectedGender === gender.value
                        ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-sm'
                        : 'border-gray-200 text-stone-600 hover:border-gray-300'
                    }`}
                  >
                    {gender.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Olfactory Notes Filter */}
            <div>
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Notas Olfativas
              </label>
              <div className="flex flex-wrap gap-2">
                {olfactoryNotes.map((note) => (
                  <button
                    key={note}
                    onClick={() => setSelectedNote(note)}
                    className={`py-1.5 px-3 text-xs font-medium rounded-full border transition-all cursor-pointer ${
                      selectedNote === note
                        ? 'border-amber-600 bg-amber-600 text-white shadow-sm'
                        : 'border-gray-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {note === 'All' ? 'Todas' : note}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">Precio Máximo</label>
                <span className="text-xs font-bold text-amber-800">S/ {maxPrice}</span>
              </div>
              <input
                type="range"
                min="30"
                max="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

          </div>

          {/* Footer Action */}
          <div className="p-5 border-t border-gray-100 bg-stone-50">
            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-[#121212] hover:bg-amber-800 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
            >
              Aplicar Filtros
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
