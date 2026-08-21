import React from 'react';
import SEO from '../components/common/SEO';
import Hero from '../components/home/Hero';
import TrustStrip from '../components/home/TrustStrip';
import ShopByOccasion from '../components/home/ShopByOccasion';
import MostLoved from '../components/home/MostLoved';
import FindYourScent from '../components/home/FindYourScent';
import DiscoverySet from '../components/home/DiscoverySet';
import ScentQuiz from '../components/home/ScentQuiz';
import WhyElava from '../components/home/WhyElava';
import WhatPeopleSay from '../components/home/WhatPeopleSay';
import BrandStory from '../components/home/BrandStory';

/**
 * Home Page - Conversion & Brand Elevation Flow
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
      <Hero />
      <TrustStrip />
      <ShopByOccasion />
      <MostLoved />
      <FindYourScent />
      <DiscoverySet />
      <ScentQuiz />
      <WhyElava />
      <WhatPeopleSay />
      <BrandStory />
    </div>
  );
}
