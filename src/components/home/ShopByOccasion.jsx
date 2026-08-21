import React from 'react';
import MainContainer from '../ui/MainContainer';
import OccasionCard from './OccasionCard';
import occasions from '../../data/occasions';

/**
 * ShopByOccasion Top Banner
 * Desktop (>= md): 100% UNCHANGED 4-column single-row grid directly below Navbar.
 * Mobile (< md): Smooth, compact horizontal swipeable strip (no 2x2 grid, no page overflow, no ugly scrollbar).
 */
export default function ShopByOccasion() {
  return (
    <section className="pt-3 sm:pt-4 md:pt-5 pb-3 sm:pb-4 md:pb-6 overflow-hidden md:overflow-visible">
      <MainContainer>
        {/* ── DESKTOP GRID (>= md: 100% UNCHANGED 4-COLUMN ROW) ── */}
        <div className="hidden md:grid md:grid-cols-4 gap-4 lg:gap-5 w-full p-3 sm:p-4 overflow-visible">
          {occasions.map((occasion) => (
            <OccasionCard key={occasion.id} occasion={occasion} />
          ))}
        </div>

        {/* ── MOBILE HORIZONTAL SWIPE STRIP (< md: COMPACT HORIZONTAL SELECTOR) ── */}
        <div
          className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-3 px-0.5 py-2 w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' }}
        >
          {occasions.map((occasion) => (
            <div key={occasion.id} className="flex-none snap-start w-[72%] sm:w-[45%] max-w-[280px] min-w-[210px]">
              <OccasionCard occasion={occasion} />
            </div>
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
