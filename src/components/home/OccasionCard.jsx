import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Render distinct typographic identities for each occasion title
 *
 * 1. DATE NIGHT: Modern high-fashion italic with subtle cherry text accent (seductive)
 * 2. EVERYDAY: Clean geometric sans with compact, effortless tracking (effortless)
 * 3. OFFICE: Neo-grotesk sans with crisp edges & restrained wider tracking (sharp & structured)
 * 4. PARTY: Contemporary display sans with bold, energetic proportions (expressive)
 */
function OccasionTitle({ occasion, isDesktop = false }) {
  const baseSize = isDesktop ? 'text-[14px] lg:text-[15px]' : 'text-[9.5px] sm:text-[11px]';
  const shadowStyle = isDesktop ? { textShadow: '0 1px 4px rgba(0,0,0,0.6)' } : {};

  switch (occasion.id) {
    case 'date-night':
      return (
        <h3 className={`leading-none truncate ${baseSize}`} style={shadowStyle}>
          <span className="font-sans italic font-medium tracking-[0.02em] uppercase text-[#F1EEF2]">DATE </span>
          <span className="font-sans italic font-black tracking-[0.05em] uppercase text-[#D62F4F]">NIGHT</span>
        </h3>
      );
    case 'everyday':
      return (
        <h3
          className={`font-sans font-bold tracking-[0.08em] uppercase text-[#F1EEF2] leading-none truncate ${baseSize}`}
          style={shadowStyle}
        >
          EVERYDAY
        </h3>
      );
    case 'office':
      return (
        <h3
          className={`font-sans font-semibold tracking-[0.24em] uppercase text-[#F1EEF2] leading-none truncate ${baseSize}`}
          style={shadowStyle}
        >
          OFFICE
        </h3>
      );
    case 'party':
      return (
        <h3
          className={`font-sans font-black tracking-[0.16em] uppercase text-[#F1EEF2] leading-none truncate ${baseSize}`}
          style={shadowStyle}
        >
          PARTY
        </h3>
      );
    default:
      return (
        <h3
          className={`font-sans font-bold tracking-[0.1em] uppercase text-[#F1EEF2] leading-none truncate ${baseSize}`}
          style={shadowStyle}
        >
          {occasion.title}
        </h3>
      );
  }
}

/**
 * OccasionCard Component
 * Mobile (< md): Compact photographic tile with occasion name OUTSIDE directly below image.
 * Desktop (>= md): Uniform premium photographic card layout across all 4 occasions.
 */
export default function OccasionCard({ occasion }) {
  if (!occasion) return null;

  return (
    <div className="relative w-full">
      {/* ── 1. MOBILE PRESENTATION (< md) ── */}
      <Link
        to={occasion.route}
        className="group md:hidden flex flex-col items-center w-full select-none focus:outline-none"
        aria-label={`Shop perfumes for ${occasion.title}`}
      >
        {/* Compact Photographic Image Container */}
        <div className="relative w-full aspect-[1/0.85] rounded-[8px] overflow-hidden border border-[rgba(241,238,242,0.10)] group-hover:border-[#D62F4F]/50 transition-all duration-300 shadow-sm">
          <img
            src={occasion.image}
            alt={occasion.alt}
            className="w-full h-full object-cover object-center pointer-events-none"
            loading="lazy"
          />
        </div>

        {/* Occasion Text OUTSIDE & DIRECTLY BELOW Image */}
        <div className="mt-1.5 flex items-center justify-center w-full text-center px-0.5">
          <OccasionTitle occasion={occasion} isDesktop={false} />
        </div>
      </Link>

      {/* ── 2. DESKTOP PRESENTATION (>= md) ── */}
      <Link
        to={occasion.route}
        className="hidden md:flex group relative z-10 flex-col justify-end w-full select-none overflow-hidden rounded-[12px] border border-[rgba(241,238,242,0.10)] group-hover:border-[#D62F4F]/50 transition-all duration-300 p-5 lg:p-6 h-[162px] lg:h-[168px] focus:outline-none shadow-md"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-colors duration-300" />
        </div>

        {/* Bottom Content Layer */}
        <div className="relative z-10 flex items-end justify-between w-full">
          {/* Bottom-Left Editorial Text Block */}
          <div className="flex flex-col min-w-0 pr-3">
            <OccasionTitle occasion={occasion} isDesktop={true} />

            {/* Subtitle */}
            <p
              className="font-sans text-[12px] lg:text-[12.5px] leading-snug mt-1.5 font-normal tracking-[0.01em] truncate text-[#A7A3AA]"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
            >
              {occasion.description}
            </p>
          </div>

          {/* Bottom-Right Arrow Icon */}
          <div className="shrink-0 flex items-center justify-center pl-2">
            <ArrowRight
              className="w-[19px] h-[19px] stroke-[2] text-[#D62F4F] transform transition-transform duration-250 ease-out group-hover:translate-x-1 group-hover:text-[#F04463]"
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
