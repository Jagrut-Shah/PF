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
  // Display the 4 most loved signatures
  const mostLovedProducts = products.slice(0, 4);

  return (
    <section className="pb-4 sm:pb-5 md:pb-6" aria-labelledby="most-loved-heading">
      <MainContainer>
        {/* Section Header with Title/Subtitle on Left and View All Link on Right */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-5 pb-1 gap-2">
          <div>
            <h2
              id="most-loved-heading"
              className="font-serif text-[26px] sm:text-[30px] md:text-[32px] tracking-[0.06em] font-normal uppercase text-elava-charcoal leading-tight"
            >
              MOST LOVED
            </h2>
            <p className="font-sans text-[13px] sm:text-[14px] text-elava-stone mt-1 sm:mt-1.5 font-normal tracking-wide">
              Our most coveted signatures.
            </p>
          </div>

          <Link
            to="/category/bestsellers"
            className="group inline-flex items-center gap-1.5 font-sans text-[11px] sm:text-[12px] font-medium tracking-[0.16em] uppercase text-elava-charcoal hover:text-[#2C1F14] transition-colors duration-200 self-start sm:self-end pb-0.5"
            aria-label="View all bestsellers"
          >
            <span>VIEW ALL BESTSELLERS</span>
            <ArrowRight
              className="w-3.5 h-3.5 stroke-[1.5] transform transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* 4-column desktop / 2-column mobile Product Grid */}
        <div
          className="grid grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5 md:[grid-template-columns:repeat(4,minmax(0,1fr))]"
        >
          {mostLovedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
