import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../ui/StarRating';
import products from '../../data/products';

/**
 * ReviewCard Component
 * Deep Burgundy surface testimonial card (#3A1729) with strict semantic Gold stars (#C9A227)
 */
export default function ReviewCard({ review }) {
  if (!review) return null;

  const text = review.text || review.quote || '';
  const customer = review.customer || review.customerName || '';
  const city = review.city || review.location || '';

  const matchedProduct = products.find(
    (p) => p.slug === review.productSlug || p.id === review.productId
  );
  const productName = review.productName || (matchedProduct ? matchedProduct.name : '');
  const rating = review.rating || 5;

  return (
    <div
      className="bg-[#3A1729] border border-[rgba(217,138,155,0.20)] rounded-xl p-5 md:p-6 text-[#FFF8F7] flex flex-col h-full relative overflow-hidden min-w-0 shadow-md"
      role="figure"
    >
      {/* Subtle decorative background quotation mark */}
      <span
        className="absolute top-0 right-3 font-serif text-[96px] leading-none text-[#D98A9B]/[0.08] select-none pointer-events-none"
        aria-hidden="true"
      >
        "
      </span>

      {/* ★★★★★ Stars (#C9A227 - Strict semantic gold for star ratings) */}
      <div className="mb-3 flex items-center">
        <StarRating rating={rating} size={15} starColor="#C9A227" />
      </div>

      {/* Quote — main content (#FFF8F7) */}
      <blockquote className="font-serif text-base lg:text-lg italic text-[#FFF8F7] leading-relaxed mb-4 flex-1 relative z-10 min-w-0 break-words font-normal">
        "{text}"
      </blockquote>

      {/* Metadata row: Customer (#D98A9B) · City on left, PRODUCT (#C94F70 link) on right */}
      <div className="pt-3 border-t border-[rgba(217,138,155,0.15)] flex justify-between items-end gap-2 text-xs tracking-wide">
        <span className="font-sans text-[#D98A9B] font-medium">
          {customer} {city ? `· ${city}` : ''}
        </span>
        {matchedProduct ? (
          <Link
            to={`/product/${matchedProduct.slug}`}
            className="font-sans uppercase tracking-[0.16em] text-[10.5px] text-[#C94F70] hover:text-[#E96885] font-semibold transition-colors"
          >
            {productName}
          </Link>
        ) : (
          <span className="font-sans uppercase tracking-[0.16em] text-[10.5px] text-[#FFF8F7] font-semibold">{productName}</span>
        )}
      </div>
    </div>
  );
}
