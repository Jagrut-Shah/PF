import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import MainContainer from '../ui/MainContainer';

/**
 * DiscoverySet Component ("TRY BEFORE YOU BUY — ÉLAVA DISCOVERY SET")
 * Short, clear conversion card.
 */
export default function DiscoverySet() {
  return (
    <section className="py-8 sm:py-10 bg-[#163E49] text-[#F3EBDD]">
      <MainContainer>
        <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.18)] rounded-2xl p-5 sm:p-7 md:p-8 shadow-lg relative overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Compact Visual */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden border border-[rgba(243,235,221,0.15)] bg-[#102F38] shadow-sm">
                <img
                  src="/images/products/row-1-column-1.png"
                  alt="ÉLAVA Discovery Set"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5 bg-[#7A2929] text-[#F3EBDD] text-[9.5px] font-bold tracking-[0.18em] uppercase px-2.5 py-0.5 rounded shadow-xs">
                  TRY BEFORE YOU BUY
                </div>
              </div>
            </div>

            {/* Right Column: Clear Information & Direct CTAs */}
            <div className="md:col-span-7 lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-sans tracking-[0.16em] uppercase text-[#C5A15A] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ÉLAVA DISCOVERY SET</span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal uppercase tracking-[0.04em] text-[#F3EBDD] leading-tight">
                SAMPLE ÉLAVA FRAGRANCES <span className="italic text-[#C5A15A]">AT HOME</span>
              </h2>

              <p className="font-sans text-xs sm:text-sm text-[#C8C1B5] leading-relaxed max-w-xl">
                Experience our handcrafted 60 ML Eau de Parfum collection before choosing your full-size signature bottle.
              </p>

              {/* What You Receive Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-[#F3EBDD]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C5A15A] shrink-0" />
                  <span>Curated Eau de Parfum samples</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C5A15A] shrink-0" />
                  <span>Top, Heart & Base note breakdown</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <RouterLink
                  to="/category/bestsellers"
                  className="inline-flex items-center gap-2 bg-[#7A2929] hover:bg-[#8C3232] text-[#F3EBDD] px-5 py-2.5 rounded-lg font-sans text-xs font-bold uppercase tracking-[0.14em] transition-colors shadow-xs"
                >
                  <span>EXPLORE DISCOVERY SET</span>
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
