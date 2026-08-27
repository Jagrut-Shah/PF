import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import ProductCard from './ProductCard';
import products from '../../data/products';

/**
 * MostLoved Homepage Section — Black & Red Luxury Aesthetic:
 * Deep Black #0B0B0B environment, Warm White #F5F2EE headline.
 * Bestseller Gold #C6A15B strictly preserved for BESTSELLERS tag.
 */
export default function MostLoved() {
  const mostLovedProducts = products.filter((p) => p.isBestseller === true).slice(0, 4);

  return (
    <section className="py-8 sm:py-12 bg-[#0B0B0B] text-[#F5F2EE]" aria-labelledby="most-loved-heading">
      <MainContainer>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 pb-1 gap-3">
          <div>
            <h2
              id="most-loved-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F5F2EE] leading-tight tracking-tight"
            >
              Most Loved · <span className="font-sans font-semibold tracking-widest text-[#C6A15B] uppercase text-xl sm:text-2xl md:text-3xl">BESTSELLERS</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#B8B3AF] mt-1 font-normal leading-relaxed">
              Our most coveted fragrance signatures.
            </p>
          </div>

          <Link
            to="/category/bestsellers"
            className="group inline-flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold tracking-wider text-[#F5F2EE] hover:text-[#B4171E] transition-colors duration-200 self-start sm:self-end pb-0.5"
            aria-label="View all bestsellers"
          >
            <span>View All Bestsellers</span>
            <ArrowRight
              className="w-3.5 h-3.5 stroke-[1.75] transform transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Mobile 2x2 grid */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {mostLovedProducts.map((product) => (
            <div key={product.id} className="min-w-0 w-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Desktop 4-column grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-4 min-w-0">
          {mostLovedProducts.map((product) => (
            <ProductCard key={product.id} product={product} className="w-full" />
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
