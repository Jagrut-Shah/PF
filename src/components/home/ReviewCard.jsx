import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../ui/StarRating';
import products from '../../data/products';

/**
 * ReviewCard Component — Light Luxury Cream Surface
 * Manrope 400 Review Text + Manrope 600 Reviewer Name + Deep Espresso Typography
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
      className="bg-[#EEE8DD] border border-[#D9D1C6] rounded-xl p-5 md:p-6 text-[#201C19] flex flex-col h-full relative overflow-hidden min-w-0 shadow-xs hover:border-[#721C24]/40 hover:shadow-[0_6px_20px_rgba(60,45,30,0.06)] transition-all"
      role="figure"
    >
      {/* Subtle Deep Burgundy Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#721C24]" />

      {/* Star rating */}
      <div className="mb-3 flex items-center pt-1">
        <StarRating rating={rating} size={15} starColor="#C6A15B" emptyColor="#D8D0C4" />
      </div>

      {/* Review Text — Manrope 400 */}
      <blockquote className="font-manrope text-[15px] sm:text-[16px] text-[#201C19] leading-[1.6] mb-4 flex-1 relative z-10 min-w-0 break-words font-normal">
        "{text}"
      </blockquote>

      {/* Customer Name & Product Link — Manrope 600 & 400 */}
      <div className="pt-3 border-t border-[#D9D1C6] flex justify-between items-end gap-2 text-[14px]">
        <div>
          <span className="font-manrope text-[#201C19] font-semibold block">
            {customer}
          </span>
          {city && (
            <span className="font-manrope text-[#625C55] font-normal text-[13px]">
              {city}
            </span>
          )}
        </div>
        {matchedProduct ? (
          <Link
            to={`/product/${matchedProduct.slug}`}
            className="font-manrope text-[13px] text-[#201C19] hover:text-[#721C24] font-semibold transition-colors uppercase tracking-wider"
          >
            {productName}
          </Link>
        ) : (
          <span className="font-manrope text-[13px] text-[#201C19] font-semibold uppercase tracking-wider">{productName}</span>
        )}
      </div>
    </div>
  );
}
