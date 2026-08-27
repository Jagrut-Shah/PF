import React from 'react';
import { Link } from 'react-router-dom';
import MainContainer from '../ui/MainContainer';
import { Layers, ArrowRight } from 'lucide-react';

const BUNDLE_PRESETS = [
  {
    id: 'date-night',
    title: 'Date Night Duo',
    subtitle: '2 × 60ml',
    description: 'A seductive combination for evenings and memorable nights out.',
    badge: 'EVENING & SEDUCTIVE',
  },
  {
    id: 'everyday-office',
    title: 'Everyday + Office',
    subtitle: '2 × 60ml',
    description: 'One effortless everyday scent + one sharper signature for work.',
    badge: 'EFFORTLESS & SHARP',
  },
  {
    id: 'gift-duo',
    title: 'Gift Duo',
    subtitle: '2 × 60ml',
    description: 'Two fragrances thoughtfully selected as an unforgettable gift.',
    badge: 'MEMORABLE GIFT',
  },
];

export default function ScentWardrobeBundle() {
  return (
    <section className="py-12 sm:py-16 bg-[#2A0D14] text-[#F3E9DD] border-t border-b border-[#E7C4C5]/15">
      <MainContainer>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#641D2D] border border-[#E7C4C5]/20 text-[#E7C4C5] text-xs font-sans font-semibold tracking-widest uppercase mb-3 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-[#E7C4C5]" />
            <span>Fragrance Curation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F3E9DD] tracking-tight leading-tight">
            Build Your Scent Wardrobe
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#E7C4C5]/85 mt-2 font-normal leading-relaxed">
            Different moments deserve different fragrance signatures.
          </p>
        </div>

        {/* 3 Curated Bundle Preset Cards — Variant B: Warm Ivory #F3E9DD Paper Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {BUNDLE_PRESETS.map((preset) => (
            <Link
              key={preset.id}
              to={`/wardrobe/${preset.id}`}
              className="p-6 rounded-2xl border border-[#641D2D]/25 bg-[#F3E9DD] hover:border-[#641D2D]/50 active:scale-[0.98] transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-md hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#0D0A0C] text-[#F3E9DD]">
                    {preset.badge}
                  </span>
                  <span className="text-xs font-sans font-bold text-[#641D2D]">{preset.subtitle}</span>
                </div>
                <h3 className="font-serif text-2xl font-normal text-[#2A0D14] group-hover:text-[#C94B5B] transition-colors leading-snug">
                  {preset.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#2A0D14]/80 mt-2 leading-relaxed font-normal">
                  {preset.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="mt-6 pt-4 border-t border-[#641D2D]/15 flex items-center justify-between text-xs font-sans font-bold tracking-wider text-[#641D2D] group-hover:text-[#C94B5B] transition-colors">
                <span>Explore Duo</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
