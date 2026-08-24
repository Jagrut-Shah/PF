import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import MainContainer from '../ui/MainContainer';

/**
 * Hero Component for ÉLAVA
 * HERO: Deep Plum (#241326) / Burgundy (#3A1729) with soft atmospheric light.
 */
export default function Hero() {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#241326] via-[#3A1729] to-[#241326] text-[#FFF8F7] overflow-hidden border-b border-[rgba(217,138,155,0.15)]">
      {/* Background Photography with Dark Editorial Gradient */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/products/row-1-column-1.png"
          alt="ÉLAVA Luxury Perfume Hero"
          className="w-full h-full object-cover object-center opacity-25 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#241326] via-[#3A1729]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#241326] via-transparent to-transparent" />
      </div>

      <MainContainer className="relative z-10 py-12 sm:py-16 md:py-24 lg:py-28">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3A1729] border border-[rgba(217,138,155,0.25)] mb-4 text-xs font-sans tracking-[0.16em] uppercase text-[#C94F70] font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C94F70]" />
            <span>60 ML EAU DE PARFUM COLLECTION</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.04em] uppercase text-[#FFF8F7] leading-[1.1] mb-4">
            SCENTS THAT BECOME <span className="text-[#C94F70]">PART OF YOU.</span>
          </h1>

          {/* Subhead */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-[#D98A9B] font-normal leading-relaxed mb-8 max-w-xl">
            "Crafted for the moments you'll remember." Long-lasting Eau de Parfum formulations made to express your presence.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/category/bestsellers"
              className="group inline-flex items-center gap-2.5 bg-[#C94F70] hover:bg-[#E96885] active:bg-[#B83F5D] text-white px-6 sm:px-7 py-3.5 rounded-xl font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.16em] transition-all duration-200 shadow-lg active:scale-[0.99] focus:outline-none"
            >
              <span>DISCOVER YOUR SIGNATURE</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/category/unisex"
              className="inline-flex items-center gap-2 bg-[#3A1729] hover:bg-[#6E2945] text-[#FFF8F7] border border-[rgba(217,138,155,0.25)] hover:border-[#C94F70]/50 px-6 py-3.5 rounded-xl font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-200"
            >
              <span>EXPLORE ALL</span>
            </Link>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
