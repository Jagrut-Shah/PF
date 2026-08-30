import React from 'react';
import MainContainer from '../ui/MainContainer';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * BrandStory Component — CHERRY DOMINANT BACKGROUND #64141F:
 * Deep Cherry section, Black #120E0D container, Very Dark Cream #DAC29F typography.
 */
export default function BrandStory() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-10 sm:py-14 bg-[#64141F] text-[#DAC29F] border-y border-[#8B1E2D] relative overflow-hidden">
      <MainContainer className="relative z-10">
        <div
          ref={ref}
          className={`max-w-4xl mx-auto bg-[#120E0D] border border-[#3D2E2A] rounded-2xl p-6 sm:p-10 md:p-12 shadow-xl text-[#DAC29F] text-center relative overflow-hidden reveal-init ${
            isVisible ? 'reveal-visible' : ''
          }`}
        >
          
          <span className="font-manrope text-[12px] font-semibold uppercase tracking-[0.09em] text-[#8B1E2D] block mb-2">
            Our Essence & Origin
          </span>

          <h2 className="font-bodoni text-[28px] sm:text-[36px] md:text-[44px] font-medium text-[#DAC29F] mb-6 leading-[1.05] tracking-[-0.015em]">
            The Story Behind <span className="font-medium text-[#DAC29F] italic">Élava</span>
          </h2>

          <div className="space-y-4 font-manrope text-[15px] sm:text-[16px] text-[#DAC29F]/85 leading-[1.6] font-normal max-w-2xl mx-auto">
            <p className={`reveal-init ${isVisible ? 'reveal-visible stagger-1' : ''}`}>
              ÉLAVA Perfumes was founded with a single clear purpose: to craft artisanal Eau de Parfum signatures that embody quiet confidence, warmth, and enduring presence.
            </p>

            {/* Selected Pull Quote — Very Dark Cream #DAC29F */}
            <blockquote className={`my-5 py-4 border-y border-[#DAC29F]/30 font-bodoni font-medium italic text-[20px] sm:text-[25px] md:text-[28px] text-[#DAC29F] leading-[1.2] tracking-[-0.015em] max-w-xl mx-auto reveal-init ${
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
            <div className="bg-[#1A1412] border border-[#3D2E2A] rounded-xl p-4 max-w-sm mx-auto flex items-center justify-center gap-6 shadow-xs text-[#DAC29F]">
              <div className="text-center">
                <span className="font-bodoni text-[20px] font-medium text-[#DAC29F] block">60 ml</span>
                <span className="font-manrope text-[12px] font-semibold tracking-[0.09em] uppercase text-[#DAC29F]/60">Eau de Parfum</span>
              </div>
              <div className="w-px h-8 bg-[#3D2E2A]" />
              <div className="text-center">
                <span className="font-bodoni text-[20px] font-medium text-[#DAC29F] block">India</span>
                <span className="font-manrope text-[12px] font-semibold tracking-[0.09em] uppercase text-[#DAC29F]/60">Crafted Origin</span>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
