import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * OccasionCard Component — Strict Sora 600 Title + Manrope 400 Description + Manrope 600 CTA
 * Section 16 Requirement: DATE NIGHT, EVERYDAY, OFFICE, PARTY all four use exactly the same typography system.
 * Title: Sora 600 (20-26px), Supporting copy: Manrope 400 (14-16px), CTA: Manrope 600.
 */
export default function OccasionCard({ occasion }) {
  if (!occasion) return null;

  const titleText = occasion.id === 'date-night' ? 'Date Night' : (occasion.id === 'everyday' ? 'Everyday' : (occasion.id === 'office' ? 'Office' : (occasion.id === 'party' ? 'Party' : occasion.title)));

  return (
    <div className="relative w-full">
      {/* MOBILE */}
      <Link
        to={occasion.route}
        className="group md:hidden flex flex-col items-center w-full select-none focus:outline-none active:scale-[0.98] transition-transform duration-150"
        aria-label={`Shop perfumes for ${titleText}`}
      >
        <div className="relative w-full aspect-[1/0.85] rounded-[8px] overflow-hidden border border-white/10 transition-transform duration-300 group-hover:scale-[1.02] shadow-sm">
          <img
            src={occasion.image}
            alt={occasion.alt}
            className="w-full h-full object-cover object-center pointer-events-none"
            loading="lazy"
          />
        </div>
        <div className="mt-2 text-center w-full px-1">
          <h3 className="font-sora font-semibold text-[20px] sm:text-[22px] text-[#F5F2EE] leading-tight">
            {titleText}
          </h3>
          <p className="font-manrope font-normal text-[14px] text-[#B8B3AF] mt-0.5 line-clamp-1">
            {occasion.description}
          </p>
        </div>
      </Link>

      {/* DESKTOP */}
      <Link
        to={occasion.route}
        className="hidden md:flex group relative z-10 flex-col justify-end w-full select-none overflow-hidden rounded-[12px] border border-white/10 transition-all duration-300 p-5 lg:p-6 h-[170px] lg:h-[180px] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B4171E]/50 shadow-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:border-white/20 hover:-translate-y-1"
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/95 via-[#0B0B0B]/45 to-transparent transition-colors duration-300" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex items-end justify-between w-full">
          <div className="flex flex-col min-w-0 pr-3">
            <h3 className="font-sora font-semibold text-[20px] md:text-[23px] lg:text-[26px] text-[#F5F2EE] leading-tight tracking-[-0.02em]">
              {titleText}
            </h3>
            <p className="font-manrope font-normal text-[14px] lg:text-[15px] leading-relaxed mt-1 text-[#B8B3AF] group-hover:text-[#F5F2EE] transition-colors truncate">
              {occasion.description}
            </p>
          </div>
          <div className="shrink-0 flex items-center justify-center pl-2">
            <span className="font-manrope font-semibold text-[14px] text-[#F5F2EE] group-hover:text-[#B4171E] flex items-center gap-1 transition-colors">
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

