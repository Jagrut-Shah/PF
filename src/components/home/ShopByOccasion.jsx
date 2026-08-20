import React from 'react';
import MainContainer from '../ui/MainContainer';
import OccasionCard from './OccasionCard';
import occasions from '../../data/occasions';

/**
 * ShopByOccasion Top Banner (4-Card Full-Width Grid directly below Navbar)
 * Mobile: 2x2 grid | Desktop: 4-column single row occupying full content width.
 */
export default function ShopByOccasion() {
  return (
    <section className="pt-4 sm:pt-5 pb-4 sm:pb-6">
      <MainContainer>
        {/* Full-width 4-card grid: 2x2 on mobile, 4-in-a-row on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full">
          {occasions.map((occasion) => (
            <OccasionCard key={occasion.id} occasion={occasion} />
          ))}
        </div>
      </MainContainer>
    </section>
  );
}

