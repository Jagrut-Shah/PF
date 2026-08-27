import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * ScentCategoryCard Component — Variant C: Dark Coffee #33211E background with Warm Cream #F1E4D2 typography
 */
export default function ScentCategoryCard({ category }) {
  if (!category) return null;

  return (
    <Link
      to={category.route}
      className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#33211E] border border-[#CDBBAA]/15 hover:border-[#CDBBAA]/40 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 select-none"
      aria-label={`Explore ${category.name} perfume category`}
    >
      <div>
        <div className="flex items-center justify-between text-xs font-sans font-semibold tracking-wider text-[#D9B8B7] uppercase mb-4">
          <span>{category.itemCount || 'Collection'}</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-[#F1E4D2]" />
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#F1E4D2] mb-2 group-hover:text-[#D9B8B7] transition-colors">
          {category.name}
        </h3>
        <p className="font-sans text-xs sm:text-sm text-[#CDBBAA] leading-relaxed font-normal">
          {category.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-[#CDBBAA]/15 flex items-center justify-between text-xs font-sans font-semibold text-[#F1E4D2] group-hover:text-[#D9B8B7]">
        <span>Discover Family</span>
        <span className="text-base font-serif italic">→</span>
      </div>
    </Link>
  );
}
