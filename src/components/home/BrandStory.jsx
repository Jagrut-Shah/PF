import React from 'react';
import MainContainer from '../ui/MainContainer';

export default function BrandStory() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#2A0D14] text-[#F6EFE7] border-y border-[#E7C4C5]/15">
      <MainContainer>
        <div className="max-w-4xl mx-auto bg-[#641D2D] border border-[#E7C4C5]/20 rounded-2xl p-6 sm:p-10 md:p-14 shadow-lg text-center relative overflow-hidden">
          
          <span className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-[#E7C4C5] block mb-2">
            OUR ESSENCE & ORIGIN
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal uppercase tracking-[0.06em] text-[#F6EFE7] mb-6 leading-tight">
            THE STORY BEHIND <span className="italic text-[#E7C4C5]">ÉLAVA</span>
          </h2>

          <div className="space-y-4 font-sans text-xs sm:text-sm text-[#F6EFE7]/85 leading-relaxed max-w-2xl mx-auto">
            <p>
              ÉLAVA Perfumes was founded with a single clear purpose: to craft artisanal Eau de Parfum signatures that embody quiet confidence, warmth, and enduring presence.
            </p>
            <p>
              Based in Ahmedabad, Gujarat, we blend fine fragrance oils with precision to create perfumes that feel personal, elevated, and deeply memorable—whether for an intimate date night, daily office wear, or vibrant evening celebrations.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E7C4C5]/15 flex items-center justify-center gap-6">
            <div className="text-center">
              <span className="font-serif text-lg font-medium text-[#F6EFE7] block">60 ML</span>
              <span className="font-sans text-[10px] uppercase tracking-wider text-[#E7C4C5]/80">Eau de Parfum</span>
            </div>
            <div className="w-px h-8 bg-[#E7C4C5]/15" />
            <div className="text-center">
              <span className="font-serif text-lg font-medium text-[#F6EFE7] block">India</span>
              <span className="font-sans text-[10px] uppercase tracking-wider text-[#E7C4C5]/80">Crafted Origin</span>
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
