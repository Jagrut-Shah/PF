import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../ui/StarRating';
import products from '../../data/products';

/**
 * ReviewCard Component — Manrope 400 Review Text + Manrope 600 Reviewer Name + Manrope 400 Metadata
 * Section 22 Requirement:
 * Review text: Manrope 400. Reviewer name: Manrope 600. Metadata: Manrope 400.
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

      {/* Star rating */}
      <div className="mb-3 flex items-center pt-1">
        <StarRating rating={rating} size={15} starColor="#C6A15B" />
      </div>

      {/* Review Text — Manrope 400 (15-17px, line-height 1.6) */}
      <blockquote className="font-manrope text-[15px] sm:text-[16px] text-[#F5F2EE] leading-[1.6] mb-4 flex-1 relative z-10 min-w-0 break-words font-normal">
        "{text}"
      </blockquote>

      {/* Customer Name & Product Link — Manrope 600 & 400 */}
      <div className="pt-3 border-t border-white/10 flex justify-between items-end gap-2 text-[14px]">
        <div>
          <span className="font-manrope text-[#F5F2EE] font-semibold block">
            {customer}
          </span>
          {city && (
            <span className="font-manrope text-[#B8B3AF] font-normal text-[13px]">
              {city}
            </span>
          )}
        </div>
        {matchedProduct ? (
          <Link
            to={`/product/${matchedProduct.slug}`}
            className="font-manrope text-[13px] text-[#F5F2EE] hover:text-[#B4171E] font-semibold transition-colors uppercase tracking-wider"
          >
            {productName}
          </Link>
        ) : (
          <span className="font-manrope text-[13px] text-[#F5F2EE] font-semibold uppercase tracking-wider">{productName}</span>
        )}
      </div>
    </div>
  );
}

