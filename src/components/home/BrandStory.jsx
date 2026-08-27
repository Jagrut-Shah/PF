import React from 'react';
import MainContainer from '../ui/MainContainer';

/**
 * BrandStory Component — Black & Red Luxury Aesthetic:
 * Deep Black #0B0B0B environment, Soft Black #121212 story card, Signature Red #B4171E subtle accents.
 */
export default function BrandStory() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#0B0B0B] text-[#F5F2EE] border-y border-white/10">
      <MainContainer>
        <div className="max-w-4xl mx-auto bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-10 md:p-14 shadow-xl text-center relative overflow-hidden">
          
          <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#B4171E] block mb-3">
            Our Essence & Origin
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F5F2EE] mb-6 leading-tight tracking-tight">
            The Story Behind <span className="italic font-normal text-[#B8B3AF]">Élava</span>
          </h2>

          <div className="space-y-4 font-sans text-xs sm:text-sm md:text-base text-[#B8B3AF] leading-relaxed font-normal max-w-2xl mx-auto">
            <p>
              ÉLAVA Perfumes was founded with a single clear purpose: to craft artisanal Eau de Parfum signatures that embody quiet confidence, warmth, and enduring presence.
            </p>

            {/* Selected Pull Quote */}
            <blockquote className="my-6 py-4 border-y border-white/10 font-serif italic text-2xl sm:text-3xl text-[#F5F2EE] font-normal leading-snug max-w-xl mx-auto">
              "A fragrance designed not to announce your arrival, but to linger gracefully after you leave."
            </blockquote>

            <p>
              Based in Ahmedabad, Gujarat, we blend fine fragrance oils with precision to create perfumes that feel personal, elevated, and deeply memorable—whether for an intimate date night, daily office wear, or vibrant evening celebrations.
            </p>
          </div>

          {/* Near Black #080808 Stats Anchor Panel */}
          <div className="mt-8 pt-2">
            <div className="bg-[#080808] border border-white/10 rounded-xl p-4 max-w-sm mx-auto flex items-center justify-center gap-6 shadow-md text-[#F5F2EE]">
              <div className="text-center">
                <span className="font-serif text-xl font-normal text-[#F5F2EE] block">60 ml</span>
                <span className="font-sans text-[11px] font-medium tracking-wider uppercase text-[#B8B3AF]">Eau de Parfum</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <span className="font-serif text-xl font-normal text-[#F5F2EE] block">India</span>
                <span className="font-sans text-[11px] font-medium tracking-wider uppercase text-[#B8B3AF]">Crafted Origin</span>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
