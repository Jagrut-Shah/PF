import React from 'react';
import { Link } from 'react-router-dom';
import MainContainer from '../ui/MainContainer';
import { Layers, ArrowRight } from 'lucide-react';

// Preset duos matching the 3 curated paths
const BUNDLE_PRESETS = [
  {
    id: 'date-night',
    title: 'DATE NIGHT DUO',
    subtitle: '2 × 60ML',
    description: 'A seductive combination for evenings and nights out.',
    badge: 'EVENING & SEDUCTIVE',
    accentColor: '#6E2945',
  },
  {
    id: 'everyday-office',
    title: 'EVERYDAY + OFFICE',
    subtitle: '2 × 60ML',
    description: 'One effortless everyday scent + one sharper scent for work.',
    badge: 'EFFORTLESS & SHARP',
    accentColor: '#C94F70',
  },
  {
    id: 'gift-duo',
    title: 'GIFT DUO',
    subtitle: '2 × 60ML',
    description: 'Two fragrances selected as a memorable gift.',
    badge: 'MEMORABLE GIFT',
    accentColor: '#C94F70',
  },
];

/**
 * SCENT WARDROBE: Return to Deep Plum / Burgundy (#241326 / #3A1729)
 */
export default function ScentWardrobeBundle() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#241326] via-[#3A1729] to-[#241326] text-[#FFF8F7] border-t border-b border-[rgba(217,138,155,0.15)]">
      <MainContainer>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3A1729] border border-[rgba(217,138,155,0.25)] text-[#C94F70] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-[#C94F70]" />
            <span>FRAGRANCE CURATION</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#FFF8F7]">
            BUILD YOUR SCENT WARDROBE
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#D98A9B] mt-2">
            Different moments deserve different scents.
          </p>
        </div>

        {/* 3 Curated Bundle Preset Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {BUNDLE_PRESETS.map((preset) => (
            <Link
              key={preset.id}
              to={`/wardrobe/${preset.id}`}
              className="p-6 rounded-2xl border border-[rgba(217,138,155,0.20)] bg-[#241326] hover:border-[#C94F70]/60 transition-all cursor-pointer flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded bg-[#3A1729] text-[#C94F70] border border-[rgba(217,138,155,0.20)]">
                    {preset.badge}
                  </span>
                  <span className="text-xs font-bold text-[#D98A9B]">{preset.subtitle}</span>
                </div>
                <h3 className="font-serif text-xl font-bold uppercase tracking-wide text-[#FFF8F7] group-hover:text-[#C94F70] transition-colors">
                  {preset.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#D98A9B] mt-2 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              {/* Single Arrow CTA */}
              <div className="mt-6 pt-4 border-t border-[rgba(217,138,155,0.15)] flex items-center justify-between text-xs font-bold text-[#C94F70]">
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
