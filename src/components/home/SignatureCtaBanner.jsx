import React from 'react';
import { Sparkles } from 'lucide-react';
import MainContainer from '../ui/MainContainer';

/**
 * SignatureCtaBanner Component
 * Compact CTA placed immediately after Shop by Occasion and before Most Loved.
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
    <section className="py-2.5 sm:py-3 bg-[#163E49] text-[#F5F1EA]">
      <MainContainer>
        <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.18)] rounded-xl px-4 py-2.5 sm:px-6 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-full bg-[#102F38] border border-[rgba(243,235,221,0.15)] flex items-center justify-center shrink-0 hidden sm:flex">
              <Sparkles className="w-4 h-4 text-[#F5F1EA]" />
            </div>
            <div>
              <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-[#F5F1EA]">
                NOT SURE WHICH SCENT IS YOURS?
              </span>
            </div>
          </div>

          <a
            href="#scent-finder"
            onClick={scrollToFinder}
            className="inline-flex items-center justify-center gap-2 bg-[#7A2929] hover:bg-[#8C3232] text-[#F5F1EA] px-5 py-2.5 rounded-lg font-sans text-xs font-bold uppercase tracking-[0.14em] transition-colors shrink-0 shadow-xs w-full sm:w-auto text-center"
          >
            <span>FIND YOUR SIGNATURE SCENT →</span>
          </a>
        </div>
      </MainContainer>
    </section>
  );
}
