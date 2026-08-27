import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * ScentCategoryCard Component — Color Direction C:
 * Compact, responsive, single-line horizontal card for FOR HIM, FOR HER, UNISEX.
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
      className="group block relative w-full rounded-lg sm:rounded-xl overflow-hidden border border-[#CDBBAA]/20 bg-[#352522] transition-all duration-300 hover:border-[#CDBBAA]/45 hover:-translate-y-0.5 shadow-sm hover:shadow-md select-none"
      aria-label={`Explore ${title} perfumes`}
    >
      <div className="relative aspect-[1/0.95] sm:aspect-[4/4.2] md:aspect-[4/3.8] w-full overflow-hidden bg-[#100D0C]">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#100D0C]/90 via-[#241918]/45 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-4 md:p-5 flex flex-col justify-end text-left">
          <h3 className="font-serif text-xs sm:text-lg md:text-xl font-normal text-[#F0E2D0] tracking-wider uppercase leading-tight group-hover:text-[#CDBBAA] transition-colors">
            {title}
          </h3>
          {descriptorsStr && (
            <p className="font-sans text-[9px] sm:text-xs text-[#CDBBAA] font-normal leading-tight mt-0.5 line-clamp-1">
              {descriptorsStr}
            </p>
          )}
          <div className="mt-1 sm:mt-2 inline-flex items-center gap-1 text-[9px] sm:text-xs font-sans font-semibold uppercase tracking-wider text-[#F0E2D0] group-hover:text-[#CDBBAA] transition-colors">
            <span>Explore</span>
            <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 transform group-hover:translate-x-0.5 transition-transform text-[#F0E2D0]" />
          </div>
        </div>
      </div>
    </Link>
  );
}
