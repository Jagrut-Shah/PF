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
 * WhyElava Component — Layered Black & Red Luxury Aesthetic & Motion:
 * Soft Black #111111 section background, Charcoal #171515 cards with staggered scroll reveal.
 */
export default function WhyElava() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#111111] text-[#F5F2EE] border-t border-b border-white/10">
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
                className={`bg-[#171515] border border-white/10 rounded-xl p-6 flex flex-col justify-between shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#B4171E]/50 hover:shadow-xl group card-hover-interactive reveal-init ${
                  isVisible ? `reveal-visible stagger-${idx + 1}` : ''
                }`}
              >
                <div>
                  <span className="font-bodoni text-3xl sm:text-4xl font-medium text-[#B4171E] block mb-3 leading-none transform group-hover:scale-105 transition-transform origin-left">
                    {item.number}
                  </span>
                  <h3 className="font-manrope text-[16px] font-semibold text-[#F5F2EE] mb-2 group-hover:text-[#B4171E] transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-manrope text-[14px] text-[#B8B3AF] leading-[1.6] font-normal">
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
