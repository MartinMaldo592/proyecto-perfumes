import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { FeaturedCollections } from './components/FeaturedCollections';
import { ProductPage } from './components/ProductPage';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { FragranceFilter } from './components/FragranceFilter';
import { Footer } from './components/Footer';

const MainLayout = () => {
  const { activePage } = useStore();

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      
      {/* Rolling Announcement Bar */}
      <AnnouncementBar />

      {/* Sticky Luxury Header */}
      <Header />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activePage === 'product' ? (
          <ProductPage />
        ) : (
          <>
            <HeroSlider />
            <FeaturedCollections />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Drawers & Modals */}
      <ProductModal />
      <CartDrawer />
      <SearchModal />
      <FragranceFilter />

    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
