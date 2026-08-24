import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import ProductCard from './ProductCard';
import products from '../../data/products';

/**
 * MostLoved Homepage Section
 * MOST LOVED: Deep Plum / Charcoal (#17151A / #241326) so perfume bottles stand out
 */
export default function MostLoved() {
  // Display only bestsellers
  const mostLovedProducts = products.filter((p) => p.isBestseller === true).slice(0, 4);

  return (
    <section className="py-8 sm:py-12 bg-[#17151A] border-b border-[rgba(217,138,155,0.12)] text-[#FFF8F7]" aria-labelledby="most-loved-heading">
      <MainContainer>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 pb-1 gap-2">
          <div>
            <h2
              id="most-loved-heading"
              className="font-serif text-[22px] sm:text-[26px] md:text-[28px] tracking-[0.06em] font-bold uppercase text-[#FFF8F7] leading-tight"
            >
              MOST LOVED
            </h2>
            <p className="font-sans text-[13px] sm:text-[14px] text-[#D98A9B] mt-1 font-normal tracking-wide">
              Our most coveted signatures.
            </p>
          </div>

          <Link
            to="/category/bestsellers"
            className="group inline-flex items-center gap-1.5 font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.16em] uppercase text-[#C94F70] hover:text-[#E96885] transition-colors duration-200 self-start sm:self-end pb-0.5"
            aria-label="View all bestsellers"
          >
            <span>VIEW ALL BESTSELLERS</span>
            <ArrowRight
              className="w-3.5 h-3.5 stroke-[2] transform transition-transform duration-200 group-hover:translate-x-1"
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
