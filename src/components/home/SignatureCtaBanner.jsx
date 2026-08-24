import React from 'react';
import { Sparkles } from 'lucide-react';
import MainContainer from '../ui/MainContainer';

/**
 * SignatureCtaBanner Component
 * Burgundy Environment (#3A1729) with Cherry (#C94F70) CTA
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
    <section className="py-2.5 sm:py-3 bg-[#3A1729] text-[#FFF8F7] border-b border-[rgba(217,138,155,0.12)]">
      <MainContainer>
        <div className="bg-[#241326] border border-[rgba(217,138,155,0.20)] rounded-xl px-4 py-2.5 sm:px-6 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-full bg-[#3A1729] border border-[rgba(217,138,155,0.25)] flex items-center justify-center shrink-0 hidden sm:flex">
              <Sparkles className="w-4 h-4 text-[#C94F70]" />
            </div>
            <div>
              <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-[#FFF8F7]">
                NOT SURE WHICH SCENT IS YOURS?
              </span>
            </div>
          </div>

          <a
            href="#scent-finder"
            onClick={scrollToFinder}
            className="group inline-flex items-center justify-center gap-2 bg-[#C94F70] hover:bg-[#E96885] active:bg-[#B83F5D] text-white px-5 py-2.5 rounded-lg font-sans text-xs font-bold uppercase tracking-[0.14em] transition-colors shrink-0 shadow-xs w-full sm:w-auto text-center"
          >
            <span>FIND YOUR SIGNATURE SCENT</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </MainContainer>
    </section>
  );
}
