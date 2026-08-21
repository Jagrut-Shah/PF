import React from 'react';
import SEO from '../components/common/SEO';
import ShopByOccasion from '../components/home/ShopByOccasion';
import MostLoved from '../components/home/MostLoved';
import FindYourScent from '../components/home/FindYourScent';
import TrustStrip from '../components/home/TrustStrip';
import DiscoverySet from '../components/home/DiscoverySet';
import ScentQuiz from '../components/home/ScentQuiz';
import WhyElava from '../components/home/WhyElava';
import WhatPeopleSay from '../components/home/WhatPeopleSay';
import BrandStory from '../components/home/BrandStory';

/**
 * Home Page - Refined Homepage Hierarchy
 *
 * Sequence:
 * 1. SHOP BY OCCASION (First visual content below Navbar!)
 * 2. MOST LOVED (Bestsellers)
 * 3. FIND YOUR SCENT (Categories / Moods)
 * 4. TRUST STRIP (Secure Payments, COD, Tracked Delivery, Support)
 * 5. TRY BEFORE YOU BUY (ÉLAVA Discovery Set)
 * 6. FIND YOUR SIGNATURE SCENT (Interactive Finder)
 * 7. WHY ÉLAVA
 * 8. WHAT PEOPLE SAY (Customer Reviews)
 * 9. THE STORY BEHIND ÉLAVA
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
      
      {/* 1. SHOP BY OCCASION (FIRST visual content immediately below navbar) */}
      <ShopByOccasion />

      {/* 2. MOST LOVED (BESTSELLERS) */}
      <MostLoved />

      {/* 3. FIND YOUR SCENT */}
      <FindYourScent />

      {/* 4. TRUST STRIP (Moved to immediately follow Find Your Scent) */}
      <TrustStrip />

      {/* 5. TRY BEFORE YOU BUY (ÉLAVA DISCOVERY SET) */}
      <DiscoverySet />

      {/* 6. FIND YOUR SIGNATURE SCENT (INTERACTIVE SCENT FINDER) */}
      <ScentQuiz />

      {/* 7. WHY ÉLAVA */}
      <WhyElava />

      {/* 8. WHAT PEOPLE SAY (CUSTOMER REVIEWS) */}
      <WhatPeopleSay />

      {/* 9. THE STORY BEHIND ÉLAVA (BRAND STORY) */}
      <BrandStory />
    </div>
  );
}
