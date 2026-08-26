import React from 'react';
import MainContainer from '../ui/MainContainer';

export default function BrandStory() {
  return (
    <section className="py-14 sm:py-20 md:py-24 bg-[#08111F] text-[#F7F3EC] border-b border-white/10">
      <MainContainer>
        <div className="max-w-4xl mx-auto bg-[#102A4C]/90 border border-white/15 rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl text-center relative overflow-hidden">
          {/* Subtle Decorative Atmosphere */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#285BE6]/15 rounded-full blur-3xl pointer-events-none" />

          <span className="font-sans text-xs font-extrabold uppercase tracking-[0.24em] text-[#5F8CFF] block mb-3">
            OUR ESSENCE & ORIGIN
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-wide text-[#F7F3EC] mb-6 leading-tight">
            THE STORY BEHIND <span className="italic text-[#5F8CFF]">ÉLAVA</span>
          </h2>

          <div className="space-y-4 font-sans text-xs sm:text-sm text-[#F7F3EC]/80 leading-relaxed max-w-2xl mx-auto">
            <p>
              ÉLAVA Perfumes was founded with a single clear purpose: to craft artisanal Eau de Parfum signatures that embody quiet confidence, warmth, and enduring presence.
            </p>
            <p>
              Based in Ahmedabad, Gujarat, we blend fine fragrance oils with precision to create perfumes that feel personal, elevated, and deeply memorable—whether for an intimate date night, daily office wear, or vibrant evening celebrations.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-center gap-8">
            <div className="text-center">
              <span className="font-serif text-xl sm:text-2xl font-light text-[#F7F3EC] block">60 ML</span>
              <span className="font-sans text-[10px] font-mono uppercase tracking-wider text-[#5F8CFF]">Eau de Parfum</span>
            </div>
            <div className="w-px h-10 bg-white/15" />
            <div className="text-center">
              <span className="font-serif text-xl sm:text-2xl font-light text-[#F7F3EC] block">India</span>
              <span className="font-sans text-[10px] font-mono uppercase tracking-wider text-[#5F8CFF]">Crafted Origin</span>
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
