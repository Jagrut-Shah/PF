import React from 'react';
import { Star } from 'lucide-react';
import products from '../../data/products';

/**
 * ReviewCard Component
 * Displays a single review: stars → quote (with subtle bg quotation mark) → customer · city | product.
 * Uses h-full + flex-col so all cards in a CSS grid row share identical height.
 */
export default function ReviewCard({ review }) {
  const product = products.find((p) => p.id === review.productId);
  const productName = product ? product.name : '';

  return (
    <div
      className="bg-[#F3EFE7] border border-[#E5E0D9] rounded-[6px] p-4 sm:p-5 text-elava-charcoal flex flex-col h-full relative overflow-hidden min-w-0"
      role="figure"
    >
      {/* Subtle oversized opening quotation mark — very low contrast, purely decorative */}
      <span
        className="absolute top-0 right-3 font-serif text-[96px] leading-none text-elava-charcoal/[0.04] select-none pointer-events-none"
        aria-hidden="true"
      >
        "
      </span>

      {/* ★★★★★ */}
      <div className="mb-2.5 flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} size={15} className="text-elava-gold fill-current" aria-hidden="true" />
        ))}
      </div>

      {/* Quote — main content, grows to fill available height */}
      <p className="font-serif text-[15px] sm:text-[16px] leading-relaxed mb-4 flex-1 relative z-10 min-w-0 break-words">
        {`"${review.quote}"`}
      </p>

      {/* Metadata row: Customer · City on left, PRODUCT on right */}
      <div className="flex justify-between items-end gap-2 text-[10.5px] sm:text-[11.5px] text-elava-stone tracking-wide">
        <span className="font-sans">{`${review.customerName} · ${review.location}`}</span>
        <span className="font-sans uppercase tracking-[0.1em]">{productName}</span>
      </div>
    </div>
  );
}
