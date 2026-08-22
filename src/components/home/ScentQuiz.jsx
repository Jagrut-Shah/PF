import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, RotateCcw } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import products from '../../data/products';

const SCENT_TYPES = ['Fresh', 'Sweet', 'Woody', 'Oud', 'Spicy', 'Floral'];
const OCCASIONS = ['Everyday', 'Office', 'Date Night', 'Party'];

export default function ScentQuiz() {
  const [scentType, setScentType] = useState('Fresh');
  const [occasion, setOccasion] = useState('Everyday');

  // Filter actual matching products based on Scent Type & Occasion
  const matchedProducts = products.filter((p) => {
    const pScent = (p.scentIdentity || '').toLowerCase();
    const pNotes = p.notes ? `${p.notes.top} ${p.notes.heart} ${p.notes.base}`.toLowerCase() : '';
    const targetScent = scentType.toLowerCase();

    const matchesScent = pScent.includes(targetScent) || pNotes.includes(targetScent);
    return matchesScent;
  });

  // Fallback to top products if zero matches
  const displayProducts = matchedProducts.length > 0 ? matchedProducts.slice(0, 3) : products.slice(0, 3);

  return (
    <section id="scent-finder" className="py-10 sm:py-14 bg-[#163E49] text-[#F5F1EA] scroll-mt-20">
      <MainContainer>
        <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.18)] rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl">

          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102F38] border border-[rgba(243,235,221,0.15)] text-xs font-sans tracking-[0.16em] uppercase text-[#F5F1EA] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PERFUME FINDER</span>
            </div>

            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.06em] text-[#F5F1EA] mb-2">
              FIND YOUR SIGNATURE SCENT
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#B8C4C2]">
              Select your preferences below to discover fragrances matched to your character.
            </p>
          </div>

          {/* Interactive Filters Grid: Exactly 2 Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Step 1: Preferred Fragrance Profile */}
            <div className="bg-[#102F38] border border-[rgba(243,235,221,0.12)] rounded-xl p-4">
              <label className="block font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#F5F1EA] mb-3">
                1. PREFERRED FRAGRANCE PROFILE
              </label>
              <div className="flex flex-wrap gap-2">
                {SCENT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setScentType(type)}
                    className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${scentType === type
                        ? 'bg-[#7A2929] text-[#F5F1EA]'
                        : 'bg-[#1C4A55] text-[#B8C4C2] hover:text-[#F5F1EA] border border-[rgba(243,235,221,0.15)]'
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Primary Occasion */}
            <div className="bg-[#102F38] border border-[rgba(243,235,221,0.12)] rounded-xl p-4">
              <label className="block font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#F5F1EA] mb-3">
                2. PRIMARY OCCASION
              </label>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => setOccasion(occ)}
                    className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${occasion === occ
                        ? 'bg-[#7A2929] text-[#F5F1EA]'
                        : 'bg-[#1C4A55] text-[#B8C4C2] hover:text-[#F5F1EA] border border-[rgba(243,235,221,0.15)]'
                      }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Products Result Section */}
          <div className="border-t border-[rgba(243,235,221,0.12)] pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-sans text-base sm:text-lg text-[#F5F1EA] font-bold uppercase tracking-wide">
                RECOMMENDED SIGNATURE MATCHES ({displayProducts.length})
              </h3>
              <button
                type="button"
                onClick={() => {
                  setScentType('Fresh');
                  setOccasion('Everyday');
                }}
                className="inline-flex items-center gap-1 text-xs text-[#B8C4C2] hover:text-[#F5F1EA] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {displayProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.slug}`}
                  className="group bg-[#102F38] border border-[rgba(243,235,221,0.15)] rounded-xl p-3.5 flex items-center gap-3.5 hover:border-[#F5F1EA]/40 transition-colors"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-14 h-14 object-cover rounded-lg shrink-0 bg-[#163E49]"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-sans text-xs sm:text-sm font-bold uppercase text-[#F5F1EA] group-hover:text-[#FFFFFF] transition-colors truncate">
                      {p.name}
                    </h4>
                    <p className="font-sans text-[11px] text-[#B8C4C2] truncate">
                      {p.scentIdentity}
                    </p>
                    <span className="font-sans text-xs font-bold text-[#F5F1EA] block mt-0.5">
                      ₹{p.price.toLocaleString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </MainContainer>
    </section>
  );
}
