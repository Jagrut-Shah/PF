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
    <div className="w-full bg-[#0B0B0B] text-[#F5F2EE] min-h-screen pb-16">
      <SEO
        title="ÉLAVA Samples — Try Any 60ml Eau de Parfum Signature at Home"
        description="Select any fragrance from our collection and experience the full 60ml bottle before deciding if it's your signature scent."
        canonicalPath="/samples"
        ogType="website"
      />

      {/* ── 1. HERO SECTION ── */}
      <section className="py-10 sm:py-14 bg-[#121212] border-b border-white/10">
        <MainContainer>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#B8B3AF] mb-6 uppercase tracking-wider font-manrope font-medium">
            <Link to="/" className="hover:text-[#F5F2EE] transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-[#F5F2EE]">SAMPLES</span>
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1A1A] border border-white/15 text-[#F5F2EE] font-manrope text-[12px] font-semibold tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#B4171E]" />
              <span>THE ÉLAVA SAMPLE EXPERIENCE</span>
            </div>

            <h1 className="font-sora text-[32px] sm:text-[42px] lg:text-[50px] font-semibold text-[#F5F2EE] leading-[1.08] tracking-[-0.035em]">
              TRY ANY ÉLAVA FRAGRANCE
            </h1>
            <p className="font-manrope text-[16px] sm:text-[18px] text-[#B8B3AF] max-w-xl mx-auto leading-[1.5]">
              Choose any fragrance from our collection and experience the full 60ml bottle before deciding if it's your signature scent.
            </p>
          </div>

          {/* ── THREE KEY FEATURES HIGHLIGHT ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8 sm:mt-10">
            <div className="bg-[#121212] border border-white/10 rounded-xl p-5 text-center space-y-2">
              <span className="font-sora text-[18px] font-semibold text-[#F5F2EE] block">FULL 60ML BOTTLE</span>
              <p className="font-manrope text-[14px] text-[#B8B3AF] leading-[1.5]">
                No tiny 5ml or 10ml vials. You receive the complete signature 60ml bottle to wear and evaluate.
              </p>
            </div>
            <div className="bg-[#121212] border border-white/10 rounded-xl p-5 text-center space-y-2">
              <span className="font-sora text-[18px] font-semibold text-[#F5F2EE] block">ANY FRAGRANCE</span>
              <p className="font-manrope text-[14px] text-[#B8B3AF] leading-[1.5]">
                Pick your preferred fragrance from our entire premium Eau de Parfum collection.
              </p>
            </div>
            <div className="bg-[#121212] border border-white/10 rounded-xl p-5 text-center space-y-2">
              <span className="font-sora text-[18px] font-semibold text-[#F5F2EE] block">TRY IT AT HOME</span>
              <p className="font-manrope text-[14px] text-[#B8B3AF] leading-[1.5]">
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
            <h2 className="font-sora text-[28px] sm:text-[36px] font-semibold tracking-[-0.025em] text-[#F5F2EE]">
              SELECT YOUR SCENT
            </h2>
            <p className="font-manrope text-[15px] text-[#B8B3AF] mt-1">
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
                      ? 'bg-[#121212] border-[#B4171E] shadow-xl scale-[1.01]'
                      : 'bg-[#121212] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div>
                    {/* Image Area */}
                    <div className="relative aspect-square rounded-xl bg-[#080808] border border-white/10 overflow-hidden mb-4 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-[85%] h-[85%] object-contain transform group-hover:scale-105 transition-transform"
                      />
                      
                      {/* Checkbox indicator */}
                      <div className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                        isSelected 
                          ? 'bg-[#B4171E] border-[#B4171E] text-[#F5F2EE]' 
                          : 'bg-[#080808]/80 border-white/20 text-transparent'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>

                      <span className="absolute bottom-3 left-3 bg-[#080808]/90 text-[#F5F2EE] font-manrope text-[11px] font-semibold px-2.5 py-0.5 rounded border border-white/10">
                        60 ML BOTTLE
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="font-manrope text-[12px] font-semibold uppercase tracking-[0.09em] text-[#B8B3AF]">
                        {product.scentIdentity}
                      </div>
                      <h3 className="font-sora text-[20px] font-semibold text-[#F5F2EE]">
                        ÉLAVA {product.name}
                      </h3>
                      <p className="font-manrope text-[13px] text-[#B8B3AF] leading-[1.5] line-clamp-3">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-white/10">
                    <span className="font-manrope text-[13px] font-medium text-[#B8B3AF]">
                      Sample Price:
                    </span>
                    <span className="font-manrope text-[16px] font-semibold text-[#F5F2EE]">
                      ₹{product.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Sticky/Curated Bottom Actions Card ── */}
          {selectedProduct && (
            <div className="max-w-xl mx-auto mt-12 bg-[#121212] border border-white/15 rounded-2xl p-5 sm:p-6 shadow-2xl text-center space-y-4">
              <div className="flex items-center justify-center gap-1.5 font-manrope text-[13px] text-[#B8B3AF] font-semibold tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#B4171E]" />
                <span>Selected Sample Scent</span>
              </div>
              
              <div>
                <h3 className="font-sora text-[24px] font-semibold text-[#F5F2EE]">
                  ÉLAVA {selectedProduct.name}
                </h3>
                <p className="font-manrope text-[14px] text-[#B8B3AF] mt-0.5">
                  Complete 60ml Sample Bottle • ₹{selectedProduct.price.toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#B4171E] hover:bg-[#C72A35] active:scale-[0.98] text-[#F5F2EE] py-3.5 px-6 rounded-xl font-manrope font-semibold text-[14px] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-md btn-interactive"
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-4 h-4 text-[#72D66F]" />
                      <span>SAMPLE ADDED ✓</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#F5F2EE]" />
                      <span>ADD SAMPLE TO CART</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCheckoutDirect}
                  className="flex-1 bg-[#080808] hover:bg-[#1a1a1a] text-[#F5F2EE] border border-white/20 py-3.5 px-6 rounded-xl font-manrope font-semibold text-[14px] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-md btn-interactive"
                >
                  <CreditCard className="w-4 h-4 text-[#F5F2EE]" />
                  <span>CHECKOUT →</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 font-manrope text-[12px] text-[#B8B3AF] pt-1">
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
