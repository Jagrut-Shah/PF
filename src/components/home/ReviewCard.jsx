import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../ui/StarRating';
import products from '../../data/products';

/**
 * ReviewCard Component — Black & Red Luxury Aesthetic:
 * Soft Black #121212 cards, Warm White #F5F2EE text, Deep Red #8F1018 accent lines.
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
      className="bg-[#121212] border border-white/10 rounded-xl p-5 md:p-6 text-[#F5F2EE] flex flex-col h-full relative overflow-hidden min-w-0 shadow-md hover:border-[#B4171E]/40 transition-colors"
      role="figure"
    >
      {/* Subtle Deep Red Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#8F1018]" />

      {/* Decorative quotation mark */}
      <span
        className="absolute top-1 right-3 font-serif text-[96px] leading-none text-white/[0.04] select-none pointer-events-none"
        aria-hidden="true"
      >
        "
      </span>

      {/* Star rating */}
      <div className="mb-3 flex items-center pt-1">
        <StarRating rating={rating} size={15} starColor="#C6A15B" />
      </div>

      {/* Review Text — Manrope 400 leading-relaxed */}
      <blockquote className="font-sans text-sm sm:text-base text-[#F5F2EE] leading-relaxed mb-4 flex-1 relative z-10 min-w-0 break-words font-normal">
        "{text}"
      </blockquote>

      {/* Customer Name & Product Link — Manrope 600 */}
      <div className="pt-3 border-t border-white/10 flex justify-between items-end gap-2 text-xs">
        <span className="font-sans text-[#B8B3AF] font-semibold">
          {customer} {city ? `· ${city}` : ''}
        </span>
        {matchedProduct ? (
          <Link
            to={`/product/${matchedProduct.slug}`}
            className="font-sans text-[11px] text-[#F5F2EE] hover:text-[#B4171E] font-semibold transition-colors uppercase tracking-wider"
          >
            {productName}
          </Link>
        ) : (
          <span className="font-sans text-[11px] text-[#F5F2EE] font-semibold uppercase tracking-wider">{productName}</span>
        )}
      </div>
    </div>
  );
}
