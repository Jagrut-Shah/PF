import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import StarRating from '../ui/StarRating';

/**
 * ProductCard — Cherry + Cream palette, exact original layout.
 * Bestseller diagonal corner ribbon INSIDE image, Gold #C6A15B exclusively.
 * Warm White #FAF6EF card surface, warm espresso shadows.
 */
export default function ProductCard({ product, className = '' }) {
  if (!product) return null;

  return (
    <Link
      to={`/product/${product.slug}`}
      className={`group block w-full select-none focus:outline-none active:scale-[0.98] transition-transform duration-150 ${className}`}
      aria-label={`View ${product.name} perfume`}
    >
      {/* Warm White Image Container */}
      <div className="relative w-full overflow-hidden rounded-xl bg-[#FAF6EF] border border-[#D9C9B8] aspect-[4/3.8] md:aspect-[4/4.2] shadow-xs group-hover:shadow-[0_8px_22px_rgba(36,26,24,0.09)] transition-all duration-300 group-hover:border-[#D9C9B8]">
        {/* Gold Bestseller Diagonal Corner Ribbon — top-left inside image */}
        {product.isBestseller && (
          <div className="absolute top-0 left-0 overflow-hidden w-20 h-20 pointer-events-none z-10">
            <div className="absolute top-[13px] -left-[29px] w-28 bg-[#C6A15B] text-[#241A18] text-[9px] font-manrope font-bold tracking-wider py-0.5 text-center -rotate-45 uppercase shadow-xs">
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
        {/* Product Name */}
        <h3 className="font-manrope text-[14px] sm:text-[15px] md:text-[16px] font-semibold text-[#241A18] leading-[1.3] group-hover:text-[#7F1D2D] transition-colors duration-200 min-w-0 break-words">
          {product.name}
        </h3>

        {/* Scent Identity */}
        <p className="font-manrope text-[12px] sm:text-[13px] leading-[1.45] min-w-0 break-words text-[#A89A8B] font-normal">
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
        <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-[#A89A8B] font-manrope font-normal">
          <StarRating rating={product.rating} size={11} starColor="#C6A15B" emptyColor="#D9C9B8" />
          <span className="font-semibold text-[#241A18]">{product.rating}</span>
          <span>·</span>
          <span>{product.reviewCount} reviews</span>
        </div>

        {/* Price & Arrow */}
        <div className="flex items-center justify-between pt-0.5 text-[#241A18]">
          <span className="font-manrope text-[14px] sm:text-[15px] md:text-[16px] font-semibold text-[#241A18]">
            ₹{product.price?.toLocaleString()}
          </span>
          <ArrowUpRight
            className="w-3.5 h-3.5 text-[#A89A8B] stroke-[1.75] transform transition-transform duration-250 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#7F1D2D]"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
