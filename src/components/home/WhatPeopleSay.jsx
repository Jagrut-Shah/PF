import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import ReviewCard from './ReviewCard';
import reviews, { reviewAggregate } from '../../data/reviews';

/**
 * WHAT PEOPLE SAY
 * Editorial testimonial section.
 *
 * Desktop : 3 cards in one horizontal row, equal width & height (CSS grid + h-full on card).
 * Mobile  : single-card horizontal swipe carousel — no dots, no arrows.
 * Summary : aggregate rating + review count (sourced from reviewAggregate) + text link.
 */
export default function WhatPeopleSay() {
  const displayedReviews = reviews.slice(0, 3);
  const { rating, totalReviews } = reviewAggregate;

  return (
    <section className="pb-4 sm:pb-6 md:pb-8" aria-labelledby="what-people-say-heading">
      <MainContainer>

        {/* ── Section header ── */}
        <div className="mb-4 sm:mb-5">
          <h2
            id="what-people-say-heading"
            className="font-serif text-[26px] sm:text-[30px] md:text-[32px] tracking-[0.06em] font-normal uppercase text-elava-charcoal leading-tight"
          >
            WHAT PEOPLE SAY
          </h2>
          <p className="font-sans text-[13px] sm:text-[14px] text-elava-stone mt-1 font-normal tracking-wide">
            Words from our fragrance collective.
          </p>
        </div>

        {/* ── Desktop: exactly 3 cards side-by-side ──
              CSS grid default is items-stretch → all cells share the tallest height.
              ReviewCard has h-full + flex-col so content fills that height correctly.  */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 mb-5">
          {displayedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* ── Mobile: one card visible at a time, swipeable ── */}
        <div
          className="flex md:hidden w-full overflow-x-auto snap-x snap-mandatory gap-4 pb-1"
          style={{ scrollbarWidth: 'none' }}
        >
          {displayedReviews.map((review) => (
            <div key={review.id} className="flex-none w-[86%] snap-start min-w-0">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>


        {/* ── Summary row ──
              Left : ★★★★★  4.8 out of 5 · 500 Total Reviews
              Right: VIEW ALL REVIEWS ↗  (editorial text link, not a button)  */}
        <div className="flex flex-col gap-2 pt-3 md:pt-0 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-1.5">
            {/* Gold stars */}
            <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-elava-gold fill-current" aria-hidden="true" />
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-sans text-[13px] font-semibold text-elava-charcoal">
                {rating} out of 5
              </span>
              <span className="font-sans text-[12px] text-elava-stone">
                {totalReviews.toLocaleString()} Total Reviews
              </span>
            </div>
          </div>

          <Link
            to="/reviews"
            className="inline-flex items-center gap-1 text-[12px] font-medium uppercase tracking-[0.08em] text-elava-charcoal hover:text-[#2C1F14] transition-colors duration-200"
            aria-label="View all reviews"
          >
            VIEW ALL REVIEWS
            <ArrowRight className="w-3 h-3 stroke-[1.5]" aria-hidden="true" />
          </Link>
        </div>

      </MainContainer>
    </section>
  );
}
