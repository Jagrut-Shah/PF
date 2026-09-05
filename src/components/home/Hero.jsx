import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import MainContainer from '../ui/MainContainer';

/**
 * Hero — BRIGHT PREMIUM BLUE IDENTITY
 * Deep Blue → Primary Blue gradient background.
 * Cream/Warm White typography for contrast.
 * Product bottle on a Cream surface — physical, present, premium.
 * Controlled scale: 75-85vh feel, no oversized headings.
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
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    const container = heroRef.current;
    if (container) container.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => { if (container) container.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  const bottleTransform = `translate3d(${mousePos.x * 8}px, ${mousePos.y * 8}px, 0)`;
  const lightTransform  = `translate3d(${mousePos.x * 4}px, ${mousePos.y * 4}px, 0)`;

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden border-b border-[#0000CD]"
      style={{ background: 'linear-gradient(135deg, #0000CD 0%, #0000FF 45%, #0000B8 100%)' }}
    >
      {/* Subtle tonal texture overlay — depth without pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0000CD]/60 via-transparent to-[#0000FF]/30 pointer-events-none" />

      {/* Very soft cream atmospheric bloom — right side behind bottle */}
      <div
        className="absolute right-0 top-0 w-1/2 h-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 80% 45%, #F4EBDD, transparent)' }}
      />

      {/* Subtle grain texture for premium depth */}
      <div className="absolute inset-0 bg-grain-texture pointer-events-none opacity-30" />

      <MainContainer className="relative z-10 py-10 sm:py-14 md:py-18 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

          {/* LEFT — Content */}
          <div className="lg:col-span-7">

            {/* Eyebrow badge — Cream on Blue */}
            <div className="animate-hero-eyebrow inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4EBDD]/15 border border-[#F4EBDD]/25 mb-4">
              <Sparkles className="w-3 h-3 text-[#F4EBDD]/80" />
              <span className="font-manrope text-[11px] sm:text-[12px] font-semibold tracking-[0.09em] uppercase text-[#F4EBDD]/90">
                60 ml Eau de Parfum Collection
              </span>
            </div>

            {/* Hero Headline — Warm White on Blue, controlled scale */}
            <h1 className="animate-hero-headline font-bodoni text-[30px] sm:text-[38px] md:text-[46px] lg:text-[52px] font-medium tracking-[-0.02em] text-[#FBF8F2] leading-[1.0] mb-4">
              Scents that become{' '}
              <span className="italic text-[#F4EBDD]/80 font-medium">part of you.</span>
            </h1>

            {/* Subheading — muted cream */}
            <p className="animate-hero-subhead font-manrope text-[13px] sm:text-[15px] md:text-[16px] text-[#F4EBDD]/65 font-normal leading-[1.55] mb-6 max-w-md">
              Crafted for the moments you will remember. Long-lasting Eau de Parfum designed to subtly express your presence.
            </p>

            {/* CTAs */}
            <div className="animate-hero-cta flex flex-wrap items-center gap-3">
              {/* Primary: Cream on Blue — strong contrast */}
              <Link
                to="/category/bestsellers"
                className="group inline-flex items-center gap-2 bg-[#F4EBDD] hover:bg-[#FBF8F2] active:scale-[0.98] text-[#0000FF] px-6 py-2.5 rounded-lg font-manrope text-[13px] sm:text-[14px] font-bold tracking-[0.01em] transition-all duration-200 shadow-md hover:shadow-lg btn-interactive"
              >
                <span>Discover Your Signature</span>
                <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-200 group-hover:translate-x-1.5" />
              </Link>

              {/* Secondary: Ghost / outlined cream */}
              <Link
                to="/category/unisex"
                className="inline-flex items-center gap-2 bg-transparent hover:bg-[#F4EBDD]/10 active:scale-[0.98] text-[#F4EBDD]/85 border border-[#F4EBDD]/30 hover:border-[#F4EBDD]/60 px-5 py-2.5 rounded-lg font-manrope text-[13px] sm:text-[14px] font-semibold tracking-[0.01em] transition-all duration-200 btn-interactive"
              >
                <span>Explore All</span>
              </Link>
            </div>

            {/* Trust micro-line */}
            <p className="animate-hero-cta mt-4 font-manrope text-[11px] text-[#F4EBDD]/45 font-normal tracking-wide">
              Free shipping on orders above ₹999 · COD available
            </p>
          </div>

          {/* RIGHT — Product on Cream Surface */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="animate-hero-bottle relative w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[320px] group">

              {/* Warm grounding shadow */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[65%] h-5 bg-[#2A211F]/25 blur-xl rounded-full pointer-events-none" />

              {/* Cream glow — bottle appears to rest on cream light */}
              <div
                className="absolute -inset-4 rounded-2xl pointer-events-none transition-transform duration-300 ease-out opacity-20"
                style={{
                  background: 'radial-gradient(ellipse 70% 60% at 50% 55%, #F4EBDD, transparent)',
                  transform: lightTransform
                }}
              />

              {/* Product bottle on Cream surface — physical contrast */}
              <div
                className="relative rounded-xl overflow-hidden bg-[#F4EBDD] border border-[#EEE2D2] p-4 sm:p-5 shadow-[0_16px_48px_rgba(0,0,255,0.30)] transition-transform duration-300 group-hover:scale-[1.015]"
                style={{ transform: bottleTransform }}
              >
                <img
                  src="/images/products/row-1-column-1.png"
                  alt="ÉLAVA Signature Eau de Parfum Bottle"
                  className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,255,0.18)] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>

        </div>
      </MainContainer>
    </section>
  );
}
