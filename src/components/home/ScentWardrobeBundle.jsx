import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainContainer from '../ui/MainContainer';
import products from '../../data/products';
import { addToCartItem } from '../../utils/cart';
import { ShoppingBag, Check, Layers, Sparkles, ChevronRight, ArrowRight } from 'lucide-react';

// Preset duos matching the 3 curated paths
const BUNDLE_PRESETS = [
  {
    id: 'date-night',
    title: 'DATE NIGHT DUO',
    subtitle: '2 × 60ML',
    description: 'A seductive combination for evenings and nights out.',
    defaultFirstSlug: 'noir',
    defaultSecondSlug: 'velvet',
    badge: 'EVENING & SEDUCTIVE',
  },
  {
    id: 'everyday-office',
    title: 'EVERYDAY + OFFICE',
    subtitle: '2 × 60ML',
    description: 'One effortless everyday scent + one sharper scent for work.',
    defaultFirstSlug: 'sable',
    defaultSecondSlug: 'aura',
    badge: 'EFFORTLESS & SHARP',
  },
  {
    id: 'gift-duo',
    title: 'GIFT DUO',
    subtitle: '2 × 60ML',
    description: 'Two fragrances selected as a memorable gift.',
    defaultFirstSlug: 'oud-x',
    defaultSecondSlug: 'blanc',
    badge: 'MEMORABLE GIFT',
  },
];

