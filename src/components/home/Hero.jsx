import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import MainContainer from '../ui/MainContainer';

/**
 * Hero Component — Black & Red Luxury Studio Atmosphere & Motion System:
 * Deep Black #0B0B0B environment with film grain texture, Level 3 diffuse ambient red studio spotlight,
 * subtle vignette overlay, and desktop micro-parallax mouse follow.
 */
export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
      setMousePos({ x, y });
    };

    const container = heroRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Desktop subtle parallax offsets (5-8px max for bottle, 2-4px max for light)
  const bottleTransform = `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`;
  const lightTransform = `translate3d(${mousePos.x * 6}px, ${mousePos.y * 6}px, 0)`;

  return (
    <section
      ref={heroRef}
      className="relative w-full bg-[#0B0B0B] text-[#F5F2EE] overflow-hidden border-b border-white/10 bg-grain-texture"
    >
      {/* Background Photography with Soft Dark Atmosphere & Diffuse Level 3 Red Studio Light */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img
          src="/images/products/row-1-column-1.png"
          alt="ÉLAVA Luxury Perfume Hero"
          className="w-full h-full object-cover object-center opacity-15 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#0B0B0B]/95 to-[#0B0B0B]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#080808]/50" />
        
        {/* Subtle Editorial Vignette Overlay */}
        <div className="absolute inset-0 bg-vignette-overlay" />

        {/* Level 3 Diffuse Deep-Red Ambient Light behind hero product with subtle mouse follow */}
        <div
          className="absolute inset-0 bg-ambient-hero transition-transform duration-300 ease-out"
          style={{ transform: lightTransform }}
        />
      </div>

      <MainContainer className="relative z-10 py-14 sm:py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7">
            {/* Section Label / Badge in Deep Red #8F1018 Surface */}
            <div className="animate-hero-eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8F1018]/60 border border-[#B4171E]/40 mb-6 text-[12px] sm:text-[13px] font-manrope font-semibold tracking-[0.09em] uppercase text-[#F5F2EE] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#F5F2EE]" />
              <span>60 ml Eau de Parfum Collection</span>
            </div>

            {/* Hero Display Headline — Bodoni Moda 500-600 (Desktop: 56-72px, Mobile: 38-48px, Line height: 0.98, Letter spacing: -0.02em) */}
            <h1 className="animate-hero-headline font-bodoni text-[38px] sm:text-[48px] md:text-[60px] lg:text-[72px] font-medium tracking-[-0.02em] text-[#F5F2EE] leading-[0.98] mb-6">
              Scents that become <span className="font-medium text-[#B8B3AF] italic">part of you.</span>
            </h1>

            {/* Hero Subheading — Manrope 500 (Desktop: 18-21px, Mobile: 17-19px, Line height: 1.4) */}
            <p className="animate-hero-subhead font-manrope text-[17px] sm:text-[19px] md:text-[21px] text-[#B8B3AF] font-medium leading-[1.4] mb-8 max-w-xl">
              Crafted for the moments you will remember. Long-lasting Eau de Parfum formulations designed to subtly express your presence.
            </p>

            {/* Primary & Secondary CTAs — Manrope 600 (14-16px) */}
            <div className="animate-hero-cta flex flex-wrap items-center gap-4">
              <Link
                to="/category/bestsellers"
                className="group inline-flex items-center gap-2.5 bg-[#B4171E] hover:bg-[#C72A35] active:scale-[0.98] text-[#F5F2EE] border border-white/10 px-7 py-3.5 rounded-xl font-manrope text-[14px] sm:text-[15px] md:text-[16px] font-semibold tracking-[0.01em] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none btn-interactive"
              >
                <span>Discover Your Signature</span>
                <ArrowRight className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1.5 text-[#F5F2EE]" />
              </Link>

              <Link
                to="/category/unisex"
                className="inline-flex items-center gap-2 bg-[#121212] hover:bg-[#8F1018]/40 active:scale-[0.98] text-[#F5F2EE] border border-white/15 px-6 py-3.5 rounded-xl font-manrope text-[14px] sm:text-[15px] md:text-[16px] font-semibold tracking-[0.01em] transition-all duration-200 btn-interactive"
              >
                <span>Explore All</span>
              </Link>
            </div>
          </div>

          {/* Right Hero Product Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="animate-hero-bottle relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] group">
              {/* Soft Grounding Shadow beneath bottle */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-black/80 blur-xl rounded-full pointer-events-none" />
              
              {/* Diffuse Red Backdrop Glow behind bottle */}
              <div
                className="absolute inset-0 bg-radial from-[#8F1018]/25 to-transparent blur-2xl rounded-full pointer-events-none transition-transform duration-300 ease-out"
                style={{ transform: lightTransform }}
              />

              {/* Product Bottle Container with Subtle Desktop Mouse Follow */}
              <div
                className="relative rounded-2xl overflow-hidden bg-[#080808] border border-white/15 p-4 sm:p-6 shadow-2xl transition-transform duration-300 group-hover:scale-[1.015] bg-lacquer-highlight"
                style={{ transform: bottleTransform }}
              >
                <img
                  src="/images/products/row-1-column-1.png"
                  alt="ÉLAVA Signature Eau de Parfum Bottle"
                  className="w-full h-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>

        </div>
      </MainContainer>
    </section>
  );
}
