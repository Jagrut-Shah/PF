import React from 'react';
import MainContainer from '../ui/MainContainer';
import SectionHeading from '../ui/SectionHeading';
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
 * Light Luxury Perfume Aesthetic: Warm Ivory #F6F2EA backdrop, subtle champagne illumination, and staggered scroll reveal.
 */
export default function ShopByOccasion() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-[#F6F2EA] text-[#201C19] border-b border-[#D9D1C6] relative overflow-hidden" aria-labelledby="shop-by-occasion-heading">
      {/* Subtle Champagne Ambient Light Zone behind occasion cards */}
      <div className="absolute inset-0 bg-ambient-occasion pointer-events-none" />

      <MainContainer className="relative z-10">
        <div ref={ref} className={`reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <SectionHeading
            id="shop-by-occasion-heading"
            title="SHOP BY OCCASION"
            subtitle="Find the right scent signature for your moment."
          />

          <div className="grid grid-cols-4 gap-2 sm:gap-4 lg:gap-6 mt-4 sm:mt-8 w-full">
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
