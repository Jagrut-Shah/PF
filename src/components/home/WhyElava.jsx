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
    <section className="py-8 sm:py-12 bg-[#EEE2D2] text-[#2A211F] border-t border-b border-[#D9C9B8]">
      <MainContainer>
        <div ref={ref} className={`reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <SectionHeading
            title="Why Élava"
            subtitle="Genuine differentiators behind our fragrance craft."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {DIFFERENTIATORS.map((item, idx) => (
              <div
                key={item.number}
                className={`bg-[#FBF8F2] border border-[#D9C9B8] rounded-xl p-5 flex flex-col justify-between shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#8B1E2D]/40 hover:shadow-[0_8px_24px_rgba(139,30,45,0.10)] group card-hover-interactive reveal-init ${
                  isVisible ? `reveal-visible stagger-${idx + 1}` : ''
                }`}
              >
                <div>
                  <span className="font-bodoni text-[28px] sm:text-[32px] font-medium text-[#8B1E2D] block mb-2 leading-none transform group-hover:scale-105 transition-transform origin-left">
                    {item.number}
                  </span>
                  <h3 className="font-manrope text-[14px] font-semibold text-[#2A211F] mb-1.5 group-hover:text-[#8B1E2D] transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-manrope text-[12px] text-[#A89A8B] leading-[1.6] font-normal">
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
