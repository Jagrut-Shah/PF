import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * OccasionCard Component
 * Refined editorial luxury catalogue tile featuring photographic still-life objects,
 * softened luxury paper tints, subtle borders, and a lightweight Lucide arrow.
 */
export default function OccasionCard({ occasion }) {
  if (!occasion) return null;

  return (
    <Link
      to={occasion.route}
      className={`group relative flex flex-col justify-between w-full select-none overflow-hidden rounded-[6px] border border-[rgba(40,40,40,0.08)] ${occasion.bgClass} ${occasion.hoverBgClass} transition-colors duration-250 p-3.5 sm:p-4 lg:p-5 h-[135px] sm:h-[145px] md:h-[150px] lg:h-[158px] focus:outline-none focus-visible:ring-1 focus-visible:ring-elava-gold`}
      aria-label={`Shop perfumes for ${occasion.title}`}
    >
      <div className="flex justify-between items-start w-full relative z-10">
        {/* Left: Accent Dot, Occasion Title, Description */}
        <div className="flex flex-col pr-1 min-w-0">
          {/* Dot + Title */}
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: occasion.dotColor }}
              aria-hidden="true"
            />
            <h3 className="font-sans text-[11px] sm:text-[12px] lg:text-[13px] font-medium tracking-[0.12em] text-elava-charcoal uppercase leading-none truncate">
              {occasion.title}
            </h3>
          </div>

          {/* Description */}
          <p className="font-sans text-[9.5px] sm:text-[10.5px] lg:text-[11px] text-elava-stone leading-snug mt-1 sm:mt-1.5 font-normal">
            {occasion.description}
          </p>
        </div>

        {/* Right: Still Life Visual */}
        <div className="shrink-0 flex items-center justify-center pl-1">
          <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center transform transition-transform duration-250 ease-out group-hover:scale-105">
            <img
              src={occasion.image}
              alt={occasion.alt}
              className="w-full h-full object-contain pointer-events-none select-none"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Arrow at bottom */}
      <div className="pt-1 z-10">
        <ArrowRight
          className="w-3.5 h-3.5 stroke-[1.5] text-elava-charcoal transform transition-transform duration-250 ease-out group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}

