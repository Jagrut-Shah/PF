import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import MainContainer from '../ui/MainContainer';

/**
 * Hero Component for ÉLAVA
 * High-conversion brand opening section with rich photography.
 */
export default function Hero() {
  return (
    <section className="relative w-full bg-[#102F38] text-[#F3EBDD] overflow-hidden border-b border-[rgba(243,235,221,0.12)]">
      {/* Background Photography with Dark Editorial Gradient */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/products/row-1-column-1.png"
          alt="ÉLAVA Luxury Perfume Hero"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#102F38] via-[#102F38]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102F38] via-transparent to-transparent" />
      </div>

      <MainContainer className="relative z-10 py-12 sm:py-16 md:py-24 lg:py-28">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] mb-4 text-xs font-sans tracking-[0.16em] uppercase text-[#C5A15A]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A15A]" />
            <span>60 ML EAU DE PARFUM COLLECTION</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.04em] uppercase text-[#F3EBDD] leading-[1.1] mb-4">
            SCENTS THAT BECOME <span className="italic text-[#C5A15A]">PART OF YOU.</span>
          </h1>

          {/* Subhead */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-[#C8C1B5] font-normal leading-relaxed mb-8 max-w-xl">
            "Crafted for the moments you'll remember." Long-lasting Eau de Parfum formulations made to express your presence.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/category/bestsellers"
              className="inline-flex items-center gap-2 bg-[#7A2929] hover:bg-[#8C3232] text-[#F3EBDD] px-6 sm:px-7 py-3.5 rounded-lg font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.16em] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none"
            >
              <span>DISCOVER YOUR SIGNATURE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/category/unisex"
              className="inline-flex items-center gap-2 bg-[#1C4A55] hover:bg-[#235865] text-[#F3EBDD] border border-[rgba(243,235,221,0.2)] px-6 py-3.5 rounded-lg font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-200"
            >
              <span>EXPLORE ALL</span>
            </Link>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
