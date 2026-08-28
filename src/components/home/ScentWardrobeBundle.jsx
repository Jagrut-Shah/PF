import React from 'react';
import { Link } from 'react-router-dom';
import MainContainer from '../ui/MainContainer';
import { Layers, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

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

/**
 * ScentWardrobeBundle Component — CHERRY-FORWARD TREATMENT:
 * Deep Cherry #4A1019 background with Primary Cherry #7F1D2D cards.
 */
export default function ScentWardrobeBundle() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-10 sm:py-14 bg-[#4A1019] text-[#FAF6EF] border-t border-b border-[#7F1D2D] relative overflow-hidden">
      <MainContainer>
        <div ref={ref} className={`reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7F1D2D]/60 border border-[#F3E8D8]/20 text-[#F3E8D8] text-[11px] sm:text-[12px] font-manrope font-semibold tracking-[0.09em] uppercase mb-3 shadow-xs">
              <Layers className="w-3.5 h-3.5 text-[#F3E8D8]" />
              <span>Fragrance Curation</span>
            </div>
            <h2 className="font-bodoni text-[26px] sm:text-[34px] lg:text-[40px] font-medium text-[#FAF6EF] tracking-[-0.015em] leading-[1.05]">
              Build Your Scent Wardrobe
            </h2>
            <p className="font-manrope text-[14px] sm:text-[16px] text-[#F3E8D8]/70 mt-2 font-normal leading-[1.4]">
              Different moments deserve different fragrance signatures.
            </p>
          </div>

          {/* 3 Curated Bundle Preset Cards — Primary Cherry surface on Deep Cherry */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {BUNDLE_PRESETS.map((preset, idx) => (
              <Link
                key={preset.id}
                to={`/wardrobe/${preset.id}`}
                className={`p-5 lg:p-6 rounded-2xl border border-[#F3E8D8]/10 bg-[#7F1D2D] text-[#FAF6EF] hover:border-[#F3E8D8]/40 active:scale-[0.98] transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-md hover:shadow-xl hover:-translate-y-1 relative overflow-hidden card-hover-interactive reveal-init ${
                  isVisible ? `reveal-visible stagger-${idx + 1}` : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-manrope font-bold uppercase tracking-[0.09em] px-2.5 py-1 rounded bg-[#4A1019] text-[#F3E8D8]">
                      {preset.badge}
                    </span>
                    <span className="text-[12px] font-manrope font-semibold text-[#F3E8D8]/70">{preset.subtitle}</span>
                  </div>
                  <h3 className="font-bodoni text-[18px] sm:text-[20px] font-medium text-[#FAF6EF] group-hover:text-[#F3E8D8] transition-colors leading-snug">
                    {preset.title}
                  </h3>
                  <p className="font-manrope text-[13px] text-[#F3E8D8]/70 mt-1.5 leading-[1.5] font-normal">
                    {preset.description}
                  </p>
                </div>

                {/* Action Link */}
                <div className="mt-5 pt-3 border-t border-[#F3E8D8]/20 flex items-center justify-between text-[13px] font-manrope font-semibold tracking-[0.01em] text-[#FAF6EF] group-hover:text-[#F3E8D8] transition-colors">
                  <span>Explore Duo</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform text-[#F3E8D8]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
