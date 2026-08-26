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
    <section id="scent-finder" className="py-12 sm:py-16 md:py-20 bg-[#102A4C] text-[#F7F3EC] border-b border-white/10 scroll-mt-20">
      <MainContainer>
        <div className="bg-[#08111F] border border-white/15 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl">
          
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#285BE6]/20 border border-[#5F8CFF]/30 text-xs font-sans tracking-[0.18em] uppercase text-[#5F8CFF] font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#5F8CFF]" />
              <span>INTERACTIVE SCENT FINDER</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-wide text-[#F7F3EC] mb-2">
              FIND YOUR <span className="italic text-[#5F8CFF]">SIGNATURE SCENT</span>
            </h2>
            
            <p className="font-sans text-xs sm:text-sm text-[#F7F3EC]/75">
              Select your preferred fragrance profile and primary occasion to find your exact match.
            </p>
          </div>

          {/* Interactive Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Step 1 */}
            <div className="bg-[#102A4C]/80 border border-white/10 rounded-2xl p-5">
              <label className="block font-sans text-xs font-bold uppercase tracking-[0.16em] text-[#5F8CFF] mb-3">
                1. PREFERRED FRAGRANCE PROFILE
              </label>
              <div className="flex flex-wrap gap-2">
                {SCENT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setScentType(type)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      scentType === type
                        ? 'bg-[#285BE6] text-white shadow-md'
                        : 'bg-[#08111F] text-[#F7F3EC]/70 hover:text-white border border-white/10'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#102A4C]/80 border border-white/10 rounded-2xl p-5">
              <label className="block font-sans text-xs font-bold uppercase tracking-[0.16em] text-[#5F8CFF] mb-3">
                2. PRIMARY OCCASION
              </label>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => setOccasion(occ)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      occasion === occ
                        ? 'bg-[#285BE6] text-white shadow-md'
                        : 'bg-[#08111F] text-[#F7F3EC]/70 hover:text-white border border-white/10'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="border-t border-white/10 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-sans text-xs sm:text-sm text-[#F7F3EC] font-bold uppercase tracking-[0.16em]">
                YOUR SIGNATURE MATCH
              </h3>
              <button
                type="button"
                onClick={() => { setScentType('Fresh'); setOccasion('Everyday'); }}
                className="inline-flex items-center gap-1.5 text-xs text-[#5F8CFF] hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {displayProducts.length > 0 && (
              <div className="bg-[#102A4C] border border-[#5F8CFF]/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 mb-4 shadow-xl">
                <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
                  <img
                    src={displayProducts[0].image}
                    alt={displayProducts[0].name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl shrink-0 bg-[#08111F] border border-white/10"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#5F8CFF]">
                      TOP MATCH · ÉLAVA SIGNATURE
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl font-light uppercase text-[#F7F3EC]">
                      ÉLAVA {displayProducts[0].name}
                    </h4>
                    <p className="font-sans text-xs text-[#F7F3EC]/70 mt-0.5">
                      {displayProducts[0].scentIdentity}
                    </p>
                    <span className="font-sans text-xs font-bold text-[#C6A15B] mt-1 block">
                      ₹{displayProducts[0].price?.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/product/${displayProducts[0].slug}`}
                  className="w-full sm:w-auto bg-[#285BE6] hover:bg-[#1E48B8] text-white py-3.5 px-7 rounded-xl font-sans text-xs font-bold uppercase tracking-[0.16em] inline-flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 shadow-md"
                >
                  <span>VIEW YOUR MATCH →</span>
                </Link>
              </div>
            )}

            {displayProducts.length > 1 && (
              <div className="pt-2">
                <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#F7F3EC]/60 mb-2.5">
                  OTHER GOOD MATCHES
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {displayProducts.slice(1, 3).map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.slug}`}
                      className="group bg-[#102A4C]/60 border border-white/10 rounded-xl p-3 flex items-center justify-between hover:border-[#5F8CFF]/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded-lg bg-[#08111F] shrink-0"
                        />
                        <div className="min-w-0">
                          <h5 className="font-serif text-sm font-light uppercase text-[#F7F3EC] truncate">
                            ÉLAVA {p.name}
                          </h5>
                          <p className="text-[10px] text-[#F7F3EC]/60 truncate">{p.scentIdentity}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#5F8CFF] shrink-0 ml-2">₹{p.price} →</span>
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
