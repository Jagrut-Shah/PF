import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ScentCategoryCard Component
 * Full-bleed image card matching Deep Cherry / Rich Wine / Cream visual identity.
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
      className="group relative block w-full h-auto md:h-[250px] rounded-xl sm:rounded-2xl overflow-hidden bg-[#2A0D14] border border-[#E7C4C5]/15 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E7C4C5]"
      aria-label={`Explore ${category.title} collection`}
    >
      <div className="block md:hidden">
        <div className="overflow-hidden rounded-t-xl bg-[#171316]">
          <img
            src={category.image}
            alt={category.alt}
            className="w-full h-[118px] object-cover object-center"
            loading="eager"
          />
        </div>
        <div className="bg-[#2A0D14] px-3 pt-2.5 pb-2 text-left">
          <h3 className="font-serif text-[14px] tracking-[0.08em] font-normal text-[#F6EFE7] uppercase leading-tight">
            {category.title}
          </h3>
          <div className="mt-1.5 flex items-center gap-1 text-[9px] font-medium tracking-[0.18em] text-[#E7C4C5] uppercase">
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

        {/* Deep Cherry Atmospheric Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#2A0D14]/90 via-[#2A0D14]/45 via-35% to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Content Layer */}
        <div className="relative z-10 h-full p-5 sm:p-5.5 md:p-6 flex flex-col justify-between select-none">
          {/* Top: Category Title & Descriptors */}
          <div>
            <h3 className="font-serif text-[17px] sm:text-[18px] md:text-[19px] tracking-[0.10em] font-normal text-[#F6EFE7] uppercase mb-2 sm:mb-2.5 leading-snug">
              {category.title}
            </h3>
            <div className="flex flex-col space-y-0.5 sm:space-y-1">
              {category.descriptors.map((desc, idx) => (
                <span
                  key={idx}
                  className="font-sans text-[12px] sm:text-[13px] text-[#E7C4C5]/85 font-light tracking-wide"
                >
                  {desc}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom: Anchored Explore Link */}
          <div className="flex items-center gap-1.5 font-sans text-[11px] sm:text-[12px] font-medium tracking-[0.2em] text-[#E7C4C5] uppercase pt-2">
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
