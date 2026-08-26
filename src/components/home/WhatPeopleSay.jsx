import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import ReviewCard from './ReviewCard';
import StarRating from '../ui/StarRating';
import reviews, { reviewAggregate } from '../../data/reviews';

/**
 * WHAT PEOPLE SAY
 * Editorial testimonial section with Deep Cherry (#2A0D14) canvas and Cream (#F6EFE7) text.
 */
export default function WhatPeopleSay() {
  const displayedReviews = reviews.slice(0, 3);
  const { rating, totalReviews } = reviewAggregate;

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-[#2A0D14] text-[#F6EFE7]" aria-labelledby="what-people-say-heading">
      <MainContainer>

        {/* Section header */}
        <div className="mb-4 sm:mb-5">
          <h2
            id="what-people-say-heading"
            className="font-serif text-[26px] sm:text-[30px] md:text-[32px] tracking-[0.06em] font-normal uppercase text-[#F6EFE7] leading-tight"
          >
            WHAT PEOPLE SAY
          </h2>
          <p className="font-sans text-[13px] sm:text-[14px] text-[#E7C4C5]/85 mt-1 font-normal tracking-wide">
            Words from our fragrance collective.
          </p>
        </div>

        {/* Desktop: 3 cards side-by-side */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 mb-6">
          {displayedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Mobile: swipeable carousel */}
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

        {/* Rating Summary row below cards */}
        <div className="flex flex-col gap-3 pt-3 md:pt-2 md:flex-row md:items-center md:justify-between border-t border-[#E7C4C5]/15 mt-2">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <StarRating rating={rating} size={15} starColor="#E7C4C5" />
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-sans text-[13px] font-semibold text-[#F6EFE7]">
                {rating} out of 5
              </span>
              <span className="font-sans text-[12px] text-[#E7C4C5]/85">
                · {totalReviews.toLocaleString()} Total Reviews
              </span>
            </div>
          </div>

          <Link
            to="/reviews"
            className="inline-flex items-center gap-1 text-[12px] font-medium uppercase tracking-[0.08em] text-[#F6EFE7] hover:text-[#C94B5B] transition-colors duration-200"
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
