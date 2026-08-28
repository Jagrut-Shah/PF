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
    <div className="w-full bg-[#0B0B0B] text-[#F5F2EE] min-h-screen pb-16">
      <SEO
        title={`ÉLAVA ${bundle.title} — 2 × 60ml Fragrance Wardrobe`}
        description={bundle.subtitle}
        canonicalPath={`/wardrobe/${bundle.slug}`}
        ogType="website"
      />

      {/* ── 1. HERO SECTION ── */}
      <section className="py-8 sm:py-12 md:py-16 bg-[#121212] border-b border-white/10 relative overflow-hidden">
        <MainContainer>
          
          {/* Top Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-[#B8B3AF] mb-6 uppercase tracking-wider font-manrope font-medium">
            <Link to="/" className="hover:text-[#F5F2EE] transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-[#B8B3AF] font-semibold">SCENT WARDROBE</span>
            <span>/</span>
            <span className="text-[#F5F2EE]">{bundle.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Main Product Photography */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-lg aspect-[4/3.8] rounded-2xl overflow-hidden bg-[#080808] border border-white/10 shadow-2xl group">
                <img
                  src={bundle.mainImage}
                  alt={bundle.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge */}
                <div className="absolute top-4 left-4 bg-[#8F1018] text-[#F5F2EE] font-manrope text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded shadow-md">
                  {bundle.badge}
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-[#080808]/90 backdrop-blur-xs border border-white/10 rounded-xl p-3 flex items-center justify-between text-xs">
                  <span className="text-[#B8B3AF] font-manrope uppercase tracking-wider font-semibold">DUO PACKAGING</span>
                  <span className="text-[#F5F2EE] font-manrope font-semibold">2 × 60 ML Eau de Parfum</span>
                </div>
              </div>
            </div>

            {/* Right: Wardrobe Hero Details */}
            <div className="lg:col-span-6 space-y-5">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1A1A] border border-white/15 text-[#F5F2EE] font-manrope text-[12px] font-semibold tracking-wider">
                <Layers className="w-3.5 h-3.5 text-[#B4171E]" />
                <span>CURATED SCENT WARDROBE</span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="font-sora text-[32px] sm:text-[42px] lg:text-[50px] font-semibold text-[#F5F2EE] leading-[1.08] tracking-[-0.035em]">
                  {bundle.title}
                </h1>
                <p className="font-manrope text-[18px] sm:text-[20px] text-[#B8B3AF] mt-1 font-semibold">
                  {bundle.tagline}
                </p>
              </div>

              {/* Short Description */}
              <p className="font-manrope text-[15px] sm:text-[16px] text-[#B8B3AF] leading-[1.5]">
                {bundle.subtitle}
              </p>

              {/* ── WHAT YOU GET ── */}
              <div className="bg-[#121212] border border-white/10 rounded-xl p-3.5 sm:p-4 space-y-2.5 shadow-sm">
                <div className="font-manrope text-[12px] font-semibold uppercase tracking-[0.09em] text-[#B8B3AF] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>WHAT YOU GET IN THIS WARDROBE</span>
                  </span>
                  <span className="text-[#B8B3AF] font-semibold">2 × 60 ML</span>
                </div>

                {/* Horizontal row for included items */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 items-center">
                  
                  {/* Fragrance 1 */}
                  <div className="bg-[#080808] border border-white/10 rounded-lg p-2.5 flex items-center gap-2.5 min-w-0">
                    <img
                      src={fragrance1.image}
                      alt={fragrance1.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded bg-[#111111] border border-white/10 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-manrope text-[10px] font-semibold uppercase tracking-wider text-[#B8B3AF]">FRAGRANCE 01</div>
                      <div className="font-manrope text-[14px] font-semibold text-[#F5F2EE] truncate">
                        {fragrance1.name}
                      </div>
                      <div className="font-manrope text-[12px] text-[#B8B3AF] truncate">{fragrance1.scentIdentity}</div>
                    </div>
                  </div>

                  {/* Fragrance 2 */}
                  <div className="bg-[#080808] border border-white/10 rounded-lg p-2.5 flex items-center gap-2.5 min-w-0">
                    <img
                      src={fragrance2.image}
                      alt={fragrance2.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded bg-[#111111] border border-white/10 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-manrope text-[10px] font-semibold uppercase tracking-wider text-[#B8B3AF]">FRAGRANCE 02</div>
                      <div className="font-manrope text-[14px] font-semibold text-[#F5F2EE] truncate">
                        {fragrance2.name}
                      </div>
                      <div className="font-manrope text-[12px] text-[#B8B3AF] truncate">{fragrance2.scentIdentity}</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Pricing & Savings Summary */}
              <div className="bg-[#121212] border border-white/10 rounded-xl p-4 sm:p-5 flex items-center justify-between">
                <div>
                  <div className="font-manrope text-[12px] uppercase tracking-[0.09em] text-[#B8B3AF] font-semibold">
                    WARDROBE DUO PRICE (2 × 60ML)
                  </div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="font-manrope text-[24px] sm:text-[28px] font-semibold text-[#F5F2EE]">
                      ₹{bundle.bundlePrice.toLocaleString()}
                    </span>
                    <span className="font-manrope text-[15px] text-[#B8B3AF] line-through">
                      ₹{bundle.originalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-block bg-[#8F1018]/30 border border-[#B4171E]/50 text-[#F5F2EE] font-manrope text-[13px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-xs">
                    SAVE ₹{bundle.savings.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Primary Action CTA */}
              <div>
                <button
                  type="button"
                  onClick={handleAddDuoToCart}
                  className="w-full bg-[#B4171E] hover:bg-[#C72A35] active:scale-[0.98] text-[#F5F2EE] py-4 px-6 rounded-xl font-manrope font-semibold text-[15px] flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer shadow-lg group btn-interactive"
                  id="wardrobe-hero-cta"
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5 text-[#72D66F]" />
                      <span>DUO ADDED TO CART ✓</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 text-[#F5F2EE]" />
                      <span>BUILD MY DUO</span>
                      <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </>
                  )}
                </button>
              </div>

              {/* Reassurance Features */}
              <div className="grid grid-cols-2 gap-3 pt-2 font-manrope text-[13px] text-[#B8B3AF] border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#B8B3AF] shrink-0" />
                  <span>Free Express Delivery Across India</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#B8B3AF] shrink-0" />
                  <span>Authentic 60ml EDP Signatures</span>
                </div>
              </div>

            </div>

          </div>

        </MainContainer>
      </section>

      {/* ── 2. WHY THIS COMBINATION & WHEN TO WEAR ── */}
      <section className="py-12 bg-[#080808]">
        <MainContainer>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Why This Combination */}
            <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 font-manrope text-[12px] font-semibold uppercase text-[#B8B3AF] tracking-[0.09em]">
                <Sparkles className="w-4 h-4 text-[#B4171E]" />
                <span>WHY THIS COMBINATION</span>
              </div>
              <h3 className="font-sora text-[20px] font-semibold text-[#F5F2EE]">
                Curated Scent Synergy
              </h3>
              <p className="font-manrope text-[14px] text-[#B8B3AF] leading-[1.5]">
                {bundle.whyCombination}
              </p>
            </div>

            {/* How to Use / When to Wear */}
            <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 font-manrope text-[12px] font-semibold uppercase text-[#B8B3AF] tracking-[0.09em]">
                <Layers className="w-4 h-4 text-[#B4171E]" />
                <span>WHEN TO WEAR</span>
              </div>
              <h3 className="font-sora text-[20px] font-semibold text-[#F5F2EE]">
                Sensory Wearing Guide
              </h3>
              <p className="font-manrope text-[14px] text-[#B8B3AF] leading-[1.5]">
                {bundle.whenToWear}
              </p>
            </div>

          </div>
        </MainContainer>
      </section>

    </div>
  );
}
