import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import ProductCard from './ProductCard';
import products from '../../data/products';

/**
 * MostLoved Homepage Section
 * 4-column desktop / 2-column mobile showcase of top bestselling signatures.
 */
export default function MostLoved() {
  // Display only bestsellers (NOIR, OUD X, VELVET, AURA)
  const mostLovedProducts = products.filter((p) => p.isBestseller === true).slice(0, 4);

  return (
    <section className="pb-4 sm:pb-5 md:pb-6" aria-labelledby="most-loved-heading">
      <MainContainer>
        {/* Section Header with Title/Subtitle on Left and View All Link on Right */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-5 pb-1 gap-2">
          <div>
            <h2
              id="most-loved-heading"
              className="font-sans text-[22px] sm:text-[26px] md:text-[28px] tracking-[0.06em] font-bold uppercase text-[#F5F1EA] leading-tight"
            >
              MOST LOVED
            </h2>
            <p className="font-sans text-[13px] sm:text-[14px] text-[#B8C4C2] mt-1 font-normal tracking-wide">
              Our most coveted signatures.
            </p>
          </div>

          <Link
            to="/category/bestsellers"
            className="group inline-flex items-center gap-1.5 font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.16em] uppercase text-[#F5F1EA] hover:text-[#FFFFFF] transition-colors duration-200 self-start sm:self-end pb-0.5"
            aria-label="View all bestsellers"
          >
            <span>VIEW ALL BESTSELLERS</span>
            <ArrowRight
              className="w-3.5 h-3.5 stroke-[1.75] transform transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Mobile 2x2 grid — show all four products without horizontal scroll */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {mostLovedProducts.map((product) => (
            <div key={product.id} className="min-w-0 w-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Desktop 4-column grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-3 min-w-0">
          {mostLovedProducts.map((product) => (
            <ProductCard key={product.id} product={product} className="w-full" />
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
