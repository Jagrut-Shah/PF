import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';
import StarRating from '../components/ui/StarRating';
import ReviewCard from '../components/home/ReviewCard';
import products from '../data/products';
import reviews, { reviewAggregate } from '../data/reviews';

export default function ReviewsPage() {
  const [searchParams] = useSearchParams();
  const productSlug = searchParams.get('product');

  const [activeGender, setActiveGender] = useState('ALL');
  const [visibleLimit, setVisibleLimit] = useState(6);

  const currentProduct = useMemo(() => {
    if (!productSlug) return null;
    return products.find((p) => p.slug === productSlug) || null;
  }, [productSlug]);

  const filteredReviews = useMemo(() => {
    let result = reviews;

    if (currentProduct) {
      return result.filter((r) => r.productSlug === currentProduct.slug);
    }

    if (activeGender !== 'ALL') {
      const targetGender = activeGender.toLowerCase();
      result = result.filter((r) => {
        const p = products.find((prod) => prod.slug === r.productSlug || prod.id === r.productId);
        const prodGender = p ? p.gender : r.gender;
        return prodGender === targetGender;
      });
    }

    return result;
  }, [currentProduct, activeGender]);

  const visibleReviews = filteredReviews.slice(0, visibleLimit);
  const hasMore = filteredReviews.length > visibleLimit;

  const handleShowMore = () => {
    setVisibleLimit((prev) => prev + 6);
  };

  const seoTitle = currentProduct
    ? `Customer Reviews for ${currentProduct.name} | ÉLAVA`
    : 'Customer Reviews | ÉLAVA';

  const seoDescription = currentProduct
    ? `Read customer experiences and reviews for ÉLAVA ${currentProduct.name} Eau de Parfum.`
    : 'Read customer experiences and reviews of ÉLAVA luxury artisanal perfumes.';

  const seoCanonical = currentProduct ? `/reviews?product=${currentProduct.slug}` : '/reviews';

  const heroTitle = currentProduct
    ? `What People Say About ${currentProduct.name}`
    : 'What People Say';

  const heroSubtitle = currentProduct
    ? 'The fragrance our customers keep coming back to.'
    : 'The ÉLAVA fragrances people keep coming back to.';

  const displayRating = currentProduct ? currentProduct.rating : reviewAggregate.rating;
  const displayReviewCount = currentProduct ? currentProduct.reviewCount : reviewAggregate.totalReviews;

  return (
    <div className="w-full bg-[#2A0D14] text-[#F6EFE7] min-h-screen">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonicalPath={seoCanonical}
        ogType="website"
      />

      <MainContainer className="py-8 sm:py-10 md:py-12">
        {/* 1. PAGE HERO */}
        <section className="text-center max-w-2xl mx-auto mb-7 sm:mb-8 md:mb-9">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F6EFE7] leading-tight mb-2">
            {heroTitle}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#E7C4C5]/85 tracking-wide mb-5 font-normal leading-relaxed">
            "{heroSubtitle}"
          </p>

          {/* Rating Display */}
          <div className="inline-flex flex-col items-center justify-center p-4 bg-[#641D2D] border border-[#E7C4C5]/20 rounded-2xl shadow-sm">
            <div className="font-serif text-3xl sm:text-4xl font-normal text-[#F6EFE7] tracking-tight mb-1">
              {displayRating} <span className="text-xl text-[#E7C4C5]">/ 5</span>
            </div>
            <div className="mb-1.5">
              <StarRating rating={displayRating} starColor="#C6A15B" />
            </div>
            <div className="font-sans text-xs text-[#E7C4C5] font-semibold tracking-wider uppercase">
              {displayReviewCount.toLocaleString()} Verified Reviews
            </div>
          </div>
        </section>

        {/* 2. SUBSECTION & FILTER BAR */}
        <section className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E7C4C5]/15">
            <div>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#F6EFE7]">
                A few words from our community
              </h2>
              {currentProduct && (
                <p className="font-sans text-xs text-[#E7C4C5]/85 mt-0.5 font-normal">
                  Filtered by {currentProduct.name}
                </p>
              )}
            </div>

            {currentProduct ? (
              <Link
                to="/reviews"
                className="font-sans text-xs font-semibold uppercase tracking-wider text-[#F6EFE7] hover:text-[#C94B5B] transition-colors"
              >
                ← View All Reviews
              </Link>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap font-sans">
                {['ALL', 'MEN', 'WOMEN', 'UNISEX'].map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => {
                      setActiveGender(gender);
                      setVisibleLimit(6);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold tracking-wide uppercase transition-colors ${
                      activeGender === gender
                        ? 'bg-[#C94B5B] text-[#F6EFE7]'
                        : 'bg-[#641D2D] text-[#E7C4C5]/80 hover:text-[#F6EFE7] border border-[#E7C4C5]/15'
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 3. REVIEWS GRID */}
        <section aria-label="Customer reviews grid">
          {visibleReviews.length === 0 ? (
            <div className="py-12 text-center text-[#E7C4C5]/80 font-sans text-xs font-normal">
              No reviews found for this selection.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {visibleReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}

          {/* Show More Button */}
          {hasMore && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={handleShowMore}
                className="bg-[#641D2D] hover:bg-[#7A2437] text-[#F6EFE7] border border-[#E7C4C5]/20 font-sans text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-xl transition-colors shadow-sm"
              >
                Show More Reviews
              </button>
            </div>
          )}
        </section>

      </MainContainer>
    </div>
  );
}
