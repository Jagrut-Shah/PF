import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import StarRating from '../ui/StarRating';

/**
 * ProductCard Component — Editorial Product Presentation
 * Master Reference: Cream/Ivory foundation, Gold #C6A15B Bestseller ribbon & tag ONLY, Midnight Navy typography.
 */
export default function ProductCard({ product, className = '' }) {
  if (!product) return null;

  return (
    <Link
      to={`/product/${product.slug}`}
      className={`group block w-full select-none focus:outline-none ${className}`}
      aria-label={`View ${product.name} perfume`}
    >
      {/* Editorial Image Box */}
      <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#FBF8F3] border border-[#08111F]/10 aspect-[4/4.5] shadow-xs group-hover:shadow-md transition-shadow duration-300">
        {/* Refined Warm Gold Bestseller Corner Ribbon */}
        {product.isBestseller && (
          <div className="absolute top-0 left-0 overflow-hidden w-20 h-20 pointer-events-none z-10">
            <div className="absolute top-[13px] -left-[29px] w-28 bg-[#C6A15B] text-[#08111F] text-[7.5px] font-extrabold tracking-[0.16em] py-0.5 text-center -rotate-45 uppercase shadow-xs">
              BESTSELLER
            </div>
          </div>
        )}

        {/* Product Image */}
        <img
          src={product.image}
          alt={`ÉLAVA ${product.name} perfume bottle`}
          className="w-full h-full object-cover object-center origin-center transition-transform duration-500 ease-out group-hover:scale-[1.04] will-change-transform"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Editorial Metadata Section */}
      <div className="mt-2.5 sm:mt-3 flex flex-col space-y-1 min-w-0">
        {/* Product Name */}
        <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide uppercase text-[#08111F] leading-snug group-hover:text-[#285BE6] transition-colors duration-200 min-w-0 break-words">
          ÉLAVA {product.name}
        </h3>

        {/* Scent Identity & Gold BESTSELLER Tag */}
        <p className="font-sans text-[11px] sm:text-[11.5px] tracking-wide leading-snug min-w-0 break-words text-[#111A27]/75">
          {product.isBestseller ? (
            <>
              <span className="font-bold text-[#C6A15B] uppercase">BESTSELLER</span>
              <span> · {product.scentIdentity}</span>
            </>
          ) : (
            <span>{product.scentIdentity}</span>
          )}
        </p>

        {/* Ratings & Reviews */}
        <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[11.5px] text-[#111A27]/70 pt-0.5">
          <StarRating rating={product.rating} size={13} starColor="#C6A15B" />
          <span className="font-semibold text-[#08111F]">{product.rating}</span>
          <span>·</span>
          <span>{product.reviewCount} reviews</span>
        </div>

        {/* Price & Hover Action Arrow */}
        <div className="flex items-center justify-between pt-1 text-[#08111F]">
          <span className="font-sans text-sm sm:text-base font-bold tracking-tight text-[#08111F]">
            ₹{product.price?.toLocaleString()}
          </span>
          <div className="w-7 h-7 rounded-full bg-[#08111F]/[0.05] group-hover:bg-[#285BE6] flex items-center justify-center transition-colors duration-200">
            <ArrowUpRight
              className="w-3.5 h-3.5 text-[#08111F] group-hover:text-white stroke-[2] transform transition-transform duration-250 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
