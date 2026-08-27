import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Minus, Plus, X, CreditCard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fetchCustomerAddresses } from '../../utils/addresses';
import {
  getCart,
  updateCartItemQuantity,
  getCartTotals,
  createCartWhatsAppOrderUrl,
} from '../../utils/cart';

export default function GlobalCartDrawer() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => getCart());
  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');

  const handleCheckoutClick = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  useEffect(() => {
    async function loadAddresses() {
      if (user?.id) {
        try {
          const addresses = await fetchCustomerAddresses(user.id);
          setUserAddresses(addresses || []);
          const defaultAddr = (addresses || []).find((a) => a.isDefault) || addresses?.[0];
          if (defaultAddr) {
            setSelectedAddressId(defaultAddr.id);
          }
        } catch (err) {
          console.warn('Address load note:', err);
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
      const currentCart = getCart();
      setCartItems(currentCart);
      if (e?.detail?.openDrawer !== false) {
        setIsOpen(true);
      }
    };

    const handleOpenCart = () => {
      const currentCart = getCart();
      setCartItems(currentCart);
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

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  const cartTotals = getCartTotals(safeCartItems);
  const subtotalVal = cartTotals.subtotalAmount || cartTotals.subtotal || 0;
  const discountVal = cartTotals.referralDiscount || cartTotals.discountAmount || 0;
  const totalVal = cartTotals.totalAmount || cartTotals.finalTotal || 0;

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
              Your Cart ({cartTotals.itemCount || 0} {(cartTotals.itemCount || 0) === 1 ? 'Item' : 'Items'})
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
          {safeCartItems.length === 0 ? (
            <div className="py-10 text-center text-[#E7C4C5]/80 font-sans text-xs font-normal">
              Your cart is currently empty.
            </div>
          ) : (
            safeCartItems.map((item, idx) => {
              if (!item) return null;
              const isDuo = item.type === 'duo_bundle';
              const isSample = item.type === 'sample_set' || item.id === 'discovery-set';
              const isSingleSample = item.type === 'sample_purchase';

              return (
                <div key={`global-${item.id || idx}-${item.size || 'std'}-${idx}`} className="pt-4 first:pt-0 space-y-2">
                  <div className="flex items-start gap-3">
                    <img
                      src={item.image || '/images/products/row-1-column-1.png'}
                      alt={item.name || 'Perfume'}
                      className="w-14 h-14 object-contain rounded-lg bg-[#641D2D] border border-[#E7C4C5]/15 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <div className="font-serif text-sm font-normal text-[#F6EFE7] truncate">
                          {isDuo ? item.name : item.name?.replace(/^ÉLAVA\s+/i, '')}
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
                          ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                        </div>
                        <div className="flex items-center border border-[#E7C4C5]/20 rounded-lg overflow-hidden bg-[#641D2D]">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = updateCartItemQuantity(item.id, item.size, (item.quantity || 1) - 1);
                              setCartItems(updated);
                            }}
                            className="px-2 py-1 text-[#F6EFE7] hover:bg-white/10 cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-sans text-xs font-semibold text-[#F6EFE7]">{item.quantity || 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = updateCartItemQuantity(item.id, item.size, (item.quantity || 1) + 1);
                              setCartItems(updated);
                            }}
                            className="px-2 py-1 text-[#F6EFE7] hover:bg-white/10 cursor-pointer"
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
        {safeCartItems.length > 0 && (
          <div className="p-4 border-t border-[#E7C4C5]/15 bg-[#641D2D] space-y-3">
            <div className="space-y-1 font-sans text-xs">
              <div className="flex justify-between text-[#E7C4C5]/85">
                <span>Subtotal</span>
                <span className="font-semibold text-[#F6EFE7]">₹{subtotalVal.toLocaleString()}</span>
              </div>
              {discountVal > 0 && (
                <div className="flex justify-between text-[#C94B5B]">
                  <span>Discount {cartTotals.referralCode ? `(${cartTotals.referralCode})` : ''}</span>
                  <span className="font-semibold">-₹{discountVal.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-sm text-[#F6EFE7] pt-1 border-t border-[#E7C4C5]/15">
                <span>Total</span>
                <span>₹{totalVal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckoutClick}
              className="w-full bg-[#C94B5B] hover:bg-[#B03D4C] active:scale-[0.98] text-[#F6EFE7] py-3.5 px-4 rounded-xl font-sans font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
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
