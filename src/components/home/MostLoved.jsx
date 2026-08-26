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
  const mostLovedProducts = products.filter((p) => p.isBestseller === true).slice(0, 4);

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-[#F7F3EC] text-[#111A27] border-b border-[#08111F]/10" aria-labelledby="most-loved-heading">
      <MainContainer>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 pb-1 gap-2">
          <div>
            <span className="font-sans text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#C6A15B] block">
              MOST COVETED SIGNATURES
            </span>
            <h2
              id="most-loved-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-wide font-light uppercase text-[#08111F] leading-tight mt-1"
            >
              ÉLAVA <span className="text-[#C6A15B] font-normal">BESTSELLERS</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#111A27]/70 mt-1 font-normal tracking-wide">
              Handcrafted Eau de Parfum signatures made for enduring impression.
            </p>
          </div>

          <Link
            to="/category/bestsellers"
            className="group inline-flex items-center gap-2 font-sans text-xs font-bold tracking-[0.16em] uppercase text-[#08111F] hover:text-[#285BE6] transition-colors duration-200 self-start sm:self-end pb-0.5"
            aria-label="View all bestsellers"
          >
            <span>VIEW ALL BESTSELLERS</span>
            <ArrowRight
              className="w-4 h-4 text-[#285BE6] stroke-[2] transform transition-transform duration-200 group-hover:translate-x-1"
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
        <div className="hidden md:grid md:grid-cols-4 gap-3 min-w-0">
          {mostLovedProducts.map((product) => (
            <ProductCard key={product.id} product={product} className="w-full" />
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
