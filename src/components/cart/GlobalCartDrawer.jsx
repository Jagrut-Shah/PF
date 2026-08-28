import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Minus, Plus, X, CreditCard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fetchCustomerAddresses } from '../../utils/addresses';
import {
  getCart,
  updateCartItemQuantity,
  getCartTotals,
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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end bg-black/40 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-label="Your Shopping Cart"
    >
      <div className="bg-[#F6F2EA] border border-[#D9D1C6] sm:rounded-2xl rounded-t-2xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col text-[#201C19] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-[#D9D1C6] flex items-center justify-between bg-[#EEE8DD]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#721C24]" />
            <h3 className="font-bodoni text-[18px] font-medium text-[#201C19] tracking-[-0.015em]">
              Your Cart ({cartTotals.itemCount || 0} {(cartTotals.itemCount || 0) === 1 ? 'Item' : 'Items'})
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-[#625C55] hover:text-[#201C19] p-1 rounded-full hover:bg-[#D9D1C6]/40 transition-colors btn-interactive"
            aria-label="Close cart drawer"
            id="global-close-cart-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1 divide-y divide-[#D9D1C6] max-h-[50vh]">
          {safeCartItems.length === 0 ? (
            <div className="py-10 text-center text-[#625C55] font-manrope text-[14px] font-normal">
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
                      className="w-14 h-14 object-contain rounded-lg bg-[#EEE8DD] border border-[#D9D1C6] shrink-0 p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <div className="font-manrope text-[15px] font-semibold text-[#201C19] truncate">
                          {isDuo ? item.name : item.name?.replace(/^ÉLAVA\s+/i, '')}
                        </div>
                        {isDuo && (
                          <span className="bg-[#E5DCCF] text-[#721C24] border border-[#D9D1C6] text-[10px] font-manrope font-semibold uppercase px-2 py-0.5 rounded shrink-0">
                            DUO BUNDLE
                          </span>
                        )}
                        {isSample && (
                          <span className="bg-[#E5DCCF] text-[#721C24] border border-[#D9D1C6] text-[10px] font-manrope font-semibold uppercase px-2 py-0.5 rounded shrink-0">
                            SAMPLE SET
                          </span>
                        )}
                        {isSingleSample && (
                          <span className="bg-[#E5DCCF] text-[#721C24] border border-[#D9D1C6] text-[10px] font-manrope font-semibold uppercase px-2 py-0.5 rounded shrink-0">
                            SAMPLE BOTTLE
                          </span>
                        )}
                      </div>

                      <div className="text-[13px] font-manrope text-[#625C55] font-normal">
                        Size: {item.size || '60 ML'}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="font-manrope text-[15px] font-semibold text-[#201C19]">
                          ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                        </div>
                        <div className="flex items-center border border-[#D9D1C6] rounded-lg overflow-hidden bg-[#EEE8DD]">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = updateCartItemQuantity(item.id, item.size, (item.quantity || 1) - 1);
                              setCartItems(updated);
                            }}
                            className="px-2 py-1 text-[#201C19] hover:bg-[#D9D1C6]/50 cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-manrope text-[13px] font-semibold text-[#201C19]">{item.quantity || 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = updateCartItemQuantity(item.id, item.size, (item.quantity || 1) + 1);
                              setCartItems(updated);
                            }}
                            className="px-2 py-1 text-[#201C19] hover:bg-[#D9D1C6]/50 cursor-pointer"
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
          <div className="p-4 border-t border-[#D9D1C6] bg-[#EEE8DD] space-y-3">
            <div className="space-y-1 font-manrope text-[14px]">
              <div className="flex justify-between text-[#625C55]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#201C19]">₹{subtotalVal.toLocaleString()}</span>
              </div>
              {discountVal > 0 && (
                <div className="flex justify-between text-[#721C24]">
                  <span>Discount {cartTotals.referralCode ? `(${cartTotals.referralCode})` : ''}</span>
                  <span className="font-semibold">-₹{discountVal.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-[16px] text-[#201C19] pt-1.5 border-t border-[#D9D1C6]">
                <span>Total</span>
                <span>₹{totalVal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckoutClick}
              className="w-full bg-[#721C24] hover:bg-[#5A161C] active:scale-[0.98] text-[#F6F2EA] py-3.5 px-4 rounded-xl font-manrope font-semibold text-[14px] flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer btn-interactive"
              id="global-cart-checkout-btn"
            >
              <CreditCard className="w-4 h-4" />
              <span>Proceed to Checkout →</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
