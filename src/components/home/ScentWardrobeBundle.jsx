import React from 'react';
import { Link } from 'react-router-dom';
import MainContainer from '../ui/MainContainer';
import { Layers, ArrowRight } from 'lucide-react';

const BUNDLE_PRESETS = [
  {
    id: 'date-night',
    title: 'DATE NIGHT DUO',
    subtitle: '2 × 60ML',
    description: 'A seductive combination for evenings and nights out.',
    badge: 'EVENING & SEDUCTIVE',
  },
  {
    id: 'everyday-office',
    title: 'EVERYDAY + OFFICE',
    subtitle: '2 × 60ML',
    description: 'One effortless everyday scent + one sharper scent for work.',
    badge: 'EFFORTLESS & SHARP',
  },
  {
    id: 'gift-duo',
    title: 'GIFT DUO',
    subtitle: '2 × 60ML',
    description: 'Two fragrances selected as a memorable gift.',
    badge: 'MEMORABLE GIFT',
  },
];

export default function ScentWardrobeBundle() {
  return (
    <section className="py-12 sm:py-16 bg-[#102A4C] text-[#F7F3EC] border-b border-white/10">
      <MainContainer>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#08111F] border border-white/10 text-[#5F8CFF] text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-[#5F8CFF]" />
            <span>DUO BUNDLE CURATION</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-wide text-[#F7F3EC]">
            BUILD YOUR <span className="italic text-[#5F8CFF]">SCENT WARDROBE</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#F7F3EC]/75 mt-2">
            Different moments deserve different scents. Save ₹399 when bundling two 60 ML signatures.
          </p>
        </div>

        {/* 3 Curated Bundle Preset Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
          {BUNDLE_PRESETS.map((preset) => (
            <Link
              key={preset.id}
              to={`/wardrobe/${preset.id}`}
              className="p-6 sm:p-7 rounded-2xl border border-white/15 bg-[#08111F] hover:border-[#285BE6] transition-all cursor-pointer flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest px-2.5 py-1 rounded bg-[#285BE6]/20 text-[#5F8CFF] border border-[#5F8CFF]/30">
                    {preset.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#F7F3EC]/70">{preset.subtitle}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-light uppercase tracking-wide text-[#F7F3EC] group-hover:text-[#5F8CFF] transition-colors">
                  {preset.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#F7F3EC]/70 mt-2 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              {/* Single Arrow CTA */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#5F8CFF] group-hover:text-white transition-colors">
                <span>EXPLORE DUO</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
