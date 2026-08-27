import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * OccasionTitle Component — Black & Red Luxury Palette
 * Renders 4 distinct, expressive luxury script fonts (Great Vibes for Date Night, MonteCarlo for Everyday, Italianno for Office, Alex Brush for Party).
 * Equal visual treatment in Black & Red system per Section 14.
 */
function OccasionTitle({ occasion, isDesktop = false }) {
  const shadowStyle = isDesktop ? { textShadow: '0 2px 8px rgba(0,0,0,0.8)' } : {};

  switch (occasion.id) {
    case 'date-night':
      return (
        <h3
          className={`font-great-vibes font-normal leading-none text-center sm:text-left whitespace-nowrap text-[#F5F2EE] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] ${
            isDesktop ? 'text-[36px] lg:text-[44px]' : 'text-[17px] sm:text-[21px]'
          }`}
          style={shadowStyle}
        >
          Date Night
        </h3>
      );

    case 'everyday':
      return (
        <h3
          className={`font-montecarlo font-normal tracking-wide text-[#F5F2EE] leading-none text-center sm:text-left whitespace-nowrap ${
            isDesktop ? 'text-[28px] lg:text-[34px]' : 'text-[17px] sm:text-[20px]'
          }`}
          style={shadowStyle}
        >
          Everyday
        </h3>
      );

    case 'office':
      return (
        <h3
          className={`font-italianno font-normal tracking-wider text-[#F5F2EE] leading-none text-center sm:text-left whitespace-nowrap ${
            isDesktop ? 'text-[32px] lg:text-[38px]' : 'text-[19px] sm:text-[22px]'
          }`}
          style={shadowStyle}
        >
          Office
        </h3>
      );

    case 'party':
      return (
        <h3
          className={`font-alex font-normal tracking-wide text-[#F5F2EE] leading-none text-center sm:text-left whitespace-nowrap ${
            isDesktop ? 'text-[28px] lg:text-[34px]' : 'text-[17px] sm:text-[20px]'
          }`}
          style={shadowStyle}
        >
          Party
        </h3>
      );

    default:
      return (
        <h3
          className={`font-great-vibes font-normal text-[#F5F2EE] leading-none text-center sm:text-left whitespace-nowrap ${
            isDesktop ? 'text-[28px] lg:text-[34px]' : 'text-[17px] sm:text-[20px]'
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
        <div className="relative w-full aspect-[1/0.85] rounded-[6px] sm:rounded-[8px] overflow-hidden border border-white/10 transition-transform duration-300 group-hover:scale-[1.02] shadow-sm">
          <img
            src={formattedOccasion.image}
            alt={formattedOccasion.alt}
            className="w-full h-full object-cover object-center pointer-events-none"
            loading="lazy"
          />
        </div>
        <div className="mt-1.5 flex items-center justify-center w-full text-center px-0.5">
          <OccasionTitle occasion={formattedOccasion} isDesktop={false} />
        </div>
      </Link>

      {/* DESKTOP */}
      <Link
        to={formattedOccasion.route}
        className="hidden md:flex group relative z-10 flex-col justify-end w-full select-none overflow-hidden rounded-[10px] border border-white/10 transition-all duration-300 p-5 lg:p-6 h-[162px] lg:h-[168px] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B4171E]/50 shadow-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:border-white/20 hover:-translate-y-1"
        aria-label={`Shop perfumes for ${formattedOccasion.title}`}
      >
        {/* Background Layer */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={formattedOccasion.image}
            alt={formattedOccasion.alt}
            className="w-full h-full object-cover object-center pointer-events-none transform transition-transform duration-500 ease-out group-hover:scale-[1.035]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/90 via-[#0B0B0B]/40 to-transparent transition-colors duration-300" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex items-end justify-between w-full">
          <div className="flex flex-col min-w-0 pr-3">
            <OccasionTitle occasion={formattedOccasion} isDesktop={true} />
            <p
              className="font-sans text-xs sm:text-sm leading-relaxed mt-1 font-normal tracking-wide truncate text-[#B8B3AF] group-hover:text-[#F5F2EE] transition-colors"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
            >
              {formattedOccasion.description}
            </p>
          </div>
          <div className="shrink-0 flex items-center justify-center pl-2">
            <ArrowRight
              className="w-[19px] h-[19px] stroke-[1.75] transform transition-transform duration-250 ease-out group-hover:translate-x-1.5 text-[#F5F2EE] group-hover:text-[#B4171E]"
              style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.8))' }}
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
