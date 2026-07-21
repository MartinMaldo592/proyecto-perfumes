import React from 'react';

export const AnnouncementBar = () => {
  const announcements = [
    "ENVÍO GRATIS en compras superiores a S/ 225.00",
    "•",
    "Fragancias de Lujo 100% Auténticas",
    "•",
    "ENVÍO GRATIS en compras superiores a S/ 225.00",
    "•",
    "Distribución Oficial Lattafa",
    "•",
  ];

  return (
    <div className="bg-[#2e231c] text-white text-[11px] font-medium py-2 overflow-hidden max-w-full w-full border-b border-[#3d3027]">
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
