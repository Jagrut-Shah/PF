import React, { useState, useEffect } from 'react';
import { ShoppingBag, Minus, Plus, X, Gift } from 'lucide-react';
import {
  getCart,
  updateCartItemQuantity,
  removeCartItem,
  getCartTotals,
  createCartWhatsAppOrderUrl,
} from '../../utils/cart';

function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm-3.53 3.63c-.19 0-.42.07-.64.31-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.57 4.07 3.6 2 .86 2.41.69 2.84.65.43-.04 1.4-.57 1.6-1.13.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28s-1.4-.69-1.62-.77c-.22-.08-.38-.12-.54.12s-.62.77-.76.93c-.14.16-.28.18-.52.06s-1.01-.37-1.92-1.19c-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.48-.39-.41-.54-.42-.14-.01-.3-.01-.46-.01z" />
    </svg>
  );
}

export default function GlobalCartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState(getCart());

  useEffect(() => {
    const handleCartUpdate = (e) => {
      setCartItems(getCart());
      if (e?.detail?.openDrawer !== false) {
        setIsOpen(true);
      }
    };

    const handleOpenCart = () => {
      setCartItems(getCart());
      setIsOpen(true);
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    window.addEventListener('open-cart-drawer', handleOpenCart);
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
      window.removeEventListener('open-cart-drawer', handleOpenCart);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

  if (!isOpen) return null;

  const cartTotals = getCartTotals(cartItems);
  const whatsAppOrderUrl = createCartWhatsAppOrderUrl(cartItems);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end bg-black/85 md:bg-black/80 md:backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200"
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
            onClick={() => setIsOpen(false)}
            className="text-[#B8C4C2] hover:text-[#F5F1EA] p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close cart drawer"
            id="global-close-cart-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1 divide-y divide-[rgba(243,235,221,0.10)] max-h-[50vh]">
          {cartItems.length === 0 ? (
            <div className="py-10 text-center text-[#B8C4C2] text-xs">
              Your cart is currently empty.
            </div>
          ) : (
            cartItems.map((item, idx) => {
              const isDuo = item.type === 'duo_bundle';
              const isSample = item.type === 'sample_set' || item.id === 'discovery-set';
              const isSingleSample = item.type === 'sample_purchase';

              return (
                <div key={`global-${item.id}-${item.size}-${idx}`} className="pt-4 first:pt-0 space-y-2">
                  <div className="flex items-start gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-contain rounded bg-[#102F38] border border-[rgba(243,235,221,0.15)] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <div className="font-bold text-xs uppercase tracking-wide truncate text-[#F5F1EA]">
                          {isDuo ? item.name : (item.name?.startsWith('ÉLAVA') ? item.name : `ÉLAVA ${item.name}`)}
                        </div>
                        {isDuo && (
                          <span className="bg-[#7A2929]/20 text-[#F5F1EA] border border-[#7A2929]/40 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shrink-0">
                            DUO BUNDLE
                          </span>
                        )}
                        {isSample && (
                          <span className="bg-[#7A2929]/20 text-[#F5F1EA] border border-[#7A2929]/40 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shrink-0">
                            SAMPLE SET
                          </span>
                        )}
                        {isSingleSample && (
                          <span className="bg-[#7A2929]/20 text-[#F5F1EA] border border-[#7A2929]/40 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shrink-0">
                            SAMPLE BOTTLE
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-[#B8C4C2] mt-0.5">
                        {isDuo ? '2 × 60 ML Eau de Parfum' : isSample ? 'SAMPLE SET · 4 × 60 ML' : isSingleSample ? 'SAMPLE · 60 ML' : item.size}
                      </div>

                      {/* Included Fragrances for Duo */}
                      {isDuo && item.includedFragrances && (
                        <div className="text-[10px] text-[#B8C4C2] mt-1 space-y-0.5 bg-[#102F38] p-2 rounded border border-[rgba(243,235,221,0.10)]">
                          <span className="font-semibold text-[#F5F1EA] block uppercase">Included Signatures:</span>
                          {item.includedFragrances.map((f, fIdx) => (
                            <div key={fIdx} className="truncate">• ÉLAVA {f.name} ({f.size})</div>
                          ))}
                        </div>
                      )}

                      {/* Per-Item Gift Information */}
                      {item.giftDetails?.isGift && (
                        <div className="mt-1.5 text-[10.5px] text-[#F5F1EA] bg-[#102F38] p-2 rounded border border-[rgba(243,235,221,0.20)] space-y-0.5">
                          <div className="flex items-center gap-1.5 font-bold">
                            <Gift className="w-3.5 h-3.5 text-[#F5F1EA]" />
                            <span>Gift Order</span>
                          </div>
                          {item.giftDetails.giftMessage && (
                            <div className="text-[#B8C4C2] italic truncate">
                              "{item.giftDetails.giftMessage}"
                            </div>
                          )}
                        </div>
                      )}

                      {/* Quantity Controls & Remove */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="inline-flex items-center border border-[rgba(243,235,221,0.18)] rounded bg-[#102F38]">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = updateCartItemQuantity(item.id, item.size, -1);
                              setCartItems(updated);
                            }}
                            className="px-2 py-1 text-xs text-[#B8C4C2] hover:text-[#F5F1EA]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-[#F5F1EA]">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = updateCartItemQuantity(item.id, item.size, 1);
                              setCartItems(updated);
                            }}
                            className="px-2 py-1 text-xs text-[#B8C4C2] hover:text-[#F5F1EA]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const updated = removeCartItem(item.id, item.size);
                            setCartItems(updated);
                          }}
                          className="text-[11px] text-[#B8C4C2] hover:text-[#FF5C67] underline transition-colors"
                        >
                          Remove
                        </button>
                      </div>

                    </div>

                    {/* Price & Savings Display */}
                    <div className="text-right shrink-0">
                      {isDuo && item.originalPrice ? (
                        <div>
                          <span className="text-[10px] text-[#8FA6A3] line-through block">
                            ₹{(item.originalPrice * item.quantity).toLocaleString()}
                          </span>
                          <span className="font-bold text-xs text-[#F5F1EA] block">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                          <span className="text-[9.5px] font-extrabold text-[#F5F1EA] block mt-0.5">
                            SAVE ₹{(item.savings * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ) : (
                        <div className="font-bold text-xs text-[#F5F1EA]">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary & WhatsApp Order */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-[#102F38] border-t border-[rgba(243,235,221,0.15)] space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase text-[#F5F1EA]">
              <span>TOTAL ({cartTotals.itemCount} ITEMS)</span>
              <span className="text-base text-[#F5F1EA]">₹{cartTotals.totalAmount.toLocaleString()}</span>
            </div>

            <a
              href={whatsAppOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#7A2929] hover:bg-[#8C3232] text-[#F5F1EA] py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2.5 transition-colors shadow-md"
              id="checkout-whatsapp-btn"
            >
              <WhatsAppIcon className="w-4 h-4 fill-[#F5F1EA] text-[#F5F1EA]" />
              <span>COMPLETE ORDER ON WHATSAPP →</span>
            </a>
          </div>
        )}

      </div>
    </div>
  );
}
