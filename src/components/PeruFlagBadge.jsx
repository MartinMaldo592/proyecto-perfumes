import React, { useId } from 'react';

export const PeruFlagBadge = ({ className = "" }) => {
  const rawId = useId();
  const uid = rawId.replace(/:/g, '_');

  const goldGradId = `peruGoldGrad${uid}`;
  const goldLightGradId = `peruGoldLightGrad${uid}`;
  const redGradId = `peruRedGrad${uid}`;
  const redLightGradId = `peruRedLightGrad${uid}`;
  const whiteGradId = `peruWhiteGrad${uid}`;
  const redDarkGradId = `peruRedDarkGrad${uid}`;
  const goldGlowId = `goldGlow${uid}`;
  const shadowId = `badgeShadow${uid}`;

  return (
    <div className={`relative group cursor-pointer flex items-center justify-center flex-shrink-0 ${className}`}>
      {/* Interactive Tooltip on Hover */}
      <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 whitespace-nowrap transform group-hover:translate-y-0 translate-y-1">
        <div className="bg-stone-950 text-white text-[11px] font-medium px-3.5 py-2 rounded-xl shadow-2xl border border-amber-400/50 flex items-center space-x-2 backdrop-blur-md">
          <span className="text-base leading-none">🇵🇪</span>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-amber-300 text-xs tracking-wide">¡205 Años de Independencia!</span>
            <span className="text-[10px] text-stone-300 font-sans tracking-tight">Fiestas Patrias del Perú (1821 - 2026)</span>
          </div>
        </div>
        {/* Tooltip Arrow */}
        <div className="w-2.5 h-2.5 bg-stone-950 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 border-r border-b border-amber-400/50"></div>
      </div>

      {/* SVG Icon: Ultra-Luxury 205th Anniversary Peruvian Flag Emblem */}
      <svg
        viewBox="0 0 160 160"
        className="w-9 h-9 sm:w-10 sm:h-10 filter drop-shadow-lg hover:scale-110 hover:rotate-3 transition-all duration-300 ease-out flex-shrink-0 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="205 Años de Independencia del Perú"
      >
        <defs>
          {/* Rich Metallic Gold Gradient */}
          <linearGradient id={goldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="25%" stopColor="#F5D061" />
            <stop offset="50%" stopColor="#C99726" />
            <stop offset="75%" stopColor="#9E6E0F" />
            <stop offset="100%" stopColor="#F8DA76" />
          </linearGradient>

          {/* Bright Metallic Gold Highlight */}
          <linearGradient id={goldLightGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FCE089" />
            <stop offset="100%" stopColor="#C49222" />
          </linearGradient>

          {/* Vibrant Peruvian Red Silk Gradient */}
          <linearGradient id={redGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF3347" />
            <stop offset="40%" stopColor="#D91023" />
            <stop offset="85%" stopColor="#940513" />
            <stop offset="100%" stopColor="#69000A" />
          </linearGradient>

          {/* Soft Red Satin Highlight */}
          <linearGradient id={redLightGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B7A" />
            <stop offset="100%" stopColor="#D91023" />
          </linearGradient>

          {/* Silk White Gradient */}
          <linearGradient id={whiteGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F0F0F0" />
            <stop offset="100%" stopColor="#D8D8D8" />
          </linearGradient>

          {/* Deep Crimson Shadow */}
          <linearGradient id={redDarkGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9C0A19" />
            <stop offset="100%" stopColor="#4A0007" />
          </linearGradient>

          {/* Gold Glow Filter */}
          <filter id={goldGlowId} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#FCE089" floodOpacity="0.6" />
          </filter>

          {/* Drop Shadow Filter */}
          <filter id={shadowId} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* 1. Radiating Sunbeams (Sol de los Incas Motif) */}
        <g stroke={`url(#${goldGradId})`} strokeWidth="1.5" opacity="0.6" strokeLinecap="round">
          <line x1="80" y1="8" x2="80" y2="18" />
          <line x1="80" y1="142" x2="80" y2="152" />
          <line x1="8" y1="80" x2="18" y2="80" />
          <line x1="142" y1="80" x2="152" y2="80" />
          <line x1="29" y1="29" x2="36" y2="36" />
          <line x1="124" y1="124" x2="131" y2="131" />
          <line x1="131" y1="29" x2="124" y2="36" />
          <line x1="36" y1="124" x2="29" y2="131" />
        </g>

        {/* 2. Outer Golden Laurel Ring */}
        <circle cx="80" cy="80" r="70" fill="none" stroke={`url(#${goldGradId})`} strokeWidth="2.5" strokeDasharray="8 4" opacity="0.9" />
        
        {/* 3. Base Dark Obsidian Shield */}
        <circle cx="80" cy="80" r="64" fill="#141210" stroke={`url(#${goldGradId})`} strokeWidth="3" filter={`url(#${goldGlowId})`} />
        
        {/* Inner Gold Bezel Ring */}
        <circle cx="80" cy="80" r="60" fill="none" stroke={`url(#${goldLightGradId})`} strokeWidth="1" opacity="0.8" />

        {/* 4. Golden Laurel Leaves (Left & Right Arms) */}
        {/* Left Laurel */}
        <path d="M 28 80 Q 25 58 40 40 Q 42 48 34 68 Z" fill={`url(#${goldGradId})`} />
        <path d="M 32 65 Q 26 48 45 32 Q 44 42 36 58 Z" fill={`url(#${goldLightGradId})`} />
        <path d="M 38 50 Q 30 36 52 24 Q 48 34 42 46 Z" fill={`url(#${goldGradId})`} />
        
        {/* Right Laurel */}
        <path d="M 132 80 Q 135 58 120 40 Q 118 48 126 68 Z" fill={`url(#${goldGradId})`} />
        <path d="M 128 65 Q 134 48 115 32 Q 116 42 124 58 Z" fill={`url(#${goldLightGradId})`} />
        <path d="M 122 50 Q 130 36 108 24 Q 112 34 118 46 Z" fill={`url(#${goldGradId})`} />

        {/* 5. 3D Wavy Peruvian Flag in Background Center */}
        <g transform="translate(80, 76) scale(0.95) translate(-80, -76)" filter={`url(#${shadowId})`}>
          {/* Flagpole Spear Head */}
          <path d="M 27 15 L 31 26 L 27 24 L 23 26 Z" fill={`url(#${goldLightGradId})`} />
          <rect x="25.5" y="24" width="3" height="104" rx="1.5" fill={`url(#${goldGradId})`} />

          {/* Left Red Stripe (Wavy Silk) */}
          <path
            d="M 28 28 C 42 33, 54 25, 66 30 L 66 112 C 54 107, 42 115, 28 110 Z"
            fill={`url(#${redGradId})`}
          />
          {/* Wave Highlight */}
          <path
            d="M 28 28 C 36 31, 46 27, 66 30 L 66 35 C 46 32, 36 36, 28 33 Z"
            fill={`url(#${redLightGradId})`}
            opacity="0.6"
          />

          {/* Center White Stripe (Wavy Satin) */}
          <path
            d="M 66 30 C 78 35, 90 27, 102 30 L 102 112 C 90 107, 78 115, 66 112 Z"
            fill={`url(#${whiteGradId})`}
          />

          {/* Right Red Stripe (Wavy Silk) */}
          <path
            d="M 102 30 C 114 35, 126 27, 138 30 L 138 112 C 126 107, 114 115, 102 112 Z"
            fill={`url(#${redGradId})`}
          />
          <path
            d="M 102 30 C 114 35, 126 27, 138 30 L 138 35 C 126 32, 114 40, 102 35 Z"
            fill={`url(#${redLightGradId})`}
            opacity="0.5"
          />
        </g>

        {/* 6. Central Patriotic Escarapela Rosette (Peruvian Cockade) */}
        <g filter={`url(#${shadowId})`}>
          {/* Outer Pleated Red Ring */}
          <circle cx="80" cy="74" r="30" fill={`url(#${redDarkGradId})`} stroke={`url(#${goldGradId})`} strokeWidth="2.5" />
          
          {/* Middle Satin White Ring */}
          <circle cx="80" cy="74" r="23" fill={`url(#${whiteGradId})`} stroke={`url(#${goldGradId})`} strokeWidth="1.5" />
          
          {/* Inner Deep Red Core */}
          <circle cx="80" cy="74" r="17" fill={`url(#${redGradId})`} stroke={`url(#${goldGradId})`} strokeWidth="2" />
          <circle cx="80" cy="74" r="16" fill="none" stroke={`url(#${goldLightGradId})`} strokeWidth="0.75" />
        </g>

        {/* 7. Central "205" Commemorative Year Text */}
        <text
          x="80"
          y="80"
          textAnchor="middle"
          fill={`url(#${goldLightGradId})`}
          fontSize="17"
          fontWeight="900"
          fontFamily="Georgia, 'Times New Roman', serif"
          letterSpacing="-0.5"
          filter={`url(#${goldGlowId})`}
        >
          205
        </text>

        {/* 8. Bottom Majestic Golden Banner "1821 · PERÚ · 2026" */}
        <g filter={`url(#${shadowId})`}>
          {/* Banner Body */}
          <path d="M 32 118 Q 80 144 128 118 L 122 132 Q 80 156 38 132 Z" fill={`url(#${goldGradId})`} stroke={`url(#${goldLightGradId})`} strokeWidth="1" />
          {/* Banner Fold Tails */}
          <path d="M 32 118 L 24 126 L 38 132 Z" fill="#9E6E0F" />
          <path d="M 128 118 L 136 126 L 122 132 Z" fill="#9E6E0F" />
          
          {/* Banner Golden Text */}
          <text
            x="80"
            y="133.5"
            textAnchor="middle"
            fill="#12100E"
            fontSize="8"
            fontWeight="900"
            fontFamily="Arial, Helvetica, sans-serif"
            letterSpacing="1.8"
          >
            1821 · PERÚ · 2026
          </text>
        </g>
      </svg>
    </div>
  );
};
