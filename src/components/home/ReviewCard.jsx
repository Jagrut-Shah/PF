import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../ui/StarRating';
import products from '../../data/products';

/**
 * ReviewCard Component — Editorial Light Presentation
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
      className="bg-[#FBF8F3] border border-[#08111F]/10 rounded-2xl p-6 text-[#08111F] flex flex-col h-full relative overflow-hidden min-w-0 shadow-xs hover:shadow-md transition-shadow"
      role="figure"
    >
      {/* Decorative quotation mark */}
      <span
        className="absolute top-2 right-4 font-serif text-[80px] leading-none text-[#08111F]/[0.08] select-none pointer-events-none"
        aria-hidden="true"
      >
        "
      </span>

      {/* ★★★★★ Stars */}
      <div className="mb-3 flex items-center">
        <StarRating rating={rating} size={15} starColor="#C6A15B" />
      </div>

      {/* Quote */}
      <blockquote className="font-serif text-base lg:text-lg italic text-[#08111F] leading-relaxed mb-4 flex-1 relative z-10 min-w-0 break-words font-normal">
        "{text}"
      </blockquote>

      {/* Metadata row */}
      <div className="pt-3 border-t border-[#08111F]/10 flex justify-between items-end gap-2 text-xs tracking-wide">
        <span className="font-sans text-[#111A27]/75 font-medium">
          {customer} {city ? `· ${city}` : ''}
        </span>
        {matchedProduct ? (
          <Link
            to={`/product/${matchedProduct.slug}`}
            className="font-sans uppercase tracking-[0.16em] text-[10.5px] text-[#285BE6] hover:underline font-bold transition-colors"
          >
            {productName}
          </Link>
        ) : (
          <span className="font-sans uppercase tracking-[0.16em] text-[10.5px] text-[#08111F] font-semibold">{productName}</span>
        )}
      </div>
    </div>
  );
}
