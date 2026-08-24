import React from 'react';
import MainContainer from '../ui/MainContainer';
import OccasionCard from './OccasionCard';
import occasions from '../../data/occasions';

/**
 * ShopByOccasion Top Banner
 * Desktop (>= md): 100% UNCHANGED 4-column single-row grid directly below Navbar.
 * Mobile (< md): 4 compact photographic cards with occasion names OUTSIDE below images.
 * Zero horizontal scrolling, zero carousel, zero swipe — all 4 fit simultaneously on screen!
 */
export default function ShopByOccasion() {
  return (
    <section className="pt-2.5 sm:pt-4 md:pt-5 pb-2.5 sm:pb-4 md:pb-6 overflow-visible">
      <MainContainer>
        {/* Single 4-column row across all viewports */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 md:gap-4 lg:gap-5 w-full p-0.5 sm:p-2 md:p-4 overflow-visible">
          {occasions.map((occasion) => (
            <OccasionCard key={occasion.id} occasion={occasion} />
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
