import React from 'react';
import SEO from '../components/common/SEO';
import Hero from '../components/home/Hero';
import ShopByOccasion from '../components/home/ShopByOccasion';
import SignatureCtaBanner from '../components/home/SignatureCtaBanner';
import FindYourScent from '../components/home/FindYourScent';
import MostLoved from '../components/home/MostLoved';
import ScentWardrobeBundle from '../components/home/ScentWardrobeBundle';
import TrustStrip from '../components/home/TrustStrip';
import ReferralBanner from '../components/home/ReferralBanner';
import ScentQuiz from '../components/home/ScentQuiz';
import WhyElava from '../components/home/WhyElava';
import WhatPeopleSay from '../components/home/WhatPeopleSay';
import BrandStory from '../components/home/BrandStory';

/**
 * ÉLAVA Homepage Container — Cherry-First Luxury Fragrance Brand World
 * Primary Signature: Cherry #8B1E2D & Deep Cherry #64141F
 * Secondary Luxury Support: Cream #F4EBDD, Warm White #FBF8F2, Dark Espresso #2A211F
 */
export default function Home() {
  return (
    <div className="w-full bg-[#F4EBDD] text-[#2A211F] min-h-screen">
      <SEO
        title="ÉLAVA — Premium Fragrances Crafted for Every Moment"
        description="Discover ÉLAVA luxury artisanal perfumes crafted with exquisite notes. Explore bespoke 60 ML Eau de Parfum signatures for men, women, and unisex expression."
        canonicalPath="/"
        ogType="website"
      />
      
      {/* 0. HERO CAMPAIGN — CHERRY BRAND DOMINANCE */}
      <Hero />

      {/* 1. SHOP BY OCCASION */}
      <ShopByOccasion />

      {/* 2. FIND YOUR SIGNATURE SCENT CTA */}
      <SignatureCtaBanner />

      {/* 3. FIND YOUR SCENT (FOR HIM, FOR HER, UNISEX) */}
      <FindYourScent />

      {/* 4. MOST LOVED (BESTSELLERS) */}
      <MostLoved />

      {/* 5. BUILD YOUR SCENT WARDROBE (DUO BUNDLE) */}
      <ScentWardrobeBundle />

      {/* 6. TRUST STRIP */}
      <TrustStrip />

      {/* 7. SHARE ÉLAVA. EARN ₹100 CASH. (REFER & EARN) */}
      <ReferralBanner />

      {/* 8. SCENT QUIZ */}
      <ScentQuiz />

      {/* 9. WHY ÉLAVA */}
      <WhyElava />

      {/* 10. WHAT PEOPLE SAY */}
      <WhatPeopleSay />

      {/* 11. BRAND STORY */}
      <BrandStory />
    </div>
  );
}
