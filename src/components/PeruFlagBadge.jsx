import React, { useId } from 'react';

export const PeruFlagBadge = ({ className = "" }) => {
  const rawId = useId();
  const uid = rawId.replace(/:/g, '_');

  const goldGradId = `peruGoldGrad${uid}`;
  const redGradId = `peruRedGrad${uid}`;
  const whiteGradId = `peruWhiteGrad${uid}`;
  const redDarkGradId = `peruRedDarkGrad${uid}`;
  const goldGlowId = `goldGlow${uid}`;

  return (
    <div className={`relative group cursor-pointer flex items-center justify-center flex-shrink-0 ${className}`}>
      {/* Interactive Tooltip on Hover */}
      <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 whitespace-nowrap">
        <div className="bg-stone-900 text-white text-[11px] font-medium px-3 py-1.5 rounded-lg shadow-xl border border-amber-400/40 flex items-center space-x-1.5">
          <span className="text-sm">🇵🇪</span>
          <span className="font-serif font-bold text-amber-300">¡205 Años de Libertad!</span>
          <span className="text-[10px] text-stone-300 font-sans">Fiestas Patrias</span>
        </div>
        {/* Tooltip Arrow */}
        <div className="w-2 h-2 bg-stone-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 border-r border-b border-amber-400/40"></div>
      </div>

      {/* SVG Icon: 205 Years Peruvian Independence Emblem */}
      <svg
        viewBox="0 0 120 120"
        className="w-8 h-8 sm:w-9 sm:h-9 filter drop-shadow-md hover:scale-110 transition-all duration-300 ease-out flex-shrink-0 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="205 Años de Independencia del Perú"
      >
        <defs>
          {/* Metallic Gold Gradient */}
          <linearGradient id={goldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA7C11" />
            <stop offset="100%" stopColor="#FFD54F" />
          </linearGradient>

          {/* Peruvian Red Silk Gradient */}
          <linearGradient id={redGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5192D" />
            <stop offset="50%" stopColor="#C41224" />
            <stop offset="100%" stopColor="#960A18" />
          </linearGradient>

          {/* Silk White Gradient */}
          <linearGradient id={whiteGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F5F5F5" />
            <stop offset="100%" stopColor="#E0E0E0" />
          </linearGradient>

          {/* Dark Red Shadow */}
          <linearGradient id={redDarkGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A80D1D" />
            <stop offset="100%" stopColor="#6C050F" />
          </linearGradient>

          {/* Glow Shadow Filter */}
          <filter id={goldGlowId} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#D4AF37" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Outer Golden Laurel & Sunbeam Ring */}
        <circle cx="60" cy="60" r="54" fill="none" stroke={`url(#${goldGradId})`} strokeWidth="2.5" strokeDasharray="6 3" opacity="0.85" />
        
        {/* Outer Circular Shield Base */}
        <circle cx="60" cy="60" r="49" fill="#121212" stroke={`url(#${goldGradId})`} strokeWidth="2.5" filter={`url(#${goldGlowId})`} />

        {/* Wavy Peruvian Flag Mask / Shape in Center */}
        <g transform="translate(60, 58) scale(0.82) translate(-60, -58)">
          {/* Red Left Stripe */}
          <path
            d="M 22 25 C 32 28, 42 22, 52 25 L 52 91 C 42 88, 32 94, 22 91 Z"
            fill={`url(#${redGradId})`}
          />
          <path
            d="M 22 25 C 27 26.5, 37 23.5, 52 25 L 52 29 C 37 27.5, 27 30.5, 22 29 Z"
            fill="#FF4D5E"
            opacity="0.5"
          />

          {/* White Center Stripe */}
          <path
            d="M 52 25 C 62 28, 72 22, 82 25 L 82 91 C 72 88, 62 94, 52 91 Z"
            fill={`url(#${whiteGradId})`}
          />

          {/* Red Right Stripe */}
          <path
            d="M 82 25 C 92 28, 102 22, 112 25 L 112 91 C 102 88, 92 94, 82 91 Z"
            fill={`url(#${redGradId})`}
          />
          <path
            d="M 82 25 C 92 28, 102 22, 112 25 L 112 29 C 102 26, 92 32, 82 29 Z"
            fill="#FF4D5E"
            opacity="0.4"
          />

          {/* Golden Flagpole */}
          <rect x="17" y="16" width="5" height="84" rx="2.5" fill={`url(#${goldGradId})`} />
          <circle cx="19.5" cy="15" r="4.5" fill={`url(#${goldGradId})`} />
        </g>

        {/* Golden Central Escarapela / Medal Badge */}
        <circle cx="60" cy="58" r="23" fill={`url(#${redDarkGradId})`} stroke={`url(#${goldGradId})`} strokeWidth="2" />
        <circle cx="60" cy="58" r="19" fill="#FFFFFF" stroke={`url(#${goldGradId})`} strokeWidth="1" />
        <circle cx="60" cy="58" r="15" fill={`url(#${redGradId})`} stroke={`url(#${goldGradId})`} strokeWidth="1.5" />

        {/* 205 Golden Text Center */}
        <text
          x="60"
          y="63"
          textAnchor="middle"
          fill={`url(#${goldGradId})`}
          fontSize="14"
          fontWeight="900"
          fontFamily="Georgia, serif"
          letterSpacing="-0.5"
          filter={`url(#${goldGlowId})`}
        >
          205
        </text>

        {/* Bottom Curved Golden Ribbon "FIESTAS PATRIAS" */}
        <path d="M 28 88 Q 60 106 92 88 L 88 98 Q 60 114 32 98 Z" fill={`url(#${goldGradId})`} />
        <text
          x="60"
          y="99.5"
          textAnchor="middle"
          fill="#121212"
          fontSize="6.5"
          fontWeight="900"
          fontFamily="Arial, sans-serif"
          letterSpacing="1.2"
        >
          PERÚ 205 AÑOS
        </text>
      </svg>
    </div>
  );
};
