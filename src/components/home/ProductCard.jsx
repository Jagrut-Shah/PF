import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import StarRating from '../ui/StarRating';

/**
 * ProductCard Component
 * Dark Gen-Z high-contrast product card with strict semantic Gold BESTSELLER badge.
 */
export default function ProductCard({ product, className = '' }) {
  if (!product) return null;

  return (
    <Link
      to={`/product/${product.slug}`}
      className={`group block w-full select-none focus:outline-none ${className}`}
      aria-label={`View ${product.name} perfume`}
    >
      {/* Compact Image Container with Rounded Corners */}
      <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#111116] border border-[rgba(241,238,242,0.08)] group-hover:border-[rgba(214,47,79,0.45)] aspect-[4/3.8] md:aspect-[4/4.5] transition-colors duration-300 shadow-md">
        
        {/* Gold Bestseller Corner Ribbon (STRICT SEMANTIC GOLD #C9A227) */}
        {product.isBestseller && (
          <div className="absolute top-0 left-0 overflow-hidden w-20 h-20 pointer-events-none z-10">
            <div className="absolute top-[13px] -left-[29px] w-28 bg-[#C9A227] text-[#0A0A0C] text-[7.5px] font-extrabold tracking-[0.16em] py-0.5 text-center -rotate-45 uppercase shadow-sm">
              BESTSELLER
            </div>
          </div>
        )}

        {/* Product Image: Centered Bottle Photography */}
        <img
          src={product.image}
          alt={`ÉLAVA ${product.name} perfume bottle`}
          className="w-full h-full object-cover object-center origin-center transition-transform duration-300 ease-out group-hover:scale-[1.04] will-change-transform"
          loading="lazy"
        />
      </div>

      {/* Metadata Section */}
      <div className="mt-2.5 sm:mt-3 flex flex-col space-y-1 min-w-0">
        {/* Product Name */}
        <h3 className="font-sans text-[14px] sm:text-[15px] md:text-[16px] font-bold tracking-[0.06em] uppercase text-[#F1EEF2] leading-snug group-hover:text-[#D62F4F] transition-colors duration-200 min-w-0 break-words">
          {product.name}
        </h3>

        {/* Scent Identity & BESTSELLER Tag */}
        <p className="font-sans text-[10.5px] sm:text-[11.5px] tracking-wide leading-snug min-w-0 break-words text-[#A7A3AA]">
          {product.isBestseller ? (
            <>
              <span className="font-bold text-[#C9A227] uppercase">BESTSELLER</span>
              <span> · {product.scentIdentity}</span>
            </>
          ) : (
            <span>{product.scentIdentity}</span>
          )}
        </p>

        {/* Ratings & Reviews */}
        <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[11.5px] text-[#A7A3AA]">
          <StarRating rating={product.rating} size={13} starColor="#C9A227" />
          <span className="font-semibold text-[#F1EEF2]">{product.rating}</span>
          <span>·</span>
          <span>{product.reviewCount} reviews</span>
        </div>

        {/* Price & Hover Action Arrow on Same Row */}
        <div className="flex items-center justify-between pt-1 text-[#F1EEF2]">
          <span className="font-sans text-[13px] sm:text-[14.5px] font-bold tracking-tight">
            ₹{product.price.toLocaleString()}
          </span>
          <ArrowUpRight
            className="w-4 h-4 text-[#A7A3AA] stroke-[1.75] transform transition-transform duration-250 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#D62F4F]"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
