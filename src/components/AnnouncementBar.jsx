import React from 'react';

export const AnnouncementBar = () => {
  const announcements = [
    "FREE Shipping On Orders Over USD $60",
    "•",
    "100% Authentic Luxury Arabian Fragrances",
    "•",
    "FREE Shipping On Orders Over USD $60",
    "•",
    "Direct USA Distribution",
    "•",
  ];

  return (
    <div className="bg-[#2e231c] text-white text-[11px] font-medium py-2 overflow-hidden border-b border-[#3d3027]">
      <div className="flex animate-marquee whitespace-nowrap space-x-6">
        {announcements.concat(announcements).concat(announcements).map((text, idx) => (
          <span key={idx} className="inline-flex items-center tracking-wider text-white font-medium">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};
