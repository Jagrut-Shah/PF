import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import ReviewCard from './ReviewCard';
import StarRating from '../ui/StarRating';
import reviews, { reviewAggregate } from '../../data/reviews';

/**
 * WHAT PEOPLE SAY — Black & Red Luxury Aesthetic:
 * Deep Black #0B0B0B section environment + Warm White #F5F2EE typography.
 */
export default function WhatPeopleSay() {
  const displayedReviews = reviews.slice(0, 3);
  const { rating, totalReviews } = reviewAggregate;

  return (
    <section className="py-8 sm:py-12 bg-[#0B0B0B] text-[#F5F2EE]" aria-labelledby="what-people-say-heading">
      <MainContainer>

        {/* Section header */}
        <div className="mb-6 sm:mb-8">
          <h2
            id="what-people-say-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F5F2EE] tracking-tight leading-tight"
          >
            What People Say
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#B8B3AF] mt-1 font-normal leading-relaxed">
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
        <div className="flex flex-col gap-3 pt-3 md:pt-4 md:flex-row md:items-center md:justify-between border-t border-white/10 mt-2">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <StarRating rating={rating} size={15} starColor="#C6A15B" />
            <div className="flex flex-wrap items-center gap-1.5 font-sans">
              <span className="text-xs sm:text-sm font-semibold text-[#F5F2EE]">
                {rating} out of 5
              </span>
              <span className="text-xs text-[#B8B3AF] font-normal">
                · {totalReviews.toLocaleString()} Total Reviews
              </span>
            </div>
          </div>

          <Link
            to="/reviews"
            className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold tracking-wider text-[#F5F2EE] hover:text-[#B4171E] transition-colors duration-200"
            aria-label="View more reviews"
          >
            <span>View More Reviews</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[1.75]" aria-hidden="true" />
          </Link>
        </div>

      </MainContainer>
    </section>
  );
}
