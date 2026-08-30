import React from 'react';
import { Sparkles } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * SignatureCtaBanner Component — CHERRY BRAND MOMENT:
 * Primary surface: #8B1E2D (Cherry), Text: Warm White / Cream, CTA: Cream with Cherry text.
 * Section background: Cream #F4EBDD for seamless section flow.
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
    <section className="py-2.5 sm:py-3.5 bg-[#F4EBDD] text-[#2A211F]">
      <MainContainer>
        <div
          ref={ref}
          className={`max-w-5xl mx-auto bg-[#8B1E2D] border border-[#64141F] rounded-xl px-4 py-3 sm:px-6 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md reveal-init ${
            isVisible ? 'reveal-visible' : ''
          }`}
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-full bg-[#64141F] border border-[#F4EBDD]/20 flex items-center justify-center shrink-0 hidden sm:flex shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#F4EBDD]" />
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
            className="inline-flex items-center justify-center gap-1.5 bg-[#F4EBDD] hover:bg-[#FBF8F2] active:scale-[0.98] text-[#8B1E2D] px-5 py-2 sm:py-2.5 rounded-lg font-manrope text-[14px] font-bold transition-all duration-200 shrink-0 shadow-sm w-full sm:w-auto text-center btn-interactive"
          >
            <span>Find Your Signature Scent →</span>
          </a>
        </div>
      </MainContainer>
    </section>
  );
}
