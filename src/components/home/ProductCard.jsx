import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import StarRating from '../ui/StarRating';

/**
 * ProductCard — Black #1A1412 image container + Very Dark Cream #DAC29F title.
 * Gold #C6A15B reserved exclusively for Bestseller ribbon & star ratings.
 */
export default function ProductCard({ product, className = '' }) {
  if (!product) return null;

  return (
    <Link
      to={`/product/${product.slug}`}
      className={`group block w-full select-none focus:outline-none active:scale-[0.98] transition-transform duration-150 ${className}`}
      aria-label={`View ${product.name} perfume`}
    >
      {/* Black Image Container */}
      <div className="relative w-full overflow-hidden rounded-xl bg-[#1A1412] border border-[#3D2E2A] aspect-[4/3.8] md:aspect-[4/4.2] shadow-md group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:border-[#DAC29F]/40">
        {/* Gold Bestseller Diagonal Corner Ribbon — top-left inside image */}
        {product.isBestseller && (
          <div className="absolute top-0 left-0 overflow-hidden w-20 h-20 pointer-events-none z-10">
            <div className="absolute top-[13px] -left-[29px] w-28 bg-[#C6A15B] text-[#120E0D] text-[9px] font-manrope font-bold tracking-wider py-0.5 text-center -rotate-45 uppercase shadow-xs">
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

      {/* Metadata */}
      <div className="mt-2.5 flex flex-col space-y-0.5 min-w-0">
        {/* Product Name — Very Dark Cream #DAC29F */}
        <h3 className="font-manrope text-[14px] sm:text-[15px] md:text-[16px] font-semibold text-[#DAC29F] leading-[1.3] group-hover:text-[#E5D7C3] transition-colors duration-200 min-w-0 break-words">
          {product.name}
        </h3>

        {/* Scent Identity */}
        <p className="font-manrope text-[12px] sm:text-[13px] leading-[1.45] min-w-0 break-words text-[#DAC29F]/70 font-normal">
          {product.isBestseller ? (
            <>
              <span className="font-manrope font-semibold text-[#C6A15B] tracking-wider text-[10px] uppercase">BESTSELLER</span>
              <span> · {product.scentIdentity}</span>
            </>
          ) : (
            <span>{product.scentIdentity}</span>
          )}
        </p>

        {/* Ratings */}
        <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-[#DAC29F]/70 font-manrope font-normal">
          <StarRating rating={product.rating} size={11} starColor="#C6A15B" emptyColor="#3D2E2A" />
          <span className="font-semibold text-[#DAC29F]">{product.rating}</span>
          <span>·</span>
          <span>{product.reviewCount} reviews</span>
        </div>

        {/* Price & Arrow */}
        <div className="flex items-center justify-between pt-0.5 text-[#DAC29F]">
          <span className="font-manrope text-[14px] sm:text-[15px] md:text-[16px] font-semibold text-[#DAC29F]">
            ₹{product.price?.toLocaleString()}
          </span>
          <ArrowUpRight
            className="w-3.5 h-3.5 text-[#DAC29F]/80 stroke-[1.75] transform transition-transform duration-250 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#E5D7C3]"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
