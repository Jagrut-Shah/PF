import React from 'react';
import MainContainer from '../ui/MainContainer';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * BrandStory Component — Sora 600 Story Heading & Quote + Manrope 400 Body
 * Section 23 Requirement:
 * Story heading: Sora 600. Body: Manrope 400. Quote: Sora 500-600 (editorial through typography rather than old-fashioned serif).
 */
export default function BrandStory() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#0B0B0B] text-[#F5F2EE] border-y border-white/10 relative overflow-hidden">
      {/* Noticeable Level 3 Diffuse Red Ambient Editorial Light Zone */}
      <div className="absolute inset-0 bg-ambient-story pointer-events-none" />

      <MainContainer className="relative z-10">
        <div
          ref={ref}
          className={`max-w-4xl mx-auto bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-10 md:p-14 shadow-xl text-center relative overflow-hidden reveal-init bg-lacquer-highlight ${
            isVisible ? 'reveal-visible' : ''
          }`}
        >
          
          <span className="font-manrope text-[13px] font-semibold uppercase tracking-[0.09em] text-[#B4171E] block mb-3">
            Our Essence & Origin
          </span>

          <h2 className="font-bodoni text-[28px] sm:text-[36px] md:text-[44px] font-medium text-[#F5F2EE] mb-6 leading-[1.05] tracking-[-0.015em]">
            The Story Behind <span className="font-medium text-[#B8B3AF] italic">Élava</span>
          </h2>

          <div className="space-y-4 font-manrope text-[15px] sm:text-[16px] text-[#B8B3AF] leading-[1.6] font-normal max-w-2xl mx-auto">
            <p className={`reveal-init ${isVisible ? 'reveal-visible stagger-1' : ''}`}>
              ÉLAVA Perfumes was founded with a single clear purpose: to craft artisanal Eau de Parfum signatures that embody quiet confidence, warmth, and enduring presence.
            </p>

            {/* Selected Pull Quote with Bodoni Moda Editorial Typography */}
            <blockquote className={`my-6 py-5 border-y border-[#8F1018]/60 font-bodoni font-medium italic text-[22px] sm:text-[28px] md:text-[32px] text-[#F5F2EE] leading-[1.2] tracking-[-0.015em] max-w-xl mx-auto reveal-init ${
              isVisible ? 'reveal-visible stagger-2' : ''
            }`}>
              "A fragrance designed not to announce your arrival, but to linger gracefully after you leave."
            </blockquote>

            <p className={`reveal-init ${isVisible ? 'reveal-visible stagger-3' : ''}`}>
              Based in Ahmedabad, Gujarat, we blend fine fragrance oils with precision to create perfumes that feel personal, elevated, and deeply memorable—whether for an intimate date night, daily office wear, or vibrant evening celebrations.
            </p>
          </div>

          {/* Near Black #080808 Stats Anchor Panel */}
          <div className={`mt-8 pt-2 reveal-init ${isVisible ? 'reveal-visible stagger-4' : ''}`}>
            <div className="bg-[#080808] border border-white/10 rounded-xl p-4 max-w-sm mx-auto flex items-center justify-center gap-6 shadow-md text-[#F5F2EE]">
              <div className="text-center">
                <span className="font-bodoni text-[20px] font-medium text-[#F5F2EE] block">60 ml</span>
                <span className="font-manrope text-[12px] font-semibold tracking-[0.09em] uppercase text-[#B8B3AF]">Eau de Parfum</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <span className="font-bodoni text-[20px] font-medium text-[#F5F2EE] block">India</span>
                <span className="font-manrope text-[12px] font-semibold tracking-[0.09em] uppercase text-[#B8B3AF]">Crafted Origin</span>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}

