import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check, Sparkles, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';
import { addToCartItem } from '../utils/cart';

// Sample set product object identity (4 x 60ml bottles experience)
export const DISCOVERY_SET_PRODUCT = {
  id: 'discovery-set',
  slug: 'discovery-set',
  type: 'sample_set',
  name: 'ÉLAVA Discovery Set',
  image: '/images/products/row-1-column-4.png',
  category: 'unisex',
  gender: 'unisex',
  price: 499,
  size: '4 × 60 ML',
  rating: 4.9,
  reviewCount: 312,
  scentIdentity: '4 × 60ml Eau de Parfum Bottles',
  description: 'Discover 4 iconic ÉLAVA Eau de Parfum signatures in full 60ml bottles to test and find your ultimate scent identity.',
};

export default function DiscoverySetPage() {
  const [addedToCart, setAddedToCart] = useState(false);

  // Included 4 fragrances in the sample set (Full size 60ml testing experience)
  const sampleFragrances = [
    {
      slug: 'noir',
      name: 'NOIR',
      size: '60 ML BOTTLE',
      identity: 'Dark · Warm · Magnetic',
      notes: 'Bergamot, Black Pepper, Lavender, Amber & Wood',
      image: '/images/products/row-1-column-1.png',
    },
    {
      slug: 'oud-x',
      name: 'OUD X',
      size: '60 ML BOTTLE',
      identity: 'Smoky · Bold · Rich',
      notes: 'Saffron, Royal Oud, Leather, Rose & Sandalwood',
      image: '/images/products/row-1-column-2.png',
    },
    {
      slug: 'velvet',
      name: 'VELVET',
      size: '60 ML BOTTLE',
      identity: 'Soft · Floral · Warm',
      notes: 'Raspberry, Pink Pepper, Rose, Peony & Vanilla',
      image: '/images/products/row-2-column-1.png',
    },
    {
      slug: 'sable',
      name: 'SABLE',
      size: '60 ML BOTTLE',
      identity: 'Crisp · Citrusy · Clean',
      notes: 'Crisp Bergamot, Citrus, White Cedar & Clean Musk',
      image: '/images/products/row-3-column-1.png',
    },
  ];

  const handleAddToCart = () => {
    addToCartItem(DISCOVERY_SET_PRODUCT, '4 × 60 ML');
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2500);
  };

  return (
    <div className="w-full bg-[#0A0A0C] text-[#F1EEF2] min-h-screen pb-16">
      <SEO
        title="ÉLAVA Discovery Set — 4 × 60ml Eau de Parfum Testing Experience"
        description="Try 4 iconic ÉLAVA Eau de Parfum signatures in full 60ml bottles at home before choosing your personal signature scent."
        canonicalPath="/discovery-set"
        ogType="website"
      />

      {/* ── 1. HERO SECTION ── */}
      <section className="py-10 sm:py-14 bg-[#111116] border-b border-[rgba(241,238,242,0.10)]">
        <MainContainer>
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#A7A3AA] mb-6 uppercase tracking-wider font-sans">
            <Link to="/" className="hover:text-[#F1EEF2] transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-[#D62F4F] font-bold">DISCOVERY SET</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Discovery Set Hero Image */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-lg aspect-[4/3.5] rounded-2xl overflow-hidden bg-[#18181E] border border-[rgba(241,238,242,0.12)] shadow-2xl group">
                <img
                  src="/images/products/row-1-column-4.png"
                  alt="ÉLAVA Discovery Set"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#D62F4F] text-[#FFFFFF] text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded shadow-md">
                  TRY BEFORE YOU COMMIT
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-[#111116]/90 backdrop-blur-xs border border-[rgba(241,238,242,0.12)] rounded-xl p-3 flex items-center justify-between text-xs">
                  <span className="text-[#A7A3AA] uppercase tracking-wider font-semibold">DISCOVERY SELECTION</span>
                  <span className="text-[#F1EEF2] font-bold">4 × 60 ML EDP Bottles</span>
                </div>
              </div>
            </div>

            {/* Right: Discovery Details */}
            <div className="lg:col-span-6 space-y-5">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181E] border border-[rgba(241,238,242,0.12)] text-[#D62F4F] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#D62F4F]" />
                <span>TRY BEFORE YOU COMMIT</span>
              </div>

              <div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#F1EEF2] leading-tight">
                  ÉLAVA DISCOVERY SET
                </h1>
                <p className="font-sans text-base sm:text-lg text-[#D62F4F] mt-1 font-semibold">
                  Test 4 artisanal signatures in full 60ml bottles.
                </p>
              </div>

              <p className="font-sans text-sm sm:text-base text-[#A7A3AA] leading-relaxed">
                Experience the fragrances in full 60ml bottles before deciding which scent belongs in your permanent collection.
              </p>

              {/* Price Card */}
              <div className="bg-[#18181E] border border-[rgba(241,238,242,0.12)] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-[#A7A3AA] font-semibold">
                    DISCOVERY PRICE (4 × 60ML BOTTLES)
                  </div>
                  <div className="font-sans text-2xl sm:text-3xl font-bold text-[#F1EEF2] mt-0.5">
                    ₹499
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-[#D62F4F]/15 border border-[#D62F4F]/40 text-[#D62F4F] text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded">
                    SPECIAL OFFER
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full bg-[#D62F4F] hover:bg-[#F04463] active:bg-[#B92340] text-white py-4 px-6 rounded-xl font-bold uppercase text-xs sm:text-sm tracking-[0.18em] flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer shadow-lg active:scale-[0.99] group"
                  id="add-discovery-set-btn"
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5 text-[#72D66F]" />
                      <span>DISCOVERY SET ADDED ✓</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 text-white" />
                      <span>ADD DISCOVERY SET TO CART</span>
                      <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#A7A3AA] border-t border-[rgba(241,238,242,0.10)]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#D62F4F] shrink-0" />
                  <span>Free Express Delivery Across India</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D62F4F] shrink-0" />
                  <span>Full 60ml Eau de Parfum Bottles</span>
                </div>
              </div>

            </div>

          </div>

        </MainContainer>
      </section>

      {/* ── 2. WHAT YOU GET (INCLUDED FRAGRANCES + DIRECT FULL-SIZE LINKS) ── */}
      <section className="py-12 sm:py-16">
        <MainContainer>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#F1EEF2]">
              WHAT YOU GET IN THE DISCOVERY SET
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#A7A3AA] mt-2">
              Explore these 4 distinct 60 ML Eau de Parfum bottles, each crafted with premium fragrance oil concentration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleFragrances.map((sample) => (
              <div
                key={sample.slug}
                className="bg-[#18181E] border border-[rgba(241,238,242,0.10)] rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-[#D62F4F]/50 transition-colors group"
              >
                <div>
                  <div className="relative aspect-square rounded-xl bg-[#111116] border border-[rgba(241,238,242,0.08)] overflow-hidden mb-3">
                    <img
                      src={sample.image}
                      alt={sample.name}
                      className="w-full h-full object-contain p-2 transform group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 left-2 bg-[#18181E] text-[#D62F4F] text-[9.5px] font-bold px-2 py-0.5 rounded border border-[rgba(241,238,242,0.12)]">
                      {sample.size}
                    </span>
                  </div>

                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D62F4F]">
                    {sample.identity}
                  </span>
                  <h3 className="font-serif text-xl font-bold uppercase text-[#F1EEF2] mt-0.5">
                    ÉLAVA {sample.name}
                  </h3>
                  <p className="text-xs text-[#A7A3AA] font-sans mt-1.5 leading-relaxed">
                    {sample.notes}
                  </p>
                </div>

                {/* Direct link to product page */}
                <Link
                  to={`/product/${sample.slug}`}
                  className="w-full bg-[#111116] hover:bg-[#18181E] border border-[rgba(241,238,242,0.14)] text-[#F1EEF2] py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>VIEW {sample.name} 60ML</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D62F4F]" />
                </Link>
              </div>
            ))}
          </div>
        </MainContainer>
      </section>

      {/* ── 3. WHY TRY THE DISCOVERY SET? ── */}
      <section className="py-12 bg-[#111116] border-t border-b border-[rgba(241,238,242,0.10)]">
        <MainContainer>
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase text-[#F1EEF2]">
              WHY START WITH THE DISCOVERY SET?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-4">
              <div className="bg-[#18181E] p-5 rounded-xl border border-[rgba(241,238,242,0.10)] space-y-2">
                <span className="text-xs font-bold text-[#D62F4F] uppercase tracking-wider">01 · SKIN COMPATIBILITY</span>
                <h4 className="font-serif font-bold text-[#F1EEF2]">Test on Your Skin</h4>
                <p className="text-xs text-[#A7A3AA] leading-relaxed">
                  Fragrances evolve differently on every skin type. Wear each signature for full days before committing.
                </p>
              </div>
              <div className="bg-[#18181E] p-5 rounded-xl border border-[rgba(241,238,242,0.10)] space-y-2">
                <span className="text-xs font-bold text-[#D62F4F] uppercase tracking-wider">02 · FULL BOTTLES</span>
                <h4 className="font-serif font-bold text-[#F1EEF2]">Full 60ml Experience</h4>
                <p className="text-xs text-[#A7A3AA] leading-relaxed">
                  Generous 60ml bottles provide a true wearing experience across day, evening, and special occasions.
                </p>
              </div>
              <div className="bg-[#18181E] p-5 rounded-xl border border-[rgba(241,238,242,0.10)] space-y-2">
                <span className="text-xs font-bold text-[#D62F4F] uppercase tracking-wider">03 · COMPLETE WARDROBE</span>
                <h4 className="font-serif font-bold text-[#F1EEF2]">Diverse Profiles</h4>
                <p className="text-xs text-[#A7A3AA] leading-relaxed">
                  Includes dark woody, smoky oud, soft rose, and crisp citrus signatures for every mood.
                </p>
              </div>
            </div>
          </div>
        </MainContainer>
      </section>

    </div>
  );
}
