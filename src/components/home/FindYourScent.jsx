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
 * FindYourScent Homepage Section
 * Visual category showcase directly beneath the Navbar.
 */
export default function FindYourScent() {
  return (
    <section className="pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10" aria-labelledby="find-your-scent-heading">
      <MainContainer>
        {/* Section Heading & Subtitle */}
        <SectionHeading
          id="find-your-scent-heading"
          title="FIND YOUR SCENT"
          subtitle="Find a fragrance for the way you feel."
        />

        {/* 3 Visual Cards Grid / Horizontal Scroll for Mobile */}
        <div className="flex md:grid md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-6 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 snap-x snap-mandatory scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
          {SCENT_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="min-w-[275px] sm:min-w-[310px] md:min-w-0 flex-1 snap-start"
            >
              <ScentCategoryCard category={category} />
            </div>
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
