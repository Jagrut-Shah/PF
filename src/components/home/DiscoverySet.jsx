import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * DiscoverySet Component ("TRY BEFORE YOU BUY — ÉLAVA DISCOVERY SET")
 * Section: Cherry #8B1E2D, Container: Cream #F4EBDD (NO white background).
 */
export default function DiscoverySet() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-7 sm:py-9 bg-[#8B1E2D] text-[#F4EBDD]">
      <MainContainer>
        <div
          ref={ref}
          className={`bg-[#F4EBDD] border border-[#E5DCCF] rounded-2xl p-5 sm:p-7 md:p-8 shadow-md text-[#2A211F] relative overflow-hidden reveal-init ${
            isVisible ? 'reveal-visible' : ''
          }`}
        >
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Visual */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden border border-[#E5DCCF] bg-[#E5DCCF] shadow-xs group">
                <img
                  src="/images/products/row-1-column-1.png"
                  alt="ÉLAVA Discovery Set"
                  className="w-full h-full object-contain p-2 transform transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5 bg-[#8B1E2D] text-[#F4EBDD] text-[10px] font-manrope font-semibold tracking-[0.09em] uppercase px-2.5 py-1 rounded shadow-xs">
                  TRY BEFORE YOU BUY
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="md:col-span-7 lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-[12px] font-manrope tracking-[0.09em] uppercase text-[#8B1E2D] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#8B1E2D]" />
                <span>ÉLAVA DISCOVERY SET</span>
              </div>

              <h2 className="font-bodoni text-[22px] sm:text-[28px] md:text-[32px] font-medium text-[#2A211F] leading-[1.05] tracking-[-0.015em]">
                Sample ÉLAVA Fragrances <span className="font-medium text-[#8B1E2D] italic">At Home</span>
              </h2>

              <p className="font-manrope text-[14px] text-[#625C55] leading-[1.6]">
                Experience our handcrafted 60 ML Eau de Parfum collection before choosing your full-size signature bottle.
              </p>

              {/* What You Receive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[13px] font-manrope text-[#625C55]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#8B1E2D] shrink-0" />
                  <span>Curated 60ml Eau de Parfum bottles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#8B1E2D] shrink-0" />
                  <span>Top, Heart & Base note breakdown</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <RouterLink
                  to="/discovery-set"
                  className="inline-flex items-center gap-2 bg-[#8B1E2D] hover:bg-[#64141F] text-[#F4EBDD] px-5 py-2.5 rounded-lg font-manrope text-[13px] font-semibold tracking-[0.01em] transition-all duration-200 shadow-xs btn-interactive"
                >
                  <span>Explore Discovery Set</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </RouterLink>
              </div>

            </div>

          </div>

        </div>
      </MainContainer>
    </section>
  );
}
