import React from 'react';
import SEO from '../components/common/SEO';
import FindYourScent from '../components/home/FindYourScent';
import MostLoved from '../components/home/MostLoved';
import ShopByOccasion from '../components/home/ShopByOccasion';
import WhatPeopleSay from '../components/home/WhatPeopleSay';

/**
 * Home Page
 */
export default function Home() {
  return (
    <div className="w-full">
      <SEO
        title="ÉLAVA — Premium Fragrances Crafted for Every Moment"
        description="Discover ÉLAVA luxury artisanal perfumes crafted with exquisite notes. Explore bespoke Eau de Parfum signatures for men, women, and unisex expression."
        canonicalPath="/"
        ogType="website"
      />
      <ShopByOccasion />
      <FindYourScent />
      <MostLoved />
      <WhatPeopleSay />
    </div>
  );
}

