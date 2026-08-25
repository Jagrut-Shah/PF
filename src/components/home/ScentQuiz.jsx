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

          {/* Interactive Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Step 1 */}
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
                    className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                      scentType === type
                        ? 'bg-[#7A2929] text-[#F5F1EA]'
                        : 'bg-[#1C4A55] text-[#B8C4C2] hover:text-[#F5F1EA] border border-[rgba(243,235,221,0.15)]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
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
                    className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                      occasion === occ
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

          {/* Results */}
          <div className="border-t border-[rgba(243,235,221,0.12)] pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-sans text-xs sm:text-sm text-[#F5F1EA] font-bold uppercase tracking-[0.16em]">
                YOUR SIGNATURE MATCH
              </h3>
              <button
                type="button"
                onClick={() => { setScentType('Fresh'); setOccasion('Everyday'); }}
                className="inline-flex items-center gap-1.5 text-xs text-[#B8C4C2] hover:text-[#F5F1EA] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {displayProducts.length > 0 && (
              <div className="bg-[#102F38] border border-[rgba(243,235,221,0.2)] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-5 mb-4 shadow-md">
                <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
                  <img
                    src={displayProducts[0].image}
                    alt={displayProducts[0].name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg shrink-0 bg-[#1C4A55] border border-[rgba(243,235,221,0.15)]"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#B8C4C2]">
                      TOP MATCH · ÉLAVA SIGNATURE
                    </span>
                    <h4 className="font-serif text-xl font-bold uppercase text-[#F5F1EA]">
                      ÉLAVA {displayProducts[0].name}
                    </h4>
                    <p className="font-sans text-xs text-[#B8C4C2] mt-0.5">
                      {displayProducts[0].scentIdentity}
                    </p>
                    <span className="font-sans text-xs font-bold text-[#F5F1EA] mt-1 block">
                      ₹{displayProducts[0].price?.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/product/${displayProducts[0].slug}`}
                  className="w-full sm:w-auto bg-[#7A2929] hover:bg-[#8C3232] text-[#F5F1EA] py-3 px-6 rounded-lg font-sans text-xs font-bold uppercase tracking-[0.16em] inline-flex items-center justify-center gap-2 transition-colors shrink-0 shadow-xs"
                >
                  <span>VIEW YOUR MATCH →</span>
                </Link>
              </div>
            )}

            {displayProducts.length > 1 && (
              <div className="pt-2">
                <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#B8C4C2] mb-2.5">
                  OTHER GOOD MATCHES
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {displayProducts.slice(1, 3).map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.slug}`}
                      className="group bg-[#102F38]/70 border border-[rgba(243,235,221,0.12)] rounded-lg p-3 flex items-center justify-between hover:border-[#F5F1EA]/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 object-contain rounded bg-[#1C4A55] shrink-0"
                        />
                        <div className="min-w-0">
                          <h5 className="font-serif text-xs font-bold uppercase text-[#F5F1EA] truncate">
                            ÉLAVA {p.name}
                          </h5>
                          <p className="text-[10px] text-[#B8C4C2] truncate">{p.scentIdentity}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#F5F1EA] shrink-0 ml-2">₹{p.price} →</span>
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
