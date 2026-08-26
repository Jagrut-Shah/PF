import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../ui/StarRating';
import products from '../../data/products';

/**
 * ReviewCard Component
 * Harmonized dark petrol surface testimonial card (#0D3B48) matching #0F4C5C brand canvas.
 * Card Surface: #0D3B48
 * Border: rgba(245, 241, 234, 0.15)
 * Quote Text: #F5F1EA
 * Reviewer Name: #B8C4C2
 * Product Name: #F5F1EA
 * Stars: #D4A72C
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
      className="bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl p-5 md:p-6 text-[#F5F1EA] flex flex-col h-full relative overflow-hidden min-w-0 shadow-sm"
      role="figure"
    >
      {/* Subtle decorative background quotation mark */}
      <span
        className="absolute top-0 right-3 font-serif text-[96px] leading-none text-[#F5F1EA]/[0.06] select-none pointer-events-none"
        aria-hidden="true"
      >
        "
      </span>

      {/* ★★★★★ Stars (#D4A72C) */}
      <div className="mb-3 flex items-center">
        <StarRating rating={rating} size={15} starColor="#D4A72C" />
      </div>

      {/* Quote — main content (#F5F1EA) */}
      <blockquote className="font-serif text-base lg:text-lg italic text-[#F5F1EA] leading-relaxed mb-4 flex-1 relative z-10 min-w-0 break-words font-normal">
        "{text}"
      </blockquote>

      {/* Metadata row: Customer (#B8C4C2) · City on left, PRODUCT (#F5F1EA link) on right */}
      <div className="pt-3 border-t border-[rgba(245,241,234,0.12)] flex justify-between items-end gap-2 text-xs tracking-wide">
        <span className="font-sans text-[#B8C4C2] font-medium">
          {customer} {city ? `· ${city}` : ''}
        </span>
        {matchedProduct ? (
          <Link
            to={`/product/${matchedProduct.slug}`}
            className="font-sans uppercase tracking-[0.16em] text-[10.5px] text-[#F5F1EA] hover:text-[#FFFFFF] font-semibold transition-colors"
          >
            {productName}
          </Link>
        ) : (
          <span className="font-sans uppercase tracking-[0.16em] text-[10.5px] text-[#F5F1EA] font-semibold">{productName}</span>
        )}
      </div>
    </div>
  );
}
