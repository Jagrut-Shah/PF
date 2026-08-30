import React from 'react';
import MainContainer from '../ui/MainContainer';
import OccasionCard from './OccasionCard';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const OCCASIONS_DATA = [
  {
    id: 'date-night',
    title: 'DATE NIGHT',
    description: 'Seductive & memorable',
    route: '/category/unisex',
    image: '/images/products/row-1-column-1.png',
    alt: 'Date Night fragrance'
  },
  {
    id: 'everyday',
    title: 'EVERYDAY',
    description: 'Effortless signature',
    route: '/category/bestsellers',
    image: '/images/products/row-2-column-1.png',
    alt: 'Everyday fragrance'
  },
  {
    id: 'office',
    title: 'OFFICE',
    description: 'Refined & professional',
    route: '/category/men',
    image: '/images/products/row-3-column-1.png',
    alt: 'Office wear fragrance'
  },
  {
    id: 'party',
    title: 'PARTY',
    description: 'Vibrant & bold',
    route: '/category/women',
    image: '/images/products/row-1-column-2.png',
    alt: 'Evening party fragrance'
  }
];

/**
 * ShopByOccasion Component — Single 4-Column Row Layout
 * BLACK BACKGROUND #120E0D — Gold #C6A15B titles & dark luxury cards.
 */
export default function ShopByOccasion() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-5 sm:py-7 md:py-9 bg-[#120E0D] text-[#F4EBDD] border-b border-[#2A211F] relative overflow-hidden" aria-label="Shop by occasion">
      {/* Subtle Ambient Light Zone behind occasion cards */}
      <div className="absolute inset-0 bg-ambient-occasion pointer-events-none" />

      <MainContainer className="relative z-10">
        <div ref={ref} className={`reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:gap-5 w-full">
            {OCCASIONS_DATA.map((occasion, idx) => (
              <div
                key={occasion.id}
                className={`min-w-0 w-full reveal-init ${
                  isVisible ? `reveal-visible stagger-${idx + 1}` : ''
                }`}
              >
                <OccasionCard occasion={occasion} />
              </div>
            ))}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
