import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import StarRating from '../ui/StarRating';

/**
 * ProductCard Component
 * Compact, premium rounded product card with centered bottle photography,
 * radiant shiny gold bestseller ribbon, editorial typography, and micro-interactions.
 */
export default function ProductCard({ product, className = '' }) {
  if (!product) return null;

  return (
    <Link
      to={`/product/${product.slug}`}
      className={`group block w-full select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-elava-gold ${className}`}
      aria-label={`View ${product.name} perfume`}
    >
      {/* Compact Image Container with Rounded Corners (rounded-xl/2xl) */}
      <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#1a1a1a] aspect-[4/3.8] md:aspect-[4/4.5]">
        {/* Shiny Radiant Gold Bestseller Corner Ribbon */}
        {product.isBestseller && (
          <div className="absolute top-0 left-0 overflow-hidden w-20 h-20 pointer-events-none z-10">
            <div className="absolute top-[13px] -left-[29px] w-28 bg-[linear-gradient(135deg,#F5D770_0%,#CFA838_50%,#B3851C_100%)] text-[#171717] text-[7.5px] font-bold tracking-[0.16em] py-0.5 text-center -rotate-45 uppercase shadow-sm">
              BESTSELLER
            </div>
          </div>
        )}

        {/* Product Image: Centered Bottle Photography */}
        <img
          src={product.image}
          alt={`ÉLAVA ${product.name} perfume bottle`}
          className="w-full h-full object-cover object-center origin-center transition-transform duration-300 ease-out group-hover:scale-[1.03] will-change-transform"
          loading="lazy"
        />
      </div>

      {/* Metadata Section */}
      <div className="mt-2.5 sm:mt-3 flex flex-col space-y-1 min-w-0">
        {/* Product Name */}
        <h3 className="font-serif text-[15px] sm:text-[16px] md:text-[17px] font-medium tracking-[0.08em] uppercase text-elava-charcoal leading-snug group-hover:text-elava-charcoal transition-colors duration-200 min-w-0 break-words">
          {product.name}
        </h3>

        {/* Scent Identity */}
        <p className="text-[10.5px] sm:text-[12px] tracking-wide leading-snug min-w-0 break-words">
          {product.isBestseller ? (
            <>
              <span className="font-semibold text-elava-gold uppercase">BESTSELLER</span>
              <span className="text-elava-stone font-normal"> · {product.scentIdentity}</span>
            </>
          ) : (
            <span className="text-elava-stone font-normal">{product.scentIdentity}</span>
          )}
        </p>

        {/* Ratings & Reviews */}
        <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[12px] text-elava-stone font-light">
          <StarRating rating={product.rating} size={13} />
          <span className="font-medium text-elava-charcoal">{product.rating}</span>
          <span>·</span>
          <span>{product.reviewCount} reviews</span>
        </div>

        {/* Price & Hover Action Arrow on Same Row */}
        <div className="flex items-center justify-between pt-1 text-elava-charcoal">
          <span className="font-sans text-[12.5px] sm:text-[14px] font-semibold tracking-wide">
            ₹{product.price.toLocaleString()}
          </span>
          <ArrowUpRight
            className="w-4 h-4 text-elava-stone stroke-[1.5] transform transition-transform duration-250 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-elava-charcoal"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
