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
    accentColor: '#7F1830',
  },
  {
    id: 'everyday-office',
    title: 'EVERYDAY + OFFICE',
    subtitle: '2 × 60ML',
    description: 'One effortless everyday scent + one sharper scent for work.',
    badge: 'EFFORTLESS & SHARP',
    accentColor: '#D62F4F',
  },
  {
    id: 'gift-duo',
    title: 'GIFT DUO',
    subtitle: '2 × 60ML',
    description: 'Two fragrances selected as a memorable gift.',
    badge: 'MEMORABLE GIFT',
    accentColor: '#D62F4F',
  },
];

export default function ScentWardrobeBundle() {
  return (
    <section className="py-12 sm:py-16 bg-[#0A0A0C] text-[#F1EEF2] border-t border-b border-[rgba(241,238,242,0.10)]">
      <MainContainer>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111116] border border-[rgba(241,238,242,0.12)] text-[#D62F4F] text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-[#D62F4F]" />
            <span>FRAGRANCE CURATION</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#F1EEF2]">
            BUILD YOUR SCENT WARDROBE
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#A7A3AA] mt-2">
            Different moments deserve different scents.
          </p>
        </div>

        {/* 3 Curated Bundle Preset Cards — Click opens dedicated landing page */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {BUNDLE_PRESETS.map((preset) => (
            <Link
              key={preset.id}
              to={`/wardrobe/${preset.id}`}
              className="p-6 rounded-2xl border border-[rgba(241,238,242,0.10)] bg-[#18181E] hover:border-[#D62F4F]/50 transition-all cursor-pointer flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded bg-[#111116] text-[#D62F4F] border border-[rgba(241,238,242,0.12)]">
                    {preset.badge}
                  </span>
                  <span className="text-xs font-bold text-[#A7A3AA]">{preset.subtitle}</span>
                </div>
                <h3 className="font-serif text-xl font-bold uppercase tracking-wide text-[#F1EEF2] group-hover:text-[#D62F4F] transition-colors">
                  {preset.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#A7A3AA] mt-2 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              {/* Single Arrow CTA */}
              <div className="mt-6 pt-4 border-t border-[rgba(241,238,242,0.10)] flex items-center justify-between text-xs font-bold text-[#D62F4F]">
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
