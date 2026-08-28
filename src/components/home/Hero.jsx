import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import MainContainer from '../ui/MainContainer';

/**
 * Hero Component — Light Luxury Perfume Studio Atmosphere:
 * Warm Ivory #F6F2EA environment with subtle warm champagne illumination,
 * refined editorial Bodoni Moda typography, and soft studio product lighting.
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
  const bottleTransform = `translate3d(${mousePos.x * 10}px, ${mousePos.y * 10}px, 0)`;
  const lightTransform = `translate3d(${mousePos.x * 5}px, ${mousePos.y * 5}px, 0)`;

  return (
    <section
      ref={heroRef}
      className="relative w-full bg-[#F6F2EA] text-[#201C19] overflow-hidden border-b border-[#D9D1C6] bg-grain-texture"
    >
      {/* Background Atmosphere with Subtle Warm Champagne Illumination */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img
          src="/images/products/row-1-column-1.png"
          alt="ÉLAVA Luxury Perfume Hero"
          className="w-full h-full object-cover object-center opacity-10 mix-blend-multiply scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F6F2EA] via-[#F6F2EA]/95 to-[#EEE8DD]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F6F2EA] via-transparent to-[#F6F2EA]/60" />
        
        {/* Subtle Warm Champagne Studio Light */}
        <div
          className="absolute inset-0 bg-ambient-hero transition-transform duration-300 ease-out"
          style={{ transform: lightTransform }}
        />
      </div>

      <MainContainer className="relative z-10 py-12 sm:py-18 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7">
            {/* Section Label / Badge in Cream Surface */}
            <div className="animate-hero-eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEE8DD] border border-[#D9D1C6] mb-6 text-[12px] sm:text-[13px] font-manrope font-semibold tracking-[0.09em] uppercase text-[#721C24] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#721C24]" />
              <span>60 ml Eau de Parfum Collection</span>
            </div>

            {/* Hero Display Headline — Bodoni Moda 500-600 */}
            <h1 className="animate-hero-headline font-bodoni text-[38px] sm:text-[48px] md:text-[58px] lg:text-[68px] font-medium tracking-[-0.02em] text-[#201C19] leading-[0.98] mb-6">
              Scents that become <span className="font-medium text-[#625C55] italic">part of you.</span>
            </h1>

            {/* Hero Subheading — Manrope 400/500 */}
            <p className="animate-hero-subhead font-manrope text-[17px] sm:text-[19px] md:text-[21px] text-[#625C55] font-normal leading-[1.45] mb-8 max-w-xl">
              Crafted for the moments you will remember. Long-lasting Eau de Parfum formulations designed to subtly express your presence.
            </p>

            {/* Primary & Secondary CTAs — Manrope 600 */}
            <div className="animate-hero-cta flex flex-wrap items-center gap-4">
              <Link
                to="/category/bestsellers"
                className="group inline-flex items-center gap-2.5 bg-[#721C24] hover:bg-[#5A161C] active:scale-[0.98] text-[#F6F2EA] px-7 py-3.5 rounded-xl font-manrope text-[14px] sm:text-[15px] md:text-[16px] font-semibold tracking-[0.01em] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none btn-interactive"
              >
                <span>Discover Your Signature</span>
                <ArrowRight className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1.5 text-[#F6F2EA]" />
              </Link>

              <Link
                to="/category/unisex"
                className="inline-flex items-center gap-2 bg-[#EEE8DD] hover:bg-[#E5DCCF] active:scale-[0.98] text-[#201C19] border border-[#D9D1C6] px-6 py-3.5 rounded-xl font-manrope text-[14px] sm:text-[15px] md:text-[16px] font-semibold tracking-[0.01em] transition-all duration-200 shadow-xs btn-interactive"
              >
                <span>Explore All</span>
              </Link>
            </div>
          </div>

          {/* Right Hero Product Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="animate-hero-bottle relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] group">
              {/* Soft Warm Grounding Shadow beneath bottle */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[75%] h-8 bg-[#3C2D1E]/15 blur-xl rounded-full pointer-events-none" />
              
              {/* Subtle Champagne Glow behind bottle */}
              <div
                className="absolute inset-0 bg-radial from-[#E5DCCF]/80 to-transparent blur-2xl rounded-full pointer-events-none transition-transform duration-300 ease-out"
                style={{ transform: lightTransform }}
              />

              {/* Product Bottle Container */}
              <div
                className="relative rounded-2xl overflow-hidden bg-[#EEE8DD] border border-[#D9D1C6] p-4 sm:p-6 shadow-[0_12px_36px_rgba(60,45,30,0.08)] transition-transform duration-300 group-hover:scale-[1.015] bg-matte-highlight"
                style={{ transform: bottleTransform }}
              >
                <img
                  src="/images/products/row-1-column-1.png"
                  alt="ÉLAVA Signature Eau de Parfum Bottle"
                  className="w-full h-auto object-contain drop-shadow-[0_14px_24px_rgba(60,45,30,0.12)] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>

        </div>
      </MainContainer>
    </section>
  );
}
