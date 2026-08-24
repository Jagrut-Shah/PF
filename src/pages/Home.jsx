import React from 'react';
import SEO from '../components/common/SEO';
import ShopByOccasion from '../components/home/ShopByOccasion';
import SignatureCtaBanner from '../components/home/SignatureCtaBanner';
import MostLoved from '../components/home/MostLoved';
import FindYourScent from '../components/home/FindYourScent';
import TrustStrip from '../components/home/TrustStrip';
import DiscoverySet from '../components/home/DiscoverySet';
import ScentWardrobeBundle from '../components/home/ScentWardrobeBundle';
import ScentQuiz from '../components/home/ScentQuiz';
import WhyElava from '../components/home/WhyElava';
import WhatPeopleSay from '../components/home/WhatPeopleSay';
import BrandStory from '../components/home/BrandStory';

/**
 * Home Page - STEP 2: HOMEPAGE COLOUR WORLD
 * Rich editorial atmospheric color environment:
 * Deep Plum (#241326) → Burgundy (#3A1729) → Wine (#6E2945)
 * with soft light blooms (Cherry #C94F70, Dusty Rose #D98A9B, Warm Blush #F5E9E6).
 *
 * Sequence:
 * 1. SHOP BY OCCASION
 * 2. FIND YOUR SIGNATURE SCENT CTA
 * 3. FIND YOUR SCENT
 * 4. MOST LOVED
 * 5. BUILD YOUR SCENT WARDROBE
 * 6. TRUST STRIP
 * 7. TRY BEFORE YOU BUY (DISCOVERY SET)
 * 8. FIND YOUR SIGNATURE SCENT (SCENT QUIZ)
 * 9. WHY ÉLAVA
 * 10. WHAT PEOPLE SAY
 * 11. BRAND STORY
 */
export default function Home() {
  return (
    <div className="relative w-full bg-[#17151A] text-[#FFF8F7] overflow-hidden">
      <SEO
        title="ÉLAVA — Premium Fragrances Crafted for Every Moment"
        description="Discover ÉLAVA luxury artisanal perfumes crafted with exquisite notes. Explore bespoke 60 ML Eau de Parfum signatures for men, women, and unisex expression."
        canonicalPath="/"
        ogType="website"
      />

      {/* ── CINEMATIC STUDIO ATMOSPHERIC LIGHT BLOOMS (BACKGROUND LAYER) ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Fold Atmosphere: Deep Plum & Burgundy Bloom */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-radial from-[#241326] via-[#3A1729]/60 to-transparent blur-[120px] opacity-90" />
        
        {/* Mid Page Seductive Wine & Cherry Glow */}
        <div className="absolute top-[20%] right-[-10%] w-[800px] h-[800px] bg-radial from-[#6E2945]/40 via-[#C94F70]/20 to-transparent blur-[140px] opacity-70" />
        <div className="absolute top-[40%] left-[-15%] w-[900px] h-[900px] bg-radial from-[#3A1729]/80 via-[#241326]/60 to-transparent blur-[160px] opacity-80" />

        {/* Occasional Soft Warm Blush & Dusty Rose Light Accent */}
        <div className="absolute top-[65%] right-[5%] w-[700px] h-[700px] bg-radial from-[#D98A9B]/15 via-[#F5E9E6]/5 to-transparent blur-[150px] opacity-60" />

        {/* Bottom Editorial Deep Plum Atmosphere */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-gradient-to-t from-[#17151A] via-[#241326]/90 to-transparent blur-[80px]" />
      </div>

      {/* ── HOMEPAGE SECTIONS (FOREGROUND CONTENT LAYER) ── */}
      <div className="relative z-10 space-y-0">
        
        {/* 1. SHOP BY OCCASION */}
        <ShopByOccasion />

        {/* 2. FIND YOUR SIGNATURE SCENT CTA (Compact Banner) */}
        <SignatureCtaBanner />

        {/* 3. FIND YOUR SCENT (GENDER/CATEGORIES FIRST) */}
        <FindYourScent />

        {/* 4. MOST LOVED (BESTSELLERS) */}
        <MostLoved />

        {/* 5. BUILD YOUR SCENT WARDROBE (DUO BUNDLE BUILDER) */}
        <ScentWardrobeBundle />

        {/* 6. TRUST STRIP */}
        <TrustStrip />

        {/* 7. TRY BEFORE YOU BUY (DISCOVERY SET) */}
        <DiscoverySet />

        {/* 8. FIND YOUR SIGNATURE SCENT (FULL SCENT FINDER) */}
        <ScentQuiz />

        {/* 9. WHY ÉLAVA */}
        <WhyElava />

        {/* 10. WHAT PEOPLE SAY */}
        <WhatPeopleSay />

        {/* 11. THE STORY BEHIND ÉLAVA */}
        <BrandStory />

      </div>
    </div>
  );
}
