import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, RotateCcw, ArrowRight } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import products from '../../data/products';

const SCENT_TYPES = ['Fresh', 'Sweet', 'Woody', 'Oud', 'Spicy', 'Floral'];
const OCCASIONS = ['Everyday', 'Office', 'Date Night', 'Party'];

/**
 * SIGNATURE SCENT FINDER: Richer berry/wine environment (#3A1729 / #6E2945 / #C94F70)
 */
export default function ScentQuiz() {
  const [scentType, setScentType] = useState('Fresh');
  const [occasion, setOccasion] = useState('Everyday');

  // Filter actual matching products based on Scent Type & Occasion
  const matchedProducts = products.filter((p) => {
    if (p.type === 'sample_set') return false;
    const pScent = (p.scentIdentity || '').toLowerCase();
    const pNotes = p.notes ? `${p.notes.top} ${p.notes.heart} ${p.notes.base}`.toLowerCase() : '';
    const targetScent = scentType.toLowerCase();

    const matchesScent = pScent.includes(targetScent) || pNotes.includes(targetScent);
    return matchesScent;
  });

  // Fallback to top products if zero matches
  const displayProducts = matchedProducts.length > 0 ? matchedProducts.slice(0, 3) : products.filter(p => p.type !== 'sample_set').slice(0, 3);

  return (
    <section id="scent-finder" className="py-12 sm:py-16 bg-gradient-to-b from-[#3A1729] via-[#6E2945] to-[#3A1729] text-[#FFF8F7] scroll-mt-20 border-b border-[rgba(217,138,155,0.15)]">
      <MainContainer>
        <div className="bg-[#241326] border border-[rgba(217,138,155,0.25)] rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3A1729] border border-[rgba(217,138,155,0.25)] text-xs font-sans tracking-[0.16em] uppercase text-[#C94F70] font-bold mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C94F70]" />
              <span>PERFUME FINDER</span>
            </div>
            
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.06em] text-[#FFF8F7] mb-2">
              FIND YOUR SIGNATURE SCENT
            </h2>
            
            <p className="font-sans text-xs sm:text-sm text-[#D98A9B]">
              Select your preferences below to discover fragrances matched to your character.
            </p>
          </div>

          {/* Interactive Filters Grid: Exactly 2 Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Step 1: Preferred Fragrance Profile */}
            <div className="bg-[#3A1729] border border-[rgba(217,138,155,0.20)] rounded-xl p-4">
              <label className="block font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#FFF8F7] mb-3">
                1. PREFERRED FRAGRANCE PROFILE
              </label>
              <div className="flex flex-wrap gap-2">
                {SCENT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setScentType(type)}
                    className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                      scentType === type
                        ? 'bg-[#C94F70] text-white'
                        : 'bg-[#241326] text-[#D98A9B] hover:text-[#FFF8F7] border border-[rgba(217,138,155,0.15)]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Primary Occasion */}
            <div className="bg-[#3A1729] border border-[rgba(217,138,155,0.20)] rounded-xl p-4">
              <label className="block font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#FFF8F7] mb-3">
                2. PRIMARY OCCASION
              </label>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => setOccasion(occ)}
                    className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                      occasion === occ
                        ? 'bg-[#C94F70] text-white'
                        : 'bg-[#241326] text-[#D98A9B] hover:text-[#FFF8F7] border border-[rgba(217,138,155,0.15)]'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Products Result Section */}
          <div className="border-t border-[rgba(217,138,155,0.20)] pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-sans text-xs sm:text-sm text-[#C94F70] font-bold uppercase tracking-[0.16em]">
                YOUR SIGNATURE MATCH
              </h3>
              <button
                type="button"
                onClick={() => {
                  setScentType('Fresh');
                  setOccasion('Everyday');
                }}
                className="inline-flex items-center gap-1.5 text-xs text-[#D98A9B] hover:text-[#FFF8F7] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Top Match Highlight Card */}
            {displayProducts.length > 0 && (
              <div className="bg-[#3A1729] border border-[rgba(217,138,155,0.25)] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-5 mb-4 shadow-md">
                <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
                  <img
                    src={displayProducts[0].image}
                    alt={displayProducts[0].name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg shrink-0 bg-[#241326] border border-[rgba(217,138,155,0.20)]"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C94F70]">
                      TOP MATCH · ÉLAVA SIGNATURE
                    </span>
                    <h4 className="font-serif text-xl font-bold uppercase text-[#FFF8F7]">
                      ÉLAVA {displayProducts[0].name}
                    </h4>
                    <p className="font-sans text-xs text-[#D98A9B] mt-0.5">
                      {displayProducts[0].scentIdentity}
                    </p>
                    <span className="font-sans text-xs font-bold text-[#FFF8F7] mt-1 block">
                      ₹{displayProducts[0].price?.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/product/${displayProducts[0].slug}`}
                  className="w-full sm:w-auto bg-[#C94F70] hover:bg-[#E96885] active:bg-[#B83F5D] text-white py-3 px-6 rounded-xl font-sans text-xs font-bold uppercase tracking-[0.16em] inline-flex items-center justify-center gap-2 transition-colors shrink-0 shadow-xs group"
                >
                  <span>VIEW YOUR MATCH</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}

            {/* Other Good Matches */}
            {displayProducts.length > 1 && (
              <div className="pt-2">
                <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#D98A9B] mb-2.5">
                  OTHER GOOD MATCHES
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {displayProducts.slice(1, 3).map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.slug}`}
                      className="group bg-[#3A1729]/80 border border-[rgba(217,138,155,0.18)] rounded-lg p-3 flex items-center justify-between hover:border-[#C94F70]/60 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 object-contain rounded bg-[#241326] shrink-0"
                        />
                        <div className="min-w-0">
                          <h5 className="font-serif text-xs font-bold uppercase text-[#FFF8F7] truncate group-hover:text-[#C94F70] transition-colors">
                            ÉLAVA {p.name}
                          </h5>
                          <p className="text-[10px] text-[#D98A9B] truncate">{p.scentIdentity}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#C94F70] shrink-0 ml-2">₹{p.price} →</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </MainContainer>
    </section>
  );
}
