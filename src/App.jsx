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
      
      {/* Sticky Header Wrapper Container */}
      <div className="sticky top-0 z-40 w-full bg-white">
        <AnnouncementBar />
        <Header />
      </div>

      {/* Main Content View Switcher with Tailor-Made Gold Shimmer Skeleton Transition */}
      <main className="flex-1">
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
