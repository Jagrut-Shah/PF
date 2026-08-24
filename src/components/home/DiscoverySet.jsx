import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import MainContainer from '../ui/MainContainer';

/**
 * DiscoverySet Component ("TRY BEFORE YOU BUY — ÉLAVA DISCOVERY SET")
 * DISCOVERY SET: CLEARLY LIGHTER VISUAL BREAK (#F5E9E6 / #D98A9B with #241D21 typography)
 */
export default function DiscoverySet() {
  return (
    <section className="py-12 sm:py-16 bg-[#F5E9E6] text-[#241D21] border-t border-b border-[#D98A9B]/40 shadow-inner">
      <MainContainer>
        <div className="bg-[#FFF8F7] border border-[#D98A9B]/50 rounded-2xl p-5 sm:p-7 md:p-8 shadow-xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Compact Visual */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden border border-[#D98A9B]/30 bg-[#F5E9E6] shadow-sm">
                <img
                  src="/images/products/row-1-column-1.png"
                  alt="ÉLAVA Discovery Set"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5 bg-[#C94F70] text-white text-[9.5px] font-extrabold tracking-[0.18em] uppercase px-2.5 py-0.5 rounded shadow-xs">
                  TRY BEFORE YOU COMMIT
                </div>
              </div>
            </div>

            {/* Right Column: Clear Information & Direct CTAs */}
            <div className="md:col-span-7 lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-sans tracking-[0.16em] uppercase text-[#C94F70] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#C94F70]" />
                <span>ÉLAVA DISCOVERY SET</span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.04em] text-[#241D21] leading-tight">
                SAMPLE ÉLAVA FRAGRANCES <span className="italic text-[#C94F70]">AT HOME</span>
              </h2>

              <p className="font-sans text-xs sm:text-sm text-[#756A70] leading-relaxed max-w-xl">
                Experience our handcrafted 60 ML Eau de Parfum collection before choosing your permanent signature bottle.
              </p>

              {/* What You Receive Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-[#241D21]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C94F70] shrink-0" />
                  <span className="font-semibold">Curated 60ml Eau de Parfum bottles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C94F70] shrink-0" />
                  <span className="font-semibold">Top, Heart & Base note breakdown</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <RouterLink
                  to="/discovery-set"
                  className="inline-flex items-center gap-2 bg-[#C94F70] hover:bg-[#E96885] active:bg-[#B83F5D] text-white px-5 py-2.5 rounded-lg font-sans text-xs font-bold uppercase tracking-[0.14em] transition-colors shadow-sm group"
                >
                  <span>EXPLORE DISCOVERY SET</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </RouterLink>
              </div>

            </div>

          </div>

        </div>
      </MainContainer>
    </section>
  );
}
