import React from 'react';
import { Sparkles } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * SignatureCtaBanner Component — Light Luxury Palette:
 * Cream #EEE8DD surface, Deep Espresso #201C19 text, Deep Burgundy #721C24 CTA.
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
    <section className="py-2.5 sm:py-3 bg-[#F6F2EA] text-[#201C19]">
      <MainContainer>
        <div
          ref={ref}
          className={`max-w-5xl mx-auto bg-[#EEE8DD] border border-[#D9D1C6] rounded-xl px-4 py-3 sm:px-6 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs reveal-init ${
            isVisible ? 'reveal-visible' : ''
          }`}
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-full bg-[#E5DCCF] border border-[#D9D1C6] flex items-center justify-center shrink-0 hidden sm:flex shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#721C24]" />
            </div>
            <div>
              <span className="font-bodoni text-[16px] sm:text-[19px] font-medium tracking-[-0.01em] text-[#201C19]">
                Not sure which scent is yours?
              </span>
            </div>
          </div>

          <a
            href="#scent-finder"
            onClick={scrollToFinder}
            className="inline-flex items-center justify-center gap-1.5 bg-[#721C24] hover:bg-[#5A161C] active:scale-[0.98] text-[#F6F2EA] px-5 py-2 sm:py-2.5 rounded-lg font-manrope text-[14px] font-semibold transition-all duration-200 shrink-0 shadow-sm w-full sm:w-auto text-center btn-interactive"
          >
            <span>Find Your Signature Scent →</span>
          </a>
        </div>
      </MainContainer>
    </section>
  );
}
