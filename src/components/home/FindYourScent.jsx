import React from 'react';
import MainContainer from '../ui/MainContainer';
import ScentCategoryCard from './ScentCategoryCard';

const SCENT_CATEGORIES = [
  {
    id: 'for-him',
    title: 'FOR HIM',
    descriptors: ['Confidence', 'Presence', 'Attraction'],
    link: '/category/men',
    image: '/images/products/row-1-column-1.png',
    alt: 'ÉLAVA NOIR perfume'
  },
  {
    id: 'for-her',
    title: 'FOR HER',
    descriptors: ['Elegance', 'Sensuality', 'Expression'],
    link: '/category/women',
    image: '/images/products/row-2-column-1.png',
    alt: 'ÉLAVA VELVET perfume'
  },
  {
    id: 'unisex',
    title: 'UNISEX',
    descriptors: ['Modern', 'Distinctive', 'Effortless'],
    link: '/category/unisex',
    image: '/images/products/row-3-column-1.png',
    alt: 'ÉLAVA SABLE perfume'
  }
];

/**
 * FindYourScent Homepage Section — Dark Dramatic Editorial Discovery
 * Deep Navy (#102A4C) + Midnight Navy (#08111F) + Cobalt (#285BE6) + Cream (#F7F3EC) typography.
 */
export default function FindYourScent() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#102A4C] text-[#F7F3EC] border-b border-white/10" aria-labelledby="find-your-scent-heading">
      <MainContainer>
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="font-sans text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#5F8CFF] block">
            THE ESSENCE OF EXPRESSION
          </span>
          <h2
            id="find-your-scent-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-wide text-[#F7F3EC] leading-tight mt-1"
          >
            DISCOVER YOUR <span className="italic text-[#5F8CFF]">CHARACTER</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#F7F3EC]/75 mt-2 font-normal tracking-wide">
            Explore haute fragrance signatures designed for every presence.
          </p>
        </div>

        {/* Mobile 3-column grid */}
        <div className="grid grid-cols-3 gap-3 md:hidden">
          {SCENT_CATEGORIES.map((category) => (
            <div key={category.id} className="min-w-0">
              <ScentCategoryCard category={category} />
            </div>
          ))}
        </div>

        {/* Desktop 3-card grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 lg:gap-7 min-w-0">
          {SCENT_CATEGORIES.map((category) => (
            <ScentCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
