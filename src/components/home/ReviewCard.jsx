import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../ui/StarRating';
import products from '../../data/products';

/**
 * ReviewCard Component — Light Luxury Cream Surface
 * Manrope 400 Review Text + Manrope 600 Reviewer Name + Cream Typography
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
      className="bg-[#7F1D2D] border border-[#F3E8D8]/20 rounded-xl p-4 md:p-5 text-[#FAF6EF] flex flex-col h-full relative overflow-hidden min-w-0 shadow-xs hover:border-[#F3E8D8]/40 hover:shadow-[0_6px_18px_rgba(74,16,25,0.2)] transition-all"
      role="figure"
    >
      {/* Cream top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#F3E8D8]" />

      {/* Star rating */}
      <div className="mb-3 flex items-center pt-1">
        <StarRating rating={rating} size={15} starColor="#C6A15B" emptyColor="#D8D0C4" />
      </div>

      {/* Review Text — Manrope 400 */}
      <blockquote className="font-manrope text-[13px] sm:text-[14px] text-[#FAF6EF] leading-[1.6] mb-3 flex-1 relative z-10 min-w-0 break-words font-normal">
        "{text}"
      </blockquote>

      {/* Customer Name & Product Link — Manrope 600 & 400 */}
      <div className="pt-2.5 border-t border-[#F3E8D8]/20 flex justify-between items-end gap-2 text-[13px]">
        <div>
          <span className="font-manrope text-[#FAF6EF] font-semibold block text-[13px]">
            {customer}
          </span>
          {city && (
            <span className="font-manrope text-[#F3E8D8]/70 font-normal text-[12px]">
              {city}
            </span>
          )}
        </div>
        {matchedProduct ? (
          <Link
            to={`/product/${matchedProduct.slug}`}
            className="font-manrope text-[11px] text-[#F3E8D8]/80 hover:text-[#F3E8D8] font-semibold transition-colors uppercase tracking-wider"
          >
            {productName}
          </Link>
        ) : (
          <span className="font-manrope text-[11px] text-[#F3E8D8]/80 font-semibold uppercase tracking-wider">{productName}</span>
        )}
      </div>
    </div>
  );
}
