import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

/**
 * ScentCategoryCard Component — Clean Editorial Collection Presentation
 */
export default function ScentCategoryCard({ category }) {
  if (!category) return null;

  return (
    <Link
      to={category.link}
      className="group relative block w-full h-[220px] sm:h-[260px] md:h-[320px] rounded-2xl overflow-hidden bg-[#08111F] border border-white/15 focus:outline-none shadow-xl transition-all duration-300 hover:border-[#285BE6]"
      aria-label={`Explore ${category.title} collection`}
    >
      {/* Background Photography */}
      <img
        src={category.image}
        alt={category.alt}
        className="absolute inset-0 w-full h-full object-cover object-center scale-[1.05] transition-transform duration-500 ease-out group-hover:scale-[1.1]"
        loading="eager"
      />

      {/* Editorial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08111F] via-[#08111F]/50 to-transparent transition-opacity duration-300" />

      {/* Card Content */}
      <div className="relative z-10 h-full p-4 sm:p-5 md:p-6 flex flex-col justify-between select-none">
        {/* Top: Category Tag */}
        <div>
          <span className="inline-block px-2.5 py-1 rounded-md bg-[#285BE6]/30 backdrop-blur-md border border-[#5F8CFF]/40 text-[#F7F3EC] text-[9px] sm:text-[10px] font-mono tracking-[0.18em] uppercase font-bold">
            COLLECTION
          </span>
        </div>

        {/* Bottom: Title, Descriptors, & Action */}
        <div className="space-y-2">
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl tracking-wider font-light text-[#F7F3EC] uppercase leading-tight">
            {category.title}
          </h3>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-sans font-medium text-[#F7F3EC]/80 uppercase">
            {category.descriptors.map((desc, idx) => (
              <span key={idx} className="bg-white/10 px-2 py-0.5 rounded border border-white/10">
                {desc}
              </span>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs font-bold tracking-[0.16em] uppercase text-[#5F8CFF] group-hover:text-white transition-colors">
            <span>EXPLORE {category.title}</span>
            <ArrowUpRight className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
