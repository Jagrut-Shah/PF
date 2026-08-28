import React from 'react';
import MainContainer from '../ui/MainContainer';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * BrandStory Component — Light Luxury Fragrance Editorial Spread:
 * Deep Cherry #4A1019 background with Primary Cherry #7F1D2D container,
 * Bodoni Moda major editorial statement & pull quote, and generous whitespace.
 */
export default function BrandStory() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-10 sm:py-14 bg-[#4A1019] text-[#FAF6EF] border-y border-[#7F1D2D] relative overflow-hidden">
      {/* Subtle Ambient Editorial Lighting Zone */}
      <div className="absolute inset-0 bg-ambient-story pointer-events-none" />

      <MainContainer className="relative z-10">
        <div
          ref={ref}
          className={`max-w-4xl mx-auto bg-[#7F1D2D] border border-[#4A1019] rounded-2xl p-6 sm:p-10 md:p-12 shadow-[0_10px_32px_rgba(74,16,25,0.2)] text-center relative overflow-hidden reveal-init ${
            isVisible ? 'reveal-visible' : ''
          }`}
        >
          
          <span className="font-manrope text-[12px] font-semibold uppercase tracking-[0.09em] text-[#F3E8D8] block mb-2">
            Our Essence & Origin
          </span>

          <h2 className="font-bodoni text-[28px] sm:text-[36px] md:text-[44px] font-medium text-[#FAF6EF] mb-6 leading-[1.05] tracking-[-0.015em]">
            The Story Behind <span className="font-medium text-[#F3E8D8]/70 italic">Élava</span>
          </h2>

          <div className="space-y-4 font-manrope text-[15px] sm:text-[16px] text-[#F3E8D8]/70 leading-[1.6] font-normal max-w-2xl mx-auto">
            <p className={`reveal-init ${isVisible ? 'reveal-visible stagger-1' : ''}`}>
              ÉLAVA Perfumes was founded with a single clear purpose: to craft artisanal Eau de Parfum signatures that embody quiet confidence, warmth, and enduring presence.
            </p>

            {/* Selected Pull Quote */}
            <blockquote className={`my-5 py-4 border-y border-[#F3E8D8]/20 font-bodoni font-medium italic text-[20px] sm:text-[25px] md:text-[28px] text-[#FAF6EF] leading-[1.2] tracking-[-0.015em] max-w-xl mx-auto reveal-init ${
              isVisible ? 'reveal-visible stagger-2' : ''
            }`}>
              "A fragrance designed not to announce your arrival, but to linger gracefully after you leave."
            </blockquote>

            <p className={`reveal-init ${isVisible ? 'reveal-visible stagger-3' : ''}`}>
              Based in Ahmedabad, Gujarat, we blend fine fragrance oils with precision to create perfumes that feel personal, elevated, and deeply memorable—whether for an intimate date night, daily office wear, or vibrant evening celebrations.
            </p>
          </div>

          {/* Stats Anchor Panel */}
          <div className={`mt-8 pt-2 reveal-init ${isVisible ? 'reveal-visible stagger-4' : ''}`}>
            <div className="bg-[#4A1019] border border-[#7F1D2D] rounded-xl p-4 max-w-sm mx-auto flex items-center justify-center gap-6 shadow-xs text-[#FAF6EF]">
              <div className="text-center">
                <span className="font-bodoni text-[20px] font-medium text-[#FAF6EF] block">60 ml</span>
                <span className="font-manrope text-[12px] font-semibold tracking-[0.09em] uppercase text-[#F3E8D8]/70">Eau de Parfum</span>
              </div>
              <div className="w-px h-8 bg-[#7F1D2D]" />
              <div className="text-center">
                <span className="font-bodoni text-[20px] font-medium text-[#FAF6EF] block">India</span>
                <span className="font-manrope text-[12px] font-semibold tracking-[0.09em] uppercase text-[#F3E8D8]/70">Crafted Origin</span>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
