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

        {/* Desktop 5-Card Single Row / Mobile Compact Horizontal Selector */}
        {/* Mobile Horizontal Scroll */}
        <div className="flex md:hidden overflow-x-auto scrollbar-none gap-2.5 sm:gap-3 pb-1 -mx-4 px-4 snap-x snap-mandatory">
          {occasions.map((occasion) => (
            <div
              key={occasion.id}
              className="flex-1 min-w-[84px] max-w-[100px] snap-start"
            >
              <OccasionCard occasion={occasion} />
            </div>
          ))}
        </div>

        {/* Desktop 5-Column Grid */}
        <div className="hidden md:grid gap-3" style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' }}>
          {occasions.map((occasion) => (
            <OccasionCard key={occasion.id} occasion={occasion} />
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
