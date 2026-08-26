import React from 'react';
import SEO from '../components/common/SEO';
import Hero from '../components/home/Hero';
import ShopByOccasion from '../components/home/ShopByOccasion';
import SignatureCtaBanner from '../components/home/SignatureCtaBanner';
import MostLoved from '../components/home/MostLoved';
import FindYourScent from '../components/home/FindYourScent';
import TrustStrip from '../components/home/TrustStrip';
import ScentWardrobeBundle from '../components/home/ScentWardrobeBundle';
import ReferralBanner from '../components/home/ReferralBanner';
import ScentQuiz from '../components/home/ScentQuiz';
import WhyElava from '../components/home/WhyElava';
import WhatPeopleSay from '../components/home/WhatPeopleSay';
import BrandStory from '../components/home/BrandStory';

/**
 * ÉLAVA Homepage Container
 * Controlled Visual Rhythm: Light → Dark → Light → Dark/Accent → Dark
 */
export default function Home() {
  return (
    <div className="w-full bg-[#F7F3EC] text-[#111A27]">
      <SEO
        title="ÉLAVA — Premium Fragrances Crafted for Every Moment"
        description="Discover ÉLAVA luxury artisanal perfumes crafted with exquisite notes. Explore bespoke 60 ML Eau de Parfum signatures for men, women, and unisex expression."
        canonicalPath="/"
        ogType="website"
      />
      
      {/* 1. HERO — Editorial Master Reference (#F7F3EC) */}
      <Hero />

      {/* 2. SHOP BY OCCASION (#FBF8F3) */}
      <ShopByOccasion />

      {/* 3. MOST LOVED (BESTSELLERS - #F7F3EC) */}
      <MostLoved />

      {/* 4. FIND YOUR SCENT (SCENT DISCOVERY - #102A4C) */}
      <FindYourScent />

      {/* 5. SIGNATURE CTA BANNER (#102A4C) */}
      <SignatureCtaBanner />

      {/* 6. BUILD YOUR SCENT WARDROBE (DUO BUNDLE - #102A4C) */}
      <ScentWardrobeBundle />

      {/* 7. TRUST STRIP (#FBF8F3) */}
      <TrustStrip />

      {/* 8. SHARE ÉLAVA. EARN ₹100 CASH. (REFERRAL BANNER - COBALT #285BE6 / #102A4C) */}
      <ReferralBanner />

      {/* 9. SCENT QUIZ FINDER (#102A4C) */}
      <ScentQuiz />

      {/* 10. WHY ÉLAVA (#FBF8F3) */}
      <WhyElava />

      {/* 11. WHAT PEOPLE SAY (#F7F3EC) */}
      <WhatPeopleSay />

      {/* 12. BRAND STORY (#08111F) */}
      <BrandStory />
    </div>
  );
}
