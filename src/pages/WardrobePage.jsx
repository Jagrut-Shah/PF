import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Check, Layers, Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';
import ProductCard from '../components/home/ProductCard';
import products from '../data/products';
import { WARDROBE_BUNDLES, getWardrobeBundle } from '../data/wardrobeBundles';
import { addToCartItem } from '../utils/cart';

export default function WardrobePage() {
  const { bundleSlug } = useParams();
  const bundle = getWardrobeBundle(bundleSlug);

  const [addedToCart, setAddedToCart] = useState(false);

  // Retrieve matching product objects from products.js
  const fragrance1 = products.find((p) => p.slug === bundle.productSlugs[0]) || products[0];
  const fragrance2 = products.find((p) => p.slug === bundle.productSlugs[1]) || products[1];

  // Related products (excluding the bundle products)
  const relatedProducts = products
    .filter((p) => p.slug !== fragrance1.slug && p.slug !== fragrance2.slug)
    .slice(0, 4);

  // CTA Handler to add duo to existing shared cart
  const handleAddDuoToCart = () => {
    addToCartItem(fragrance1, '60 ML');
    addToCartItem(fragrance2, '60 ML');

    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2500);
  };

  return (
    <div className="w-full bg-[#163E49] text-[#F5F1EA] min-h-screen pb-16">
      <SEO
        title={`ÉLAVA ${bundle.title} — 2 × 60ml Fragrance Wardrobe`}
        description={bundle.subtitle}
        canonicalPath={`/wardrobe/${bundle.slug}`}
        ogType="website"
      />

      {/* ── 1. HERO SECTION ── */}
      <section className="py-10 sm:py-14 md:py-18 bg-[#102F38] border-b border-[rgba(243,235,221,0.12)] relative overflow-hidden">
        <MainContainer>
          
          {/* Top Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-[#B8C4C2] mb-6 uppercase tracking-wider font-sans">
            <Link to="/" className="hover:text-[#F5F1EA] transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-[#C5A15A] font-bold">SCENT WARDROBE</span>
            <span>/</span>
            <span className="text-[#F5F1EA]">{bundle.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Main Product Photography (Existing Asset) */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-lg aspect-[4/3.8] rounded-2xl overflow-hidden bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] shadow-2xl group">
                <img
                  src={bundle.mainImage}
                  alt={bundle.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* 2 x 60ML Badge */}
                <div className="absolute top-4 left-4 bg-[#7A2929] text-[#F5F1EA] text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded shadow-md">
                  {bundle.badge}
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-[#102F38]/90 backdrop-blur-xs border border-[rgba(243,235,221,0.15)] rounded-xl p-3 flex items-center justify-between text-xs">
                  <span className="text-[#B8C4C2] uppercase tracking-wider font-semibold">DUO PACKAGING</span>
                  <span className="text-[#F5F1EA] font-bold">2 × 60 ML Eau de Parfum</span>
                </div>
              </div>
            </div>

            {/* Right: Wardrobe Hero Details & CTA */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] text-[#C5A15A] text-xs font-bold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5 text-[#C5A15A]" />
                <span>CURATED SCENT WARDROBE</span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#F5F1EA] leading-tight">
                  {bundle.title}
                </h1>
                <p className="font-serif text-lg sm:text-xl italic text-[#C5A15A] mt-1">
                  {bundle.tagline}
                </p>
              </div>

              {/* Subtitle / Description */}
              <p className="font-sans text-sm sm:text-base text-[#B8C4C2] leading-relaxed">
                {bundle.subtitle}
              </p>

              {/* Pricing & Savings Summary (Mathematically Accurate) */}
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
                  <div className="inline-block bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] text-xs sm:text-sm font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-xs">
                    SAVE ₹{bundle.savings.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Primary Action CTA */}
              <div>
                <button
                  type="button"
                  onClick={handleAddDuoToCart}
                  className="w-full bg-[#000000] hover:bg-[#151515] text-[#F5F1EA] border border-[rgba(243,235,221,0.3)] py-4 px-6 rounded-xl font-bold uppercase text-xs sm:text-sm tracking-[0.18em] flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer shadow-lg active:scale-[0.99]"
                  id="wardrobe-hero-cta"
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5 text-[#25D366]" />
                      <span>DUO ADDED TO CART ✓</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 text-[#F5F1EA]" />
                      <span>BUILD MY DUO →</span>
                    </>
                  )}
                </button>
              </div>

              {/* Reassurance Features */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#B8C4C2] border-t border-[rgba(243,235,221,0.12)]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#C5A15A] shrink-0" />
                  <span>Free Express Delivery Across India</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A15A] shrink-0" />
                  <span>Authentic 60ml EDP Signatures</span>
                </div>
              </div>

            </div>

          </div>

        </MainContainer>
      </section>

      {/* ── 2. WHAT YOU GET (INCLUDED FRAGRANCES) ── */}
      <section className="py-12 sm:py-16">
        <MainContainer>
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#F5F1EA]">
              WHAT YOU GET IN THIS WARDROBE
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#B8C4C2] mt-2">
              Two full-sized 60 ML Eau de Parfum fragrances thoughtfully paired to complement each other.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            
            {/* Fragrance 1 */}
            <div className="bg-[#102F38] border border-[rgba(243,235,221,0.15)] rounded-2xl p-6 flex flex-col justify-between space-y-4">
              <div className="flex items-start gap-4">
                <img
                  src={fragrance1.image}
                  alt={fragrance1.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-xl bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] shrink-0"
                />
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A15A]">
                    FRAGRANCE 01 · 60 ML EDP
                  </span>
                  <h3 className="font-serif text-xl font-bold uppercase text-[#F5F1EA] mt-0.5">
                    ÉLAVA {fragrance1.name}
                  </h3>
                  <p className="text-xs text-[#B8C4C2] mt-1 font-sans">
                    {fragrance1.scentIdentity}
                  </p>
                  <span className="inline-block font-sans text-xs font-bold text-[#F5F1EA] mt-2">
                    Single Price: ₹{fragrance1.price}
                  </span>
                </div>
              </div>

              {/* Fragrance Notes */}
              <div className="bg-[#1C4A55]/60 rounded-xl p-3 text-xs space-y-1 border border-[rgba(243,235,221,0.1)]">
                <div><strong className="text-[#C5A15A]">Top:</strong> {fragrance1.notes?.top}</div>
                <div><strong className="text-[#C5A15A]">Heart:</strong> {fragrance1.notes?.heart}</div>
                <div><strong className="text-[#C5A15A]">Base:</strong> {fragrance1.notes?.base}</div>
              </div>
            </div>

            {/* Fragrance 2 */}
            <div className="bg-[#102F38] border border-[rgba(243,235,221,0.15)] rounded-2xl p-6 flex flex-col justify-between space-y-4">
              <div className="flex items-start gap-4">
                <img
                  src={fragrance2.image}
                  alt={fragrance2.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-xl bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] shrink-0"
                />
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A15A]">
                    FRAGRANCE 02 · 60 ML EDP
                  </span>
                  <h3 className="font-serif text-xl font-bold uppercase text-[#F5F1EA] mt-0.5">
                    ÉLAVA {fragrance2.name}
                  </h3>
                  <p className="text-xs text-[#B8C4C2] mt-1 font-sans">
                    {fragrance2.scentIdentity}
                  </p>
                  <span className="inline-block font-sans text-xs font-bold text-[#F5F1EA] mt-2">
                    Single Price: ₹{fragrance2.price}
                  </span>
                </div>
              </div>

              {/* Fragrance Notes */}
              <div className="bg-[#1C4A55]/60 rounded-xl p-3 text-xs space-y-1 border border-[rgba(243,235,221,0.1)]">
                <div><strong className="text-[#C5A15A]">Top:</strong> {fragrance2.notes?.top}</div>
                <div><strong className="text-[#C5A15A]">Heart:</strong> {fragrance2.notes?.heart}</div>
                <div><strong className="text-[#C5A15A]">Base:</strong> {fragrance2.notes?.base}</div>
              </div>
            </div>

          </div>

        </MainContainer>
      </section>

      {/* ── 3. WHY THIS COMBINATION & WHEN TO WEAR ── */}
      <section className="py-10 bg-[#102F38] border-t border-b border-[rgba(243,235,221,0.12)]">
        <MainContainer>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Why This Combination */}
            <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#C5A15A] tracking-wider">
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
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#C5A15A] tracking-wider">
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

      {/* ── 4. DISCOUNT & FINAL CTA SUMMARY ── */}
      <section className="py-12 sm:py-16">
        <MainContainer>
          <div className="max-w-2xl mx-auto bg-[#102F38] border border-[rgba(243,235,221,0.18)] rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C5A15A]">
              LIMITED WARDROBE OFFER
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase text-[#F5F1EA]">
              ADD {bundle.title} TO YOUR CART
            </h2>
            <div className="flex items-center justify-center gap-4 text-xl sm:text-2xl font-bold">
              <span className="text-[#F5F1EA]">₹{bundle.bundlePrice.toLocaleString()}</span>
              <span className="text-[#B8C4C2] line-through text-sm sm:text-base">₹{bundle.originalPrice.toLocaleString()}</span>
              <span className="text-[#25D366] text-sm sm:text-base font-extrabold">SAVE ₹{bundle.savings}</span>
            </div>

            <button
              type="button"
              onClick={handleAddDuoToCart}
              className="w-full bg-[#000000] hover:bg-[#151515] text-[#F5F1EA] border border-[rgba(243,235,221,0.3)] py-4 px-6 rounded-xl font-bold uppercase text-xs sm:text-sm tracking-[0.18em] flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer shadow-lg active:scale-[0.99]"
              id="wardrobe-bottom-cta"
            >
              {addedToCart ? (
                <>
                  <Check className="w-5 h-5 text-[#25D366]" />
                  <span>DUO ADDED TO CART ✓</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 text-[#F5F1EA]" />
                  <span>BUILD MY DUO →</span>
                </>
              )}
            </button>
          </div>
        </MainContainer>
      </section>

      {/* ── 5. RELATED FRAGRANCES ── */}
      <section className="py-10 border-t border-[rgba(243,235,221,0.12)]">
        <MainContainer>
          <div className="mb-6">
            <h2 className="font-serif text-xl sm:text-2xl font-bold uppercase text-[#F5F1EA]">
              EXPLORE OTHER SIGNATURE FRAGRANCES
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </MainContainer>
      </section>

    </div>
  );
}
