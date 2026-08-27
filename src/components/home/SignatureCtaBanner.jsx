import React from 'react';
import { Sparkles } from 'lucide-react';
import MainContainer from '../ui/MainContainer';

/**
 * SignatureCtaBanner Component — Black & Red Luxury Aesthetic:
 * Deep Black #0B0B0B environment, Soft Black #121212 banner, Signature Red #B4171E CTA button.
 */
export default function SignatureCtaBanner() {
  const scrollToFinder = (e) => {
    e.preventDefault();
    const el = document.getElementById('scent-finder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-1.5 sm:py-2 bg-[#0B0B0B] text-[#F5F2EE]">
      <MainContainer>
        <div className="max-w-5xl mx-auto bg-[#121212] border border-white/10 rounded-lg px-3.5 py-2 sm:px-5 sm:py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 shadow-sm">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <div className="w-7 h-7 rounded-full bg-[#080808] border border-white/10 flex items-center justify-center shrink-0 hidden sm:flex shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B4171E]" />
            </div>
            <div>
              <span className="font-serif italic text-base sm:text-[17px] font-normal tracking-wide text-[#F5F2EE]">
                Not sure which scent is yours?
              </span>
            </div>
          </div>

          <a
            href="#scent-finder"
            onClick={scrollToFinder}
            className="inline-flex items-center justify-center gap-1.5 bg-[#B4171E] hover:bg-[#7A0F15] active:scale-[0.98] text-[#F5F2EE] border border-white/10 px-4 py-1.5 sm:py-2 rounded-lg font-serif italic text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 shrink-0 shadow-xs w-full sm:w-auto text-center"
          >
            <span>Find Your Signature Scent →</span>
          </a>
        </div>
      </MainContainer>
    </section>
  );
}
