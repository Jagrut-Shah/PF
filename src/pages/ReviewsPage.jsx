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

  // Gender Filter State (ALL, MEN, WOMEN, UNISEX)
  const [activeGender, setActiveGender] = useState('ALL');

  // Progressive Reveal Limit
  const [visibleLimit, setVisibleLimit] = useState(6);

  // Find product if product query param is supplied
  const currentProduct = useMemo(() => {
    if (!productSlug) return null;
    return products.find((p) => p.slug === productSlug) || null;
  }, [productSlug]);

  // Filter reviews based on product query or gender selection
  const filteredReviews = useMemo(() => {
    let result = reviews;

    // 1. Product specific filter takes priority
    if (currentProduct) {
      return result.filter((r) => r.productSlug === currentProduct.slug);
    }

    // 2. Gender filter using product metadata
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

  // Paginated visible slice
  const visibleReviews = filteredReviews.slice(0, visibleLimit);
  const hasMore = filteredReviews.length > visibleLimit;

  const handleShowMore = () => {
    setVisibleLimit((prev) => prev + 6);
  };

  // Dynamic Head SEO values
  const seoTitle = currentProduct
    ? `Customer Reviews for ${currentProduct.name} | ÉLAVA`
    : 'Customer Reviews | ÉLAVA';

  const seoDescription = currentProduct
    ? `Read customer experiences and reviews for ÉLAVA ${currentProduct.name} Eau de Parfum.`
    : 'Read customer experiences and reviews of ÉLAVA luxury artisanal perfumes.';

  const seoCanonical = currentProduct ? `/reviews?product=${currentProduct.slug}` : '/reviews';

  // Hero Display Values
  const heroTitle = currentProduct
    ? `WHAT PEOPLE SAY ABOUT ${currentProduct.name}`
    : 'WHAT PEOPLE SAY';

  const heroSubtitle = currentProduct
    ? 'The fragrance our customers keep coming back to.'
    : 'The ÉLAVA fragrances people keep coming back to.';

  const displayRating = currentProduct ? currentProduct.rating : reviewAggregate.rating;
  const displayReviewCount = currentProduct ? currentProduct.reviewCount : reviewAggregate.totalReviews;

  return (
    <div className="w-full bg-[#0F4C5C] text-[#F5F1EA] min-h-screen">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonicalPath={seoCanonical}
        ogType="website"
      />

      <MainContainer className="py-8 sm:py-10 md:py-12">
        {/* 1. PAGE HERO */}
        <section className="text-center max-w-2xl mx-auto mb-7 sm:mb-8 md:mb-9">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal uppercase tracking-[0.06em] text-[#F5F1EA] leading-tight mb-2">
            {heroTitle}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#B8C4C2] tracking-wide mb-5 font-normal">
            "{heroSubtitle}"
          </p>

          {/* Rating Display */}
          <div className="inline-flex flex-col items-center justify-center p-4 bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl shadow-sm">
            <div className="font-serif text-3xl sm:text-4xl font-normal text-[#F5F1EA] tracking-tight mb-1">
              {displayRating} <span className="text-xl text-[#B8C4C2]">/ 5</span>
            </div>
            <div className="mb-1.5">
              <StarRating rating={displayRating} starColor="#D4A72C" />
            </div>
            <div className="font-sans text-xs text-[#B8C4C2] font-medium tracking-wider uppercase">
              {displayReviewCount.toLocaleString()} REVIEWS
            </div>
          </div>
        </section>

        {/* 2. SUBSECTION & FILTER BAR */}
        <section className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(245,241,234,0.15)]">
            <div>
              <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1EA]">
                A FEW WORDS FROM OUR COMMUNITY
              </h2>
              {currentProduct && (
                <p className="font-sans text-xs text-[#B8C4C2] mt-0.5">
                  Filtered by {currentProduct.name}
                </p>
              )}
            </div>

            {/* If product filtered: link back to all reviews; else show gender tabs */}
            {currentProduct ? (
              <Link
                to="/reviews"
                className="font-sans text-xs font-semibold uppercase tracking-wider text-[#F5F1EA] hover:text-[#FFFFFF] transition-colors"
              >
                ← VIEW ALL REVIEWS
              </Link>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {['ALL', 'MEN', 'WOMEN', 'UNISEX'].map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => {
                      setActiveGender(gender);
                      setVisibleLimit(6);
                    }}
                    className={`px-3 py-1 rounded text-[11px] font-bold tracking-[0.14em] uppercase transition-colors ${
                      activeGender === gender
                        ? 'bg-[#F5F1EA] text-[#000000]'
                        : 'bg-[#0D3B48] text-[#B8C4C2] hover:text-[#F5F1EA] border border-[rgba(245,241,234,0.15)]'
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 3. REVIEWS GRID USING UNIFIED ReviewCard COMPONENT */}
        {visibleReviews.length === 0 ? (
          <div className="text-center py-12 bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl my-8">
            <p className="font-sans text-sm text-[#B8C4C2] mb-3">No reviews found for this selection.</p>
            <Link
              to="/reviews"
              className="font-sans text-xs uppercase tracking-wider font-semibold text-[#F5F1EA] hover:underline"
            >
              Reset Filters →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-10 md:mb-12">
            {visibleReviews.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>
        )}

        {/* 4. SHOW MORE REVIEWS BUTTON */}
        {hasMore && (
          <div className="text-center mb-14">
            <button
              type="button"
              onClick={handleShowMore}
              className="inline-flex items-center gap-2 bg-[#000000] hover:bg-[#151515] text-white px-7 py-3 rounded text-xs font-bold uppercase tracking-[0.16em] transition-colors duration-200 cursor-pointer shadow-sm"
            >
              <span>SHOW MORE REVIEWS</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* 5. BOTTOM EDITORIAL CTA */}
        <section className="mt-14 pt-10 border-t border-[rgba(245,241,234,0.15)] text-center max-w-xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal uppercase tracking-[0.06em] text-[#F5F1EA] mb-2">
            FIND YOUR SIGNATURE
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#B8C4C2] leading-relaxed mb-6">
            Explore the ÉLAVA collection and discover the fragrance that feels like you.
          </p>
          <Link
            to="/category/bestsellers"
            className="inline-flex items-center gap-2 bg-[#000000] hover:bg-[#151515] text-white px-6 py-3 rounded text-xs font-bold uppercase tracking-[0.16em] transition-colors shadow-sm"
          >
            <span>EXPLORE COLLECTION</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </section>
      </MainContainer>
    </div>
  );
}
