import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import MainContainer from '../ui/MainContainer';

/**
 * Hero Component — Editorial Fashion-Forward Master Reference
 * Warm Cream foundation (#F7F3EC), Midnight Navy typography (#08111F), Cobalt accent (#285BE6).
 */
export default function Hero() {
  return (
    <section className="relative w-full bg-[#F7F3EC] text-[#111A27] overflow-hidden py-10 sm:py-14 md:py-20 lg:py-24 border-b border-[#08111F]/10">
      {/* Subtle Editorial Atmosphere Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft pale blue atmosphere in upper right */}
        <div className="absolute -top-32 -right-32 w-[550px] h-[550px] bg-[#E8F0FE]/60 rounded-full blur-3xl opacity-70" />
        {/* Controlled subtle Cobalt visual depth */}
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] bg-[#285BE6]/[0.03] rounded-full blur-3xl" />
      </div>

      <MainContainer className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column — Editorial Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#08111F]/[0.05] border border-[#08111F]/10 text-[10.5px] sm:text-xs font-sans tracking-[0.2em] uppercase text-[#08111F] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#285BE6]" />
              <span>ÉLAVA HAUTE PARFUMERIE · 60 ML EAU DE PARFUM</span>
            </div>

            {/* Dominant Editorial Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#08111F] leading-[1.04] uppercase">
              SCENTS THAT BECOME{' '}
              <span className="italic font-normal text-[#102A4C] block sm:inline">PART OF YOU.</span>
            </h1>

            {/* Short Supporting Copy */}
            <p className="font-sans text-sm sm:text-base text-[#111A27]/80 font-normal leading-relaxed max-w-xl">
              Artisanal Eau de Parfum formulations crafted to linger with quiet confidence. Formulated for presence, warmth, and enduring signature expression.
            </p>

            {/* CTAs — Primary CTA: SHOP NOW → (Midnight Navy, non-gold) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <Link
                to="/category/bestsellers"
                className="inline-flex items-center gap-2.5 bg-[#08111F] hover:bg-[#102A4C] text-[#F7F3EC] px-7 sm:px-8 py-4 rounded-xl font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.16em] transition-all duration-200 shadow-md hover:shadow-xl cursor-pointer"
                id="hero-shop-now-cta"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 text-[#5F8CFF]" />
              </Link>

              <Link
                to="/category/unisex"
                className="inline-flex items-center gap-2 bg-transparent hover:bg-[#08111F]/[0.04] text-[#08111F] border border-[#08111F]/20 px-6 sm:px-7 py-4 rounded-xl font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-200 cursor-pointer"
              >
                <span>EXPLORE COLLECTION</span>
              </Link>
            </div>

            {/* Sub-Trust Note */}
            <div className="pt-2 flex items-center gap-6 text-[11px] font-mono tracking-wider uppercase text-[#111A27]/60">
              <span>✦ Long Lasting 12H+</span>
              <span>✦ Free Shipping</span>
              <span>✦ IFRA Certified</span>
            </div>

          </div>

          {/* Right Column — Integrated Product Photography */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-4 lg:mt-0">
            {/* Subtle shadow backdrop layer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#102A4C]/10 via-[#285BE6]/10 to-transparent rounded-3xl transform rotate-2 scale-95 pointer-events-none" />
            
            <div className="relative z-10 w-full max-w-md sm:max-w-lg overflow-hidden rounded-2xl sm:rounded-3xl bg-[#FBF8F3] border border-[#08111F]/10 shadow-2xl p-3 sm:p-4 transition-transform duration-500 hover:scale-[1.01]">
              <img
                src="/images/products/row-1-column-1.png"
                alt="ÉLAVA Luxury Signature Perfume Bottle"
                className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover object-center rounded-xl sm:rounded-2xl"
              />
              
              {/* Floating Editorial Label */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#08111F]/90 backdrop-blur-md text-[#F7F3EC] p-3.5 sm:p-4 rounded-xl border border-white/10 flex items-center justify-between shadow-lg">
                <div>
                  <span className="font-serif text-sm sm:text-base font-bold tracking-wider uppercase block text-[#F7F3EC]">
                    ÉLAVA NOIR
                  </span>
                  <span className="font-sans text-[10.5px] text-[#5F8CFF] font-medium tracking-wide">
                    Cardamom · Smoked Vetiver · Amber
                  </span>
                </div>
                <span className="font-sans text-xs font-bold text-[#C6A15B] shrink-0 bg-[#C6A15B]/15 px-2.5 py-1 rounded-md border border-[#C6A15B]/30">
                  ₹1,299
                </span>
              </div>
            </div>
          </div>

        </div>
      </MainContainer>
    </section>
  );
}
