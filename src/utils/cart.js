import createWhatsAppOrderUrl from './whatsapp';

const CART_STORAGE_KEY = 'elava_cart';
const GIFT_STORAGE_KEY = 'elava_cart_gift';

/**
 * Get current cart array from localStorage
 */
export function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading cart from localStorage', err);
    return [];
  }
}

/**
 * Get gift options from localStorage
 */
export function getCartGiftOptions() {
  try {
    const raw = localStorage.getItem(GIFT_STORAGE_KEY);
    if (!raw) return { isGift: false, giftPackaging: false, giftMessage: '' };
    return JSON.parse(raw);
  } catch (err) {
    return { isGift: false, giftPackaging: false, giftMessage: '' };
  }
}

/**
 * Update gift options in localStorage
 */
export function updateCartGiftOptions(options) {
  try {
    const current = getCartGiftOptions();
    const updated = { ...current, ...options };
    localStorage.setItem(GIFT_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-updated'));
    return updated;
  } catch (err) {
    console.error('Error saving gift options', err);
    return getCartGiftOptions();
  }
}

/**
 * Add a product variant to the shared cart
 */
export function addToCartItem(product, selectedSize = '60 ML', giftDetails = null) {
  if (!product) return getCart();

  const cart = getCart();
  const targetSize = selectedSize || product.size || '60 ML';

  const existingIndex = cart.findIndex(
    (item) => item.id === product.id && item.size === targetSize
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    if (giftDetails) {
      cart[existingIndex].giftDetails = giftDetails;
    }
  } else {
    cart.push({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: Number(product.price) || 0,
      size: targetSize,
      image: product.image,
      quantity: 1,
      giftDetails: giftDetails || null,
    });
  }

  // If giftDetails provided, update global cart gift options if checked
  if (giftDetails?.isGift) {
    updateCartGiftOptions({
      isGift: true,
      giftPackaging: Boolean(giftDetails.giftPackaging),
      giftMessage: giftDetails.giftMessage || '',
    });
  }

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
  } catch (err) {
    console.error('Error saving cart to localStorage', err);
  }

  return cart;
}

/**
 * Update quantity of a specific item in cart
 */
export function updateCartItemQuantity(id, size, delta) {
  const cart = getCart();
  const index = cart.findIndex((item) => item.id === id && item.size === size);

  if (index > -1) {
    const newQty = (cart[index].quantity || 1) + delta;
    if (newQty <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = newQty;
    }

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      window.dispatchEvent(new Event('cart-updated'));
    } catch (err) {
      console.error('Error updating cart item quantity', err);
    }
  }

  return cart;
}

/**
 * Remove an item from cart
 */
export function removeCartItem(id, size) {
  const cart = getCart();
  const filtered = cart.filter((item) => !(item.id === id && item.size === size));

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event('cart-updated'));
  } catch (err) {
    console.error('Error removing item from cart', err);
  }

  return filtered;
}

/**
 * Calculate totals from cart array
 */
export function getCartTotals(cart = getCart()) {
  const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalAmount = cart.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1), 0);

  return { itemCount, totalAmount };
}

/**
 * Create multi-product WhatsApp order URL for full cart
 */
export function createCartWhatsAppOrderUrl(cart = getCart(), giftOpts = getCartGiftOptions()) {
  if (!cart || cart.length === 0) {
    return createWhatsAppOrderUrl({ customMessage: "Hi ÉLAVA, I'd like to explore your collection." });
  }

  const { itemCount, totalAmount } = getCartTotals(cart);
  const itemsText = cart
    .map(
      (item) =>
        `• ÉLAVA ${item.name} (${item.size}) x ${item.quantity} - ₹${(item.price * item.quantity).toLocaleString()}`
    )
    .join('\n');

  let giftMsgStr = '';
  if (giftOpts?.isGift) {
    giftMsgStr = `\n\n🎁 GIFT ORDER DETAILS:`;
    if (giftOpts.giftPackaging) {
      giftMsgStr += `\n• Gift Packaging Requested`;
    }
    if (giftOpts.giftMessage && giftOpts.giftMessage.trim()) {
      giftMsgStr += `\n• Personal Message: "${giftOpts.giftMessage.trim()}"`;
    }
  }

  const customMessage = `Hi ÉLAVA, I'd like to order the following items from my cart:\n\n${itemsText}\n\nTotal (${itemCount} ${itemCount === 1 ? 'item' : 'items'}): ₹${totalAmount.toLocaleString()}${giftMsgStr}`;

  return createWhatsAppOrderUrl({ customMessage });
}
