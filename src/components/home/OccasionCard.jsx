import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * OccasionCard Component
 * Editorial campaign card optimized for 4-in-a-row display across all viewports.
 * Features pure white typography (#FFFFFF), occasion dot indicator, gradient overlay,
 * and Date Night wine-red spotlight aura (#8B1E1E) breathing behind Date Night.
 */
export default function OccasionCard({ occasion }) {
  if (!occasion) return null;

  const isDateNight = occasion.id === 'date-night' || Boolean(occasion.isHero);

  return (
    <div className="relative w-full rounded-[6px] sm:rounded-[8px] md:rounded-[10px]">
      {/* Date Night Soft Wine-Red Spotlight Aura Layer (Positioned BEHIND the Card) */}
      {isDateNight && (
        <>
          <style>{`
            @keyframes dateNightAuraBreathe {
              0% {
                box-shadow: 0 0 20px 5px rgba(139, 30, 30, 0.22), 0 6px 20px rgba(0,0,0,0.22);
                opacity: 0.8;
              }
              100% {
                box-shadow: 0 0 42px 14px rgba(139, 30, 30, 0.42), 0 10px 32px rgba(0,0,0,0.32);
                opacity: 1;
              }
            }

            .date-night-aura-backdrop {
              position: absolute;
              inset: -5px;
              border-radius: 12px;
              background: radial-gradient(circle at 50% 50%, rgba(139, 30, 30, 0.45) 0%, rgba(139, 30, 30, 0.18) 70%, transparent 100%);
              filter: blur(12px);
              pointer-events: none;
              z-index: 0;
              animation: dateNightAuraBreathe 4s ease-in-out infinite alternate !important;
              will-change: box-shadow, opacity;
            }

            @media (prefers-reduced-motion: reduce) {
              .date-night-aura-backdrop {
                animation: none !important;
                box-shadow: 0 0 28px 8px rgba(139, 30, 30, 0.30) !important;
                opacity: 0.9 !important;
              }
            }
          `}</style>
          <div className="date-night-aura-backdrop" aria-hidden="true" />
        </>
      )}

      <Link
        to={occasion.route}
        className={`group relative z-10 flex flex-col justify-end w-full select-none overflow-hidden rounded-[6px] sm:rounded-[8px] md:rounded-[10px] transition-all duration-300 p-2 sm:p-3.5 md:p-5 lg:p-6 h-[105px] sm:h-[135px] md:h-[162px] lg:h-[168px] focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50 ${
          isDateNight ? 'shadow-[0_8px_25px_rgba(0,0,0,0.3)]' : ''
        }`}
        aria-label={`Shop perfumes for ${occasion.title}`}
      >
        {/* ── Background Photography Layer ── */}
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

        {/* ── Bottom Content Layer: Dot + Title + Arrow ── */}
        <div className="relative z-10 flex items-end justify-between w-full">
          {/* Left Text Block */}
          <div className="flex flex-col min-w-0 pr-1 sm:pr-2">
            {/* Dot + Title */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span
                className="w-[5px] h-[5px] sm:w-[6.5px] sm:h-[6.5px] rounded-full shrink-0 shadow-sm"
                style={{ backgroundColor: occasion.dotColor }}
                aria-hidden="true"
              />
              <h3
                className="font-sans text-[9.5px] sm:text-[11.5px] md:text-[13px] lg:text-[13.5px] font-bold sm:font-semibold tracking-[0.04em] sm:tracking-[0.10em] uppercase leading-tight truncate"
                style={{ color: '#FFFFFF', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}
              >
                {occasion.title}
              </h3>
            </div>

            {/* Subtitle (Shown on sm+ viewports) */}
            <p
              className="hidden sm:block font-sans text-[11px] md:text-[13px] lg:text-[13.5px] leading-snug mt-0.5 font-normal tracking-wide truncate"
              style={{ color: '#FFFFFF', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
            >
              {occasion.description}
            </p>
          </div>

          {/* Right Arrow Icon */}
          <div className="shrink-0 flex items-center justify-center pl-1">
            <ArrowRight
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-[19px] md:h-[19px] stroke-[1.75] transform transition-transform duration-250 ease-out group-hover:translate-x-0.5"
              style={{ color: '#FFFFFF', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.6))' }}
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
