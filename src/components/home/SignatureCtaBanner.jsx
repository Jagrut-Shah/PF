import React from 'react';
import { Sparkles } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * SignatureCtaBanner Component — Sora 600 Headline + Manrope 600 CTA
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
    <section className="py-2 sm:py-2.5 bg-[#0B0B0B] text-[#F5F2EE]">
      <MainContainer>
        <div
          ref={ref}
          className={`max-w-5xl mx-auto bg-[#8F1018] border border-white/15 rounded-lg px-4 py-2.5 sm:px-6 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg reveal-init ${
            isVisible ? 'reveal-visible' : ''
          }`}
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-7 h-7 rounded-full bg-[#080808] border border-white/10 flex items-center justify-center shrink-0 hidden sm:flex shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#F5F2EE]" />
            </div>
            <div>
              <span className="font-sora text-[16px] sm:text-[18px] font-semibold tracking-[-0.015em] text-[#F5F2EE]">
                Not sure which scent is yours?
              </span>
            </div>
          </div>

          <a
            href="#scent-finder"
            onClick={scrollToFinder}
            className="inline-flex items-center justify-center gap-1.5 bg-[#080808] hover:bg-[#121212] active:scale-[0.98] text-[#F5F2EE] hover:text-[#B4171E] border border-white/20 px-5 py-2 sm:py-2.5 rounded-lg font-manrope text-[14px] font-semibold transition-all duration-200 shrink-0 shadow-md w-full sm:w-auto text-center btn-interactive"
          >
            <span>Find Your Signature Scent →</span>
          </a>
        </div>
      </MainContainer>
    </section>
  );
}

