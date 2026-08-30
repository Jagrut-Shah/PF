import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * ScentCategoryCard — FOR HIM / FOR HER / UNISEX
 * Black background #120E0D + Golden #C6A15B title.
 */
export default function ScentCategoryCard({ category }) {
  if (!category) return null;

  const title = category.title || category.name || '';
  const route = category.link || category.route || '/';
  const descriptorsStr = Array.isArray(category.descriptors)
    ? category.descriptors.join(' · ')
    : (category.description || '');
  const image = category.image || '/images/products/row-1-column-1.png';
  const alt = category.alt || title;

  return (
    <Link
      to={route}
      className="group block relative w-full rounded-xl overflow-hidden border border-[#3D2E2A] bg-[#120E0D] transition-all duration-300 hover:border-[#C6A15B]/50 hover:-translate-y-1 shadow-md select-none"
      aria-label={`Explore ${title} perfumes`}
    >
      <div className="relative aspect-[1/0.92] sm:aspect-[4/3.6] md:aspect-[4/3.2] w-full overflow-hidden bg-[#120E0D]">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        {/* Scrim for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#120E0D]/95 via-[#120E0D]/45 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 flex flex-col justify-end text-left z-10">
          <h3 className="font-bodoni text-[18px] sm:text-[20px] md:text-[22px] font-medium text-[#C6A15B] tracking-[-0.01em] leading-tight group-hover:text-[#DFBD75] transition-colors">
            {title}
          </h3>

          {descriptorsStr && (
            <p className="hidden md:block font-manrope text-[12px] text-[#F4EBDD]/70 font-normal leading-tight mt-1 line-clamp-1">
              {descriptorsStr}
            </p>
          )}

          <div className="mt-1.5 inline-flex items-center gap-1.5 text-[12px] font-manrope font-semibold text-[#C6A15B] group-hover:text-[#DFBD75] transition-colors">
            <span>Explore</span>
            <ArrowRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
