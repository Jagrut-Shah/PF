import React from 'react';
import { Sparkles } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * SignatureCtaBanner Component — BLUE & VERY DARK CREAM MOMENT:
 * Inner Banner: Deep Royal Navy #06215A, CTA: Very Dark Cream #DAC29F with Blue text.
 * Section background: Black #120E0D.
 */
export default function SignatureCtaBanner() {
  const [ref, isVisible] = useScrollReveal();

  const scrollToFinder = (e) => {
    e.preventDefault();
    const el = document.getElementById('scent-finder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-2.5 sm:py-3.5 bg-[#120E0D] text-[#DAC29F]">
      <MainContainer>
        <div
          ref={ref}
          className={`max-w-5xl mx-auto bg-[#06215A] border border-[#DAC29F]/25 rounded-xl px-4 py-3 sm:px-6 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md reveal-init ${
            isVisible ? 'reveal-visible' : ''
          }`}
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-full bg-[#0A3282] border border-[#DAC29F]/30 flex items-center justify-center shrink-0 hidden sm:flex shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#DAC29F]" />
            </div>
            <div>
              <span className="font-bodoni text-[16px] sm:text-[19px] font-medium tracking-[-0.01em] text-[#DAC29F]">
                Not sure which scent is yours?
              </span>
            </div>
          </div>

          <a
            href="#scent-finder"
            onClick={scrollToFinder}
            className="inline-flex items-center justify-center gap-1.5 bg-[#DAC29F] hover:bg-[#E5D7C3] active:scale-[0.98] text-[#0A3282] px-5 py-2 sm:py-2.5 rounded-lg font-manrope text-[14px] font-bold transition-all duration-200 shrink-0 shadow-sm w-full sm:w-auto text-center btn-interactive"
          >
            <span>Find Your Signature Scent →</span>
          </a>
        </div>
      </MainContainer>
    </section>
  );
}
