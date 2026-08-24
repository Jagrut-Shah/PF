import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import ReviewCard from './ReviewCard';
import StarRating from '../ui/StarRating';
import reviews, { reviewAggregate } from '../../data/reviews';

/**
 * WHAT PEOPLE SAY
 * Editorial testimonial section with high-contrast text on dark teal (#123C3A) canvas.
 */
export default function WhatPeopleSay() {
  const displayedReviews = reviews.slice(0, 3);
  const { rating, totalReviews } = reviewAggregate;

  return (
    <section className="pb-6 sm:pb-8 md:pb-10" aria-labelledby="what-people-say-heading">
      <MainContainer>

        {/* ── Section header ── */}
        <div className="mb-4 sm:mb-5">
          <h2
            id="what-people-say-heading"
            className="font-serif text-[26px] sm:text-[30px] md:text-[32px] tracking-[0.06em] font-normal uppercase text-[#F5F1EA] leading-tight"
          >
            WHAT PEOPLE SAY
          </h2>
          <p className="font-sans text-[13px] sm:text-[14px] text-[#B8C4C2] mt-1 font-normal tracking-wide">
            Words from our fragrance collective.
          </p>
        </div>

        {/* ── Desktop: 3 cards side-by-side ── */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 mb-6">
          {displayedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* ── Mobile: swipeable carousel ── */}
        <div
          className="flex md:hidden w-full overflow-x-auto snap-x snap-mandatory gap-4 pb-2 mb-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {displayedReviews.map((review) => (
            <div key={review.id} className="flex-none w-[86%] snap-start min-w-0">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        {/* ── Rating Summary row below cards ── */}
        <div className="flex flex-col gap-3 pt-3 md:pt-2 md:flex-row md:items-center md:justify-between border-t border-white/10 mt-2">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            {/* Gold stars (#D4A72C) */}
            <StarRating rating={rating} size={15} starColor="#D4A72C" />
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-sans text-[13px] font-semibold text-[#F5F1EA]">
                {rating} out of 5
              </span>
              <span className="font-sans text-[12px] text-[#B8C4C2]">
                · {totalReviews.toLocaleString()} Total Reviews
              </span>
            </div>
          </div>

          <Link
            to="/reviews"
            className="inline-flex items-center gap-1 text-[12px] font-medium uppercase tracking-[0.08em] text-[#F5F1EA] hover:text-[#FFFFFF] transition-colors duration-200"
            aria-label="View more reviews"
          >
            VIEW MORE REVIEWS
            <ArrowRight className="w-3.5 h-3.5 stroke-[1.75]" aria-hidden="true" />
          </Link>
        </div>

      </MainContainer>
    </section>
  );
}
