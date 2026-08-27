import React from 'react';
import { Sparkles } from 'lucide-react';
import MainContainer from '../ui/MainContainer';

/**
 * SignatureCtaBanner Component — Variant C: Dark Espresso #241817 environment + Dark Coffee #33211E banner + Deep Cherry #2A0D14 CTA
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
    <section className="py-1.5 sm:py-2 bg-[#241817] text-[#F1E4D2]">
      <MainContainer>
        <div className="max-w-5xl mx-auto bg-[#33211E] border border-[#CDBBAA]/20 rounded-lg px-3.5 py-2 sm:px-5 sm:py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 shadow-sm">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <div className="w-7 h-7 rounded-full bg-[#0D0A0C] border border-[#CDBBAA]/20 flex items-center justify-center shrink-0 hidden sm:flex shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D9B8B7]" />
            </div>
            <div>
              <span className="font-serif italic text-base sm:text-[17px] font-normal tracking-wide text-[#F1E4D2]">
                Not sure which scent is yours?
              </span>
            </div>
          </div>

          <a
            href="#scent-finder"
            onClick={scrollToFinder}
            className="inline-flex items-center justify-center gap-1.5 bg-[#2A0D14] hover:bg-[#3D141E] active:scale-[0.98] text-[#F1E4D2] border border-[#D9B8B7]/30 px-4 py-1.5 sm:py-2 rounded-lg font-serif italic text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 shrink-0 shadow-xs w-full sm:w-auto text-center"
          >
            <span>Find Your Signature Scent →</span>
          </a>
        </div>
      </MainContainer>
    </section>
  );
}
