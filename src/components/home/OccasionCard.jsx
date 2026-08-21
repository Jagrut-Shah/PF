import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Unique typography styling for each occasion title
 */
function getOccasionTitleStyle(id) {
  switch (id) {
    case 'date-night':
      return 'font-sans italic font-extrabold tracking-[0.03em] uppercase text-[#F5F1EA]';
    case 'everyday':
      return 'font-sans font-bold tracking-[0.14em] uppercase text-[#F5F1EA]';
    case 'office':
      return 'font-sans font-semibold tracking-[0.2em] uppercase text-[#F5F1EA]';
    case 'party':
      return 'font-sans font-extrabold tracking-[0.1em] uppercase text-[#F5F1EA]';
    default:
      return 'font-sans font-bold tracking-[0.1em] uppercase text-[#F5F1EA]';
  }
}

/**
 * OccasionCard Component
 * Mobile (< md): Compact photographic tile with occasion name OUTSIDE directly below image (DOT REMOVED).
 * Desktop (>= md): Featured Hero Card treatment for Date Night with Modern Gen-Z Sans-Serif Typography.
 */
export default function OccasionCard({ occasion }) {
  if (!occasion) return null;

  const isDateNight = occasion.id === 'date-night' || Boolean(occasion.isHero);
  const titleClass = getOccasionTitleStyle(occasion.id);

  return (
    <div className="relative w-full">
      {/* ── 1. MOBILE PRESENTATION (< md: IMAGE TOP, TEXT OUTSIDE BELOW, DOT REMOVED) ── */}
      <Link
        to={occasion.route}
        className="group md:hidden flex flex-col items-center w-full select-none focus:outline-none"
        aria-label={`Shop perfumes for ${occasion.title}`}
      >
        {/* Compact Photographic Image Container */}
        <div
          className={`relative w-full aspect-[1/0.85] rounded-[6px] sm:rounded-[8px] overflow-hidden border transition-transform duration-300 group-hover:scale-[1.02] shadow-sm ${
            isDateNight
              ? 'border-[#8B1E1E]/80 shadow-[0_4px_14px_rgba(139,30,30,0.3)]'
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

        {/* Occasion Text OUTSIDE & DIRECTLY BELOW Image (No Dot) */}
        <div className="mt-1.5 flex items-center justify-center w-full text-center px-0.5">
          <h3 className={`text-[9.5px] sm:text-[11px] text-center leading-tight break-words ${titleClass}`}>
            {occasion.title}
          </h3>
        </div>
      </Link>

      {/* ── 2. DESKTOP PRESENTATION (>= md: HERO CARD FOR DATE NIGHT, CAMPAIGN CARD FOR OTHERS, DOT REMOVED) ── */}
      <Link
        to={occasion.route}
        className={`hidden md:flex group relative z-10 flex-col justify-end w-full select-none overflow-hidden rounded-[10px] transition-all duration-300 p-5 lg:p-6 h-[162px] lg:h-[168px] focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50 ${
          isDateNight
            ? 'border-2 border-[#8B1E1E] shadow-[0_16px_40px_rgba(139,30,30,0.35),0_4px_14px_rgba(139,30,30,0.20)] transform scale-[1.025] -translate-y-1.5'
            : 'border border-white/10'
        }`}
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
          {/* Bottom-Left Editorial Text Block (No Dot) */}
          <div className="flex flex-col min-w-0 pr-3">
            <h3
              className={`text-[13.5px] lg:text-[14.5px] leading-none truncate ${titleClass}`}
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
            >
              {occasion.title}
            </h3>

            {/* Subtitle */}
            <p
              className="font-sans text-[12px] lg:text-[12.5px] leading-snug mt-1.5 font-normal tracking-[0.01em] truncate text-[#E5E9E8]/90"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
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
