import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Minus, Plus, X, Gift, MapPin, CreditCard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fetchCustomerAddresses } from '../../utils/addresses';
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
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState(getCart());
  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');

  const handleCheckoutClick = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  useEffect(() => {
    async function loadAddresses() {
      if (user?.id) {
        const addresses = await fetchCustomerAddresses(user.id);
        setUserAddresses(addresses);
        const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr.id);
        }
      } else {
        setUserAddresses([]);
        setSelectedAddressId('');
      }
    }
    loadAddresses();
  }, [user]);

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
    window.addEventListener('referral-updated', handleCartUpdate);

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
      window.removeEventListener('open-cart-drawer', handleOpenCart);
      window.removeEventListener('storage', handleCartUpdate);
      window.removeEventListener('referral-updated', handleCartUpdate);
    };
  }, []);

  if (!isOpen) return null;

  const cartTotals = getCartTotals(cartItems);
  const selectedAddress = userAddresses.find((a) => a.id === selectedAddressId) || null;
  const whatsAppOrderUrl = createCartWhatsAppOrderUrl(cartItems, selectedAddress);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end bg-black/85 md:bg-black/80 md:backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-label="Your Shopping Cart"
    >
      <div className="bg-[#2A0D14] border border-[#E7C4C5]/20 sm:rounded-2xl rounded-t-2xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col text-[#F6EFE7] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-[#E7C4C5]/15 flex items-center justify-between bg-[#641D2D]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#F6EFE7]" />
            <span className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#F6EFE7]">
              Your Cart ({cartTotals.itemCount} {cartTotals.itemCount === 1 ? 'Item' : 'Items'})
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-[#E7C4C5] hover:text-[#F6EFE7] p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close cart drawer"
            id="global-close-cart-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1 divide-y divide-[#E7C4C5]/15 max-h-[50vh]">
          {cartItems.length === 0 ? (
            <div className="py-10 text-center text-[#E7C4C5]/80 font-sans text-xs font-normal">
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
                      className="w-14 h-14 object-contain rounded-lg bg-[#641D2D] border border-[#E7C4C5]/15 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <div className="font-serif text-sm font-normal text-[#F6EFE7] truncate">
                          {isDuo ? item.name : (item.name?.startsWith('ÉLAVA') ? item.name : `ÉLAVA ${item.name}`)}
                        </div>
                        {isDuo && (
                          <span className="bg-[#641D2D] text-[#F6EFE7] border border-[#E7C4C5]/20 text-[9px] font-sans font-semibold uppercase px-2 py-0.5 rounded shrink-0">
                            DUO BUNDLE
                          </span>
                        )}
                        {isSample && (
                          <span className="bg-[#641D2D] text-[#F6EFE7] border border-[#E7C4C5]/20 text-[9px] font-sans font-semibold uppercase px-2 py-0.5 rounded shrink-0">
                            SAMPLE SET
                          </span>
                        )}
                        {isSingleSample && (
                          <span className="bg-[#641D2D] text-[#F6EFE7] border border-[#E7C4C5]/20 text-[9px] font-sans font-semibold uppercase px-2 py-0.5 rounded shrink-0">
                            SAMPLE BOTTLE
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] font-sans text-[#E7C4C5]/80 font-normal">
                        Size: {item.size || '60 ML'}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="font-sans text-xs font-semibold text-[#F6EFE7]">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                        <div className="flex items-center border border-[#E7C4C5]/20 rounded-lg overflow-hidden bg-[#641D2D]">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = updateCartItemQuantity(item.id, item.size, item.quantity - 1);
                              setCartItems(updated);
                            }}
                            className="px-2 py-1 text-[#F6EFE7] hover:bg-white/10"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-sans text-xs font-semibold text-[#F6EFE7]">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = updateCartItemQuantity(item.id, item.size, item.quantity + 1);
                              setCartItems(updated);
                            }}
                            className="px-2 py-1 text-[#F6EFE7] hover:bg-white/10"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary & Checkout Actions */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-[#E7C4C5]/15 bg-[#641D2D] space-y-3">
            <div className="space-y-1 font-sans text-xs">
              <div className="flex justify-between text-[#E7C4C5]/85">
                <span>Subtotal</span>
                <span className="font-semibold text-[#F6EFE7]">₹{cartTotals.subtotal.toLocaleString()}</span>
              </div>
              {cartTotals.discountAmount > 0 && (
                <div className="flex justify-between text-[#C94B5B]">
                  <span>Discount</span>
                  <span className="font-semibold">-₹{cartTotals.discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-sm text-[#F6EFE7] pt-1 border-t border-[#E7C4C5]/15">
                <span>Total</span>
                <span>₹{cartTotals.finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckoutClick}
              className="w-full bg-[#C94B5B] hover:bg-[#B03D4C] text-[#F6EFE7] py-3.5 px-4 rounded-xl font-sans font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-colors"
              id="global-cart-checkout-btn"
            >
              <CreditCard className="w-4 h-4" />
              <span>PROCEED TO CHECKOUT →</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
