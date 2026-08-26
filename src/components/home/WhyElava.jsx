import React from 'react';
import MainContainer from '../ui/MainContainer';
import SectionHeading from '../ui/SectionHeading';

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

export default function WhyElava() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#2A0D14] text-[#F6EFE7]">
      <MainContainer>
        <SectionHeading
          title="Why Élava"
          subtitle="Genuine differentiators behind our fragrance craft."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {DIFFERENTIATORS.map((item) => (
            <div
              key={item.number}
              className="bg-[#641D2D] border border-[#E7C4C5]/15 rounded-xl p-6 flex flex-col justify-between shadow-sm transition-transform duration-300 hover:-translate-y-1"
            >
              <div>
                <span className="font-serif text-4xl font-normal text-[#E7C4C5] block mb-3 leading-none">
                  {item.number}
                </span>
                <h3 className="font-sans text-sm font-semibold tracking-wide text-[#F6EFE7] mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#E7C4C5]/85 leading-relaxed font-normal">
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
