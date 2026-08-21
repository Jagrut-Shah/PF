import React from 'react';
import MainContainer from '../ui/MainContainer';

export default function BrandStory() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#102F38] text-[#F3EBDD] border-y border-[rgba(243,235,221,0.12)]">
      <MainContainer>
        <div className="max-w-4xl mx-auto bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-2xl p-6 sm:p-10 md:p-14 shadow-lg text-center relative overflow-hidden">
          {/* Subtle Decorative Background Graphic */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#C5A15A]/[0.05] rounded-full blur-2xl pointer-events-none" />

          <span className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-[#C5A15A] block mb-2">
            OUR ESSENCE & ORIGIN
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal uppercase tracking-[0.06em] text-[#F3EBDD] mb-6 leading-tight">
            THE STORY BEHIND <span className="italic text-[#C5A15A]">ÉLAVA</span>
          </h2>

          <div className="space-y-4 font-sans text-xs sm:text-sm text-[#C8C1B5] leading-relaxed max-w-2xl mx-auto">
            <p>
              ÉLAVA Perfumes was founded with a single clear purpose: to craft artisanal Eau de Parfum signatures that embody quiet confidence, warmth, and enduring presence.
            </p>
            <p>
              Based in Ahmedabad, Gujarat, we blend fine fragrance oils with precision to create perfumes that feel personal, elevated, and deeply memorable—whether for an intimate date night, daily office wear, or vibrant evening celebrations.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[rgba(243,235,221,0.12)] flex items-center justify-center gap-6">
            <div className="text-center">
              <span className="font-serif text-lg font-medium text-[#F3EBDD] block">60 ML</span>
              <span className="font-sans text-[10px] uppercase tracking-wider text-[#C8C1B5]">Eau de Parfum</span>
            </div>
            <div className="w-px h-8 bg-[rgba(243,235,221,0.15)]" />
            <div className="text-center">
              <span className="font-serif text-lg font-medium text-[#F3EBDD] block">India</span>
              <span className="font-sans text-[10px] uppercase tracking-wider text-[#C8C1B5]">Crafted Origin</span>
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
