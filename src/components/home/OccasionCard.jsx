import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * OccasionTitle Component
 * Renders 4 distinct, expressive luxury script fonts (Great Vibes for Date Night, MonteCarlo for Everyday, Italianno for Office, Alex Brush for Party).
 * Date Night stands out the most with a larger size, dual-tone soft blush glow, and romantic calligraphic presence.
 */
function OccasionTitle({ occasion, isDesktop = false }) {
  const shadowStyle = isDesktop ? { textShadow: '0 2px 8px rgba(0,0,0,0.6)' } : {};

  switch (occasion.id) {
    case 'date-night':
      return (
        <h3
          className={`font-great-vibes font-normal leading-tight text-center sm:text-left ${
            isDesktop ? 'text-[36px] lg:text-[44px]' : 'text-[24px] sm:text-[28px]'
          }`}
          style={shadowStyle}
        >
          <span className="text-[#E7C4C5] drop-shadow-[0_2px_8px_rgba(231,196,197,0.3)]">Date </span>
          <span className="text-[#F6EFE7] drop-shadow-[0_2px_8px_rgba(246,239,231,0.3)]">Night</span>
        </h3>
      );

    case 'everyday':
      return (
        <h3
          className={`font-montecarlo font-normal tracking-wide text-[#F6EFE7] leading-tight text-center sm:text-left ${
            isDesktop ? 'text-[28px] lg:text-[34px]' : 'text-[20px] sm:text-[23px]'
          }`}
          style={shadowStyle}
        >
          Everyday
        </h3>
      );

    case 'office':
      return (
        <h3
          className={`font-italianno font-normal tracking-wider text-[#F6EFE7] leading-tight text-center sm:text-left ${
            isDesktop ? 'text-[32px] lg:text-[38px]' : 'text-[22px] sm:text-[25px]'
          }`}
          style={shadowStyle}
        >
          Office
        </h3>
      );

    case 'party':
      return (
        <h3
          className={`font-alex font-normal tracking-wide text-[#F6EFE7] leading-tight text-center sm:text-left ${
            isDesktop ? 'text-[28px] lg:text-[34px]' : 'text-[20px] sm:text-[23px]'
          }`}
          style={shadowStyle}
        >
          Party
        </h3>
      );

    default:
      return (
        <h3
          className={`font-great-vibes font-normal text-[#F6EFE7] leading-tight text-center sm:text-left ${
            isDesktop ? 'text-[28px] lg:text-[34px]' : 'text-[20px] sm:text-[23px]'
          }`}
          style={shadowStyle}
        >
          {occasion.title}
        </h3>
      );
  }
}

export default function OccasionCard({ occasion }) {
  if (!occasion) return null;

  const formattedOccasion = {
    ...occasion,
    title: occasion.id === 'date-night' ? 'Date Night' : (occasion.id === 'everyday' ? 'Everyday' : (occasion.id === 'office' ? 'Office' : (occasion.id === 'party' ? 'Party' : occasion.title)))
  };

  return (
    <div className="relative w-full">
      {/* MOBILE */}
      <Link
        to={formattedOccasion.route}
        className="group md:hidden flex flex-col items-center w-full select-none focus:outline-none active:scale-[0.98] transition-transform duration-150"
        aria-label={`Shop perfumes for ${formattedOccasion.title}`}
      >
        <div className="relative w-full aspect-[1/0.85] rounded-[6px] sm:rounded-[8px] overflow-hidden border border-[#E7C4C5]/15 transition-transform duration-300 group-hover:scale-[1.02] shadow-sm">
          <img
            src={formattedOccasion.image}
            alt={formattedOccasion.alt}
            className="w-full h-full object-cover object-center pointer-events-none"
            loading="lazy"
          />
        </div>
        <div className="mt-1.5 flex items-center justify-center w-full text-center px-1">
          <OccasionTitle occasion={formattedOccasion} isDesktop={false} />
        </div>
      </Link>

      {/* DESKTOP */}
      <Link
        to={formattedOccasion.route}
        className="hidden md:flex group relative z-10 flex-col justify-end w-full select-none overflow-hidden rounded-[10px] border border-[#E7C4C5]/15 transition-all duration-300 p-5 lg:p-6 h-[162px] lg:h-[168px] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E7C4C5]/50 shadow-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
        aria-label={`Shop perfumes for ${formattedOccasion.title}`}
      >
        {/* Background Layer */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={formattedOccasion.image}
            alt={formattedOccasion.alt}
            className="w-full h-full object-cover object-center pointer-events-none transform transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A0D14]/90 via-[#2A0D14]/40 to-transparent transition-colors duration-300" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex items-end justify-between w-full">
          <div className="flex flex-col min-w-0 pr-3">
            <OccasionTitle occasion={formattedOccasion} isDesktop={true} />
            <p
              className="font-sans text-xs sm:text-sm leading-relaxed mt-1 font-normal tracking-wide truncate text-[#E7C4C5]/90"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
            >
              {formattedOccasion.description}
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
