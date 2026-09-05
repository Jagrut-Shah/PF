import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import ReviewCard from './ReviewCard';
import StarRating from '../ui/StarRating';
import reviews, { reviewAggregate } from '../../data/reviews';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * WHAT PEOPLE SAY — CHERRY DOMINANT BACKGROUND #8B1E2D:
 * Signature Cherry section, Rich Warm Sand Cream #DAC29F review cards.
 */
export default function WhatPeopleSay() {
  const displayedReviews = reviews.slice(0, 3);
  const { rating, totalReviews } = reviewAggregate;
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-7 sm:py-10 bg-[#0A3282] text-[#DAC29F] border-b border-[#06215A]" aria-labelledby="what-people-say-heading">
      <MainContainer>
        <div ref={ref} className={`reveal-init ${isVisible ? 'reveal-visible' : ''}`}>

          {/* Section header */}
          <div className="mb-5 sm:mb-7">
            <h2
              id="what-people-say-heading"
              className="font-bodoni text-[22px] sm:text-[28px] md:text-[34px] font-medium text-[#DAC29F] leading-[1.02] tracking-[-0.02em]"
            >
              What People Say
            </h2>
            <p className="font-manrope text-[13px] sm:text-[14px] text-[#DAC29F]/80 mt-1 font-normal leading-[1.4]">
              Words from our fragrance collective.
            </p>
          </div>

          {/* Desktop: 3 cards side-by-side with staggered reveal */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 mb-6">
            {displayedReviews.map((review, idx) => (
              <div
                key={review.id}
                className={`reveal-init ${isVisible ? `reveal-visible stagger-${idx + 1}` : ''}`}
              >
                <ReviewCard review={review} />
              </div>
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
          <div className="flex flex-col gap-3 pt-3 md:flex-row md:items-center md:justify-between border-t border-[#DAC29F]/20 mt-2">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
              <StarRating rating={rating} size={15} starColor="#C6A15B" emptyColor="#06215A" />
              <div className="flex flex-wrap items-center gap-1.5 font-sans">
                <span className="text-xs sm:text-sm font-semibold text-[#DAC29F]">
                  {rating} out of 5
                </span>
                <span className="text-xs text-[#DAC29F]/80 font-normal">
                  · {totalReviews.toLocaleString()} Total Reviews
                </span>
              </div>
            </div>

            <Link
              to="/reviews"
              className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold tracking-wider text-[#DAC29F] hover:text-[#FFF] transition-colors duration-200 btn-interactive"
              aria-label="View more reviews"
            >
              <span>View More Reviews</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[1.75]" aria-hidden="true" />
            </Link>
          </div>

        </div>
      </MainContainer>
    </section>
  );
}
