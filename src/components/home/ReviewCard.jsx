import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../ui/StarRating';
import products from '../../data/products';

/**
 * ReviewCard Component — Manrope for review quote text, customer name (600), rating (600).
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
      className="bg-[#641D2D] border border-[#E7C4C5]/15 rounded-xl p-5 md:p-6 text-[#F6EFE7] flex flex-col h-full relative overflow-hidden min-w-0 shadow-sm"
      role="figure"
    >
      {/* Decorative quotation mark */}
      <span
        className="absolute top-0 right-3 font-serif text-[96px] leading-none text-[#F6EFE7]/[0.06] select-none pointer-events-none"
        aria-hidden="true"
      >
        "
      </span>

      {/* Star rating */}
      <div className="mb-3 flex items-center">
        <StarRating rating={rating} size={15} starColor="#E7C4C5" />
      </div>

      {/* Review Text — Manrope 400 leading-relaxed */}
      <blockquote className="font-sans text-sm sm:text-base text-[#F6EFE7] leading-relaxed mb-4 flex-1 relative z-10 min-w-0 break-words font-normal">
        "{text}"
      </blockquote>

      {/* Customer Name & Product Link — Manrope 600 */}
      <div className="pt-3 border-t border-[#E7C4C5]/15 flex justify-between items-end gap-2 text-xs">
        <span className="font-sans text-[#E7C4C5]/90 font-semibold">
          {customer} {city ? `· ${city}` : ''}
        </span>
        {matchedProduct ? (
          <Link
            to={`/product/${matchedProduct.slug}`}
            className="font-sans text-[11px] text-[#F6EFE7] hover:text-[#C94B5B] font-semibold transition-colors uppercase tracking-wider"
          >
            {productName}
          </Link>
        ) : (
          <span className="font-sans text-[11px] text-[#F6EFE7] font-semibold uppercase tracking-wider">{productName}</span>
        )}
      </div>
    </div>
  );
}
