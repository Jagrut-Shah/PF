import React from 'react';
import MainContainer from '../ui/MainContainer';

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
    description: 'Offered in 60 ML Eau de Parfum bottles designed for tactile elegance and effortless daily signature wear.'
  },
  {
    number: '04',
    title: 'No Blind Buying',
    description: 'Complete fragrance pyramids (Top, Heart, Base) and direct WhatsApp assistance to help you pick with confidence.'
  }
];

/**
 * WHY ÉLAVA: Warm Blush Light Section (#F5E9E6 / #FFF8F7 with #241D21 typography)
 */
export default function WhyElava() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#F5E9E6] text-[#241D21] border-t border-b border-[#D98A9B]/40">
      <MainContainer>
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#241D21]">
            WHY ÉLAVA
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#756A70] mt-2">
            Genuine differentiators behind our fragrance craft.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIFFERENTIATORS.map((item) => (
            <div
              key={item.number}
              className="bg-[#FFF8F7] border border-[#D98A9B]/40 rounded-xl p-6 flex flex-col justify-between shadow-sm transition-transform duration-300 hover:-translate-y-1"
            >
              <div>
                <span className="font-serif text-3xl font-extrabold text-[#C94F70] block mb-3">
                  {item.number}
                </span>
                <h3 className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-[#241D21] mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-[#756A70] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
