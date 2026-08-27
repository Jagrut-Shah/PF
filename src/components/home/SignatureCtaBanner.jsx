import React from 'react';
import { Sparkles } from 'lucide-react';
import MainContainer from '../ui/MainContainer';

/**
 * SignatureCtaBanner Component — Compact CTA Banner with Italic Serif Title & Sleek Micro Button
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
    <section className="py-1.5 sm:py-2 bg-[#2A0D14] text-[#F6EFE7]">
      <MainContainer>
        <div className="max-w-5xl mx-auto bg-[#641D2D] border border-[#E7C4C5]/20 rounded-lg px-3.5 py-2 sm:px-5 sm:py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 shadow-sm">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <div className="w-7 h-7 rounded-full bg-[#0D0A0C] border border-[#E7C4C5]/20 flex items-center justify-center shrink-0 hidden sm:flex shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#E7C4C5]" />
            </div>
            <div>
              <span className="font-serif italic text-base sm:text-[17px] font-normal tracking-wide text-[#F6EFE7]">
                Not sure which scent is yours?
              </span>
            </div>
          </div>

          <a
            href="#scent-finder"
            onClick={scrollToFinder}
            className="inline-flex items-center justify-center gap-1.5 bg-[#C94B5B] hover:bg-[#B03D4C] active:scale-[0.98] text-[#F6EFE7] px-4 py-1.5 sm:py-2 rounded-lg font-sans text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-200 shrink-0 shadow-xs w-full sm:w-auto text-center"
          >
            <span>Find Your Signature Scent →</span>
          </a>
        </div>
      </MainContainer>
    </section>
  );
}
