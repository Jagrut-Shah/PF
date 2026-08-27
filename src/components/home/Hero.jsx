import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import MainContainer from '../ui/MainContainer';

/**
 * Hero Component — Bodoni Moda Display (400) + Manrope UI (400/600)
 */
export default function Hero() {
  return (
    <section className="relative w-full bg-[#2A0D14] text-[#F6EFE7] overflow-hidden border-b border-[#E7C4C5]/15">
      {/* Background Photography with Dark Editorial Gradient */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/products/row-1-column-1.png"
          alt="ÉLAVA Luxury Perfume Hero"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A0D14] via-[#2A0D14]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A0D14] via-transparent to-transparent" />
      </div>

      <MainContainer className="relative z-10 py-14 sm:py-20 md:py-28 lg:py-32">
        <div className="max-w-2xl">
          {/* Section Label / Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#641D2D] border border-[#E7C4C5]/20 mb-6 text-[11px] sm:text-xs font-sans font-semibold tracking-[0.18em] uppercase text-[#E7C4C5]">
            <Sparkles className="w-3.5 h-3.5 text-[#E7C4C5]" />
            <span>60 ml Eau de Parfum Collection</span>
          </div>

          {/* Editorial Display Headline — Bodoni Moda 400 */}
          <h1 className="font-serif text-[42px] sm:text-[62px] md:text-[76px] lg:text-[88px] font-normal tracking-tight text-[#F6EFE7] leading-[0.98] mb-6">
            Scents that become <span className="italic font-normal text-[#E7C4C5]">part of you.</span>
          </h1>

          {/* Supporting Copy — Manrope 400 */}
          <p className="font-sans text-sm sm:text-base md:text-[17px] text-[#E7C4C5]/85 font-normal leading-[1.55] mb-8 max-w-xl">
            Crafted for the moments you will remember. Long-lasting Eau de Parfum formulations designed to subtly express your presence.
          </p>

          {/* Primary & Secondary CTAs — Manrope 600 */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/category/bestsellers"
              className="inline-flex items-center gap-2.5 bg-[#C94B5B] hover:bg-[#B03D4C] text-[#F6EFE7] px-7 py-3.5 rounded-xl font-sans text-[14px] sm:text-[15px] font-semibold tracking-[0.08em] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none"
            >
              <span>Discover Your Signature</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/category/unisex"
              className="inline-flex items-center gap-2 bg-[#641D2D] hover:bg-[#7A2437] text-[#F6EFE7] border border-[#E7C4C5]/20 px-6 py-3.5 rounded-xl font-sans text-[14px] sm:text-[15px] font-semibold tracking-[0.08em] transition-colors duration-200"
            >
              <span>Explore All</span>
            </Link>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
