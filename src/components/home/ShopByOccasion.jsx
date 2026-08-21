import React from 'react';
import MainContainer from '../ui/MainContainer';
import OccasionCard from './OccasionCard';
import occasions from '../../data/occasions';

/**
 * ShopByOccasion Top Banner
 * All 4 occasion cards (DATE NIGHT, EVERYDAY, OFFICE, PARTY) rendered in ONE single horizontal row across all viewports.
 * Zero horizontal scrolling needed — all 4 occasions visible simultaneously at a single glance.
 */
export default function ShopByOccasion() {
  return (
    <section className="pt-2 sm:pt-4 md:pt-5 pb-2 sm:pb-4 md:pb-6 overflow-visible">
      <MainContainer>
        {/* Single 4-column row across mobile, tablet, and desktop */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-3 md:gap-4 lg:gap-5 w-full p-1 sm:p-2 md:p-4 overflow-visible">
          {occasions.map((occasion) => (
            <OccasionCard key={occasion.id} occasion={occasion} />
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
