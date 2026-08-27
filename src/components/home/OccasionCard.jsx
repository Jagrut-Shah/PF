import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * OccasionTitle Component — Unified Bodoni Moda 400 Title System across all 4 Occasions
 * Date Night, Everyday, Office, Party all receive identical, unified Bodoni Moda treatment per Section 17.
 */
function OccasionTitle({ occasion, isDesktop = false }) {
  const shadowStyle = isDesktop ? { textShadow: '0 1px 4px rgba(0,0,0,0.5)' } : {};

  return (
    <h3
      className={`font-serif font-normal text-[#F6EFE7] leading-tight truncate ${
        isDesktop ? 'text-[24px] lg:text-[28px]' : 'text-[21px] sm:text-[24px]'
      }`}
      style={shadowStyle}
    >
      {occasion.title}
    </h3>
  );
}

export default function OccasionCard({ occasion }) {
  if (!occasion) return null;

  return (
    <div className="relative w-full">
      {/* MOBILE */}
      <Link
        to={occasion.route}
        className="group md:hidden flex flex-col items-center w-full select-none focus:outline-none"
        aria-label={`Shop perfumes for ${occasion.title}`}
      >
        <div className="relative w-full aspect-[1/0.85] rounded-[6px] sm:rounded-[8px] overflow-hidden border border-[#E7C4C5]/15 transition-transform duration-300 group-hover:scale-[1.02] shadow-sm">
          <img
            src={occasion.image}
            alt={occasion.alt}
            className="w-full h-full object-cover object-center pointer-events-none"
            loading="lazy"
          />
        </div>
        <div className="mt-1.5 flex items-center justify-center w-full text-center px-0.5">
          <OccasionTitle occasion={occasion} isDesktop={false} />
        </div>
      </Link>

      {/* DESKTOP */}
      <Link
        to={occasion.route}
        className="hidden md:flex group relative z-10 flex-col justify-end w-full select-none overflow-hidden rounded-[10px] border border-[#E7C4C5]/15 transition-all duration-300 p-5 lg:p-6 h-[162px] lg:h-[168px] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E7C4C5]/50"
        aria-label={`Shop perfumes for ${occasion.title}`}
      >
        {/* Background Layer */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={occasion.image}
            alt={occasion.alt}
            className="w-full h-full object-cover object-center pointer-events-none transform transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A0D14]/90 via-[#2A0D14]/40 to-transparent transition-colors duration-300" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex items-end justify-between w-full">
          <div className="flex flex-col min-w-0 pr-3">
            <OccasionTitle occasion={occasion} isDesktop={true} />
            <p
              className="font-sans text-xs sm:text-sm leading-relaxed mt-1 font-normal tracking-wide truncate text-[#E7C4C5]/90"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
            >
              {occasion.description}
            </p>
          </div>
          <div className="shrink-0 flex items-center justify-center pl-2">
            <ArrowRight
              className="w-[19px] h-[19px] stroke-[1.75] transform transition-transform duration-250 ease-out group-hover:translate-x-1"
              style={{ color: '#F6EFE7', filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.5))' }}
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
