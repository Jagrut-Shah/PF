import React from 'react';
import MainContainer from '../ui/MainContainer';
import SectionHeading from '../ui/SectionHeading';
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
 * FindYourScent Homepage Section — FOR HIM, FOR HER, UNISEX
 * One single horizontal line across all viewports in Black & Red Luxury Palette (#0B0B0B environment).
 */
export default function FindYourScent() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-[#0B0B0B] text-[#F5F2EE] border-b border-white/10" aria-labelledby="find-your-scent-heading">
      <MainContainer>
        {/* Section Heading & Subtitle */}
        <SectionHeading
          id="find-your-scent-heading"
          title="FIND YOUR SCENT"
          subtitle="Find a fragrance for the way you feel."
        />

        {/* 3-column single horizontal row across all viewports */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 mt-4 sm:mt-8 w-full">
          {SCENT_CATEGORIES.map((category) => (
            <div key={category.id} className="min-w-0 w-full">
              <ScentCategoryCard category={category} />
            </div>
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
