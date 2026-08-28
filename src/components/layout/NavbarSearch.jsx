import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import products from '../../data/products';

const QUICK_TAGS = ['NOIR', 'OUD X', 'DATE NIGHT', 'OFFICE'];

export function filterProducts(query, allProducts) {
  if (!query || !query.trim()) return [];
  const rawQuery = query.trim().toLowerCase();
  const normQuery = rawQuery.replace(/-/g, ' ');

  return allProducts.filter((p) => {
    const pName = (p.name || '').toLowerCase();
    const pGender = (p.gender || '').toLowerCase();
    const pCategory = (p.category || '').toLowerCase();
    const pScent = (p.scentIdentity || '').toLowerCase();
    const pDesc = (p.description || '').toLowerCase();
    const pOccasion = (Array.isArray(p.occasion) ? p.occasion.join(' ') : p.occasion || '').toLowerCase().replace(/-/g, ' ');

    let pNotes = '';
    if (p.notes) {
      const top = Array.isArray(p.notes.top) ? p.notes.top.join(' ') : p.notes.top || '';
      const heart = Array.isArray(p.notes.heart) ? p.notes.heart.join(' ') : p.notes.heart || '';
      const base = Array.isArray(p.notes.base) ? p.notes.base.join(' ') : p.notes.base || '';
      pNotes = `${top} ${heart} ${base}`.toLowerCase();
    }

    if (normQuery === 'men') return pGender === 'men' || pCategory === 'men';
    if (normQuery === 'women') return pGender === 'women' || pCategory === 'women';

    return (
      pName.includes(normQuery) || pGender.includes(normQuery) ||
      pCategory.includes(normQuery) || pOccasion.includes(normQuery) ||
      pScent.includes(normQuery) || pNotes.includes(normQuery) ||
      pDesc.includes(normQuery) ||
      ((normQuery === 'bestseller' || normQuery === 'bestsellers') && p.isBestseller)
    );
  });
}

/**
 * NavbarSearch — Deep Cherry bg (#4A1019) to match Cherry navbar identity.
 * Cream inputs, Cherry accent on hover/focus.
 */
export default function NavbarSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const results = filterProducts(query, products);
  const hasQuery = query.trim().length > 0;

  const handleSelectProduct = (slug) => {
    onClose();
    setQuery('');
    navigate(`/product/${slug}`);
  };

  return (
    <div className="absolute top-full left-0 w-full bg-[#4A1019] border-t border-[#7F1D2D]/40 shadow-[0_8px_32px_rgba(74,16,25,0.4)] z-50 text-[#FBF8F2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">

        {/* Search Input */}
        <div className="relative flex items-center bg-[#F3E8D8]/10 border border-[#F3E8D8]/20 rounded-lg px-3 py-2.5 focus-within:border-[#F3E8D8]/50 focus-within:bg-[#F3E8D8]/15 transition-all">
          <Search className="w-4 h-4 text-[#F3E8D8]/60 shrink-0 mr-2.5 stroke-[1.75]" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fragrances..."
            className="w-full bg-transparent font-sans text-[13px] text-[#FBF8F2] placeholder:text-[#F3E8D8]/40 focus:outline-none tracking-wide"
            aria-label="Search fragrances"
          />
          {hasQuery && (
            <button type="button" onClick={() => setQuery('')}
              className="p-1 text-[#F3E8D8]/60 hover:text-[#FBF8F2] transition-colors mr-1"
              aria-label="Clear search">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button type="button" onClick={() => { setQuery(''); onClose(); }}
            className="p-1 text-[#F3E8D8]/60 hover:text-[#FBF8F2] transition-colors text-[11px] font-medium uppercase tracking-wider pl-2.5 border-l border-[#F3E8D8]/20"
            aria-label="Close search">
            Close
          </button>
        </div>

        {/* Results */}
        <div className="mt-3 max-h-[340px] overflow-y-auto">

          {/* Empty state */}
          {!hasQuery && (
            <div className="py-4 text-center">
              <p className="font-sans text-[12px] text-[#F3E8D8]/55 mb-3">
                Search by fragrance, mood or occasion.
              </p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {QUICK_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1 bg-[#F3E8D8]/10 hover:bg-[#F3E8D8] hover:text-[#7F1D2D] text-[#FBF8F2]/80 border border-[#F3E8D8]/20 rounded text-[10px] font-bold tracking-[0.14em] uppercase transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {hasQuery && results.length > 0 && (
            <div className="divide-y divide-[#FBF8F2]/10">
              <div className="pb-2 font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#F3E8D8]/50">
                {results.length} {results.length === 1 ? 'FRAGRANCE' : 'FRAGRANCES'} FOUND
              </div>
              <div className="space-y-0.5 pt-1">
                {results.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => handleSelectProduct(prod.slug)}
                    className="group flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F3E8D8]/10 transition-colors cursor-pointer"
                    role="button" tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectProduct(prod.slug); }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={prod.image} alt={`ÉLAVA ${prod.name}`}
                        className="w-10 h-10 object-cover rounded-lg bg-[#F3E8D8]/20 shrink-0 border border-[#F3E8D8]/15" />
                      <div className="min-w-0">
                        <div className="font-manrope text-[13px] font-semibold text-[#FBF8F2] group-hover:text-[#F3E8D8] transition-colors truncate">
                          {prod.name}
                        </div>
                        <div className="font-manrope text-[11px] text-[#F3E8D8]/55 truncate">
                          {prod.scentIdentity}
                        </div>
                      </div>
                    </div>
                    <div className="font-manrope text-[12px] font-semibold text-[#F3E8D8]/80 shrink-0 pl-2">
                      ₹{prod.price?.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {hasQuery && results.length === 0 && (
            <div className="py-6 text-center bg-[#F3E8D8]/8 border border-[#F3E8D8]/15 rounded-lg my-2 px-4">
              <h4 className="font-bodoni text-[15px] font-medium text-[#FBF8F2] mb-1">NO FRAGRANCES FOUND</h4>
              <p className="font-manrope text-[12px] text-[#F3E8D8]/55 mb-3">
                Try searching by fragrance name, mood, gender or occasion.
              </p>
              <Link to="/category/bestsellers"
                onClick={() => { onClose(); setQuery(''); }}
                className="inline-flex items-center gap-1.5 font-manrope text-[11px] font-semibold uppercase tracking-[0.09em] text-[#F3E8D8] hover:text-[#FBF8F2] transition-colors">
                <span>EXPLORE ALL FRAGRANCES</span>
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
