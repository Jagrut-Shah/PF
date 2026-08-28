import React from 'react';
import { Sparkles } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * SignatureCtaBanner Component — CHERRY BRAND MOMENT:
 * Primary surface: #4A1019 (Deep Cherry), Text: Warm White / Cream, CTA: Cream with Cherry text.
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
    <section className="py-2.5 sm:py-3 bg-[#7F1D2D] text-[#FAF6EF]">
      <MainContainer>
        <div
          ref={ref}
          className={`max-w-5xl mx-auto bg-[#4A1019] border border-[#7F1D2D] rounded-xl px-4 py-3 sm:px-6 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_4px_16px_rgba(74,16,25,0.3)] reveal-init ${
            isVisible ? 'reveal-visible' : ''
          }`}
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-full bg-[#7F1D2D] border border-[#F3E8D8]/20 flex items-center justify-center shrink-0 hidden sm:flex shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#F3E8D8]" />
            </div>
            <div>
              <span className="font-bodoni text-[16px] sm:text-[19px] font-medium tracking-[-0.01em] text-[#FBF8F2]">
                Not sure which scent is yours?
              </span>
            </div>
          </div>

          <a
            href="#scent-finder"
            onClick={scrollToFinder}
            className="inline-flex items-center justify-center gap-1.5 bg-[#F3E8D8] hover:bg-[#FAF6EF] active:scale-[0.98] text-[#4A1019] px-5 py-2 sm:py-2.5 rounded-lg font-manrope text-[14px] font-bold transition-all duration-200 shrink-0 shadow-sm w-full sm:w-auto text-center btn-interactive"
          >
            <span>Find Your Signature Scent →</span>
          </a>
        </div>
      </MainContainer>
    </section>
  );
}
