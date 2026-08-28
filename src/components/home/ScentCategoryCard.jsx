import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * ScentCategoryCard Component — Light Luxury Editorial Language
 * FOR HIM, FOR HER, UNISEX
 * Titles: Bodoni Moda 500-600. Supporting copy: Manrope 400. CTA: Manrope 600.
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
      className="group block relative w-full rounded-xl sm:rounded-2xl overflow-hidden border border-[#D9D1C6] bg-[#F6F2EA] transition-all duration-300 hover:border-[#721C24]/50 hover:-translate-y-1 shadow-[0_4px_16px_rgba(60,45,30,0.05)] hover:shadow-[0_10px_26px_rgba(60,45,30,0.10)] select-none"
      aria-label={`Explore ${title} perfumes`}
    >
      <div className="relative aspect-[1/0.92] sm:aspect-[4/3.6] md:aspect-[4/3.2] w-full overflow-hidden bg-[#EEE8DD]">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Subtle dark gradient scrim for text readability over photography */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#201C19]/85 via-[#201C19]/35 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 flex flex-col justify-end text-left z-10">
          <h3 className="font-bodoni text-[18px] sm:text-[21px] md:text-[24px] font-medium text-[#F6F2EA] tracking-[-0.01em] leading-tight group-hover:text-[#E5DCCF] transition-colors">
            {title}
          </h3>

          {/* Descriptors */}
          {descriptorsStr && (
            <p className="hidden md:block font-manrope text-[13px] text-[#E5DCCF] font-normal leading-tight mt-1 line-clamp-1">
              {descriptorsStr}
            </p>
          )}

          <div className="mt-1.5 sm:mt-2 inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] font-manrope font-semibold text-[#F6F2EA] group-hover:text-[#E5DCCF] transition-colors">
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform text-[#F6F2EA] group-hover:text-[#E5DCCF]" />
          </div>
        </div>
      </div>
    </Link>
  );
}
