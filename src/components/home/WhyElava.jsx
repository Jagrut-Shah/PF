import React from 'react';
import MainContainer from '../ui/MainContainer';
import SectionHeading from '../ui/SectionHeading';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const DIFFERENTIATORS = [
  {
    number: '01',
    title: 'Carefully Crafted',
    description: 'Artisanal Eau de Parfum formulations blending rare woods, delicate florals, and warm amber notes for distinct longevity.'
  },
  {
    number: '02',
    title: 'Made for India',
    description: 'Formulated to hold projection and character gracefully in tropical climates and warm evening gatherings.'
  },
  {
    number: '03',
    title: 'Premium Experience',
    description: 'Offered in 60 ml Eau de Parfum bottles designed for tactile elegance and effortless daily signature wear.'
  },
  {
    number: '04',
    title: 'No Blind Buying',
    description: 'Complete fragrance pyramids (Top, Heart, Base) and direct WhatsApp assistance to help you pick with confidence.'
  }
];

/**
 * WhyElava Component — Light Luxury Perfume Aesthetic:
 * Slightly darker Cream / Stone #EEE8DD background, Warm Ivory #F6F2EA cards,
 * Deep Espresso #201C19 text, and Deep Burgundy #721C24 numerals.
 */
export default function WhyElava() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#EEE8DD] text-[#201C19] border-t border-b border-[#D9D1C6]">
      <MainContainer>
        <div ref={ref} className={`reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <SectionHeading
            title="Why Élava"
            subtitle="Genuine differentiators behind our fragrance craft."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {DIFFERENTIATORS.map((item, idx) => (
              <div
                key={item.number}
                className={`bg-[#F6F2EA] border border-[#D9D1C6] rounded-xl p-6 flex flex-col justify-between shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#721C24]/50 hover:shadow-[0_10px_28px_rgba(60,45,30,0.08)] group card-hover-interactive reveal-init ${
                  isVisible ? `reveal-visible stagger-${idx + 1}` : ''
                }`}
              >
                <div>
                  <span className="font-bodoni text-3xl sm:text-4xl font-medium text-[#721C24] block mb-3 leading-none transform group-hover:scale-105 transition-transform origin-left">
                    {item.number}
                  </span>
                  <h3 className="font-manrope text-[16px] font-semibold text-[#201C19] mb-2 group-hover:text-[#721C24] transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-manrope text-[14px] text-[#625C55] leading-[1.6] font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
