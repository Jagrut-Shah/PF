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
 * WhyElava Component — CHERRY DOMINANT BACKGROUND #64141F:
 * Deep Cherry section, Rich Warm Sand Cream #DAC29F cards, Cherry #8B1E2D numerals.
 */
export default function WhyElava() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-8 sm:py-12 bg-[#64141F] text-[#DAC29F] border-t border-b border-[#8B1E2D]">
      <MainContainer>
        <div ref={ref} className={`reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <SectionHeading
            title="Why Élava"
            subtitle="Genuine differentiators behind our fragrance craft."
            isDark={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {DIFFERENTIATORS.map((item, idx) => (
              <div
                key={item.number}
                className={`bg-[#DAC29F] border border-[#BD9F7B] rounded-xl p-5 flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8B1E2D] hover:shadow-md group card-hover-interactive reveal-init ${
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
                  <p className="font-manrope text-[12px] text-[#594B40] leading-[1.6] font-normal">
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
