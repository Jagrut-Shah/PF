import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import MainContainer from '../components/ui/MainContainer';
import ProductCard from '../components/home/ProductCard';
import SectionHeading from '../components/ui/SectionHeading';
import SEO from '../components/common/SEO';
import products from '../data/products';

const GENDER_CATEGORIES = ['men', 'women', 'unisex'];
const OCCASION_CATEGORIES = ['date-night', 'everyday', 'office', 'party'];
const VALID_SLUGS = [...GENDER_CATEGORIES, ...OCCASION_CATEGORIES, 'bestsellers', 'all'];

const CATEGORY_CONFIG = {
  all: {
    title: 'ALL FRAGRANCES',
    subtitle: 'Explore our complete artisanal Eau de Parfum collection.',
    seoTitle: 'All Fragrances | ÉLAVA',
    seoDescription: 'Explore the full ÉLAVA artisanal fragrance collection.',
  },
  men: {
    title: 'MEN',
    subtitle: 'Fragrances crafted for him.',
    seoTitle: "Men's Fragrances | ÉLAVA",
    seoDescription: "Explore ÉLAVA's premium artisanal fragrances crafted for him.",
  },
  women: {
    title: 'WOMEN',
    subtitle: 'Fragrances crafted for her.',
    seoTitle: "Women's Fragrances | ÉLAVA",
    seoDescription: "Explore ÉLAVA's elegant artisanal fragrances crafted for her.",
  },
  unisex: {
    title: 'UNISEX',
    subtitle: 'Fragrances for every expression.',
    seoTitle: 'Unisex Fragrances | ÉLAVA',
    seoDescription: "Explore ÉLAVA's distinctive unisex fragrances for every expression.",
  },
  bestsellers: {
    title: 'BESTSELLERS',
    subtitle: 'Our most loved fragrances.',
    seoTitle: 'Bestseller Fragrances | ÉLAVA',
    seoDescription: "Discover ÉLAVA's most coveted and bestselling signature perfumes.",
  },
  'date-night': {
    title: 'DATE NIGHT',
    subtitle: 'Fragrances for nights worth remembering.',
    seoTitle: 'Date Night Fragrances | ÉLAVA',
    seoDescription: "Discover ÉLAVA's seductive date night fragrances for evenings worth remembering.",
  },
  everyday: {
    title: 'EVERYDAY',
    subtitle: 'Your signature scent, every day.',
    seoTitle: 'Everyday Fragrances | ÉLAVA',
    seoDescription: "Discover ÉLAVA's refined everyday signature scents for effortless wear.",
  },
  office: {
    title: 'OFFICE',
    subtitle: 'Clean. Sharp. Effortless.',
    seoTitle: 'Office Fragrances | ÉLAVA',
    seoDescription: "Discover ÉLAVA's clean, sharp, and polished fragrances for work.",
  },
  party: {
    title: 'PARTY',
    subtitle: 'Walk in. Get noticed.',
    seoTitle: 'Party Fragrances | ÉLAVA',
    seoDescription: "Discover ÉLAVA's bold and magnetic party fragrances made to get noticed.",
  },
};

