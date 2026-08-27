import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import MainContainer from '../ui/MainContainer';

/**
 * Hero Component — Black & Red Luxury Studio Atmosphere:
 * Deep Black #0B0B0B environment, Level 1 diffuse ambient red lighting behind studio bottle,
 * Deep Red #8F1018 eyebrow badge, Level 3 Signature Red #B4171E CTA button.
 */
export default function Hero() {
  return (
    <section className="relative w-full bg-[#0B0B0B] text-[#F5F2EE] overflow-hidden border-b border-white/10">
      {/* Background Photography with Soft Dark Atmosphere & Diffuse Level 1 Red Studio Light */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/products/row-1-column-1.png"
          alt="ÉLAVA Luxury Perfume Hero"
          className="w-full h-full object-cover object-center opacity-15 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#0B0B0B]/95 to-[#0B0B0B]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#080808]/50" />
        {/* Level 1 Diffuse Deep-Red Ambient Light behind hero product */}
        <div className="absolute inset-0 bg-ambient-hero pointer-events-none" />
      </div>

      <MainContainer className="relative z-10 py-14 sm:py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7">
            {/* Section Label / Badge in Deep Red #8F1018 Surface */}
            <div className="animate-hero-eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8F1018]/60 border border-[#B4171E]/40 mb-6 text-[11px] sm:text-xs font-sans font-semibold tracking-[0.18em] uppercase text-[#F5F2EE] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#F5F2EE]" />
              <span>60 ml Eau de Parfum Collection</span>
            </div>

            {/* Editorial Display Headline */}
            <h1 className="animate-hero-headline font-serif text-[40px] sm:text-[60px] md:text-[72px] lg:text-[84px] font-normal tracking-tight text-[#F5F2EE] leading-[0.98] mb-6">
              Scents that become <span className="italic font-normal text-[#B8B3AF]">part of you.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="animate-hero-subhead font-sans text-sm sm:text-base md:text-[17px] text-[#B8B3AF] font-normal leading-[1.55] mb-8 max-w-xl">
              Crafted for the moments you will remember. Long-lasting Eau de Parfum formulations designed to subtly express your presence.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="animate-hero-cta flex flex-wrap items-center gap-4">
              <Link
                to="/category/bestsellers"
                className="group inline-flex items-center gap-2.5 bg-[#B4171E] hover:bg-[#C72A35] active:scale-[0.98] text-[#F5F2EE] border border-white/10 px-7 py-3.5 rounded-xl font-sans text-[14px] sm:text-[15px] font-semibold tracking-[0.08em] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none"
              >
                <span>Discover Your Signature</span>
                <ArrowRight className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1 text-[#F5F2EE]" />
              </Link>

              <Link
                to="/category/unisex"
                className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#8F1018]/40 active:scale-[0.98] text-[#F5F2EE] border border-white/15 px-6 py-3.5 rounded-xl font-sans text-[14px] sm:text-[15px] font-semibold tracking-[0.08em] transition-all duration-200"
              >
                <span>Explore All</span>
              </Link>
            </div>
          </div>

          {/* Right Hero Product Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="animate-hero-bottle relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] group">
              {/* Soft Grounding Shadow beneath bottle */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-black/80 blur-xl rounded-full pointer-events-none" />
              
              {/* Diffuse Red Backdrop Glow behind bottle */}
              <div className="absolute inset-0 bg-radial from-[#8F1018]/20 to-transparent blur-2xl rounded-full pointer-events-none" />

              {/* Product Bottle Container */}
              <div className="relative rounded-2xl overflow-hidden bg-[#080808] border border-white/15 p-4 sm:p-6 shadow-2xl transition-transform duration-300 group-hover:scale-[1.015]">
                <img
                  src="/images/products/row-1-column-1.png"
                  alt="ÉLAVA Signature Eau de Parfum Bottle"
                  className="w-full h-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>

        </div>
      </MainContainer>
    </section>
  );
}
