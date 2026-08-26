import React from 'react';
import MainContainer from '../ui/MainContainer';
import OccasionCard from './OccasionCard';
import occasions from '../../data/occasions';

/**
 * ShopByOccasion Section — Deep Cherry Environment
 */
export default function ShopByOccasion() {
  return (
    <section className="pt-3 sm:pt-4 md:pt-6 pb-3 sm:pb-5 md:pb-6 overflow-visible bg-[#2A0D14] text-[#F6EFE7]">
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
