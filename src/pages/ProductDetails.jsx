import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, Plus, Minus, ShoppingBag, Check, X, Gift, Sparkles, CreditCard, Share2, Copy } from 'lucide-react';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';
import StarRating from '../components/ui/StarRating';
import products from '../data/products';
import createWhatsAppOrderUrl from '../utils/whatsapp';
import {
  getCart,
  addToCartItem,
  updateCartItemQuantity,
  removeCartItem,
  getCartTotals,
  getCartGiftOptions,
  updateCartGiftOptions,
  createCartWhatsAppOrderUrl,
} from '../utils/cart';

/**
 * Official WhatsApp Icon matching brand style
 */
function WhatsAppIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm-3.53 3.63c-.19 0-.42.07-.64.31-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.57 4.07 3.6 2 .86 2.41.69 2.84.65.43-.04 1.4-.57 1.6-1.13.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28s-1.4-.69-1.62-.77c-.22-.08-.38-.12-.54.12s-.62.77-.76.93c-.14.16-.28.18-.52.06s-1.01-.37-1.92-1.19c-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.48-.39-.41-.54-.42-.14-.01-.3-.01-.46-.01z" />
    </svg>
  );
}

/**
 * Solid Blue Padlock Icon (No Keyhole)
 */
function SecureLockIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="10" width="14" height="11" rx="2" fill="#2563EB" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/**
 * Unfilled Green Outline Shield Icon with Green Checkmark Tick
 */
function AuthTickIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3L4 6v5.5c0 5.25 3.4 10.15 8 11.35 4.6-1.2 8-6.1 8-11.35V6l-8-3z"
        stroke="#16A34A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M9 11.5l2 2 4-4"
        stroke="#16A34A"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Breadcrumb component for ProductDetails
 */
function Breadcrumb({ product }) {
  if (!product) return null;

  const genderPath = `/category/${product.gender}`;
  const genderLabel = product.gender ? product.gender.toUpperCase() : 'ALL';

  return (
    <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
      <ol className="flex items-center space-x-2 font-sans text-xs text-[#B8C4C2]">
        <li>
          <Link to="/" className="hover:text-[#F5F1EA] transition-colors">
            HOME
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link to={genderPath} className="hover:text-[#F5F1EA] transition-colors font-medium">
            {genderLabel}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="text-[#F5F1EA] font-semibold uppercase tracking-wider" aria-current="page">
          {product.name}
        </li>
      </ol>
    </nav>
  );
}

/**
 * Format notes helper
 */
function formatNotes(notesArray) {
  if (!notesArray) return '';
  if (Array.isArray(notesArray)) return notesArray.join(' · ');
  return notesArray;
}

