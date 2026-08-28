import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import StarRating from '../ui/StarRating';

/**
 * ProductCard Component — Light Luxury Palette (Exact Original Layout & Spacing)
 * Bestseller Gold #C6A15B tag strictly preserved.
 */
export default function ProductCard({ product, className = '' }) {
  if (!product) return null;

  return (
    <Link
      to={`/product/${product.slug}`}
      className={`group block w-full select-none focus:outline-none active:scale-[0.98] transition-transform duration-150 ${className}`}
      aria-label={`View ${product.name} perfume`}
    >
      {/* Image Container with Original Layout */}
      <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#EEE8DD] border border-[#D9D1C6] aspect-[4/3.8] md:aspect-[4/4.5] shadow-xs group-hover:shadow-[0_8px_24px_rgba(60,45,30,0.08)] transition-all duration-300 group-hover:border-[#D8D0C4]">
        {/* Refined Gold Bestseller Corner Ribbon */}
        {product.isBestseller && (
          <div className="absolute top-0 left-0 overflow-hidden w-20 h-20 pointer-events-none z-10">
            <div className="absolute top-[13px] -left-[29px] w-28 bg-[#C6A15B] text-[#201C19] text-[9px] font-manrope font-semibold tracking-wider py-0.5 text-center -rotate-45 uppercase shadow-xs">
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
        {/* Product Name — Manrope 600 (16-19px) */}
        <h3 className="font-manrope text-[16px] sm:text-[18px] md:text-[19px] font-semibold text-[#201C19] leading-[1.3] group-hover:text-[#721C24] transition-colors duration-200 min-w-0 break-words">
          {product.name}
        </h3>

        {/* Scent Identity & Gold BESTSELLER Tag — Manrope 400 (14-15px) */}
        <p className="font-manrope text-[14px] sm:text-[15px] leading-[1.5] min-w-0 break-words text-[#625C55] font-normal">
          {product.isBestseller ? (
            <>
              <span className="font-manrope font-semibold text-[#C6A15B] tracking-wider text-[12px] uppercase">BESTSELLER</span>
              <span> · {product.scentIdentity}</span>
            </>
          ) : (
            <span>{product.scentIdentity}</span>
          )}
        </p>

        {/* Ratings & Reviews — Manrope 400 */}
        <div className="flex items-center gap-1.5 text-[13px] text-[#625C55] font-manrope font-normal">
          <StarRating rating={product.rating} size={13} starColor="#C6A15B" emptyColor="#D8D0C4" />
          <span className="font-semibold text-[#201C19]">{product.rating}</span>
          <span>·</span>
          <span>{product.reviewCount} reviews</span>
        </div>

        {/* Price & Hover Action Arrow — Manrope 600 (16-19px) */}
        <div className="flex items-center justify-between pt-1 text-[#201C19]">
          <span className="font-manrope text-[16px] sm:text-[18px] md:text-[19px] font-semibold text-[#201C19]">
            ₹{product.price?.toLocaleString()}
          </span>
          <ArrowUpRight
            className="w-4 h-4 text-[#625C55] stroke-[1.75] transform transition-transform duration-250 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#721C24]"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
