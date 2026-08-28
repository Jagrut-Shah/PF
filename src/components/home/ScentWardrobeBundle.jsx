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
 * ScentWardrobeBundle Component — Light Luxury Perfume Aesthetic:
 * Secondary Cream #EEE8DD background, Warm Ivory #F6F2EA cards with subtle borders and soft shadows.
 */
export default function ScentWardrobeBundle() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-12 sm:py-16 bg-[#EEE8DD] text-[#201C19] border-t border-b border-[#D9D1C6] relative overflow-hidden">
      <MainContainer>
        <div ref={ref} className={`reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5DCCF] border border-[#D9D1C6] text-[#721C24] text-[12px] font-manrope font-semibold tracking-[0.09em] uppercase mb-3 shadow-xs">
              <Layers className="w-3.5 h-3.5 text-[#721C24]" />
              <span>Fragrance Curation</span>
            </div>
            <h2 className="font-bodoni text-[28px] sm:text-[36px] lg:text-[44px] font-medium text-[#201C19] tracking-[-0.015em] leading-[1.05]">
              Build Your Scent Wardrobe
            </h2>
            <p className="font-manrope text-[17px] sm:text-[18px] text-[#625C55] mt-2 font-medium leading-[1.4]">
              Different moments deserve different fragrance signatures.
            </p>
          </div>

          {/* 3 Curated Bundle Preset Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {BUNDLE_PRESETS.map((preset, idx) => (
              <Link
                key={preset.id}
                to={`/wardrobe/${preset.id}`}
                className={`p-6 rounded-2xl border border-[#D9D1C6] bg-[#F6F2EA] hover:border-[#721C24]/50 active:scale-[0.98] transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-[0_10px_28px_rgba(60,45,30,0.08)] hover:-translate-y-1 relative overflow-hidden card-hover-interactive reveal-init ${
                  isVisible ? `reveal-visible stagger-${idx + 1}` : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-manrope font-semibold uppercase tracking-[0.09em] px-2.5 py-1 rounded bg-[#E5DCCF] border border-[#D9D1C6] text-[#721C24]">
                      {preset.badge}
                    </span>
                    <span className="text-[13px] font-manrope font-semibold text-[#625C55]">{preset.subtitle}</span>
                  </div>
                  <h3 className="font-bodoni text-[20px] sm:text-[22px] font-medium text-[#201C19] group-hover:text-[#721C24] transition-colors leading-snug">
                    {preset.title}
                  </h3>
                  <p className="font-manrope text-[14px] text-[#625C55] mt-2 leading-[1.6] font-normal">
                    {preset.description}
                  </p>
                </div>

                {/* Action Link */}
                <div className="mt-6 pt-4 border-t border-[#D9D1C6]/70 flex items-center justify-between text-[14px] font-manrope font-semibold tracking-[0.01em] text-[#201C19] group-hover:text-[#721C24] transition-colors">
                  <span>Explore Duo</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
