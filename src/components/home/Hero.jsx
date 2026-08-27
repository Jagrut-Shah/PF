import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import MainContainer from '../ui/MainContainer';

/**
 * Hero Component — Staggered Entrance Animations (Section 6), Grounding Bottle Shadow (Section 8) & Near-Black Depth (Section 5)
 */
export default function Hero() {
  return (
    <section className="relative w-full bg-[#2A0D14] text-[#F6EFE7] overflow-hidden border-b border-[#E7C4C5]/15">
      {/* Background Photography with Dark Near-Black Editorial Gradient */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/products/row-1-column-1.png"
          alt="ÉLAVA Luxury Perfume Hero"
          className="w-full h-full object-cover object-center opacity-25 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0A0C] via-[#2A0D14]/95 to-[#2A0D14]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A0D14] via-transparent to-[#0D0A0C]/50" />
      </div>

      <MainContainer className="relative z-10 py-14 sm:py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7">
            {/* Section Label / Badge — Stagger 1 */}
            <div className="animate-hero-eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#641D2D] border border-[#E7C4C5]/20 mb-6 text-[11px] sm:text-xs font-sans font-semibold tracking-[0.18em] uppercase text-[#E7C4C5] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#E7C4C5]" />
              <span>60 ml Eau de Parfum Collection</span>
            </div>

            {/* Editorial Display Headline — Stagger 2 */}
            <h1 className="animate-hero-headline font-serif text-[40px] sm:text-[60px] md:text-[72px] lg:text-[84px] font-normal tracking-tight text-[#F6EFE7] leading-[0.98] mb-6">
              Scents that become <span className="italic font-normal text-[#E7C4C5]">part of you.</span>
            </h1>

            {/* Supporting Copy — Stagger 3 */}
            <p className="animate-hero-subhead font-sans text-sm sm:text-base md:text-[17px] text-[#E7C4C5]/85 font-normal leading-[1.55] mb-8 max-w-xl">
              Crafted for the moments you will remember. Long-lasting Eau de Parfum formulations designed to subtly express your presence.
            </p>

            {/* Primary & Secondary CTAs — Stagger 4 */}
            <div className="animate-hero-cta flex flex-wrap items-center gap-4">
              <Link
                to="/category/bestsellers"
                className="group inline-flex items-center gap-2.5 bg-[#C94B5B] hover:bg-[#B03D4C] active:scale-[0.98] text-[#F6EFE7] px-7 py-3.5 rounded-xl font-sans text-[14px] sm:text-[15px] font-semibold tracking-[0.08em] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none"
              >
                <span>Discover Your Signature</span>
                <ArrowRight className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/category/unisex"
                className="inline-flex items-center gap-2 bg-[#641D2D] hover:bg-[#7A2437] active:scale-[0.98] text-[#F6EFE7] border border-[#E7C4C5]/20 px-6 py-3.5 rounded-xl font-sans text-[14px] sm:text-[15px] font-semibold tracking-[0.08em] transition-all duration-200"
              >
                <span>Explore All</span>
              </Link>
            </div>
          </div>

          {/* Right Hero Product Image — Stagger 5 + Realistic Grounding Shadow (Section 8) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="animate-hero-bottle relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] group">
              {/* Soft Grounding Shadow beneath bottle */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-black/60 blur-xl rounded-full pointer-events-none" />
              
              {/* Product Bottle */}
              <div className="relative rounded-2xl overflow-hidden bg-[#641D2D]/60 border border-[#E7C4C5]/20 p-4 sm:p-6 shadow-2xl transition-transform duration-300 group-hover:scale-[1.015]">
                <img
                  src="/images/products/row-1-column-1.png"
                  alt="ÉLAVA Signature Eau de Parfum Bottle"
                  className="w-full h-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>

        </div>
      </MainContainer>
    </section>
  );
}
