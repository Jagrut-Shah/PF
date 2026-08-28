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
    <div className="w-full bg-[#0B0B0B] text-[#F5F2EE] min-h-screen">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonicalPath={seoCanonical}
        ogType="website"
      />

      <MainContainer className="py-8 sm:py-10 md:py-12">
        {/* 1. PAGE HERO */}
        <section className="text-center max-w-2xl mx-auto mb-7 sm:mb-8 md:mb-9">
          <h1 className="font-bodoni text-[32px] sm:text-[40px] md:text-[48px] font-medium text-[#F5F2EE] leading-[1.02] tracking-[-0.02em] mb-2">
            {heroTitle}
          </h1>
          <p className="font-manrope text-[16px] text-[#B8B3AF] mb-5 font-normal">
            {heroSubtitle}
          </p>

          {/* Rating Display */}
          <div className="inline-flex flex-col items-center justify-center p-4 bg-[#121212] border border-white/10 rounded-2xl shadow-sm">
            <div className="font-bodoni text-[32px] sm:text-[40px] font-medium text-[#F5F2EE] tracking-tight mb-1">
              {displayRating} <span className="font-manrope text-[18px] text-[#B8B3AF]">/ 5</span>
            </div>
            <div className="mb-1.5">
              <StarRating rating={displayRating} starColor="#C6A15B" />
            </div>
            <div className="font-manrope text-[12px] text-[#B8B3AF] font-semibold tracking-[0.09em] uppercase">
              {displayReviewCount.toLocaleString()} Verified Reviews
            </div>
          </div>
        </section>

        {/* 2. SUBSECTION & FILTER BAR */}
        <section className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h2 className="font-manrope text-[14px] font-semibold uppercase tracking-[0.09em] text-[#F5F2EE]">
                A few words from our community
              </h2>
              {currentProduct && (
                <p className="font-manrope text-[13px] text-[#B8B3AF] mt-0.5 font-normal">
                  Filtered by {currentProduct.name}
                </p>
              )}
            </div>

            {currentProduct ? (
              <Link
                to="/reviews"
                className="font-manrope text-[14px] font-semibold text-[#F5F2EE] hover:text-[#B4171E] transition-colors"
              >
                ← View All Reviews
              </Link>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap font-manrope">
                {['ALL', 'MEN', 'WOMEN', 'UNISEX'].map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => {
                      setActiveGender(gender);
                      setVisibleLimit(6);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                      activeGender === gender
                        ? 'bg-[#B4171E] text-[#F5F2EE]'
                        : 'bg-[#121212] text-[#B8B3AF] hover:text-[#F5F2EE] border border-white/10'
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
            <div className="py-12 text-center text-[#B8B3AF] font-manrope text-[14px] font-normal">
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
                className="bg-[#B4171E] hover:bg-[#C72A35] active:scale-[0.98] text-[#F5F2EE] font-manrope text-[14px] font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-sm btn-interactive"
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
