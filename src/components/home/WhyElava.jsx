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

export default function WhyElava() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#FBF8F3] text-[#08111F] border-b border-[#08111F]/10">
      <MainContainer>
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-sans text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#285BE6] block">
            GENUINE DIFFERENTIATORS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-wide text-[#08111F] mt-1">
            WHY <span className="italic text-[#285BE6]">ÉLAVA</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#111A27]/75 mt-1 font-normal tracking-wide">
            The artisanal craftsmanship behind our haute perfume signatures.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIFFERENTIATORS.map((item) => (
            <div
              key={item.number}
              className="bg-[#F7F3EC] border border-[#08111F]/10 rounded-2xl p-6 flex flex-col justify-between shadow-xs transition-transform duration-300 hover:-translate-y-1 hover:border-[#285BE6]"
            >
              <div>
                <span className="font-mono text-2xl font-bold text-[#285BE6] block mb-3">
                  {item.number}
                </span>
                <h3 className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#08111F] mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-[#111A27]/75 leading-relaxed">
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
