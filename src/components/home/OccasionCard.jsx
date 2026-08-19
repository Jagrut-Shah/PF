import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * OccasionCard Component
 * Refined editorial luxury catalogue tile featuring transparent photographic still-life objects,
 * softened luxury paper tints, subtle borders, and a lightweight Lucide arrow.
 */
export default function OccasionCard({ occasion }) {
  if (!occasion) return null;

  return (
    <Link
      to={occasion.route}
      className={`group relative block w-full select-none overflow-hidden rounded-[6px] border border-[rgba(40,40,40,0.08)] ${occasion.bgClass} ${occasion.hoverBgClass} transition-colors duration-250 focus:outline-none focus-visible:ring-1 focus-visible:ring-elava-gold`}
      aria-label={`Shop perfumes for ${occasion.title}`}
    >
      {/* ========================================================================= */}
      {/* DESKTOP LAYOUT (Displayed on md:, hidden on mobile)                       */}
      {/* ========================================================================= */}
      <div className="hidden md:flex h-[150px] lg:h-[158px] p-4 lg:p-5 justify-between items-stretch overflow-hidden relative">
        {/* Left: Accent Dot, Occasion Title, Description, Arrow */}
        <div className="flex flex-col justify-between flex-1 pr-2 z-10">
          <div>
            {/* Dot + Title */}
            <div className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: occasion.dotColor }}
                aria-hidden="true"
              />
              <h3 className="font-sans text-[12px] lg:text-[13px] font-medium tracking-[0.12em] text-elava-charcoal uppercase leading-none whitespace-nowrap">
                {occasion.title}
              </h3>
            </div>

            {/* Description */}
            <p className="font-sans text-[10.5px] lg:text-[11px] text-elava-stone leading-snug mt-1.5 font-normal">
              {occasion.description}
            </p>
          </div>

          {/* Lightweight Lucide Charcoal Arrow */}
          <div className="pt-0.5">
            <ArrowRight
              className="w-3.5 h-3.5 stroke-[1.5] text-elava-charcoal transform transition-colors transition-transform duration-250 ease-out group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Right: Editorial Still-Life Visual (centered, slightly smaller for premium balance) */}
        <div className="flex items-center justify-center flex-shrink-0">
          <div className={`${occasion.visualClass ?? 'w-20 h-20 lg:w-[96px] lg:h-[96px]'} flex items-center justify-center transform transition-transform duration-250 ease-out group-hover:scale-105`}>
            <img
              src={occasion.image}
              alt={occasion.alt}
              className="w-full h-full object-contain pointer-events-none select-none"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE LAYOUT (Displayed on < md, hidden on md:)                          */}
      {/* ========================================================================= */}
      <div className="md:hidden flex flex-col items-center justify-center h-[84px] sm:h-[90px] px-2 py-2 text-center">
        {/* Still-Life Visual */}
        <div className="w-14 h-14 sm:w-[60px] sm:h-[60px] mb-1.5 flex items-center justify-center">
          <img
            src={occasion.image}
            alt={occasion.alt}
            className="w-full h-full object-contain pointer-events-none select-none"
            loading="lazy"
          />
        </div>

        {/* Occasion Title */}
        <span className="font-sans text-[9px] sm:text-[9.5px] font-medium tracking-[0.10em] text-elava-charcoal uppercase leading-tight line-clamp-2">
          {occasion.title}
        </span>
      </div>
    </Link>
  );
}
