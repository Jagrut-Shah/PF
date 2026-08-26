import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Check, Sparkles, ArrowRight, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';
import { addToCartItem } from '../utils/cart';
import products from '../data/products';
import createWhatsAppOrderUrl from '../utils/whatsapp';

export default function DiscoverySetPage() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(products[0] || null);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    // Create a special sample purchase object to keep it separate in the cart
    const sampleItem = {
      ...selectedProduct,
      id: `sample-${selectedProduct.id}`,
      name: `${selectedProduct.name} (Sample)`,
      type: 'sample_purchase',
      size: '60 ML',
    };

    addToCartItem(sampleItem, '60 ML');
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2500);
  };

  const handleCheckoutDirect = () => {
    if (!selectedProduct) return;
    const sampleItem = {
      ...selectedProduct,
      id: `sample-${selectedProduct.id}`,
      name: `${selectedProduct.name} (Sample)`,
      type: 'sample_purchase',
      size: '60 ML',
    };
    addToCartItem(sampleItem, '60 ML');
    navigate('/checkout');
  };

  const handleWhatsAppOrder = () => {
    if (!selectedProduct) return;

    const message = `Hi ÉLAVA, I would like to order a 60ml Sample of ÉLAVA ${selectedProduct.name} for ₹${selectedProduct.price.toLocaleString()}.`;
    const url = createWhatsAppOrderUrl({ customMessage: message });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full bg-[#163E49] text-[#F5F1EA] min-h-screen pb-16">
      <SEO
        title="ÉLAVA Samples — Try Any 60ml Eau de Parfum Signature at Home"
        description="Select any fragrance from our collection and experience the full 60ml bottle before deciding if it's your signature scent."
        canonicalPath="/samples"
        ogType="website"
      />

      {/* ── 1. HERO SECTION ── */}
      <section className="py-10 sm:py-14 bg-[#102F38] border-b border-[rgba(243,235,221,0.12)]">
        <MainContainer>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#B8C4C2] mb-6 uppercase tracking-wider font-sans">
            <Link to="/" className="hover:text-[#F5F1EA] transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-[#F5F1EA]">SAMPLES</span>
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] text-[#B8C4C2] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#B8C4C2]" />
              <span>THE ELAVA SAMPLE EXPERIENCE</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#F5F1EA] leading-tight">
              TRY ANY ELAVA FRAGRANCE
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#B8C4C2] max-w-xl mx-auto leading-relaxed">
              Choose any fragrance from our collection and experience the full 60ml bottle before deciding if it's your signature scent.
            </p>
          </div>

          {/* ── THREE KEY FEATURES HIGHLIGHT ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8 sm:mt-10">
            <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-5 text-center space-y-2">
              <span className="font-serif text-lg font-bold text-[#F5F1EA] block">FULL 60ML BOTTLE</span>
              <p className="text-xs text-[#B8C4C2] leading-relaxed">
                No tiny 5ml or 10ml vials. You receive the complete signature 60ml bottle to wear and evaluate.
              </p>
            </div>
            <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-5 text-center space-y-2">
              <span className="font-serif text-lg font-bold text-[#F5F1EA] block">ANY FRAGRANCE</span>
              <p className="text-xs text-[#B8C4C2] leading-relaxed">
                Pick your preferred fragrance from our entire premium Eau de Parfum collection.
              </p>
            </div>
            <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-5 text-center space-y-2">
              <span className="font-serif text-lg font-bold text-[#F5F1EA] block">TRY IT AT HOME</span>
              <p className="text-xs text-[#B8C4C2] leading-relaxed">
                Experience its projection, sillage, and skin chemistry in your daily routine over weeks.
              </p>
            </div>
          </div>
        </MainContainer>
      </section>

      {/* ── 2. SELECTION GRID ── */}
      <section className="py-12 sm:py-16">
        <MainContainer>
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#F5F1EA]">
              SELECT YOUR SCENT
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#B8C4C2] mt-1">
              Choose one fragrance below to receive as your 60ml sample purchase.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {products.map((product) => {
              const isSelected = selectedProduct?.id === product.id;
              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className={`relative rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all duration-200 cursor-pointer group border ${
                    isSelected
                      ? 'bg-[#102F38] border-white/60 shadow-xl shadow-[#102F38]/40 scale-[1.01]'
                      : 'bg-[#1C4A55] border-[rgba(243,235,221,0.15)] hover:border-[rgba(243,235,221,0.30)]'
                  }`}
                >
                  <div>
                    {/* Image Area */}
                    <div className="relative aspect-square rounded-xl bg-[#102F38]/60 border border-[rgba(243,235,221,0.12)] overflow-hidden mb-4 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-[85%] h-[85%] object-contain transform group-hover:scale-105 transition-transform"
                      />
                      
                      {/* Checkbox indicator */}
                      <div className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                        isSelected 
                          ? 'bg-black border-white/60 text-white' 
                          : 'bg-[#102F38]/80 border-[rgba(243,235,221,0.2)] text-transparent'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>

                      <span className="absolute bottom-3 left-3 bg-[#102F38]/90 text-[#F5F1EA] text-[10px] font-bold px-2.5 py-0.5 rounded border border-[rgba(243,235,221,0.12)]">
                        60 ML BOTTLE
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#B8C4C2]">
                        {product.scentIdentity}
                      </div>
                      <h3 className="font-serif text-xl font-bold uppercase text-[#F5F1EA]">
                        ÉLAVA {product.name}
                      </h3>
                      <p className="text-xs text-[#B8C4C2] font-sans leading-relaxed line-clamp-3">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-[rgba(243,235,221,0.10)]">
                    <span className="font-sans text-sm font-semibold text-[#B8C4C2]">
                      Sample Price:
                    </span>
                    <span className="font-sans text-base font-bold text-[#F5F1EA]">
                      ₹{product.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Sticky/Curated Bottom Actions Card ── */}
          {selectedProduct && (
            <div className="max-w-xl mx-auto mt-12 bg-[#102F38] border border-[rgba(243,235,221,0.18)] rounded-2xl p-5 sm:p-6 shadow-2xl text-center space-y-4">
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#B8C4C2] uppercase font-bold tracking-wider">
                <Sparkle className="w-3.5 h-3.5 text-[#B8C4C2]" />
                <span>Selected Sample Scent</span>
              </div>
              
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#F5F1EA] uppercase">
                  ÉLAVA {selectedProduct.name}
                </h3>
                <p className="font-sans text-xs text-[#B8C4C2] mt-0.5">
                  Complete 60ml Sample Bottle • ₹{selectedProduct.price.toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 bg-black hover:bg-neutral-900 active:bg-neutral-800 text-[#F5F1EA] py-3.5 px-6 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-md"
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-4 h-4 text-[#72D66F]" />
                      <span>SAMPLE ADDED ✓</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-white" />
                      <span>ADD SAMPLE TO CART</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCheckoutDirect}
                  className="flex-1 bg-[#C5A15A] hover:bg-[#D4B26B] text-[#102F38] py-3.5 px-6 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-md"
                >
                  <CreditCard className="w-4 h-4 text-[#102F38]" />
                  <span>CHECKOUT →</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[10px] text-[#B8C4C2] pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 shrink-0" /> Free Express Delivery
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" /> Authentic EDP Formula
                </span>
              </div>
            </div>
          )}
        </MainContainer>
      </section>
    </div>
  );
}
