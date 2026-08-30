import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../ui/StarRating';
import products from '../../data/products';

/**
 * ReviewCard Component — Rich Warm Sand Cream #DAC29F Surface
 * Cherry top accent, Dark Espresso typography.
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
      className="bg-[#DAC29F] border border-[#BD9F7B] rounded-xl p-4 md:p-5 text-[#2A211F] flex flex-col h-full relative overflow-hidden min-w-0 shadow-sm hover:shadow-md transition-all"
      role="figure"
    >
      {/* Cherry top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#8B1E2D]" />

      {/* Star rating */}
      <div className="mb-3 flex items-center pt-1">
        <StarRating rating={rating} size={15} starColor="#C6A15B" emptyColor="#BD9F7B" />
      </div>

      {/* Review Text */}
      <blockquote className="font-manrope text-[13px] sm:text-[14px] text-[#2A211F] leading-[1.6] mb-3 flex-1 relative z-10 min-w-0 break-words font-normal">
        "{text}"
      </blockquote>

      {/* Customer Name & Product Link */}
      <div className="pt-2.5 border-t border-[#BD9F7B] flex justify-between items-end gap-2 text-[13px]">
        <div>
          <span className="font-manrope text-[#2A211F] font-semibold block text-[13px]">
            {customer}
          </span>
          {city && (
            <span className="font-manrope text-[#594B40] font-normal text-[12px]">
              {city}
            </span>
          )}
        </div>
        {matchedProduct ? (
          <Link
            to={`/product/${matchedProduct.slug}`}
            className="font-manrope text-[11px] text-[#2A211F] hover:text-[#8B1E2D] font-semibold transition-colors uppercase tracking-wider"
          >
            {productName}
          </Link>
        ) : (
          <span className="font-manrope text-[11px] text-[#2A211F] font-semibold uppercase tracking-wider">{productName}</span>
        )}
      </div>
    </div>
  );
}
