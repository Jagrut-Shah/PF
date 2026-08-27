import React from 'react';
import { Sparkles } from 'lucide-react';
import MainContainer from '../ui/MainContainer';

/**
 * SignatureCtaBanner Component — Bodoni Moda 400 Title + Manrope 600 CTA Button
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
    <section className="py-2.5 sm:py-3 bg-[#2A0D14] text-[#F6EFE7]">
      <MainContainer>
        <div className="bg-[#641D2D] border border-[#E7C4C5]/20 rounded-xl px-4 py-3 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-full bg-[#2A0D14] border border-[#E7C4C5]/20 flex items-center justify-center shrink-0 hidden sm:flex">
              <Sparkles className="w-4 h-4 text-[#E7C4C5]" />
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-normal tracking-wide text-[#F6EFE7]">
                Not sure which scent is yours?
              </span>
            </div>
          </div>

          <a
            href="#scent-finder"
            onClick={scrollToFinder}
            className="inline-flex items-center justify-center gap-2 bg-[#C94B5B] hover:bg-[#B03D4C] text-[#F6EFE7] px-6 py-2.5 rounded-xl font-sans text-xs sm:text-[13px] font-semibold tracking-[0.08em] uppercase transition-colors shrink-0 shadow-xs w-full sm:w-auto text-center"
          >
            <span>Find Your Signature Scent →</span>
          </a>
        </div>
      </MainContainer>
    </section>
  );
}
