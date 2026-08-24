import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ScentCategoryCard Component
 * Deep Burgundy / Wine atmospheric card for categories.
 */
export default function ScentCategoryCard({ category }) {
  if (!category) return null;

  const objectPositions = {
    'for-him': 'object-[85%_center]',
    'for-her': 'object-[50%_center]',
    'unisex': 'object-[80%_center]'
  };

  const focalPosition = category.objectPosition || objectPositions[category.id] || 'object-center';

  return (
    <Link
      to={category.link}
      className="group relative block w-full h-auto md:h-[250px] rounded-xl sm:rounded-2xl overflow-hidden bg-[#241326] border border-[rgba(217,138,155,0.20)] group-hover:border-[#C94F70]/60 transition-colors focus:outline-none"
      aria-label={`Explore ${category.title} collection`}
    >
      <div className="block md:hidden">
        <div className="overflow-hidden rounded-t-xl bg-[#3A1729]">
          <img
            src={category.image}
            alt={category.alt}
            className="w-full h-[118px] object-cover object-center"
            loading="eager"
          />
        </div>
        <div className="bg-[#241326] px-3 pt-2.5 pb-2 text-left">
          <h3 className="font-serif text-[14px] tracking-[0.08em] font-bold text-[#FFF8F7] uppercase leading-tight">
            {category.title}
          </h3>
          <div className="mt-1.5 flex items-center gap-1 text-[9px] font-bold tracking-[0.18em] text-[#C94F70] uppercase">
            <span>EXPLORE</span>
            <span aria-hidden="true">↗</span>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-full h-full relative">
        {/* Full-Bleed Background Photography Layer */}
        <img
          src={category.image}
          alt={category.alt}
          className={`absolute inset-0 w-full h-full object-cover ${focalPosition} scale-[1.08] origin-[50%_25%] transition-transform duration-300 ease-out group-hover:scale-[1.11] will-change-transform`}
          loading="eager"
        />

        {/* Natural, Soft Atmospheric Gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 via-35% to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Content Layer */}
        <div className="relative z-10 h-full p-5 sm:p-5.5 md:p-6 flex flex-col justify-between select-none">
          {/* Top: Category Title & Descriptors */}
          <div>
            <h3 className="font-serif text-[17px] sm:text-[18px] md:text-[19px] tracking-[0.10em] font-bold text-[#FFF8F7] uppercase mb-2 sm:mb-2.5 leading-snug">
              {category.title}
            </h3>
            <div className="flex flex-col space-y-0.5 sm:space-y-1">
              {category.descriptors.map((desc, idx) => (
                <span
                  key={idx}
                  className="font-sans text-[12px] sm:text-[13px] text-[#D98A9B] font-medium tracking-wide"
                >
                  {desc}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom: Anchored Explore Link */}
          <div className="flex items-center gap-1.5 font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.2em] text-[#C94F70] group-hover:text-[#E96885] uppercase pt-2 transition-colors">
            <span>EXPLORE</span>
            <span
              className="inline-block transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-250 ease-out"
              aria-hidden="true"
            >
              ↗
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
