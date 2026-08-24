import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import ReviewCard from './ReviewCard';
import StarRating from '../ui/StarRating';
import reviews, { reviewAggregate } from '../../data/reviews';

/**
 * WHAT PEOPLE SAY
 * WHAT PEOPLE SAY: Deep Plum / Burgundy (#241326 / #3A1729) atmosphere
 */
export default function WhatPeopleSay() {
  const displayedReviews = reviews.slice(0, 3);
  const { rating, totalReviews } = reviewAggregate;

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#241326] via-[#3A1729] to-[#241326] text-[#FFF8F7] border-t border-b border-[rgba(217,138,155,0.15)]" aria-labelledby="what-people-say-heading">
      <MainContainer>

        {/* ── Section header ── */}
        <div className="mb-6 sm:mb-8">
          <h2
            id="what-people-say-heading"
            className="font-serif text-[26px] sm:text-[30px] md:text-[32px] tracking-[0.06em] font-bold uppercase text-[#FFF8F7] leading-tight"
          >
            WHAT PEOPLE SAY
          </h2>
          <p className="font-sans text-[13px] sm:text-[14px] text-[#D98A9B] mt-1 font-normal tracking-wide">
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
        <div className="flex flex-col gap-3 pt-3 md:pt-4 md:flex-row md:items-center md:justify-between border-t border-[rgba(217,138,155,0.15)] mt-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            {/* Gold stars (#C9A227 - Strict semantic gold for ratings) */}
            <StarRating rating={rating} size={15} starColor="#C9A227" />
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-sans text-[13px] font-semibold text-[#FFF8F7]">
                {rating} out of 5
              </span>
              <span className="font-sans text-[12px] text-[#D98A9B]">
                · {totalReviews.toLocaleString()} Total Reviews
              </span>
            </div>
          </div>

          <Link
            to="/reviews"
            className="group inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.08em] text-[#C94F70] hover:text-[#E96885] transition-colors duration-200"
            aria-label="View more reviews"
          >
            <span>VIEW MORE REVIEWS</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2] transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>

      </MainContainer>
    </section>
  );
}
