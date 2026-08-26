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
    <section className="py-4 sm:py-6 bg-[#102A4C] text-[#F7F3EC]">
      <MainContainer>
        <div className="bg-[#08111F] border border-white/10 rounded-2xl px-5 py-4 sm:px-8 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-9 h-9 rounded-full bg-[#285BE6]/20 border border-[#5F8CFF]/30 flex items-center justify-center shrink-0 hidden sm:flex">
              <Sparkles className="w-4 h-4 text-[#5F8CFF]" />
            </div>
            <div>
              <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-[#F7F3EC]">
                NOT SURE WHICH SCENT FITS YOUR VIBE?
              </span>
              <p className="text-[11px] text-[#F7F3EC]/70 mt-0.5 hidden sm:block">
                Take our 30-second fragrance match quiz.
              </p>
            </div>
          </div>

          <a
            href="#scent-finder"
            onClick={scrollToFinder}
            className="inline-flex items-center justify-center gap-2 bg-[#285BE6] hover:bg-[#1E48B8] text-white px-6 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-[0.16em] transition-all duration-200 shrink-0 shadow-md w-full sm:w-auto text-center cursor-pointer"
          >
            <span>FIND YOUR SIGNATURE SCENT →</span>
          </a>
        </div>
      </MainContainer>
    </section>
  );
}
