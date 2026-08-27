import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * ScentCategoryCard Component — Layered Black & Red Atmosphere:
 * Compact, responsive, single-line horizontal card for FOR HIM, FOR HER, UNISEX.
 * Soft Black #111111 background, Charcoal #171515 image container with lacquer sheen .bg-lacquer-highlight, Level 1 diffuse red ambient hover wash.
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
      className="group block relative w-full rounded-lg sm:rounded-xl overflow-hidden border border-white/10 bg-[#111111] transition-all duration-300 hover:border-[#B4171E]/50 hover:-translate-y-0.5 shadow-sm hover:shadow-md select-none bg-lacquer-highlight"
      aria-label={`Explore ${title} perfumes`}
    >
      <div className="relative aspect-[1/0.95] sm:aspect-[4/4.2] md:aspect-[4/3.8] w-full overflow-hidden bg-[#171515]">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#0B0B0B]/40 to-transparent" />
        <div className="absolute inset-0 bg-ambient-card opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-4 md:p-5 flex flex-col justify-end text-left z-10">
          <h3 className="font-serif text-xs sm:text-lg md:text-xl font-normal text-[#F5F2EE] tracking-wider uppercase leading-tight group-hover:text-[#B4171E] transition-colors">
            {title}
          </h3>
          {descriptorsStr && (
            <p className="font-sans text-[9px] sm:text-xs text-[#B8B3AF] font-normal leading-tight mt-0.5 line-clamp-1">
              {descriptorsStr}
            </p>
          )}
          <div className="mt-1 sm:mt-2 inline-flex items-center gap-1 text-[9px] sm:text-xs font-sans font-semibold uppercase tracking-wider text-[#F5F2EE] group-hover:text-[#B4171E] transition-colors">
            <span>Explore</span>
            <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 transform group-hover:translate-x-0.5 transition-transform text-[#F5F2EE] group-hover:text-[#B4171E]" />
          </div>
        </div>
      </div>
    </Link>
  );
}
