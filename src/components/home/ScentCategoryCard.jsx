import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ScentCategoryCard Component
 * Natural full-bleed image card matching the approved reference design.
 * Specific centered focal alignment for FOR HER, and tailored spacing for others.
 */
export default function ScentCategoryCard({ category }) {
  if (!category) return null;

  // Custom focal positioning: FOR HER centered, others balanced with text
  const objectPositions = {
    'for-him': 'object-[85%_center]',
    'for-her': 'object-[50%_center]',
    'unisex': 'object-[80%_center]'
  };

  const focalPosition = category.objectPosition || objectPositions[category.id] || 'object-center';

  return (
    <Link
      to={category.link}
      className="group relative block w-full h-auto md:h-[250px] rounded-xl sm:rounded-2xl overflow-hidden bg-elava-ivory border border-elava-border focus:outline-none focus-visible:ring-1 focus-visible:ring-elava-gold"
      aria-label={`Explore ${category.title} collection`}
    >
      <div className="block md:hidden">
        <div className="overflow-hidden rounded-t-xl bg-[#151515]">
          <img
            src={category.image}
            alt={category.alt}
            className="w-full h-[118px] object-cover object-center"
            loading="eager"
          />
        </div>
        <div className="bg-elava-ivory px-3 pt-2.5 pb-2 text-left">
          <h3 className="font-serif text-[14px] tracking-[0.08em] font-normal text-elava-charcoal uppercase leading-tight">
            {category.title}
          </h3>
          <div className="mt-1.5 flex items-center gap-1 text-[9px] font-medium tracking-[0.18em] text-elava-charcoal uppercase">
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

        {/* Natural, Soft Atmospheric Gradient for text contrast on the left side */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 via-35% to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Content Layer: Left-aligned with comfortable padding and breathing room */}
        <div className="relative z-10 h-full p-5 sm:p-5.5 md:p-6 flex flex-col justify-between select-none">
          {/* Top: Category Title & Descriptors */}
          <div>
            <h3 className="font-serif text-[17px] sm:text-[18px] md:text-[19px] tracking-[0.10em] font-normal text-white uppercase mb-2 sm:mb-2.5 leading-snug">
              {category.title}
            </h3>
            <div className="flex flex-col space-y-0.5 sm:space-y-1">
              {category.descriptors.map((desc, idx) => (
                <span
                  key={idx}
                  className="font-sans text-[12px] sm:text-[13px] text-white/85 font-light tracking-wide"
                >
                  {desc}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom: Anchored Explore Link */}
          <div className="flex items-center gap-1.5 font-sans text-[11px] sm:text-[12px] font-medium tracking-[0.2em] text-[#E8DFD0] uppercase pt-2">
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
