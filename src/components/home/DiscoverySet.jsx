import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import MainContainer from '../ui/MainContainer';

/**
 * DiscoverySet Component ("TRY BEFORE YOU BUY")
 */
export default function DiscoverySet() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#102F38] text-[#F3EBDD] border-y border-[rgba(243,235,221,0.12)]">
      <MainContainer>
        <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden shadow-xl">
          {/* Subtle Decorative Background Element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A15A]/[0.04] rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Image / Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[rgba(243,235,221,0.15)] shadow-lg bg-[#163E49]">
                <img
                  src="/images/products/row-1-column-1.png"
                  alt="ÉLAVA Discovery Set Collection"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#7A2929] text-[#F3EBDD] text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1 rounded shadow-xs">
                  DISCOVERY EXPERIENCE
                </div>
              </div>
            </div>

            {/* Right Column: Information & Conversion CTAs */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#163E49] border border-[rgba(243,235,221,0.15)] text-xs font-sans tracking-[0.16em] uppercase text-[#C5A15A]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TRY BEFORE YOU COMMIT</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal uppercase tracking-[0.06em] text-[#F3EBDD] leading-tight">
                FIND YOUR SIGNATURE <span className="italic text-[#C5A15A]">BEFORE THE FULL BOTTLE</span>
              </h2>

              <p className="font-sans text-xs sm:text-sm text-[#C8C1B5] leading-relaxed">
                Not sure which scent suits you best? Experience ÉLAVA's handcrafted Eau de Parfum signatures at home before picking your full 60 ML bottle.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#F3EBDD]">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A15A] shrink-0" />
                  <span>Curated 60 ML Eau de Parfum collection across Men, Women & Unisex</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#F3EBDD]">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A15A] shrink-0" />
                  <span>Detailed scent profiles with Top, Heart & Base fragrance notes</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#F3EBDD]">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A15A] shrink-0" />
                  <span>Tracked delivery & direct WhatsApp consultation for recommendations</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <RouterLink
                  to="/category/bestsellers"
                  className="inline-flex items-center gap-2 bg-[#7A2929] hover:bg-[#8C3232] text-[#F3EBDD] px-6 py-3 rounded-lg font-sans text-xs font-bold uppercase tracking-[0.16em] transition-colors shadow-sm"
                >
                  <span>EXPLORE BESTSELLERS</span>
                  <ArrowRight className="w-4 h-4" />
                </RouterLink>
                <RouterLink
                  to="/category/unisex"
                  className="inline-flex items-center gap-2 bg-[#163E49] hover:bg-[#205260] text-[#F3EBDD] border border-[rgba(243,235,221,0.2)] px-6 py-3 rounded-lg font-sans text-xs font-semibold uppercase tracking-[0.14em] transition-colors"
                >
                  <span>VIEW ALL SIGNATURES</span>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
