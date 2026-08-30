import React from 'react';
import { Sparkles } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * SignatureCtaBanner Component — CHERRY & GOLD MOMENT:
 * Inner Banner: Deep Cherry #64141F, CTA: Gold #C6A15B with Black text.
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
    <section className="py-2.5 sm:py-3.5 bg-[#120E0D] text-[#F4EBDD]">
      <MainContainer>
        <div
          ref={ref}
          className={`max-w-5xl mx-auto bg-[#64141F] border border-[#C6A15B]/30 rounded-xl px-4 py-3 sm:px-6 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md reveal-init ${
            isVisible ? 'reveal-visible' : ''
          }`}
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-full bg-[#8B1E2D] border border-[#C6A15B]/40 flex items-center justify-center shrink-0 hidden sm:flex shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
            </div>
            <div>
              <span className="font-bodoni text-[16px] sm:text-[19px] font-medium tracking-[-0.01em] text-[#F4EBDD]">
                Not sure which scent is yours?
              </span>
            </div>
          </div>

          <a
            href="#scent-finder"
            onClick={scrollToFinder}
            className="inline-flex items-center justify-center gap-1.5 bg-[#C6A15B] hover:bg-[#DFBD75] active:scale-[0.98] text-[#120E0D] px-5 py-2 sm:py-2.5 rounded-lg font-manrope text-[14px] font-bold transition-all duration-200 shrink-0 shadow-sm w-full sm:w-auto text-center btn-interactive"
          >
            <span>Find Your Signature Scent →</span>
          </a>
        </div>
      </MainContainer>
    </section>
  );
}
