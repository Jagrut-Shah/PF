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
 * Deep Cherry #64141F background with Warm White/Cream cards.
 */
export default function ScentWardrobeBundle() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-10 sm:py-14 bg-[#64141F] text-[#FBF8F2] border-t border-b border-[#8B1E2D] relative overflow-hidden">
      <MainContainer>
        <div ref={ref} className={`reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B1E2D]/60 border border-[#F4EBDD]/20 text-[#F4EBDD] text-[11px] sm:text-[12px] font-manrope font-semibold tracking-[0.09em] uppercase mb-3 shadow-xs">
              <Layers className="w-3.5 h-3.5 text-[#F4EBDD]" />
              <span>Fragrance Curation</span>
            </div>
            <h2 className="font-bodoni text-[26px] sm:text-[34px] lg:text-[40px] font-medium text-[#FBF8F2] tracking-[-0.015em] leading-[1.05]">
              Build Your Scent Wardrobe
            </h2>
            <p className="font-manrope text-[14px] sm:text-[16px] text-[#F4EBDD]/70 mt-2 font-normal leading-[1.4]">
              Different moments deserve different fragrance signatures.
            </p>
          </div>

          {/* 3 Curated Bundle Preset Cards — Warm White surface on Deep Cherry */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {BUNDLE_PRESETS.map((preset, idx) => (
              <Link
                key={preset.id}
                to={`/wardrobe/${preset.id}`}
                className={`p-5 lg:p-6 rounded-2xl border border-[#D9C9B8]/40 bg-[#FBF8F2] text-[#2A211F] hover:border-[#F4EBDD] active:scale-[0.98] transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-md hover:shadow-xl hover:-translate-y-1 relative overflow-hidden card-hover-interactive reveal-init ${
                  isVisible ? `reveal-visible stagger-${idx + 1}` : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-manrope font-bold uppercase tracking-[0.09em] px-2.5 py-1 rounded bg-[#8B1E2D] text-[#FBF8F2]">
                      {preset.badge}
                    </span>
                    <span className="text-[12px] font-manrope font-semibold text-[#A89A8B]">{preset.subtitle}</span>
                  </div>
                  <h3 className="font-bodoni text-[18px] sm:text-[20px] font-medium text-[#2A211F] group-hover:text-[#8B1E2D] transition-colors leading-snug">
                    {preset.title}
                  </h3>
                  <p className="font-manrope text-[13px] text-[#A89A8B] mt-1.5 leading-[1.5] font-normal">
                    {preset.description}
                  </p>
                </div>

                {/* Action Link */}
                <div className="mt-5 pt-3 border-t border-[#D9C9B8]/50 flex items-center justify-between text-[13px] font-manrope font-semibold tracking-[0.01em] text-[#2A211F] group-hover:text-[#8B1E2D] transition-colors">
                  <span>Explore Duo</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform text-[#8B1E2D]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
