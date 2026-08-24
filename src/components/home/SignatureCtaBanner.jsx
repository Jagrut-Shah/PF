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
    <section className="py-2.5 sm:py-3 bg-[#0A0A0C] text-[#F1EEF2]">
      <MainContainer>
        <div className="bg-[#18181E] border border-[rgba(241,238,242,0.10)] rounded-xl px-4 py-2.5 sm:px-6 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-full bg-[#111116] border border-[rgba(241,238,242,0.12)] flex items-center justify-center shrink-0 hidden sm:flex">
              <Sparkles className="w-4 h-4 text-[#D62F4F]" />
            </div>
            <div>
              <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-[#F1EEF2]">
                NOT SURE WHICH SCENT IS YOURS?
              </span>
            </div>
          </div>

          <a
            href="#scent-finder"
            onClick={scrollToFinder}
            className="group inline-flex items-center justify-center gap-2 bg-[#D62F4F] hover:bg-[#F04463] active:bg-[#B92340] text-white px-5 py-2.5 rounded-lg font-sans text-xs font-bold uppercase tracking-[0.14em] transition-colors shrink-0 shadow-xs w-full sm:w-auto text-center"
          >
            <span>FIND YOUR SIGNATURE SCENT</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </MainContainer>
    </section>
  );
}
