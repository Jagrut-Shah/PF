import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * ScentCategoryCard — FOR HIM / FOR HER / UNISEX
 * Deep Cherry panels with Cream typography contrast.
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
      className="group block relative w-full rounded-xl overflow-hidden border border-[#4A1019] bg-[#4A1019] transition-all duration-300 hover:border-[#F3E8D8]/40 hover:-translate-y-1 shadow-[0_3px_12px_rgba(74,16,25,0.15)] hover:shadow-[0_8px_24px_rgba(74,16,25,0.3)] select-none"
      aria-label={`Explore ${title} perfumes`}
    >
      <div className="relative aspect-[1/0.92] sm:aspect-[4/3.6] md:aspect-[4/3.2] w-full overflow-hidden bg-[#4A1019]">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        {/* Deep Cherry scrim for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#4A1019]/88 via-[#4A1019]/45 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 flex flex-col justify-end text-left z-10">
          <h3 className="font-bodoni text-[18px] sm:text-[20px] md:text-[22px] font-medium text-[#FBF8F2] tracking-[-0.01em] leading-tight group-hover:text-[#F3E8D8] transition-colors">
            {title}
          </h3>

          {descriptorsStr && (
            <p className="hidden md:block font-manrope text-[12px] text-[#F3E8D8]/80 font-normal leading-tight mt-1 line-clamp-1">
              {descriptorsStr}
            </p>
          )}

          <div className="mt-1.5 inline-flex items-center gap-1.5 text-[12px] font-manrope font-semibold text-[#FBF8F2]/80 group-hover:text-[#F3E8D8] transition-colors">
            <span>Explore</span>
            <ArrowRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
