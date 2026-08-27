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
 * ScentWardrobeBundle Component — Black & Red Luxury Aesthetic:
 * Deep Black #0B0B0B environment with staggered scroll reveal and card hover elevation.
 */
export default function ScentWardrobeBundle() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-12 sm:py-16 bg-[#0B0B0B] text-[#F5F2EE] border-t border-b border-white/10 relative overflow-hidden">
      <MainContainer>
        <div ref={ref} className={`reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8F1018] border border-white/15 text-[#F5F2EE] text-xs font-sans font-semibold tracking-widest uppercase mb-3 shadow-md">
              <Layers className="w-3.5 h-3.5 text-[#F5F2EE]" />
              <span>Fragrance Curation</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F5F2EE] tracking-tight leading-tight">
              Build Your Scent Wardrobe
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#B8B3AF] mt-2 font-normal leading-relaxed">
              Different moments deserve different fragrance signatures.
            </p>
          </div>

          {/* 3 Curated Bundle Preset Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {BUNDLE_PRESETS.map((preset, idx) => (
              <Link
                key={preset.id}
                to={`/wardrobe/${preset.id}`}
                className={`p-6 rounded-2xl border border-white/10 bg-[#121212] hover:border-[#B4171E]/60 active:scale-[0.98] transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-md hover:shadow-xl hover:-translate-y-1 relative overflow-hidden card-hover-interactive reveal-init ${
                  isVisible ? `reveal-visible stagger-${idx + 1}` : ''
                }`}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8F1018] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#8F1018]/40 border border-[#B4171E]/40 text-[#F5F2EE]">
                      {preset.badge}
                    </span>
                    <span className="text-xs font-sans font-bold text-[#B8B3AF]">{preset.subtitle}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-[#F5F2EE] group-hover:text-[#B4171E] transition-colors leading-snug">
                    {preset.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#B8B3AF] mt-2 leading-relaxed font-normal">
                    {preset.description}
                  </p>
                </div>

                {/* Action Link */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-sans font-bold tracking-wider text-[#F5F2EE] group-hover:text-[#B4171E] transition-colors">
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