export default function ScentWardrobeBundle() {
  const availableProducts = products && products.length > 0 ? products : [];

  // Default selection
  const [activePreset, setActivePreset] = useState(BUNDLE_PRESETS[0].id);
  const [firstProductSlug, setFirstProductSlug] = useState(BUNDLE_PRESETS[0].defaultFirstSlug);
  const [secondProductSlug, setSecondProductSlug] = useState(BUNDLE_PRESETS[0].defaultSecondSlug);
  
  const [addedToCart, setAddedToCart] = useState(false);

  // Get active product objects
  const product1 = availableProducts.find((p) => p.slug === firstProductSlug) || availableProducts[0] || {};
  const product2 = availableProducts.find((p) => p.slug === secondProductSlug) || availableProducts[1] || availableProducts[0] || {};

  // Calculate pricing & savings
  const originalTotalPrice = (product1.price || 1299) + (product2.price || 1299);
  const bundleDiscount = 399;
  const bundlePrice = Math.max(originalTotalPrice - bundleDiscount, 1999);
  const actualSavings = originalTotalPrice - bundlePrice;

  // Add Duo to Cart
  const handleAddDuoToCart = () => {
    if (!product1.id || !product2.id) return;

    addToCartItem(product1, '60 ML');
    addToCartItem(product2, '60 ML');

    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2500);
  };

  return (
    <section className="py-12 sm:py-16 bg-[#163E49] text-[#F5F1EA] border-t border-b border-[rgba(243,235,221,0.12)]">
      <MainContainer>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102F38] border border-[rgba(243,235,221,0.15)] text-[#C5A15A] text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-[#C5A15A]" />
            <span>FRAGRANCE CURATION</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#F5F1EA]">
            BUILD YOUR SCENT WARDROBE
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#B8C4C2] mt-2">
            Different moments deserve different scents.
          </p>
        </div>

        {/* 3 Curated Bundle Preset Cards — Click opens dedicated landing page */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-10">
          {BUNDLE_PRESETS.map((preset) => (
            <Link
              key={preset.id}
              to={`/wardrobe/${preset.id}`}
              className="p-5 rounded-xl border border-[rgba(243,235,221,0.15)] bg-[#102F38] hover:border-[#C5A15A] hover:bg-[#1C4A55] transition-all cursor-pointer flex flex-col justify-between group shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded bg-[#102F38] text-[#C5A15A] border border-[rgba(243,235,221,0.15)]">
                    {preset.badge}
                  </span>
                  <span className="text-xs font-bold text-[#B8C4C2]">{preset.subtitle}</span>
                </div>
                <h3 className="font-serif text-lg font-bold uppercase tracking-wide text-[#F5F1EA] group-hover:text-[#C5A15A] transition-colors">
                  {preset.title}
                </h3>
                <p className="font-sans text-xs text-[#B8C4C2] mt-1.5 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[rgba(243,235,221,0.12)] flex items-center justify-between text-xs font-bold text-[#C5A15A]">
                <span>EXPLORE WARDROBE PAGE</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bundle Builder Container */}
        <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.18)] rounded-2xl p-5 sm:p-8 lg:p-10 shadow-2xl space-y-8">
          
          {/* Step 1 & Step 2 Selectors */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* STEP 1: FIRST SCENT */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[rgba(243,235,221,0.12)]">
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#C5A15A] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>STEP 1 · CHOOSE YOUR FIRST SCENT</span>
                </span>
                <span className="text-xs font-semibold text-[#F5F1EA]">
                  Selected: ÉLAVA {product1.name} (60ML)
                </span>
              </div>

              {/* Product selector grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-64 overflow-y-auto pr-1">
                {availableProducts.map((p) => {
                  const isChoice = p.slug === firstProductSlug;
                  return (
                    <div
                      key={`step1-${p.id}`}
                      onClick={() => setFirstProductSlug(p.slug)}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all flex items-center gap-2.5 ${
                        isChoice
                          ? 'bg-[#102F38] border-[#C5A15A] ring-1 ring-[#C5A15A]'
                          : 'bg-[#102F38]/40 border-[rgba(243,235,221,0.1)] hover:bg-[#102F38]/70'
                      }`}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-9 h-9 object-contain rounded bg-[#102F38] border border-[rgba(243,235,221,0.1)] shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-xs uppercase tracking-wide truncate text-[#F5F1EA]">
                          {p.name}
                        </div>
                        <div className="text-[10px] text-[#B8C4C2] truncate">
                          60 ML · ₹{p.price}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: SECOND SCENT */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[rgba(243,235,221,0.12)]">
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#C5A15A] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>STEP 2 · CHOOSE YOUR SECOND SCENT</span>
                </span>
                <span className="text-xs font-semibold text-[#F5F1EA]">
                  Selected: ÉLAVA {product2.name} (60ML)
                </span>
              </div>

              {/* Product selector grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-64 overflow-y-auto pr-1">
                {availableProducts.map((p) => {
                  const isChoice = p.slug === secondProductSlug;
                  return (
                    <div
                      key={`step2-${p.id}`}
                      onClick={() => setSecondProductSlug(p.slug)}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all flex items-center gap-2.5 ${
                        isChoice
                          ? 'bg-[#102F38] border-[#C5A15A] ring-1 ring-[#C5A15A]'
                          : 'bg-[#102F38]/40 border-[rgba(243,235,221,0.1)] hover:bg-[#102F38]/70'
                      }`}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-9 h-9 object-contain rounded bg-[#102F38] border border-[rgba(243,235,221,0.1)] shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-xs uppercase tracking-wide truncate text-[#F5F1EA]">
                          {p.name}
                        </div>
                        <div className="text-[10px] text-[#B8C4C2] truncate">
                          60 ML · ₹{p.price}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* FINAL BUNDLE SUMMARY CARD */}
          <div className="bg-[#102F38] border border-[rgba(243,235,221,0.2)] rounded-xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Selected Duo Overview */}
            <div className="flex items-center gap-4 min-w-0 w-full md:w-auto">
              <div className="flex items-center -space-x-3 shrink-0">
                <img
                  src={product1.image}
                  alt={product1.name}
                  className="w-14 h-14 object-contain rounded-lg bg-[#1C4A55] border-2 border-[#C5A15A] shadow-md z-10"
                />
                <img
                  src={product2.image}
                  alt={product2.name}
                  className="w-14 h-14 object-contain rounded-lg bg-[#1C4A55] border-2 border-[rgba(243,235,221,0.3)] shadow-md"
                />
              </div>

              <div className="min-w-0">
                <div className="text-[10.5px] font-extrabold uppercase tracking-widest text-[#C5A15A]">
                  YOUR SCENT WARDROBE (2 × 60ML)
                </div>
                <div className="font-sans text-base sm:text-lg font-bold uppercase tracking-wide text-[#F5F1EA] truncate">
                  ÉLAVA {product1.name} + ÉLAVA {product2.name}
                </div>
                <div className="text-xs text-[#B8C4C2] mt-0.5">
                  Curated 60ml Eau de Parfum Duo
                </div>
              </div>
            </div>

            {/* Price & Add to Cart CTA */}
            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-[rgba(243,235,221,0.12)]">
              <div className="text-left md:text-right">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-xl sm:text-2xl font-bold text-[#F5F1EA]">
                    ₹{bundlePrice.toLocaleString()}
                  </span>
                  <span className="font-sans text-xs text-[#B8C4C2] line-through">
                    ₹{originalTotalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="text-[11px] font-bold text-[#25D366]">
                  YOU SAVE ₹{actualSavings.toLocaleString()}
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddDuoToCart}
                className="bg-[#000000] hover:bg-[#151515] text-[#F5F1EA] border border-[rgba(243,235,221,0.3)] px-6 py-3 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-[0.16em] inline-flex items-center gap-2 transition-all duration-200 shadow-md active:scale-[0.98] cursor-pointer shrink-0"
                id="build-duo-cta"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4 text-[#25D366]" />
                    <span>DUO ADDED ✓</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#F5F1EA]" />
                    <span>BUILD MY DUO →</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </MainContainer>
    </section>
  );
}
