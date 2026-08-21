import React from 'react';
import SEO from '../components/common/SEO';
import ShopByOccasion from '../components/home/ShopByOccasion';
import SignatureCtaBanner from '../components/home/SignatureCtaBanner';
import MostLoved from '../components/home/MostLoved';
import FindYourScent from '../components/home/FindYourScent';
import TrustStrip from '../components/home/TrustStrip';
import DiscoverySet from '../components/home/DiscoverySet';
import ScentQuiz from '../components/home/ScentQuiz';
import WhyElava from '../components/home/WhyElava';
import WhatPeopleSay from '../components/home/WhatPeopleSay';
import BrandStory from '../components/home/BrandStory';

/**
 * Home Page - Final Sequence
 *
 * Sequence:
 * 1. NAVBAR (App Layout)
 * 2. SHOP BY OCCASION (Date Night, Everyday, Office, Party)
 * 3. FIND YOUR SIGNATURE SCENT CTA (Compact Banner)
 * 4. MOST LOVED
 * 5. FIND YOUR SCENT
 * 6. TRUST STRIP (Secure Payments, COD, Tracked Delivery, Support)
 * 7. TRY BEFORE YOU BUY (Discovery / Sample Set)
 * 8. FIND YOUR SIGNATURE SCENT (Full Finder)
 * 9. WHY ÉLAVA
 * 10. WHAT PEOPLE SAY
 * 11. THE STORY BEHIND ÉLAVA
 * 12. FOOTER (App Layout)
 */
export default function Home() {
  return (
    <div className="w-full bg-[#163E49] text-[#F3EBDD]">
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

      {/* 3. MOST LOVED (BESTSELLERS) */}
      <MostLoved />

      {/* 4. FIND YOUR SCENT */}
      <FindYourScent />

      {/* 5. TRUST STRIP */}
      <TrustStrip />

      {/* 6. TRY BEFORE YOU BUY (DISCOVERY SET) */}
      <DiscoverySet />

      {/* 7. FIND YOUR SIGNATURE SCENT (FULL SCENT FINDER) */}
      <ScentQuiz />

      {/* 8. WHY ÉLAVA */}
      <WhyElava />

      {/* 9. WHAT PEOPLE SAY */}
      <WhatPeopleSay />

      {/* 10. THE STORY BEHIND ÉLAVA */}
      <BrandStory />
    </div>
  );
}
