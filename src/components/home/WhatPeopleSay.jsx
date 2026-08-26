import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import ReviewCard from './ReviewCard';
import StarRating from '../ui/StarRating';
import reviews, { reviewAggregate } from '../../data/reviews';

/**
 * WHAT PEOPLE SAY — Editorial Testimonial Section
 */
export default function WhatPeopleSay() {
  const displayedReviews = reviews.slice(0, 3);
  const { rating, totalReviews } = reviewAggregate;

  return (
    <section className="py-12 sm:py-16 bg-[#F7F3EC] text-[#08111F] border-b border-[#08111F]/10" aria-labelledby="what-people-say-heading">
      <MainContainer>

        {/* Section Header */}
        <div className="mb-6 sm:mb-8 text-center max-w-xl mx-auto">
          <span className="font-sans text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#285BE6] block">
            THE FRAGRANCE COLLECTIVE
          </span>
          <h2
            id="what-people-say-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-wide font-light uppercase text-[#08111F] leading-tight mt-1"
          >
            WHAT PEOPLE <span className="italic text-[#285BE6]">SAY</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#111A27]/75 mt-1 font-normal tracking-wide">
            Words from our fragrance collective.
          </p>
        </div>

        {/* Desktop: 3 cards side-by-side */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 mb-8">
          {displayedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Mobile: swipeable carousel */}
        <div
          className="flex md:hidden w-full overflow-x-auto snap-x snap-mandatory gap-4 pb-2 mb-6"
          style={{ scrollbarWidth: 'none' }}
        >
          {displayedReviews.map((review) => (
            <div key={review.id} className="flex-none w-[86%] snap-start min-w-0">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        {/* Rating Summary row below cards */}
        <div className="flex flex-col gap-3 pt-4 md:flex-row md:items-center md:justify-between border-t border-[#08111F]/10">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <StarRating rating={rating} size={15} starColor="#C6A15B" />
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-sans text-xs sm:text-sm font-bold text-[#08111F]">
                {rating} out of 5
              </span>
              <span className="font-sans text-xs text-[#111A27]/70">
                · {totalReviews.toLocaleString()} Total Verified Reviews
              </span>
            </div>
          </div>

          <Link
            to="/reviews"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#08111F] hover:text-[#285BE6] transition-colors"
            aria-label="View more reviews"
          >
            <span>VIEW MORE REVIEWS</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#285BE6]" aria-hidden="true" />
          </Link>
        </div>

      </MainContainer>
    </section>
  );
}
