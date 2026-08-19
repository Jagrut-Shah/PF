import React from 'react';
import MainContainer from '../ui/MainContainer';
import OccasionCard from './OccasionCard';
import occasions from '../../data/occasions';

/**
 * ShopByOccasion Homepage Section
 * Editorial luxury catalogue cards (5 in a single row on desktop, compact horizontal selector on mobile).
 */
export default function ShopByOccasion() {
  return (
    <section className="pb-8 sm:pb-10 md:pb-12" aria-labelledby="shop-by-occasion-heading">
      <MainContainer>
        {/* Section Header */}
        <div className="mb-4 sm:mb-5 md:mb-6">
          <h2
            id="shop-by-occasion-heading"
            className="font-serif text-[26px] sm:text-[30px] md:text-[32px] tracking-[0.06em] font-normal uppercase text-elava-charcoal leading-tight"
          >
            SHOP BY OCCASION
          </h2>
          <p className="font-sans text-[13px] sm:text-[14px] text-elava-stone mt-1 sm:mt-1.5 font-normal tracking-wide">
            Because every moment has its own scent.
          </p>
        </div>

        {/* Mobile compact circular selector */}
        <div className="flex md:hidden w-full overflow-x-auto scrollbar-none gap-3 pb-1 snap-x snap-mandatory">
          {occasions.map((occasion) => (
            <div
              key={occasion.id}
              className="flex-none w-[84px] snap-start"
            >
              <OccasionCard occasion={occasion} />
            </div>
          ))}
        </div>

        {/* Desktop 4-Column Grid */}
        <div className="hidden md:grid grid-cols-4 gap-4">
          {occasions.map((occasion) => (
            <OccasionCard key={occasion.id} occasion={occasion} />
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
