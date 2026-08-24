import React from 'react';
import MainContainer from '../ui/MainContainer';

/**
 * BrandStory Component
 * STORY: Warm Blush Light Section (#F5E9E6 / #FFF8F7 with #241D21 typography)
 */
export default function BrandStory() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#F5E9E6] text-[#241D21] border-t border-[#D98A9B]/40">
      <MainContainer>
        <div className="max-w-4xl mx-auto bg-[#FFF8F7] border border-[#D98A9B]/40 rounded-2xl p-6 sm:p-10 md:p-14 shadow-xl text-center relative overflow-hidden">
          {/* Subtle Decorative Background Graphic */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#C94F70]/[0.06] rounded-full blur-2xl pointer-events-none" />

          <span className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-[#C94F70] block mb-2">
            OUR ESSENCE & ORIGIN
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.06em] text-[#241D21] mb-6 leading-tight">
            THE STORY BEHIND <span className="italic text-[#C94F70]">ÉLAVA</span>
          </h2>

          <div className="space-y-4 font-sans text-xs sm:text-sm text-[#756A70] leading-relaxed max-w-2xl mx-auto">
            <p>
              ÉLAVA Perfumes was founded with a single clear purpose: to craft artisanal Eau de Parfum signatures that embody quiet confidence, warmth, and enduring presence.
            </p>
            <p>
              Based in Ahmedabad, Gujarat, we blend fine fragrance oils with precision to create perfumes that feel personal, elevated, and deeply memorable—whether for an intimate date night, daily office wear, or vibrant evening celebrations.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#D98A9B]/30 flex items-center justify-center gap-6">
            <div className="text-center">
              <span className="font-serif text-lg font-bold text-[#241D21] block">60 ML</span>
              <span className="font-sans text-[10px] uppercase tracking-wider text-[#756A70]">Eau de Parfum</span>
            </div>
            <div className="w-px h-8 bg-[#D98A9B]/40" />
            <div className="text-center">
              <span className="font-serif text-lg font-bold text-[#241D21] block">India</span>
              <span className="font-sans text-[10px] uppercase tracking-wider text-[#756A70]">Crafted Origin</span>
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
