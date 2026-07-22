import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { FeaturedCollections } from './components/FeaturedCollections';
import { ProductPage } from './components/ProductPage';
import { CollectionPage } from './components/CollectionPage';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { FragranceFilter } from './components/FragranceFilter';
import { Footer } from './components/Footer';

import { SkeletonLoader } from './components/SkeletonLoader';

const MainLayout = () => {
  const { activePage, loading, pageTransitioning } = useStore();

  const isPending = loading || pageTransitioning;

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      
      {/* 100% Fixed Header Wrapper Container for Mobile & Desktop */}
      <header className="fixed top-0 left-0 right-0 z-40 w-full bg-white border-b border-stone-200/60 shadow-xs">
        <AnnouncementBar />
        <Header />
      </header>

      {/* Main Content Container with Top Padding to clear fixed header */}
      <main className="flex-1 pt-[88px] sm:pt-[102px] lg:pt-[112px]">
        {isPending ? (
          <SkeletonLoader type={activePage} />
        ) : activePage === 'product' ? (
          <ProductPage />
        ) : activePage === 'collection' ? (
          <CollectionPage />
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
