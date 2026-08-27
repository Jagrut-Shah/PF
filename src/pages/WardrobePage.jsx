import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Check, Layers, Sparkles, ShieldCheck, Truck } from 'lucide-react';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';
import products from '../data/products';
import { getWardrobeBundle } from '../data/wardrobeBundles';
import { addDuoBundleToCart } from '../utils/cart';

export default function WardrobePage() {
  const { bundleSlug } = useParams();
  const bundle = getWardrobeBundle(bundleSlug);

  const [addedToCart, setAddedToCart] = useState(false);

  // Retrieve matching product objects from products.js
  const fragrance1 = products.find((p) => p.slug === bundle.productSlugs[0]) || products[0];
  const fragrance2 = products.find((p) => p.slug === bundle.productSlugs[1]) || products[1];

  // CTA Handler to add duo bundle to existing shared cart
  const handleAddDuoToCart = () => {
    addDuoBundleToCart(bundle, fragrance1, fragrance2);
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2500);
  };

  return (
    <div className="w-full bg-[#2A0D14] text-[#F6EFE7] min-h-screen pb-16">
      <SEO
        title={`ÉLAVA ${bundle.title} — 2 × 60ml Fragrance Wardrobe`}
        description={bundle.subtitle}
        canonicalPath={`/wardrobe/${bundle.slug}`}
        ogType="website"
      />

      {/* ── 1. HERO SECTION ── */}
      <section className="py-8 sm:py-12 md:py-16 bg-[#102F38] border-b border-[rgba(243,235,221,0.12)] relative overflow-hidden">
        <MainContainer>
          
          {/* Top Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-[#B8C4C2] mb-6 uppercase tracking-wider font-sans">
            <Link to="/" className="hover:text-[#F5F1EA] transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-[#B8C4C2] font-bold">SCENT WARDROBE</span>
            <span>/</span>
            <span className="text-[#F5F1EA]">{bundle.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Main Product Photography */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-lg aspect-[4/3.8] rounded-2xl overflow-hidden bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] shadow-2xl group">
                <img
                  src={bundle.mainImage}
                  alt={bundle.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge */}
                <div className="absolute top-4 left-4 bg-[#7A2929] text-[#F5F1EA] text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded shadow-md">
                  {bundle.badge}
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-[#102F38]/90 backdrop-blur-xs border border-[rgba(243,235,221,0.12)] rounded-xl p-3 flex items-center justify-between text-xs">
                  <span className="text-[#B8C4C2] uppercase tracking-wider font-semibold">DUO PACKAGING</span>
                  <span className="text-[#F5F1EA] font-bold">2 × 60 ML Eau de Parfum</span>
                </div>
              </div>
            </div>

            {/* Right: Wardrobe Hero Details */}
            <div className="lg:col-span-6 space-y-5">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C4A55] border border-[rgba(243,235,221,0.18)] text-[#B8C4C2] text-xs font-bold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5 text-[#B8C4C2]" />
                <span>CURATED SCENT WARDROBE</span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#F5F1EA] leading-tight">
                  {bundle.title}
                </h1>
                <p className="font-sans text-lg sm:text-xl text-[#B8C4C2] mt-1 font-semibold">
                  {bundle.tagline}
                </p>
              </div>

              {/* Short Description */}
              <p className="font-sans text-sm sm:text-base text-[#B8C4C2] leading-relaxed">
                {bundle.subtitle}
              </p>

              {/* ── WHAT YOU GET ── */}
              <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-3.5 sm:p-4 space-y-2.5 shadow-sm">
                <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#B8C4C2] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>WHAT YOU GET IN THIS WARDROBE</span>
                  </span>
                  <span className="text-[#B8C4C2] font-semibold">2 × 60 ML</span>
                </div>

                {/* Horizontal row for included items */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 items-center">
                  
                  {/* Fragrance 1 */}
                  <div className="bg-[#102F38] border border-[rgba(243,235,221,0.12)] rounded-lg p-2.5 flex items-center gap-2.5 min-w-0">
                    <img
                      src={fragrance1.image}
                      alt={fragrance1.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded bg-[#1C4A55] border border-[rgba(243,235,221,0.12)] shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-[#B8C4C2]">FRAGRANCE 01</div>
                      <div className="font-serif text-xs sm:text-sm font-bold uppercase text-[#F5F1EA] truncate">
                        {fragrance1.name}
                      </div>
                      <div className="text-[10px] text-[#B8C4C2] truncate">{fragrance1.scentIdentity}</div>
                    </div>
                  </div>

                  {/* Fragrance 2 */}
                  <div className="bg-[#102F38] border border-[rgba(243,235,221,0.12)] rounded-lg p-2.5 flex items-center gap-2.5 min-w-0">
                    <img
                      src={fragrance2.image}
                      alt={fragrance2.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded bg-[#1C4A55] border border-[rgba(243,235,221,0.12)] shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-[#B8C4C2]">FRAGRANCE 02</div>
                      <div className="font-serif text-xs sm:text-sm font-bold uppercase text-[#F5F1EA] truncate">
                        {fragrance2.name}
                      </div>
                      <div className="text-[10px] text-[#B8C4C2] truncate">{fragrance2.scentIdentity}</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Pricing & Savings Summary */}
              <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-4 sm:p-5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-[#B8C4C2] font-semibold">
                    WARDROBE DUO PRICE (2 × 60ML)
                  </div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="font-sans text-2xl sm:text-3xl font-bold text-[#F5F1EA]">
                      ₹{bundle.bundlePrice.toLocaleString()}
                    </span>
                    <span className="font-sans text-sm text-[#B8C4C2] line-through">
                      ₹{bundle.originalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-block bg-[#7A2929]/20 border border-[#7A2929]/50 text-[#F5F1EA] text-xs sm:text-sm font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-xs">
                    SAVE ₹{bundle.savings.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Primary Action CTA */}
              <div>
                <button
                  type="button"
                  onClick={handleAddDuoToCart}
                  className="w-full bg-[#7A2929] hover:bg-[#8C3232] active:bg-[#6A2020] text-[#F5F1EA] py-4 px-6 rounded-xl font-bold uppercase text-xs sm:text-sm tracking-[0.18em] flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer shadow-lg group"
                  id="wardrobe-hero-cta"
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5 text-[#72D66F]" />
                      <span>DUO ADDED TO CART ✓</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 text-[#F5F1EA]" />
                      <span>BUILD MY DUO</span>
                      <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </>
                  )}
                </button>
              </div>

              {/* Reassurance Features */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#B8C4C2] border-t border-[rgba(243,235,221,0.12)]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#B8C4C2] shrink-0" />
                  <span>Free Express Delivery Across India</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#B8C4C2] shrink-0" />
                  <span>Authentic 60ml EDP Signatures</span>
                </div>
              </div>

            </div>

          </div>

        </MainContainer>
      </section>

      {/* ── 2. WHY THIS COMBINATION & WHEN TO WEAR ── */}
      <section className="py-12 bg-[#163E49]">
        <MainContainer>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Why This Combination */}
            <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#B8C4C2] tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>WHY THIS COMBINATION</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F5F1EA]">
                Curated Scent Synergy
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#B8C4C2] leading-relaxed">
                {bundle.whyCombination}
              </p>
            </div>

            {/* How to Use / When to Wear */}
            <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#B8C4C2] tracking-wider">
                <Layers className="w-4 h-4" />
                <span>WHEN TO WEAR</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F5F1EA]">
                Sensory Wearing Guide
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#B8C4C2] leading-relaxed">
                {bundle.whenToWear}
              </p>
            </div>

          </div>
        </MainContainer>
      </section>

    </div>
  );
}
