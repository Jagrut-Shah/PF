import React from 'react';
import MainContainer from '../ui/MainContainer';
import SectionHeading from '../ui/SectionHeading';
import ScentCategoryCard from './ScentCategoryCard';
import { useScrollReveal } from '../../hooks/useScrollReveal';

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
 * Light Luxury Perfume Aesthetic: Secondary Cream #EEE8DD background for elegant visual rhythm.
 */
export default function FindYourScent() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-[#EEE8DD] text-[#201C19] border-b border-[#D9D1C6]" aria-labelledby="find-your-scent-heading">
      <MainContainer>
        <div ref={ref} className={`reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          {/* Section Heading & Subtitle */}
          <SectionHeading
            id="find-your-scent-heading"
            title="FIND YOUR SCENT"
            subtitle="Find a fragrance for the way you feel."
          />

          {/* 3-column single horizontal row with max-w-5xl on desktop to slightly reduce card size */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-5 mt-4 sm:mt-8 w-full max-w-5xl mx-auto">
            {SCENT_CATEGORIES.map((category, idx) => (
              <div
                key={category.id}
                className={`min-w-0 w-full reveal-init ${
                  isVisible ? `reveal-visible stagger-${idx + 1}` : ''
                }`}
              >
                <ScentCategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
