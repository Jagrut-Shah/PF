import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * OccasionCard Component — Light Luxury Perfume Editorial Language
 * Bodoni Moda 500-600 Title + Manrope 400 Description
 * - Titles: Bodoni Moda 500-600 (Desktop 24-30px, Mobile 19-23px).
 * - "DATE NIGHT" MUST FIT ON ONE LINE on both mobile and desktop.
 * - Subtitles: Visible on desktop, HIDDEN ON MOBILE.
 * - All 4 cards have identical visual weight, typography, and premium cream framing.
 */
export default function OccasionCard({ occasion }) {
  if (!occasion) return null;

  const titleText = occasion.id === 'date-night' ? 'Date Night' : (occasion.id === 'everyday' ? 'Everyday' : (occasion.id === 'office' ? 'Office' : (occasion.id === 'party' ? 'Party' : occasion.title)));

  return (
    <div className="relative w-full">
      {/* MOBILE — Subtitles HIDDEN on mobile per Section 13 & 35 */}
      <Link
        to={occasion.route}
        className="group md:hidden flex flex-col items-center w-full select-none focus:outline-none active:scale-[0.98] transition-transform duration-150"
        aria-label={`Shop perfumes for ${titleText}`}
      >
        <div className="relative w-full aspect-[1/0.85] rounded-[10px] overflow-hidden border border-[#D9D1C6] bg-[#EEE8DD] transition-transform duration-300 group-hover:scale-[1.02] shadow-xs">
          <img
            src={occasion.image}
            alt={occasion.alt}
            className="w-full h-full object-cover object-center pointer-events-none"
            loading="lazy"
          />
        </div>
        <div className="mt-2 text-center w-full px-0.5">
          <h3 className="font-bodoni font-medium text-[18px] sm:text-[21px] text-[#201C19] leading-none whitespace-nowrap tracking-[-0.01em]">
            {titleText}
          </h3>
        </div>
      </Link>

      {/* DESKTOP — Subtitles enabled on desktop */}
      <Link
        to={occasion.route}
        className="hidden md:flex group relative z-10 flex-col justify-end w-full select-none overflow-hidden rounded-[14px] border border-[#D9D1C6] bg-[#EEE8DD] transition-all duration-300 p-5 lg:p-6 h-[170px] lg:h-[180px] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#721C24]/50 shadow-[0_4px_16px_rgba(60,45,30,0.05)] hover:shadow-[0_10px_28px_rgba(60,45,30,0.12)] hover:border-[#D8D0C4] hover:-translate-y-1"
        aria-label={`Shop perfumes for ${titleText}`}
      >
        {/* Background Layer */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={occasion.image}
            alt={occasion.alt}
            className="w-full h-full object-cover object-center pointer-events-none transform transition-transform duration-500 ease-out group-hover:scale-[1.035]"
            loading="lazy"
          />
          {/* Subtle Editorial Gradient Scrim for crisp text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#201C19]/90 via-[#201C19]/45 to-transparent transition-colors duration-300" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex items-end justify-between w-full">
          <div className="flex flex-col min-w-0 pr-3">
            <h3 className="font-bodoni font-medium text-[24px] md:text-[26px] lg:text-[28px] text-[#F6F2EA] leading-none tracking-[-0.01em] whitespace-nowrap">
              {titleText}
            </h3>
            {/* Desktop Subtitle */}
            <p className="hidden md:block font-manrope font-normal text-[13px] lg:text-[14px] leading-relaxed mt-1 text-[#E5DCCF] group-hover:text-[#F6F2EA] transition-colors truncate">
              {occasion.description}
            </p>
          </div>
          <div className="shrink-0 flex items-center justify-center pl-2">
            <span className="font-manrope font-semibold text-[14px] text-[#F6F2EA] group-hover:text-[#E5DCCF] flex items-center gap-1 transition-colors">
              <ArrowRight
                className="w-5 h-5 stroke-[2] transform transition-transform duration-250 ease-out group-hover:translate-x-1.5"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
