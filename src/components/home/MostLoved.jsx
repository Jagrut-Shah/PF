import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import ProductCard from './ProductCard';
import products from '../../data/products';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * MostLoved Homepage Section — Light Luxury Palette (Exact Original Layout)
 * Warm Ivory #F6F2EA section environment + Bestseller Gold #C6A15B highlight.
 */
export default function MostLoved() {
  const mostLovedProducts = products.filter((p) => p.isBestseller === true).slice(0, 4);
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-8 sm:py-12 bg-[#FBF8F2] text-[#2A211F] relative overflow-hidden border-b border-[#D9C9B8]" aria-labelledby="most-loved-heading">
      {/* Subtle Champagne Ambient Light Zone */}
      <div className="absolute inset-0 bg-ambient-bestsellers pointer-events-none" />

      <MainContainer className="relative z-10">
        <div ref={ref} className={`reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 pb-1 gap-3">
            <div>
              <h2
                id="most-loved-heading"
                className="font-bodoni text-[24px] sm:text-[30px] md:text-[36px] font-medium text-[#2A211F] leading-[1.05] tracking-[-0.015em]"
              >
                Most Loved · <span className="font-manrope font-semibold text-[#C6A15B] uppercase tracking-[0.09em] text-[15px] sm:text-[18px] md:text-[20px]">BESTSELLERS</span>
              </h2>
              <p className="font-manrope text-[13px] sm:text-[14px] text-[#A89A8B] mt-1 font-normal leading-[1.4]">
                Our most coveted fragrance signatures.
              </p>
            </div>

            <Link
              to="/category/bestsellers"
              className="group inline-flex items-center gap-1.5 font-manrope text-[13px] font-semibold text-[#2A211F] hover:text-[#8B1E2D] transition-colors duration-200 self-start sm:self-end pb-0.5 btn-interactive"
              aria-label="View all bestsellers"
            >
              <span>View All Bestsellers</span>
              <ArrowRight
                className="w-3.5 h-3.5 stroke-[2] transform transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Mobile 2x2 grid with staggered reveal */}
          <div className="md:hidden grid grid-cols-2 gap-3">
            {mostLovedProducts.map((product, idx) => (
              <div
                key={product.id}
                className={`min-w-0 w-full reveal-init ${
                  isVisible ? `reveal-visible stagger-${(idx % 4) + 1}` : ''
                }`}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Desktop 4-column grid with staggered reveal */}
          <div className="hidden md:grid md:grid-cols-4 gap-4 min-w-0">
            {mostLovedProducts.map((product, idx) => (
              <div
                key={product.id}
                className={`min-w-0 w-full reveal-init ${
                  isVisible ? `reveal-visible stagger-${idx + 1}` : ''
                }`}
              >
                <ProductCard product={product} className="w-full" />
              </div>
            ))}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
