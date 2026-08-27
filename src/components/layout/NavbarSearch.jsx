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

    const pOccasion = (Array.isArray(p.occasion) ? p.occasion.join(' ') : p.occasion || '')
      .toLowerCase()
      .replace(/-/g, ' ');

    let pNotes = '';
    if (p.notes) {
      const top = Array.isArray(p.notes.top) ? p.notes.top.join(' ') : p.notes.top || '';
      const heart = Array.isArray(p.notes.heart) ? p.notes.heart.join(' ') : p.notes.heart || '';
      const base = Array.isArray(p.notes.base) ? p.notes.base.join(' ') : p.notes.base || '';
      pNotes = `${top} ${heart} ${base}`.toLowerCase();
    }

    if (normQuery === 'men') {
      return pGender === 'men' || pCategory === 'men';
    }
    if (normQuery === 'women') {
      return pGender === 'women' || pCategory === 'women';
    }

    return (
      pName.includes(normQuery) ||
      pGender.includes(normQuery) ||
      pCategory.includes(normQuery) ||
      pOccasion.includes(normQuery) ||
      pScent.includes(normQuery) ||
      pNotes.includes(normQuery) ||
      pDesc.includes(normQuery) ||
      ((normQuery === 'bestseller' || normQuery === 'bestsellers') && p.isBestseller)
    );
  });
}

/**
 * NavbarSearch Component — Black & Red Luxury Aesthetic:
 * Deep Black #080808 container, Soft Black #121212 input bar, Signature Red #B4171E accents.
 */
export default function NavbarSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = filterProducts(query, products);
  const hasQuery = query.trim().length > 0;

  const handleSelectProduct = (slug) => {
    onClose();
    setQuery('');
    navigate(`/product/${slug}`);
  };

  const handleQuickTagClick = (tag) => {
    setQuery(tag);
  };

  return (
    <div className="absolute top-full left-0 w-full bg-[#080808] border-b border-white/15 shadow-2xl z-50 animate-fadeIn text-[#F5F2EE]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center bg-[#121212] border border-white/15 rounded-xl px-3.5 py-2.5 focus-within:border-[#B4171E] transition-colors">
          <Search className="w-4 h-4 text-[#B8B3AF] shrink-0 mr-2.5 stroke-[1.75]" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fragrances..."
            className="w-full bg-transparent font-sans text-xs sm:text-sm text-[#F5F2EE] placeholder:text-[#B8B3AF]/70 focus:outline-none tracking-wide"
            aria-label="Search fragrances"
          />
          {hasQuery && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-[#B8B3AF] hover:text-[#F5F2EE] transition-colors mr-1"
              aria-label="Clear search query"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setQuery('');
              onClose();
            }}
            className="p-1 text-[#B8B3AF] hover:text-[#F5F2EE] transition-colors text-xs font-medium uppercase tracking-wider pl-2 border-l border-white/15"
            aria-label="Close search"
          >
            Close
          </button>
        </div>

        {/* Results Dropdown Overlay */}
        <div className="mt-3 max-h-[380px] overflow-y-auto">
          
          {/* STATE 1: EMPTY QUERY */}
          {!hasQuery && (
            <div className="py-5 text-center">
              <p className="font-sans text-xs text-[#B8B3AF] mb-3">
                Search by fragrance, mood or occasion.
              </p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {QUICK_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleQuickTagClick(tag)}
                    className="px-3 py-1 bg-[#1A1A1A] hover:bg-[#B4171E] text-[#F5F2EE] border border-white/15 rounded text-[11px] font-bold tracking-[0.14em] uppercase transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STATE 2: MATCHING RESULTS */}
          {hasQuery && results.length > 0 && (
            <div className="divide-y divide-white/10">
              <div className="pb-2 font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#B8B3AF]">
                {results.length} {results.length === 1 ? 'FRAGRANCE' : 'FRAGRANCES'} FOUND
              </div>
              <div className="space-y-1 pt-1">
                {results.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => handleSelectProduct(prod.slug)}
                    className="group flex items-center justify-between p-2.5 rounded-lg hover:bg-[#121212] transition-colors cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleSelectProduct(prod.slug);
                      }
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={prod.image}
                        alt={`ÉLAVA ${prod.name}`}
                        className="w-11 h-11 object-cover rounded-lg bg-[#080808] shrink-0 border border-white/15"
                      />
                      <div className="min-w-0">
                        <div className="font-serif text-sm font-medium tracking-[0.08em] uppercase text-[#F5F2EE] group-hover:text-[#B4171E] transition-colors truncate">
                          {prod.name}
                        </div>
                        <div className="font-sans text-[11px] text-[#B8B3AF] truncate">
                          {prod.scentIdentity}
                        </div>
                      </div>
                    </div>
                    <div className="font-sans text-xs font-semibold text-[#F5F2EE] shrink-0 pl-2">
                      ₹{prod.price?.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STATE 3: NO MATCHING RESULTS */}
          {hasQuery && results.length === 0 && (
            <div className="py-8 text-center bg-[#121212] border border-white/15 rounded-xl my-2 px-4">
              <h4 className="font-serif text-base font-medium uppercase tracking-[0.08em] text-[#F5F2EE] mb-1">
                NO FRAGRANCES FOUND
              </h4>
              <p className="font-sans text-xs text-[#B8B3AF] mb-4">
                "Try searching by fragrance name, mood, gender or occasion."
              </p>
              <Link
                to="/category/bestsellers"
                onClick={() => {
                  onClose();
                  setQuery('');
                }}
                className="inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-[0.16em] text-[#F5F2EE] hover:text-[#B4171E] transition-colors"
              >
                <span>EXPLORE ALL FRAGRANCES</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
