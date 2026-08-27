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

  const matchedProducts = products.filter((p) => {
    if (p.type === 'sample_set') return false;
    const pScent = (p.scentIdentity || '').toLowerCase();
    const pNotes = p.notes ? `${p.notes.top} ${p.notes.heart} ${p.notes.base}`.toLowerCase() : '';
    const targetScent = scentType.toLowerCase();
    return pScent.includes(targetScent) || pNotes.includes(targetScent);
  });

  const displayProducts = matchedProducts.length > 0 ? matchedProducts.slice(0, 3) : products.filter(p => p.type !== 'sample_set').slice(0, 3);

  return (
    <section id="scent-finder" className="py-10 sm:py-14 bg-[#2A0D14] text-[#F6EFE7] scroll-mt-20">
      <MainContainer>
        <div className="bg-[#641D2D] border border-[#E7C4C5]/20 rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A0D14] border border-[#E7C4C5]/20 text-xs font-sans font-semibold tracking-widest uppercase text-[#E7C4C5] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Perfume Finder</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F6EFE7] mb-2 tracking-tight">
              Find Your Signature Scent
            </h2>
            
            <p className="font-sans text-xs sm:text-sm text-[#E7C4C5]/85 font-normal leading-relaxed">
              Select your preferences below to discover fragrances matched to your character.
            </p>
          </div>

          {/* Interactive Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Step 1 */}
            <div className="bg-[#2A0D14] border border-[#E7C4C5]/15 rounded-xl p-4">
              <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#F6EFE7] mb-3">
                1. Preferred Fragrance Profile
              </label>
              <div className="flex flex-wrap gap-2">
                {SCENT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setScentType(type)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold tracking-wide transition-colors ${
                      scentType === type
                        ? 'bg-[#C94B5B] text-[#F6EFE7]'
                        : 'bg-[#641D2D] text-[#E7C4C5]/80 hover:text-[#F6EFE7] border border-[#E7C4C5]/15'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#2A0D14] border border-[#E7C4C5]/15 rounded-xl p-4">
              <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#F6EFE7] mb-3">
                2. Primary Occasion
              </label>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => setOccasion(occ)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold tracking-wide transition-colors ${
                      occasion === occ
                        ? 'bg-[#C94B5B] text-[#F6EFE7]'
                        : 'bg-[#641D2D] text-[#E7C4C5]/80 hover:text-[#F6EFE7] border border-[#E7C4C5]/15'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="border-t border-[#E7C4C5]/15 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-sans text-xs sm:text-sm text-[#F6EFE7] font-semibold tracking-wider uppercase">
                Your Signature Match
              </h3>
              <button
                type="button"
                onClick={() => { setScentType('Fresh'); setOccasion('Everyday'); }}
                className="inline-flex items-center gap-1.5 text-xs font-sans text-[#E7C4C5]/80 hover:text-[#F6EFE7] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {displayProducts.length > 0 && (
              <div className="bg-[#2A0D14] border border-[#E7C4C5]/20 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-5 mb-4 shadow-md">
                <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
                  <img
                    src={displayProducts[0].image}
                    alt={displayProducts[0].name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg shrink-0 bg-[#641D2D] border border-[#E7C4C5]/15"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#E7C4C5]/80 block">
                      TOP MATCH · ÉLAVA SIGNATURE
                    </span>
                    <h4 className="font-serif text-2xl font-normal text-[#F6EFE7]">
                      {displayProducts[0].name}
                    </h4>
                    <p className="font-sans text-xs text-[#E7C4C5]/80 mt-0.5 font-normal">
                      {displayProducts[0].scentIdentity}
                    </p>
                    <span className="font-sans text-sm font-semibold text-[#F6EFE7] mt-1 block">
                      ₹{displayProducts[0].price?.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/product/${displayProducts[0].slug}`}
                  className="w-full sm:w-auto bg-[#C94B5B] hover:bg-[#B03D4C] text-[#F6EFE7] py-3 px-6 rounded-xl font-sans text-xs font-semibold tracking-wider inline-flex items-center justify-center gap-2 transition-colors shrink-0 shadow-xs"
                >
                  <span>View Your Match →</span>
                </Link>
              </div>
            )}

            {displayProducts.length > 1 && (
              <div className="pt-2">
                <div className="text-[10.5px] font-sans font-semibold uppercase tracking-wider text-[#E7C4C5]/80 mb-2.5">
                  Other Good Matches
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {displayProducts.slice(1, 3).map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.slug}`}
                      className="group bg-[#2A0D14]/70 border border-[#E7C4C5]/15 rounded-lg p-3 flex items-center justify-between hover:border-[#F6EFE7]/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 object-contain rounded bg-[#641D2D] shrink-0"
                        />
                        <div className="min-w-0">
                          <h5 className="font-serif text-base font-normal text-[#F6EFE7] truncate">
                            {p.name}
                          </h5>
                          <p className="font-sans text-[11px] text-[#E7C4C5]/80 truncate font-normal">{p.scentIdentity}</p>
                        </div>
                      </div>
                      <span className="font-sans text-xs font-semibold text-[#F6EFE7] shrink-0 ml-2">₹{p.price} →</span>
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
