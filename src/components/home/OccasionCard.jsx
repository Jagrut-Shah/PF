import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * OccasionCard Component
 * Editorial campaign card with pure white typography (#FFFFFF for title, subtitle, and arrow),
 * 7px occasion dot, bottom-right white arrow icon, controlled bottom dark gradient overlay,
 * identical hover scale across all four cards, and a soft wine-red spotlight aura (#8B1E1E) breathing behind Date Night.
 */
export default function OccasionCard({ occasion }) {
  if (!occasion) return null;

  const isDateNight = occasion.id === 'date-night' || Boolean(occasion.isHero);

  return (
    <div className="relative w-full rounded-[8px] sm:rounded-[10px]">
      {/* Date Night Soft Wine-Red Spotlight Aura Layer (Positioned BEHIND the Card) */}
      {isDateNight && (
        <>
          <style>{`
            @keyframes dateNightAuraBreathe {
              0% {
                box-shadow: 0 0 28px 8px rgba(139, 30, 30, 0.18), 0 10px 30px rgba(0,0,0,0.22);
                opacity: 0.75;
              }
              100% {
                box-shadow: 0 0 52px 18px rgba(139, 30, 30, 0.40), 0 14px 42px rgba(0,0,0,0.32);
                opacity: 1;
              }
            }

            .date-night-aura-backdrop {
              position: absolute;
              inset: -8px;
              border-radius: 16px;
              background: radial-gradient(circle at 50% 50%, rgba(139, 30, 30, 0.45) 0%, rgba(139, 30, 30, 0.18) 70%, transparent 100%);
              filter: blur(16px);
              pointer-events: none;
              z-index: 0;
              animation: dateNightAuraBreathe 4s ease-in-out infinite alternate !important;
              will-change: box-shadow, opacity;
            }

            @media (prefers-reduced-motion: reduce) {
              .date-night-aura-backdrop {
                animation: none !important;
                box-shadow: 0 0 38px 12px rgba(139, 30, 30, 0.30), 0 12px 35px rgba(0,0,0,0.22) !important;
                opacity: 0.9 !important;
              }
            }
          `}</style>
          <div className="date-night-aura-backdrop" aria-hidden="true" />
        </>
      )}

      <Link
        to={occasion.route}
        className={`group relative z-10 flex flex-col justify-end w-full select-none overflow-hidden rounded-[8px] sm:rounded-[10px] transition-all duration-300 p-3.5 sm:p-5 lg:p-6 h-[128px] sm:h-[148px] md:h-[162px] lg:h-[168px] focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50 ${
          isDateNight ? 'shadow-[0_12px_35px_rgba(0,0,0,0.25)]' : ''
        }`}
        aria-label={`Shop perfumes for ${occasion.title}`}
      >
        {/* ── Background Photography Layer (Identical Hover Scale across all cards) ── */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={occasion.image}
            alt={occasion.alt}
            className="w-full h-full object-cover object-center pointer-events-none transform transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Controlled Dark Gradient Overlay (Transparent middle -> subtle dark bottom) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-colors duration-300" />
        </div>

        {/* ── Bottom Content Layer: Bottom-Left Text Block + Bottom-Right Arrow ── */}
        <div className="relative z-10 flex items-end justify-between w-full">
          {/* Bottom-Left Editorial Text Block */}
          <div className="flex flex-col min-w-0 pr-3">
            {/* Dot + Title (Same Line) */}
            <div className="flex items-center gap-2">
              <span
                className="w-[7px] h-[7px] rounded-full shrink-0 shadow-sm"
                style={{ backgroundColor: occasion.dotColor }}
                aria-hidden="true"
              />
              <h3
                className="font-sans text-[12px] sm:text-[13px] lg:text-[13.5px] font-semibold tracking-[0.12em] uppercase leading-none truncate"
                style={{ color: '#FFFFFF', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
              >
                {occasion.title}
              </h3>
            </div>

            {/* Subtitle */}
            <p
              className="font-sans text-[12px] sm:text-[13px] lg:text-[13.5px] leading-snug mt-1 font-normal tracking-wide truncate"
              style={{ color: '#FFFFFF', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
            >
              {occasion.description}
            </p>
          </div>

          {/* Bottom-Right Arrow Icon (18-20px) */}
          <div className="shrink-0 flex items-center justify-center pl-2">
            <ArrowRight
              className="w-[19px] h-[19px] stroke-[1.75] transform transition-transform duration-250 ease-out group-hover:translate-x-1"
              style={{ color: '#FFFFFF', filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.5))' }}
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