export default function CategoryPage() {
  const { categorySlug = 'all' } = useParams();
  const isSupportedSlug = VALID_SLUGS.includes(categorySlug);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedOccasion, setSelectedOccasion] = useState('all');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Base Category Products (Excludes sample_set from standard grids)
  const baseCategoryProducts = products.filter((p) => {
    if (p.type === 'sample_set') return false;
    if (!isSupportedSlug || categorySlug === 'all') return true;

    if (GENDER_CATEGORIES.includes(categorySlug)) {
      return p.gender === categorySlug;
    }
    if (categorySlug === 'bestsellers') {
      return p.isBestseller === true;
    }
    if (OCCASION_CATEGORIES.includes(categorySlug)) {
      return p.occasion === categorySlug || (Array.isArray(p.occasion) && p.occasion.includes(categorySlug));
    }
    return true;
  });

  // Filter & Search Logic
  const filteredProducts = baseCategoryProducts.filter((p) => {
    // Search query matching
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const pName = (p.name || '').toLowerCase();
      const pCat = (p.category || '').toLowerCase();
      const pGender = (p.gender || '').toLowerCase();
      const pOccasion = Array.isArray(p.occasion) ? p.occasion.join(' ').toLowerCase() : (p.occasion || '').toLowerCase();
      const pDesc = (p.description || '').toLowerCase();
      const pScent = (p.scentIdentity || '').toLowerCase();

      const matches =
        pName.includes(q) ||
        pCat.includes(q) ||
        pGender.includes(q) ||
        pOccasion.includes(q) ||
        pDesc.includes(q) ||
        pScent.includes(q);

      if (!matches) return false;
    }

    // Gender Filter
    if (selectedGender !== 'all') {
      if (p.gender !== selectedGender) return false;
    }

    // Occasion Filter
    if (selectedOccasion !== 'all') {
      const occMatch = p.occasion === selectedOccasion || (Array.isArray(p.occasion) && p.occasion.includes(selectedOccasion));
      if (!occMatch) return false;
    }

    return true;
  });

  if (!isSupportedSlug) {
    return (
      <MainContainer className="py-16 text-center">
        <SEO
          title="Collection Not Found | ÉLAVA"
          description="The requested fragrance collection does not exist."
          canonicalPath={`/category/${categorySlug || ''}`}
        />
        <h1 className="font-serif text-3xl font-normal uppercase tracking-wider text-[#F1EEF2] mb-3">
          Collection Not Found
        </h1>
        <p className="font-sans text-sm text-[#A7A3AA] mb-6">
          The requested fragrance collection does not exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#D62F4F] text-white px-6 py-2.5 rounded text-xs uppercase tracking-widest font-semibold hover:bg-[#F04463] transition-colors"
        >
          Return to Homepage
        </Link>
      </MainContainer>
    );
  }

  const config = CATEGORY_CONFIG[categorySlug] || {
    title: categorySlug.toUpperCase(),
    subtitle: '',
    seoTitle: `${categorySlug.toUpperCase()} | ÉLAVA`,
    seoDescription: `Explore ÉLAVA ${categorySlug} luxury fragrance collection.`,
  };

  return (
    <MainContainer className="py-8 md:py-12">
      <SEO
        title={config.seoTitle}
        description={config.seoDescription}
        canonicalPath={`/category/${categorySlug}`}
        ogType="website"
      />

      <SectionHeading as="h1" title={config.title} subtitle={config.subtitle} />

      {/* ── SEARCH & ESSENTIAL FILTERS ── */}
      <div className="mt-6 space-y-4">
        
        {/* Top Search Bar + Mobile Filter Toggle */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#A7A3AA] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by perfume name, occasion, or notes (e.g. Noir, Fresh, Date Night)..."
              className="w-full bg-[#111116] border border-[rgba(241,238,242,0.14)] rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-[#F1EEF2] placeholder-[#A7A3AA]/60 focus:outline-none focus:border-[#D62F4F] transition-colors"
              id="category-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A7A3AA] hover:text-[#F1EEF2] p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile Filter Toggle Button */}
          <button
            type="button"
            onClick={() => setShowMobileFilter(true)}
            className="md:hidden flex items-center gap-1.5 bg-[#18181E] border border-[rgba(241,238,242,0.14)] text-[#F1EEF2] px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#D62F4F]" />
            <span>FILTERS</span>
          </button>
        </div>

        {/* Desktop Filter Bar (Clean & Essential) */}
        <div className="hidden md:flex flex-wrap items-center gap-4 bg-[#111116] border border-[rgba(241,238,242,0.10)] p-3.5 rounded-xl text-xs">
          
          {/* Gender Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[#D62F4F] font-bold uppercase tracking-wider text-[11px]">GENDER:</span>
            {['all', 'men', 'women', 'unisex'].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setSelectedGender(g)}
                className={`px-3 py-1 rounded-lg font-semibold uppercase tracking-wider transition-colors ${
                  selectedGender === g
                    ? 'bg-[#D62F4F] text-white'
                    : 'bg-[#18181E] text-[#A7A3AA] hover:text-[#F1EEF2]'
                }`}
              >
                {g === 'all' ? 'ALL' : g === 'men' ? 'FOR HIM' : g === 'women' ? 'FOR HER' : 'UNISEX'}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-[rgba(241,238,242,0.10)]" />

          {/* Occasion Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[#D62F4F] font-bold uppercase tracking-wider text-[11px]">OCCASION:</span>
            {['all', 'date-night', 'everyday', 'office', 'party'].map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setSelectedOccasion(o)}
                className={`px-3 py-1 rounded-lg font-semibold uppercase tracking-wider transition-colors ${
                  selectedOccasion === o
                    ? 'bg-[#D62F4F] text-white'
                    : 'bg-[#18181E] text-[#A7A3AA] hover:text-[#F1EEF2]'
                }`}
              >
                {o === 'all' ? 'ALL' : o.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Reset Filters */}
          {(selectedGender !== 'all' || selectedOccasion !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedGender('all');
                setSelectedOccasion('all');
                setSearchQuery('');
              }}
              className="ml-auto text-[11px] text-[#A7A3AA] hover:text-[#F1EEF2] underline font-semibold"
            >
              Reset Filters
            </button>
          )}

        </div>

      </div>

      {/* Mobile Filter Slide-Over Panel */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex justify-end p-0">
          <div className="bg-[#111116] border-l border-[rgba(241,238,242,0.16)] w-full max-w-xs h-full p-5 space-y-6 text-[#F1EEF2] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[rgba(241,238,242,0.10)] pb-3">
              <span className="font-serif font-bold text-lg uppercase">FILTER FRAGRANCES</span>
              <button type="button" onClick={() => setShowMobileFilter(false)} className="text-[#A7A3AA] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#D62F4F] uppercase tracking-wider">GENDER</label>
              <div className="flex flex-wrap gap-2">
                {['all', 'men', 'women', 'unisex'].map((g) => (
                  <button
                    key={`m-${g}`}
                    type="button"
                    onClick={() => setSelectedGender(g)}
                    className={`px-3 py-1.5 rounded-lg text-xs uppercase font-semibold ${
                      selectedGender === g ? 'bg-[#D62F4F] text-white' : 'bg-[#18181E] text-[#A7A3AA]'
                    }`}
                  >
                    {g === 'all' ? 'ALL' : g === 'men' ? 'FOR HIM' : g === 'women' ? 'FOR HER' : 'UNISEX'}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#D62F4F] uppercase tracking-wider">OCCASION</label>
              <div className="flex flex-wrap gap-2">
                {['all', 'date-night', 'everyday', 'office', 'party'].map((o) => (
                  <button
                    key={`m-${o}`}
                    type="button"
                    onClick={() => setSelectedOccasion(o)}
                    className={`px-3 py-1.5 rounded-lg text-xs uppercase font-semibold ${
                      selectedOccasion === o ? 'bg-[#D62F4F] text-white' : 'bg-[#18181E] text-[#A7A3AA]'
                    }`}
                  >
                    {o === 'all' ? 'ALL' : o.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowMobileFilter(false)}
              className="w-full bg-[#D62F4F] text-white py-3 rounded-xl font-bold uppercase text-xs tracking-wider"
            >
              APPLY FILTERS ({filteredProducts.length} RESULTS)
            </button>
          </div>
        </div>
      )}

      {/* Results Count & Grid */}
      <div className="mt-4 flex items-center justify-between text-xs text-[#A7A3AA]">
        <span>Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'fragrance' : 'fragrances'}</span>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="mt-6 text-center py-12 bg-[#18181E] border border-[rgba(241,238,242,0.10)] rounded-xl">
          <p className="font-sans text-sm text-[#A7A3AA] mb-4">No fragrances matched your search or filters.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedGender('all');
              setSelectedOccasion('all');
            }}
            className="font-sans text-xs uppercase tracking-wider font-semibold text-[#D62F4F] hover:underline"
          >
            Clear Filters & Search →
          </button>
        </div>
      ) : (
        /* Responsive Product Grid */
        <div className="mt-6 md:mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </MainContainer>
  );
}
