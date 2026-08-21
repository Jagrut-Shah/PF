import React from 'react';
import MainContainer from '../ui/MainContainer';
import OccasionCard from './OccasionCard';
import occasions from '../../data/occasions';

/**
 * ShopByOccasion Top Banner (4-Card Full-Width Grid directly below Navbar)
 * Mobile: 2x2 grid | Desktop: 4-column single row occupying full content width.
 * Added overflow-visible and p-3 sm:p-4 to allow Date Night large soft wine spotlight aura to render cleanly without clipping.
 */
export default function ShopByOccasion() {
  return (
    <section className="pt-4 sm:pt-5 pb-4 sm:pb-6 overflow-visible">
      <MainContainer>
        {/* Full-width 4-card grid: 2x2 on mobile, 4-in-a-row on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5 w-full p-3 sm:p-4 overflow-visible">
          {occasions.map((occasion) => (
            <OccasionCard key={occasion.id} occasion={occasion} />
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
