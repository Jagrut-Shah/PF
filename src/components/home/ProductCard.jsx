import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import StarRating from '../ui/StarRating';

/**
 * ProductCard Component — Manrope 600 for Product Names and Prices, Manrope 400/500 for Supporting Details.
 */
export default function ProductCard({ product, className = '' }) {
  if (!product) return null;

  return (
    <Link
      to={`/product/${product.slug}`}
      className={`group block w-full select-none focus:outline-none ${className}`}
      aria-label={`View ${product.name} perfume`}
    >
      {/* Compact Image Container */}
      <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#641D2D] border border-[#E7C4C5]/15 aspect-[4/3.8] md:aspect-[4/4.5]">
        {/* Refined Gold Bestseller Corner Ribbon */}
        {product.isBestseller && (
          <div className="absolute top-0 left-0 overflow-hidden w-20 h-20 pointer-events-none z-10">
            <div className="absolute top-[13px] -left-[29px] w-28 bg-[#C6A15B] text-[#2A0D14] text-[8px] font-sans font-semibold tracking-wider py-0.5 text-center -rotate-45 uppercase shadow-sm">
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
        {/* Product Name — Manrope 600 Title Case */}
        <h3 className="font-sans text-sm sm:text-base font-semibold text-[#F6EFE7] leading-snug group-hover:text-[#C94B5B] transition-colors duration-200 min-w-0 break-words">
          ÉLAVA {product.name}
        </h3>

        {/* Scent Identity & Gold BESTSELLER Tag */}
        <p className="font-sans text-xs leading-snug min-w-0 break-words text-[#E7C4C5]/85 font-normal">
          {product.isBestseller ? (
            <>
              <span className="font-sans font-semibold text-[#C6A15B] tracking-wider text-[10.5px] uppercase">BESTSELLER</span>
              <span> · {product.scentIdentity}</span>
            </>
          ) : (
            <span>{product.scentIdentity}</span>
          )}
        </p>

        {/* Ratings & Reviews — Manrope 400/500 */}
        <div className="flex items-center gap-1.5 text-xs text-[#E7C4C5]/80 font-normal">
          <StarRating rating={product.rating} size={13} starColor="#C6A15B" />
          <span className="font-semibold text-[#F6EFE7]">{product.rating}</span>
          <span>·</span>
          <span>{product.reviewCount} reviews</span>
        </div>

        {/* Price & Hover Action Arrow — Manrope 600 */}
        <div className="flex items-center justify-between pt-1 text-[#F6EFE7]">
          <span className="font-sans text-sm sm:text-base font-semibold tracking-tight text-[#F6EFE7]">
            ₹{product.price?.toLocaleString()}
          </span>
          <ArrowUpRight
            className="w-4 h-4 text-[#E7C4C5] stroke-[1.75] transform transition-transform duration-250 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#F6EFE7]"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
