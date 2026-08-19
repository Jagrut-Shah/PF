import React from 'react';
import FindYourScent from '../components/home/FindYourScent';
import MostLoved from '../components/home/MostLoved';
import ShopByOccasion from '../components/home/ShopByOccasion';
import WhatPeopleSay from '../components/home/WhatPeopleSay';

/**
 * Home Page
 * Stage 1D: Find Your Scent + Most Loved + Shop By Occasion + What People Say
 */
export default function Home() {
  return (
    <div className="w-full">
      <FindYourScent />
      <MostLoved />
      <ShopByOccasion />
      <WhatPeopleSay />
    </div>
  );
}
