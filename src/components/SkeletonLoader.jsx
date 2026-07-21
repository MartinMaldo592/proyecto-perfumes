import React from 'react';

export const SkeletonLoader = ({ type = 'home' }) => {
  // 1. PRODUCT DETAIL PAGE (PDP) SKELETON
  if (type === 'product') {
    return (
      <div className="w-full px-4 sm:px-10 lg:px-14 py-6 space-y-8 animate-fadeIn">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center space-x-2">
          <div className="h-3 w-16 bg-stone-200 rounded gold-shimmer"></div>
          <div className="h-3 w-4 bg-stone-200 rounded"></div>
          <div className="h-3 w-28 bg-stone-200 rounded gold-shimmer"></div>
          <div className="h-3 w-4 bg-stone-200 rounded"></div>
          <div className="h-3 w-36 bg-stone-300 rounded gold-shimmer"></div>
        </div>

        {/* PDP Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Gallery */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-4 items-start w-full">
            <div className="hidden sm:flex flex-col gap-3 w-20">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-20 h-20 bg-stone-100 rounded-2xl gold-shimmer"></div>
              ))}
            </div>
            <div className="w-full aspect-square sm:h-[500px] bg-stone-100 rounded-3xl gold-shimmer flex items-center justify-center p-8">
              <div className="w-48 h-64 bg-stone-200/60 rounded-full gold-shimmer"></div>
            </div>
          </div>

          {/* Right Product Details Info */}
          <div className="lg:col-span-5 space-y-6 pt-2">
            <div className="h-3 w-24 bg-stone-200 rounded gold-shimmer"></div>
            <div className="h-9 w-3/4 bg-stone-300 rounded-lg gold-shimmer"></div>
            <div className="h-5 w-36 bg-stone-200 rounded gold-shimmer"></div>
            
            <div className="h-8 w-44 bg-stone-300 rounded-md gold-shimmer"></div>
            
            <div className="space-y-2 pt-2">
              <div className="h-3 w-28 bg-stone-200 rounded gold-shimmer"></div>
              <div className="flex space-x-3">
                <div className="h-10 w-24 bg-stone-200 rounded-full gold-shimmer"></div>
                <div className="h-10 w-24 bg-stone-200 rounded-full gold-shimmer"></div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <div className="h-14 w-full bg-stone-900/10 rounded-full gold-shimmer"></div>
              <div className="h-12 w-full bg-amber-500/15 rounded-full gold-shimmer"></div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // 2. COLLECTION PAGE SKELETON
  if (type === 'collection') {
    return (
      <div className="w-full px-4 sm:px-10 lg:px-14 py-8 space-y-10 animate-fadeIn">
        {/* Banner */}
        <div className="w-full h-44 sm:h-64 bg-stone-100 rounded-3xl p-8 flex flex-col justify-center space-y-3 gold-shimmer">
          <div className="h-3 w-28 bg-amber-600/20 rounded"></div>
          <div className="h-8 w-64 bg-stone-300/80 rounded-lg"></div>
          <div className="h-4 w-96 bg-stone-200/80 rounded"></div>
        </div>

        {/* Filters Bar */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <div className="h-4 w-32 bg-stone-200 rounded gold-shimmer"></div>
          <div className="h-9 w-40 bg-stone-100 rounded-full gold-shimmer"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="space-y-3">
              <div className="aspect-square bg-stone-100 rounded-2xl gold-shimmer p-4 flex items-center justify-center">
                <div className="w-24 h-32 bg-stone-200/60 rounded-lg"></div>
              </div>
              <div className="h-3 bg-stone-200 rounded w-1/3 gold-shimmer"></div>
              <div className="h-4 bg-stone-300 rounded w-3/4 gold-shimmer"></div>
              <div className="h-4 bg-stone-200 rounded w-1/2 gold-shimmer"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. HOME PAGE SKELETON (DEFAULT)
  return (
    <div className="w-full space-y-12 animate-fadeIn">
      {/* Hero Banner Skeleton */}
      <div className="w-full h-[420px] sm:h-[580px] bg-stone-900/10 gold-shimmer flex flex-col justify-end items-center pb-12 space-y-4">
        <div className="h-6 w-64 bg-stone-300/80 rounded"></div>
        <div className="h-12 w-48 bg-amber-500/30 rounded-lg"></div>
        <div className="flex space-x-2 pt-2">
          <div className="h-2 w-8 bg-stone-300 rounded-full"></div>
          <div className="h-2 w-2 bg-stone-200 rounded-full"></div>
          <div className="h-2 w-2 bg-stone-200 rounded-full"></div>
        </div>
      </div>

      {/* Featured Grid Skeleton */}
      <div className="px-4 sm:px-10 lg:px-14 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="space-y-3">
            <div className="aspect-square bg-stone-100 rounded-2xl gold-shimmer"></div>
            <div className="h-3 bg-stone-200 rounded w-1/3 gold-shimmer"></div>
            <div className="h-4 bg-stone-300 rounded w-3/4 gold-shimmer"></div>
            <div className="h-4 bg-stone-200 rounded w-1/2 gold-shimmer"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
