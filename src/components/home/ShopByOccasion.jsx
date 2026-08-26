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
    <section className="py-4 sm:py-6 md:py-8 bg-[#FBF8F3] text-[#08111F] overflow-visible border-b border-[#08111F]/10">
      <MainContainer>
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-3 sm:mb-4">
          <span className="font-sans text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#285BE6]">
            CURATED OCCASION FRAGRANCES
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-light uppercase tracking-wide text-[#08111F] mt-1">
            SHOP BY OCCASION
          </h2>
        </div>

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
