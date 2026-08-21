import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * OccasionCard Component
 * Mobile (< md): Compact photographic tile with occasion name OUTSIDE directly below the image. Date Night has a mobile wine-red animated glowing border.
 * Desktop (>= md): Clean campaign card with overlay text inside and bottom-right arrow, with zero highlighting effect.
 */
export default function OccasionCard({ occasion }) {
  if (!occasion) return null;

  const isDateNight = occasion.id === 'date-night' || Boolean(occasion.isHero);

  return (
    <div className="relative w-full">
      {/* ── MOBILE ONLY: Date Night Animated Wine-Red Glowing Border Style ── */}
      {isDateNight && (
        <div className="md:hidden">
          <style>{`
            @keyframes mobileDateNightBorderGlow {
              0% {
                border-color: rgba(139, 30, 30, 0.5);
                box-shadow: 0 0 6px 1px rgba(139, 30, 30, 0.3);
              }
              50% {
                border-color: rgba(220, 65, 65, 0.95);
                box-shadow: 0 0 14px 3px rgba(139, 30, 30, 0.65);
              }
              100% {
                border-color: rgba(139, 30, 30, 0.5);
                box-shadow: 0 0 6px 1px rgba(139, 30, 30, 0.3);
              }
            }

            .mobile-date-night-border-animated {
              animation: mobileDateNightBorderGlow 3s ease-in-out infinite !important;
            }

            @media (prefers-reduced-motion: reduce) {
              .mobile-date-night-border-animated {
                animation: none !important;
                border-color: #8B1E1E !important;
                box-shadow: 0 0 8px rgba(139, 30, 30, 0.4) !important;
              }
            }
          `}</style>
        </div>
      )}

      {/* ── 1. MOBILE PRESENTATION (< md: IMAGE TOP, TEXT OUTSIDE BELOW) ── */}
      <Link
        to={occasion.route}
        className="group md:hidden flex flex-col items-center w-full select-none focus:outline-none"
        aria-label={`Shop perfumes for ${occasion.title}`}
      >
        {/* Compact Photographic Image Container */}
        <div
          className={`relative w-full aspect-[1/0.85] rounded-[6px] sm:rounded-[8px] overflow-hidden border transition-all duration-300 group-hover:scale-[1.02] shadow-sm ${
            isDateNight
              ? 'mobile-date-night-border-animated border-[#8B1E1E]'
              : 'border-white/10'
          }`}
        >
          <img
            src={occasion.image}
            alt={occasion.alt}
            className="w-full h-full object-cover object-center pointer-events-none"
            loading="lazy"
          />
        </div>

        {/* Occasion Text OUTSIDE & DIRECTLY BELOW Image */}
        <div className="mt-1.5 flex items-center justify-center gap-1 w-full text-center px-0.5">
          <span
            className="w-[4.5px] h-[4.5px] sm:w-[5.5px] sm:h-[5.5px] rounded-full shrink-0 shadow-xs"
            style={{ backgroundColor: occasion.dotColor }}
            aria-hidden="true"
          />
          <h3
            className="font-sans text-[9.5px] sm:text-[11px] font-bold tracking-[0.04em] uppercase text-[#F5F1EA] text-center leading-tight break-words"
          >
            {occasion.title}
          </h3>
        </div>
      </Link>

      {/* ── 2. DESKTOP PRESENTATION (>= md: CLEAN CAMPAIGN CARD) ── */}
      <Link
        to={occasion.route}
        className="hidden md:flex group relative z-10 flex-col justify-end w-full select-none overflow-hidden rounded-[10px] transition-all duration-300 p-5 lg:p-6 h-[162px] lg:h-[168px] focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
        aria-label={`Shop perfumes for ${occasion.title}`}
      >
        {/* Background Photography Layer */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={occasion.image}
            alt={occasion.alt}
            className="w-full h-full object-cover object-center pointer-events-none transform transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Controlled Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-colors duration-300" />
        </div>

        {/* Bottom Content Layer */}
        <div className="relative z-10 flex items-end justify-between w-full">
          {/* Bottom-Left Editorial Text Block */}
          <div className="flex flex-col min-w-0 pr-3">
            {/* Dot + Title */}
            <div className="flex items-center gap-2">
              <span
                className="w-[7px] h-[7px] rounded-full shrink-0 shadow-sm"
                style={{ backgroundColor: occasion.dotColor }}
                aria-hidden="true"
              />
              <h3
                className="font-sans text-[13px] lg:text-[13.5px] font-semibold tracking-[0.12em] uppercase leading-none truncate"
                style={{ color: '#FFFFFF', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
              >
                {occasion.title}
              </h3>
            </div>

            {/* Subtitle */}
            <p
              className="font-sans text-[13px] lg:text-[13.5px] leading-snug mt-1 font-normal tracking-wide truncate"
              style={{ color: '#FFFFFF', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
            >
              {occasion.description}
            </p>
          </div>

          {/* Bottom-Right Arrow Icon */}
          <div className="shrink-0 flex items-center justify-center pl-2">
            <ArrowRight
              className="w-[19px] h-[19px] stroke-[1.75] transform transition-transform duration-250 ease-out group-hover:translate-x-1"
              style={{ color: '#FFFFFF', filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.5))' }}
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
