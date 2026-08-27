import React from 'react';
import MainContainer from '../ui/MainContainer';

/**
 * BrandStory Component — Variant B: Warm Ivory (#F3E9DD) Story Card + Near Black (#0D0A0C) Crisp Typography
 */
export default function BrandStory() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#2A0D14] text-[#F3E9DD] border-y border-[#E7C4C5]/15">
      <MainContainer>
        <div className="max-w-4xl mx-auto bg-[#F3E9DD] border border-[#641D2D]/20 rounded-2xl p-6 sm:p-10 md:p-14 shadow-xl text-center relative overflow-hidden">
          
          <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#2A0D14] block mb-3">
            Our Essence & Origin
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#0D0A0C] mb-6 leading-tight tracking-tight">
            The Story Behind <span className="italic font-normal text-[#2A0D14]">Élava</span>
          </h2>

          <div className="space-y-4 font-sans text-xs sm:text-sm md:text-base text-[#0D0A0C]/90 leading-relaxed font-normal max-w-2xl mx-auto">
            <p>
              ÉLAVA Perfumes was founded with a single clear purpose: to craft artisanal Eau de Parfum signatures that embody quiet confidence, warmth, and enduring presence.
            </p>

            {/* Selected Pull Quote — Bodoni Moda Italic 400 */}
            <blockquote className="my-6 py-4 border-y border-[#641D2D]/20 font-serif italic text-2xl sm:text-3xl text-[#0D0A0C] font-normal leading-snug max-w-xl mx-auto">
              "A fragrance designed not to announce your arrival, but to linger gracefully after you leave."
            </blockquote>

            <p>
              Based in Ahmedabad, Gujarat, we blend fine fragrance oils with precision to create perfumes that feel personal, elevated, and deeply memorable—whether for an intimate date night, daily office wear, or vibrant evening celebrations.
            </p>
          </div>

          {/* Near Black #0D0A0C Stats Anchor Panel */}
          <div className="mt-8 pt-2">
            <div className="bg-[#0D0A0C] border border-[#E7C4C5]/20 rounded-xl p-4 max-w-sm mx-auto flex items-center justify-center gap-6 shadow-md text-[#F3E9DD]">
              <div className="text-center">
                <span className="font-serif text-xl font-normal text-[#F3E9DD] block">60 ml</span>
                <span className="font-sans text-[11px] font-medium tracking-wider uppercase text-[#E7C4C5]/80">Eau de Parfum</span>
              </div>
              <div className="w-px h-8 bg-[#E7C4C5]/20" />
              <div className="text-center">
                <span className="font-serif text-xl font-normal text-[#F3E9DD] block">India</span>
                <span className="font-sans text-[11px] font-medium tracking-wider uppercase text-[#E7C4C5]/80">Crafted Origin</span>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
