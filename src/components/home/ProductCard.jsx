import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import StarRating from '../ui/StarRating';

/**
 * ProductCard Component
 * Modern, Gen-Z high-contrast product card.
 * Strong sans-serif typography, light neutral headers/prices, reserved gold for stars only.
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
      <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#102F38] border border-[rgba(243,235,221,0.15)] aspect-[4/3.8] md:aspect-[4/4.5]">
        {/* Subtle Burgundy Bestseller Corner Ribbon */}
        {product.isBestseller && (
          <div className="absolute top-0 left-0 overflow-hidden w-20 h-20 pointer-events-none z-10">
            <div className="absolute top-[13px] -left-[29px] w-28 bg-[#7A2929] text-[#F5F1EA] text-[7.5px] font-bold tracking-[0.16em] py-0.5 text-center -rotate-45 uppercase shadow-sm">
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
        <h3 className="font-sans text-[14px] sm:text-[15px] md:text-[16px] font-bold tracking-[0.06em] uppercase text-[#F5F1EA] leading-snug group-hover:text-[#FFFFFF] transition-colors duration-200 min-w-0 break-words">
          {product.name}
        </h3>

        {/* Scent Identity */}
        <p className="font-sans text-[10.5px] sm:text-[11.5px] tracking-wide leading-snug min-w-0 break-words text-[#B8C4C2]">
          {product.isBestseller ? (
            <>
              <span className="font-semibold text-[#F5F1EA] uppercase">BESTSELLER</span>
              <span> · {product.scentIdentity}</span>
            </>
          ) : (
            <span>{product.scentIdentity}</span>
          )}
        </p>

        {/* Ratings & Reviews */}
        <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[11.5px] text-[#B8C4C2]">
          <StarRating rating={product.rating} size={13} starColor="#C5A15A" />
          <span className="font-semibold text-[#F5F1EA]">{product.rating}</span>
          <span>·</span>
          <span>{product.reviewCount} reviews</span>
        </div>

        {/* Price & Hover Action Arrow on Same Row */}
        <div className="flex items-center justify-between pt-1 text-[#F5F1EA]">
          <span className="font-sans text-[13px] sm:text-[14.5px] font-bold tracking-tight">
            ₹{product.price.toLocaleString()}
          </span>
          <ArrowUpRight
            className="w-4 h-4 text-[#B8C4C2] stroke-[1.75] transform transition-transform duration-250 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#F5F1EA]"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
