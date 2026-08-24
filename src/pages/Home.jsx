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
 * Home Page - Sequence:
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
    <div className="w-full bg-[#163E49] text-[#F5F1EA]">
      <SEO
        title="ÉLAVA — Premium Fragrances Crafted for Every Moment"
        description="Discover ÉLAVA luxury artisanal perfumes crafted with exquisite notes. Explore bespoke 60 ML Eau de Parfum signatures for men, women, and unisex expression."
        canonicalPath="/"
        ogType="website"
      />
      
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
  );
}
