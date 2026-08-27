import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ScentCategoryCard Component — Bodoni Moda 400 Titles & Manrope UI (Section 18), Touch & Scale Animations (Section 15)
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
      className="group relative block w-full h-auto md:h-[250px] rounded-xl sm:rounded-2xl overflow-hidden bg-[#2A0D14] border border-[#E7C4C5]/15 focus:outline-none active:scale-[0.98] transition-transform duration-150 shadow-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
      aria-label={`Explore ${category.title} collection`}
    >
      {/* MOBILE */}
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
          <h3 className="font-serif text-[21px] font-normal text-[#F6EFE7] leading-tight">
            {category.title}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-sans font-semibold tracking-wider text-[#E7C4C5]">
            <span>Explore</span>
            <span aria-hidden="true">↗</span>
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block w-full h-full relative">
        <img
          src={category.image}
          alt={category.alt}
          className={`absolute inset-0 w-full h-full object-cover ${focalPosition} scale-[1.08] origin-[50%_25%] transition-transform duration-300 ease-out group-hover:scale-[1.11] will-change-transform`}
          loading="eager"
        />

        <div
          className="absolute inset-0 bg-gradient-to-r from-[#2A0D14]/90 via-[#2A0D14]/45 via-35% to-transparent pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 h-full p-5 sm:p-6 flex flex-col justify-between select-none">
          <div>
            <h3 className="font-serif text-[24px] lg:text-[28px] font-normal text-[#F6EFE7] mb-2 leading-snug">
              {category.title}
            </h3>
            <div className="flex flex-col space-y-1">
              {category.descriptors.map((desc, idx) => (
                <span
                  key={idx}
                  className="font-sans text-xs sm:text-sm text-[#E7C4C5]/85 font-normal tracking-wide"
                >
                  {desc}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-sans text-xs sm:text-[13px] font-semibold tracking-wider text-[#E7C4C5] pt-2">
            <span>Explore</span>
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
