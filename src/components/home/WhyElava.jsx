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
 * Deep Cherry section, Black #120E0D cards, Very Dark Cream #DAC29F titles & numerals.
 */
export default function WhyElava() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-8 sm:py-12 bg-[#06215A] text-[#DAC29F] border-t border-b border-[#0A3282]">
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
                className={`bg-[#120E0D] border border-[#3D2E2A] rounded-xl p-5 flex flex-col justify-between shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#DAC29F]/50 group card-hover-interactive reveal-init ${
                  isVisible ? `reveal-visible stagger-${idx + 1}` : ''
                }`}
              >
                <div>
                  <span className="font-bodoni text-[28px] sm:text-[32px] font-medium text-[#DAC29F] block mb-2 leading-none transform group-hover:scale-105 transition-transform origin-left">
                    {item.number}
                  </span>
                  <h3 className="font-manrope text-[14px] font-semibold text-[#DAC29F] mb-1.5 group-hover:text-[#E5D7C3] transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-manrope text-[12px] text-[#DAC29F]/70 leading-[1.6] font-normal">
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
