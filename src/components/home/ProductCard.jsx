import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import StarRating from '../ui/StarRating';

/**
 * ProductCard Component — Variant C: Near-Black #0D0A0C bottle backdrop for high-contrast product bottle presentation,
 * Warm Cream #F1E4D2 for Fragrance Names & Prices, Soft Taupe #CDBBAA for Scent Identity.
 */
export default function ProductCard({ product, className = '' }) {
  if (!product) return null;

  return (
    <Link
      to={`/product/${product.slug}`}
      className={`group block w-full select-none focus:outline-none active:scale-[0.98] transition-transform duration-150 ${className}`}
      aria-label={`View ${product.name} perfume`}
    >
      {/* Compact Near-Black Image Container for crisp bottle contrast */}
      <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#0D0A0C] border border-[#CDBBAA]/15 aspect-[4/3.8] md:aspect-[4/4.5] shadow-sm group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-shadow duration-300">
        {/* Refined Gold Bestseller Corner Ribbon */}
        {product.isBestseller && (
          <div className="absolute top-0 left-0 overflow-hidden w-20 h-20 pointer-events-none z-10">
            <div className="absolute top-[13px] -left-[29px] w-28 bg-[#C6A15B] text-[#241817] text-[8.5px] font-sans font-semibold tracking-wider py-0.5 text-center -rotate-45 uppercase shadow-sm">
              BESTSELLER
            </div>
          </div>
        )}

        {/* Product Image */}
        <img
          src={product.image}
          alt={`ÉLAVA ${product.name} perfume bottle`}
          className="w-full h-full object-cover object-center origin-center transition-transform duration-300 ease-out group-hover:scale-[1.03] will-change-transform"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Metadata Section */}
      <div className="mt-3 flex flex-col space-y-1 min-w-0">
        {/* Product Name — Bodoni Moda 400 */}
        <h3 className="font-serif text-[18px] sm:text-[21px] font-normal text-[#F1E4D2] leading-snug group-hover:text-[#D9B8B7] transition-colors duration-200 min-w-0 break-words">
          {product.name}
        </h3>

        {/* Scent Identity & Gold BESTSELLER Tag */}
        <p className="font-sans text-xs leading-snug min-w-0 break-words text-[#CDBBAA] font-normal">
          {product.isBestseller ? (
            <>
              <span className="font-sans font-semibold text-[#C6A15B] tracking-wider text-[10.5px] uppercase">BESTSELLER</span>
              <span> · {product.scentIdentity}</span>
            </>
          ) : (
            <span>{product.scentIdentity}</span>
          )}
        </p>

        {/* Ratings & Reviews */}
        <div className="flex items-center gap-1.5 text-xs text-[#CDBBAA]/90 font-normal">
          <StarRating rating={product.rating} size={13} starColor="#C6A15B" />
          <span className="font-semibold text-[#F1E4D2]">{product.rating}</span>
          <span>·</span>
          <span>{product.reviewCount} reviews</span>
        </div>

        {/* Price & Hover Action Arrow */}
        <div className="flex items-center justify-between pt-1 text-[#F1E4D2]">
          <span className="font-sans text-sm sm:text-base font-semibold tracking-tight text-[#F1E4D2]">
            ₹{product.price?.toLocaleString()}
          </span>
          <ArrowUpRight
            className="w-4 h-4 text-[#CDBBAA] stroke-[1.75] transform transition-transform duration-250 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#F1E4D2]"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
