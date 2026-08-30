import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * OccasionCard Component — Black & Very Dark Cream Luxury Language
 * - Titles: Bodoni Moda 500 in Very Dark Cream #DAC29F
 * - "DATE NIGHT" MUST FIT ON ONE LINE on both mobile and desktop
 * - Subtitles: Visible on desktop, HIDDEN ON MOBILE
 */
export default function OccasionCard({ occasion }) {
  if (!occasion) return null;

  const titleText = occasion.id === 'date-night'
    ? 'Date Night'
    : occasion.id === 'everyday'
      ? 'Everyday'
      : occasion.id === 'office'
        ? 'Office'
        : occasion.id === 'party'
          ? 'Party'
          : occasion.title;

  return (
    <div className="relative w-full">
      {/* MOBILE — Subtitles HIDDEN, Very Dark Cream #DAC29F text on Black section */}
      <Link
        to={occasion.route}
        className="group md:hidden flex flex-col items-center w-full select-none focus:outline-none active:scale-[0.98] transition-transform duration-150"
        aria-label={`Shop perfumes for ${titleText}`}
      >
        <div className="relative w-full aspect-[1/0.85] rounded-[10px] overflow-hidden border border-[#3D2E2A] bg-[#1A1412] transition-transform duration-300 group-hover:scale-[1.02] shadow-md">
          <img
            src={occasion.image}
            alt={occasion.alt}
            className="w-full h-full object-cover object-center pointer-events-none"
            loading="lazy"
          />
        </div>
        <div className="mt-2 text-center w-full px-0.5">
          <h3 className="font-bodoni font-medium text-[18px] sm:text-[20px] text-[#DAC29F] leading-none whitespace-nowrap tracking-[-0.01em]">
            {titleText}
          </h3>
        </div>
      </Link>

      {/* DESKTOP — Subtitles visible */}
      <Link
        to={occasion.route}
        className="hidden md:flex group relative z-10 flex-col justify-end w-full select-none overflow-hidden rounded-xl border border-[#3D2E2A] bg-[#1A1412] transition-all duration-300 p-4 lg:p-5 h-[160px] lg:h-[172px] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#DAC29F]/50 shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.8)] hover:border-[#DAC29F]/50 hover:-translate-y-1"
        aria-label={`Shop perfumes for ${titleText}`}
      >
        {/* Background Image with scrim */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={occasion.image}
            alt={occasion.alt}
            className="w-full h-full object-cover object-center pointer-events-none transform transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            loading="lazy"
          />
          {/* Editorial gradient scrim — Black overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#120E0D]/95 via-[#120E0D]/55 to-transparent transition-opacity duration-300" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex items-end justify-between w-full">
          <div className="flex flex-col min-w-0 pr-2">
            <h3 className="font-bodoni font-medium text-[24px] md:text-[25px] lg:text-[27px] text-[#DAC29F] leading-none tracking-[-0.01em] whitespace-nowrap group-hover:text-[#E5D7C3] transition-colors">
              {titleText}
            </h3>
            {/* Desktop subtitle */}
            <p className="hidden md:block font-manrope font-normal text-[12px] lg:text-[13px] leading-relaxed mt-1 text-[#DAC29F]/70 group-hover:text-[#DAC29F] transition-colors truncate">
              {occasion.description}
            </p>
          </div>
          <div className="shrink-0 flex items-center justify-center pl-2">
            <ArrowRight
              className="w-4 h-4 stroke-[2] text-[#DAC29F]/80 group-hover:text-[#E5D7C3] transform transition-transform duration-250 ease-out group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
