import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import ProductCard from './ProductCard';
import products from '../../data/products';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * MostLoved Homepage Section — Layered Black & Red Atmosphere & Motion:
 * Soft Black #111111 environment + Level 1 diffuse ambient red wash + Staggered scroll reveal.
 * Bestseller Gold #C6A15B strictly preserved for BESTSELLERS tag.
 */
export default function MostLoved() {
  const mostLovedProducts = products.filter((p) => p.isBestseller === true).slice(0, 4);
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-8 sm:py-12 bg-[#111111] text-[#F5F2EE] relative overflow-hidden" aria-labelledby="most-loved-heading">
      {/* Level 1 Diffuse Red Ambient Light */}
      <div className="absolute inset-0 bg-ambient-red pointer-events-none" />

      <MainContainer className="relative z-10">
        <div ref={ref} className={`reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
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
              className="group inline-flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold tracking-wider text-[#F5F2EE] hover:text-[#B4171E] transition-colors duration-200 self-start sm:self-end pb-0.5 btn-interactive"
              aria-label="View all bestsellers"
            >
              <span>View All Bestsellers</span>
              <ArrowRight
                className="w-3.5 h-3.5 stroke-[1.75] transform transition-transform duration-200 group-hover:translate-x-1.5"
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