export default function ProductDetails() {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const mainCtaRef = useRef(null);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [cartItems, setCartItems] = useState(getCart());
  const [cartGiftOpts, setCartGiftOpts] = useState(getCartGiftOptions());

  // Optional Product Page Gifting State
  const [isGift, setIsGift] = useState(false);
  const [giftPackaging, setGiftPackaging] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  // Pincode delivery estimator state
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  // Accordion state for mobile view
  const [openAccordions, setOpenAccordions] = useState({
    about: true,
    notes: false,
    reviews: false,
    delivery: false,
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Find product by slug
  const product = products.find((p) => p.slug === productSlug);

  // Selected variant/size
  const [selectedSize, setSelectedSize] = useState(product?.size || '60 ML');
  const [copiedProductShare, setCopiedProductShare] = useState(false);

  const handleWhatsAppProductShare = () => {
    if (!product) return;
    const text = encodeURIComponent(`Discover ÉLAVA ${product.name} Eau de Parfum (${selectedSize}): ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleProductShare = async () => {
    if (!product) return;
    const url = window.location.href;
    const shareData = {
      title: `ÉLAVA — ${product.name}`,
      text: `Discover ÉLAVA ${product.name} Eau de Parfum (${selectedSize})`,
      url: url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          handleCopyProductUrl();
        }
      }
    } else {
      handleCopyProductUrl();
    }
  };

  const handleCopyProductUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedProductShare(true);
      setTimeout(() => setCopiedProductShare(false), 2000);
    } catch (err) {
      console.error('Failed to copy product URL:', err);
    }
  };

  useEffect(() => {
    if (product) {
      setSelectedSize(product.size || '60 ML');
    }
  }, [product]);

  // Synchronize cart items and gift options with localStorage events across navigations
  useEffect(() => {
    const syncCart = () => {
      setCartItems(getCart());
      setCartGiftOpts(getCartGiftOptions());
    };

    syncCart();

    window.addEventListener('cart-updated', syncCart);
    window.addEventListener('storage', syncCart);

    return () => {
      window.removeEventListener('cart-updated', syncCart);
      window.removeEventListener('storage', syncCart);
    };
  }, []);

  // Shared Add to Cart Handler for both Main Purchase Area & Sticky Bar
  const handleAddToCart = (e) => {
    if (e) e.preventDefault();
    if (!product) return;

    const giftDetails = isGift
      ? { isGift: true, giftMessage: giftMessage.trim() }
      : null;

    // 1. Add product item with selected variant to shared multi-product cart
    const updatedCart = addToCartItem(product, selectedSize, giftDetails);
    setCartItems(updatedCart);
    setCartGiftOpts(getCartGiftOptions());

    // 2. Trigger feedback and show cart confirmation drawer
    setAddedToCart(true);
    setShowCartDrawer(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2500);
  };

  // Cart Drawer Gift Handlers
  const handleCartGiftToggle = (checked) => {
    const updated = updateCartGiftOptions({ isGift: checked });
    setCartGiftOpts(updated);
  };

  const handleCartGiftPackagingToggle = (checked) => {
    const updated = updateCartGiftOptions({ giftPackaging: checked });
    setCartGiftOpts(updated);
  };

  const handleCartGiftMessageChange = (val) => {
    const updated = updateCartGiftOptions({ giftMessage: val });
    setCartGiftOpts(updated);
  };

  // Sticky Add to Cart viewport visibility observer
  useEffect(() => {
    if (!mainCtaRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Appears immediately when the bottom of the main Add to Cart area leaves the top of the viewport
        setIsStickyVisible(!entry.isIntersecting && entry.boundingClientRect.bottom < 0);
      },
      {
        threshold: 0,
      }
    );

    observer.observe(mainCtaRef.current);

    return () => {
      observer.disconnect();
    };
  }, [product]);

  // If product not found
  if (!product) {
    return (
      <MainContainer className="py-16 text-center">
        <SEO
          title="Product Not Found | ÉLAVA"
          description="The requested fragrance signature could not be found."
          canonicalPath="/product"
        />
        <h1 className="font-sans text-3xl font-bold text-[#F5F1EA] mb-4">Product Not Found</h1>
        <p className="font-sans text-sm text-[#B8C4C2] mb-6">
          The fragrance signature you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#000000] text-white px-6 py-2.5 rounded text-xs uppercase tracking-widest font-semibold hover:bg-black/80 transition-colors"
        >
          Return to Homepage
        </Link>
      </MainContainer>
    );
  }

  // Gender display label
  const genderTarget = product.gender === 'men' ? 'For Him' : product.gender === 'women' ? 'For Her' : 'Unisex';

  // Dynamic WhatsApp pre-filled message for explicit WhatsApp order button
  const waCustomMessage = `Hi, I'd like to order ÉLAVA ${product.name} (${selectedSize}) for ₹${product.price?.toLocaleString()}.`;
  const whatsappUrl = createWhatsAppOrderUrl({ customMessage: waCustomMessage });

  // Product specific review
  const productReview = product.review || {
    text: 'Exceptional longevity and depth. Truly feels niche and bespoke.',
    customer: 'Aarav S.',
    city: 'Mumbai',
  };

  // Dynamic Product Page SEO Title
  const pageTitle = `${product.name} — ${product.scentIdentity} | ÉLAVA`;
  const pageCanonical = `/product/${product.slug}`;

  // JSON-LD Product Schema
  const productJsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: `ÉLAVA ${product.name}`,
    image: product.image,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'ÉLAVA',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
    },
  };

  const cartTotals = getCartTotals(cartItems);

  return (
    <MainContainer className="py-6 sm:py-8">
      {/* Dynamic SEO & JSON-LD Structured Data */}
      <SEO
        title={pageTitle}
        description={product.description}
        canonicalPath={pageCanonical}
        ogType="product"
        ogImage={product.image}
        jsonLd={productJsonLd}
      />

      {/* 1. Breadcrumb */}
      <Breadcrumb product={product} />

      {/* 2. Main Product Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* LEFT COLUMN: Product Image + Featured Review Card (Desktop) */}
        <div className="md:col-span-6 lg:col-span-7">
          {/* Main Product Image Container */}
          <div className="bg-[#1C4A55] p-2 sm:p-3 md:p-4 rounded-2xl border border-[rgba(243,235,221,0.15)] flex justify-center items-center">
            <img
              src={product.image}
              alt={`ÉLAVA ${product.name} Eau de Parfum bottle`}
              className="w-full max-w-[560px] max-h-[480px] h-auto object-contain drop-shadow-xs select-none"
              loading="eager"
            />
          </div>

          {/* Desktop Featured Review Card */}
          <div className="hidden md:block mt-4 bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-4 md:p-5 text-[#F5F1EA] shadow-sm">
            <div className="flex items-center gap-1.5 mb-2">
              <StarRating rating={product.rating} size={14} starColor="#C5A15A" />
            </div>
            <blockquote className="font-sans text-sm lg:text-base italic text-[#E5E9E8] leading-snug mb-2.5">
              "{productReview.text}"
            </blockquote>
            <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-[rgba(243,235,221,0.12)]">
              <span className="font-sans text-xs text-[#B8C4C2]">
                {productReview.customer} · {productReview.city}
              </span>
              <Link
                to={`/reviews?product=${product.slug}`}
                className="font-sans text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#F5F1EA] hover:text-[#FFFFFF] transition-colors inline-flex items-center gap-1.5"
              >
                VIEW MORE REVIEWS <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Details */}
        <div className="md:col-span-6 lg:col-span-5 flex flex-col">
          {/* Bestseller Badge */}
          {product.isBestseller && (
            <div className="self-start">
              <span className="bg-[#7A2929] text-[#F5F1EA] px-2.5 py-0.5 text-[10px] tracking-[0.2em] font-extrabold uppercase rounded-sm inline-block mb-2 shadow-xs">
                BESTSELLER
              </span>
            </div>
          )}

          {/* Product Title — Bodoni Moda 500-600 */}
          <h1 className="font-bodoni text-[28px] sm:text-[36px] lg:text-[44px] font-medium text-[#F5F2EE] leading-[1.05] tracking-[-0.015em]">
            {product.name}
          </h1>

          {/* Product Type + Gender */}
          <div className="font-manrope text-[14px] text-[#B8B3AF] font-medium mt-1">
            Eau de Parfum · {genderTarget}
          </div>

          {/* Rating + Review Count */}
          <div className="mt-3 flex items-center gap-2.5 font-manrope">
            <StarRating rating={product.rating} size={14} starColor="#C6A15B" />
            <span className="text-[13px] font-semibold text-[#F5F2EE]">{product.rating}</span>
            <span className="text-[13px] text-[#B8B3AF] font-normal">({product.reviewCount} reviews)</span>
          </div>

          {/* Price & Size Selection — Manrope 600 */}
          <div className="mt-4">
            <div className="font-manrope text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-[#F5F2EE] tracking-tight">
              ₹{product.price?.toLocaleString()}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedSize(product.size || '60 ML')}
                className={`font-manrope text-[13px] font-semibold uppercase px-3.5 py-1.5 rounded-lg border transition-colors ${
                  selectedSize === (product.size || '60 ML')
                    ? 'border-[#F5F2EE] bg-[#8F1018] text-[#F5F2EE]'
                    : 'border-white/20 text-[#B8B3AF]'
                }`}
              >
                {product.size || '60 ML'}
              </button>
            </div>
          </div>

          {/* Main Purchase CTA Area */}
          <div ref={mainCtaRef} className="mt-5 space-y-3">
            
            {/* 1. COMPACT PREMIUM GIFTING COMPONENT (PLACED ABOVE ADD TO CART) */}
            <div className="p-3.5 sm:p-4 bg-[#102F38] border border-[rgba(243,235,221,0.15)] rounded-xl text-xs space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-[#F5F1EA] text-xs sm:text-sm">
                  <input
                    type="checkbox"
                    checked={isGift}
                    onChange={(e) => setIsGift(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 accent-[#7A2929] cursor-pointer"
                    id="product-gift-checkbox"
                  />
                  <span className="flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-[#B8B3AF]" />
                    <span className="font-manrope text-[14px] font-semibold text-[#F5F2EE]">GIFTING THIS?</span>
                  </span>
                </label>
                <span className="text-[12px] text-[#B8B3AF] font-manrope">
                  Optional Gifting
                </span>
              </div>

              <p className="text-[13px] text-[#B8B3AF] font-manrope leading-snug pl-6">
                Include a complimentary personal gift message with your fragrance order.
              </p>

              {isGift && (
                <div className="pl-6 pt-2.5 space-y-2 border-t border-white/10 text-[#B8B3AF]">
                  <div>
                    <label className="block text-[12px] uppercase font-semibold text-[#B8B3AF] mb-1 font-manrope">
                      Personal Gift Message (Optional)
                    </label>
                    <input
                      type="text"
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      placeholder="e.g. Happy Birthday! Enjoy this signature scent."
                      className="w-full bg-[#080808] border border-white/15 rounded-lg px-3 py-2 text-xs text-[#F5F2EE] placeholder-[#B8B3AF]/60 focus:outline-none focus:border-[#B4171E] font-manrope"
                      maxLength={150}
                      id="product-gift-message-input"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 2. PRIMARY ADD TO CART BUTTON */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full bg-[#B4171E] hover:bg-[#C72A35] active:scale-[0.98] text-[#F5F2EE] rounded-xl py-4 px-5 font-manrope font-semibold text-[14px] sm:text-[15px] tracking-[0.01em] flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer shadow-lg group btn-interactive"
              id="main-add-to-cart-btn"
            >
              {addedToCart ? (
                <>
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#72D66F]" />
                  <span>ADDED TO CART ✓</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5F2EE]" />
                  <span>ADD TO CART</span>
                </>
              )}
            </button>

            {/* 3. DIRECT CHECKOUT BUTTON */}
            <button
              type="button"
              onClick={() => {
                addToCartItem(product, selectedSize);
                navigate('/checkout');
              }}
              className="w-full bg-[#121212] hover:bg-[#8F1018]/40 text-[#F5F2EE] border border-white/15 rounded-xl py-3.5 px-5 font-manrope font-semibold text-[14px] sm:text-[15px] tracking-[0.01em] flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer shadow-md active:scale-[0.99] btn-interactive"
              id="main-checkout-direct-btn"
            >
              <CreditCard className="w-4 h-4 text-[#F5F2EE]" />
              <span>CHECKOUT NOW →</span>
            </button>

            {/* Secondary WhatsApp Contact Option */}
            <div className="mt-1 flex items-center justify-between gap-1.5 text-[11px] text-[#B8B3AF] font-manrope">
              <div className="flex items-center gap-1.5">
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366] shrink-0" />
                <span>Questions? <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Chat on WhatsApp</a></span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleWhatsAppProductShare}
                  className="px-2 py-1 rounded bg-[#080808] hover:bg-white/10 text-[#F5F2EE] text-[10px] font-bold uppercase transition-colors flex items-center gap-1 cursor-pointer border border-white/10 font-manrope"
                  title="Share via WhatsApp"
                >
                  <WhatsAppIcon className="w-3 h-3 text-[#25D366] fill-[#25D366]" />
                  <span>Share</span>
                </button>
                <button
                  type="button"
                  onClick={handleProductShare}
                  className="px-2 py-1 rounded bg-[#080808] hover:bg-white/10 text-[#F5F2EE] text-[10px] font-bold uppercase transition-colors flex items-center gap-1 cursor-pointer border border-white/10 font-manrope"
                  title="Share or Copy Link"
                >
                  <Share2 className="w-3 h-3 text-[#B4171E]" />
                  <span>{copiedProductShare ? 'Copied' : 'Link'}</span>
                </button>
              </div>
            </div>



          </div>

          {/* Content Blocks */}
          <div className="mt-8 space-y-6">
            
            {/* REDESIGNED "WHAT IT FEELS LIKE" */}
            <section className="bg-[#121212] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-md space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B4171E]" />
                <h2 className="font-bodoni text-xl sm:text-2xl font-medium tracking-[-0.015em] text-[#F5F2EE]">
                  WHAT IT FEELS LIKE
                </h2>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#F5F1EA] leading-relaxed">
                "{product.whatItSmellsLike || product.description}"
              </p>

              {product.smellsLikeProfile && product.smellsLikeProfile.length > 0 && (
                <div className="pt-2 border-t border-[rgba(243,235,221,0.12)]">
                  <div className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#B8C4C2] mb-2.5">
                    FEELS LIKE
                  </div>
                  <div className="font-sans text-xs sm:text-sm font-medium text-[#F5F1EA] flex flex-wrap items-center gap-2">
                    {product.smellsLikeProfile.map((trait, idx) => (
                      <span key={idx} className="bg-[#1C4A55] text-[#F5F1EA] px-3.5 py-1.5 rounded-lg border border-[rgba(243,235,221,0.15)] text-xs font-semibold shadow-xs">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Divider */}
            <hr className="my-4 md:my-4.5 border-t border-[rgba(243,235,221,0.15)]" />

            {/* FRAGRANCE NOTES */}
            <section>
              <h2 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5F1EA] mb-2.5">
                FRAGRANCE NOTES
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 py-0.5">
                {/* TOP NOTES */}
                <div className="flex items-start gap-2.5">
                  <img
                    src="/images/notes/top-notes.jpg"
                    alt="Top notes illustration"
                    className="w-8 h-8 object-contain rounded-full bg-[#102F38] shrink-0 border border-[rgba(243,235,221,0.15)] p-0.5"
                  />
                  <div>
                    <div className="font-sans text-[10px] font-bold tracking-[0.14em] uppercase text-[#F5F1EA] mb-0.5">
                      TOP NOTES
                    </div>
                    <div className="font-sans text-xs text-[#B8C4C2] leading-snug">
                      {formatNotes(product.notes?.top)}
                    </div>
                  </div>
                </div>

                {/* HEART NOTES */}
                <div className="flex items-start gap-2.5 sm:border-l border-[rgba(243,235,221,0.15)] sm:pl-3 lg:pl-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-[rgba(243,235,221,0.1)]">
                  <img
                    src="/images/notes/heart-notes.jpg"
                    alt="Heart notes illustration"
                    className="w-8 h-8 object-contain rounded-full bg-[#102F38] shrink-0 border border-[rgba(243,235,221,0.15)] p-0.5"
                  />
                  <div>
                    <div className="font-sans text-[10px] font-bold tracking-[0.14em] uppercase text-[#F5F1EA] mb-0.5">
                      HEART NOTES
                    </div>
                    <div className="font-sans text-xs text-[#B8C4C2] leading-snug">
                      {formatNotes(product.notes?.heart)}
                    </div>
                  </div>
                </div>

                {/* BASE NOTES */}
                <div className="flex items-start gap-2.5 sm:border-l border-[rgba(243,235,221,0.15)] sm:pl-3 lg:pl-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-[rgba(243,235,221,0.1)]">
                  <img
                    src="/images/notes/base-notes.jpg"
                    alt="Base notes illustration"
                    className="w-8 h-8 object-contain rounded-full bg-[#102F38] shrink-0 border border-[rgba(243,235,221,0.15)] p-0.5"
                  />
                  <div>
                    <div className="font-sans text-[10px] font-bold tracking-[0.14em] uppercase text-[#F5F1EA] mb-0.5">
                      BASE NOTES
                    </div>
                    <div className="font-sans text-xs text-[#B8C4C2] leading-snug">
                      {formatNotes(product.notes?.base)}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Divider */}
            <hr className="my-4 md:my-4.5 border-t border-[rgba(243,235,221,0.15)]" />

            {/* WHAT PEOPLE SAY */}
            <section className="bg-[#1C4A55]/40 border border-[rgba(243,235,221,0.12)] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5F1EA]">
                  WHAT PEOPLE SAY
                </h2>
                <StarRating rating={product.rating} size={13} starColor="#C5A15A" />
              </div>
              <blockquote className="font-sans text-xs sm:text-sm italic text-[#E5E9E8] leading-relaxed">
                "{productReview.text}"
              </blockquote>
              <div className="flex items-center justify-between text-xs text-[#B8C4C2] pt-1">
                <span>{productReview.customer} · {productReview.city}</span>
                <Link
                  to={`/reviews?product=${product.slug}`}
                  className="font-sans text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#C5A15A] hover:text-[#FFFFFF] transition-colors"
                >
                  VIEW REVIEWS →
                </Link>
              </div>
            </section>

            {/* Divider */}
            <hr className="my-4 md:my-4.5 border-t border-[rgba(243,235,221,0.15)]" />

            {/* DELIVERY & ORDERING */}
            <section>
              <h2 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5F1EA] mb-1.5">
                DELIVERY & ORDERING
              </h2>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#E5E9E8] leading-relaxed">
                <Truck className="w-4 h-4 text-[#F5F1EA] shrink-0 mt-0.5" />
                <p>
                  We take orders directly on WhatsApp. Our team will confirm your delivery details and shipping information.
                </p>
              </div>
            </section>
          </div>

          {/* SINGLE COMBINED TRUST / ORDER BOX — PURE BLACK #000000 */}
          <div className="mt-8 grid grid-cols-3 gap-2 text-center bg-[#000000] p-4 sm:p-4.5 rounded-xl border border-white/10 shadow-lg">
            {/* 1. WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center group hover:opacity-90 transition-opacity"
            >
              <WhatsAppIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#25D366] fill-[#25D366] mb-1.5" />
              <span className="font-sans text-[10px] sm:text-[11.5px] font-bold text-[#F5F1EA] leading-tight">
                Order on WhatsApp
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] text-[#B8C4C2] mt-0.5">
                Instant Response
              </span>
            </a>

            {/* 2. Secure & Trusted */}
            <div className="flex flex-col items-center justify-center">
              <SecureLockIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 mb-1.5 shrink-0" />
              <span className="font-sans text-[10px] sm:text-[11.5px] font-bold text-[#F5F1EA] leading-tight">
                Secure & Trusted
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] text-[#B8C4C2] mt-0.5">
                Verified Checkout
              </span>
            </div>

            {/* 3. Authentic Products */}
            <div className="flex flex-col items-center justify-center">
              <AuthTickIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 mb-1.5 shrink-0" />
              <span className="font-sans text-[10px] sm:text-[11.5px] font-bold text-[#F5F1EA] leading-tight">
                Authentic Products
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] text-[#B8C4C2] mt-0.5">
                100% Guaranteed
              </span>
            </div>
          </div>

        </div>
      </div>



      {/* MULTI-PRODUCT CART DRAWER / MODAL */}
      {showCartDrawer && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end bg-black/85 md:bg-black/70 md:backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-label="Your Shopping Cart"
        >
          <div className="bg-[#163E49] border border-[rgba(243,235,221,0.18)] sm:rounded-2xl rounded-t-2xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col text-[#F5F1EA] overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-[rgba(243,235,221,0.12)] flex items-center justify-between bg-[#102F38]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#F5F1EA]" />
                <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F5F1EA]">
                  YOUR CART ({cartTotals.itemCount} {cartTotals.itemCount === 1 ? 'ITEM' : 'ITEMS'})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowCartDrawer(false)}
                className="text-[#B8C4C2] hover:text-[#F5F1EA] p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close cart drawer"
                id="close-cart-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="p-4 space-y-3 overflow-y-auto flex-1 divide-y divide-[rgba(243,235,221,0.08)] max-h-[50vh]">
              {cartItems.length === 0 ? (
                <div className="py-8 text-center text-[#B8C4C2] text-xs">
                  Your cart is currently empty.
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={`${item.id}-${item.size}-${idx}`} className="pt-3 first:pt-0 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-contain rounded bg-[#102F38] border border-[rgba(243,235,221,0.15)] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs uppercase tracking-wide truncate text-[#F5F1EA]">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-[#B8C4C2] mt-0.5">
                        {item.size} · ₹{item.price?.toLocaleString()}
                      </div>
                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="inline-flex items-center border border-[rgba(243,235,221,0.2)] rounded bg-[#102F38]">
                          <button
                            type="button"
                            onClick={() => updateCartItemQuantity(item.id, item.size, -1)}
                            className="px-2 py-0.5 text-xs text-[#B8C4C2] hover:text-[#F5F1EA]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#F5F1EA]">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateCartItemQuantity(item.id, item.size, 1)}
                            className="px-2 py-0.5 text-xs text-[#B8C4C2] hover:text-[#F5F1EA]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeCartItem(item.id, item.size)}
                          className="text-[10px] text-[#B8C4C2] hover:text-red-400 underline transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right font-bold text-xs text-[#F5F1EA]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* GIFT OPTIONS IN CART DRAWER */}
            {cartItems.length > 0 && (
              <div className="px-4 py-3 bg-[#102F38]/70 border-t border-b border-[rgba(243,235,221,0.12)] space-y-2 text-xs">
                <label className="flex items-center justify-between cursor-pointer font-bold text-[#F5F1EA]">
                  <span className="flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-[#F5F1EA]" />
                    <span>Is this a gift?</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={cartGiftOpts?.isGift || false}
                    onChange={(e) => handleCartGiftToggle(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 accent-[#7A2929] cursor-pointer"
                    id="cart-gift-checkbox"
                  />
                </label>

                {cartGiftOpts?.isGift && (
                  <div className="pt-2 space-y-2 border-t border-[rgba(243,235,221,0.1)] text-[#B8C4C2]">
                    <label className="flex items-center gap-2 cursor-pointer text-[11.5px] text-[#F5F1EA]">
                      <input
                        type="checkbox"
                        checked={cartGiftOpts?.giftPackaging || false}
                        onChange={(e) => handleCartGiftPackagingToggle(e.target.checked)}
                        className="w-3.5 h-3.5 rounded border-gray-600 accent-[#7A2929] cursor-pointer"
                        id="cart-gift-packaging-checkbox"
                      />
                      <span>Add gift packaging</span>
                    </label>

                    <div>
                      <label className="block text-[10.5px] uppercase font-semibold text-[#B8C4C2] mb-1">
                        Personal Gift Message
                      </label>
                      <input
                        type="text"
                        value={cartGiftOpts?.giftMessage || ''}
                        onChange={(e) => handleCartGiftMessageChange(e.target.value)}
                        placeholder="Enter a message for the recipient..."
                        className="w-full bg-[#1C4A55] border border-[rgba(243,235,221,0.2)] rounded px-2.5 py-1.5 text-xs text-[#F5F1EA] placeholder-[#B8C4C2]/50 focus:outline-none focus:border-[#7A2929]"
                        maxLength={150}
                        id="cart-gift-message-input"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t border-[rgba(243,235,221,0.12)] bg-[#102F38] space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                  <span className="text-[#B8C4C2] uppercase tracking-wider">TOTAL</span>
                  <span className="text-[#F5F1EA] text-base font-bold">₹{cartTotals.totalAmount.toLocaleString()}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCartDrawer(false)}
                    className="w-full py-2.5 px-3 rounded text-center text-xs font-bold uppercase tracking-wider text-[#B8C4C2] bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    CONTINUE SHOPPING
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCartDrawer(false);
                      navigate('/checkout');
                    }}
                    className="w-full py-2.5 px-3 rounded text-center text-xs font-bold uppercase tracking-wider text-[#102F38] bg-[#C5A15A] hover:bg-[#D4B26B] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-[#102F38]" />
                    <span>CHECKOUT →</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </MainContainer>
  );
}



