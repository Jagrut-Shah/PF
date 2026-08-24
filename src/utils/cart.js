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
 * Add a standard product variant to the shared cart with item-level gifting details
 */
export function addToCartItem(product, selectedSize = '60 ML', giftDetails = null) {
  if (!product) return getCart();

  const cart = getCart();
  const targetSize = selectedSize || product.size || '60 ML';

  // Item equality checks both product ID, size, and gift configuration
  const giftKey = giftDetails?.isGift ? (giftDetails.giftMessage || 'gift') : 'nogift';

  const existingIndex = cart.findIndex(
    (item) => item.id === product.id && item.size === targetSize && (item._giftKey || 'nogift') === giftKey
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
      type: product.type || 'standard',
      price: Number(product.price) || 0,
      size: targetSize,
      image: product.image,
      quantity: 1,
      giftDetails: giftDetails?.isGift ? giftDetails : null,
      _giftKey: giftKey,
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
 * Add a Wardrobe Duo Bundle to the shared cart while preserving bundle identity & pricing
 */
export function addDuoBundleToCart(bundle, fragrance1, fragrance2) {
  if (!bundle) return getCart();

  const cart = getCart();
  const bundleCartId = `bundle-${bundle.slug}`;

  const existingIndex = cart.findIndex((item) => item.id === bundleCartId);

  if (existingIndex > -1) {
    cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
  } else {
    cart.push({
      id: bundleCartId,
      slug: bundle.slug,
      type: 'duo_bundle',
      name: bundle.title,
      size: '2 × 60 ML',
      price: Number(bundle.bundlePrice) || 0,
      originalPrice: Number(bundle.originalPrice) || 0,
      savings: Number(bundle.savings) || 0,
      image: bundle.mainImage,
      includedFragrances: [
        { name: fragrance1?.name || 'Fragrance 1', size: '60 ML', image: fragrance1?.image },
        { name: fragrance2?.name || 'Fragrance 2', size: '60 ML', image: fragrance2?.image },
      ],
      quantity: 1,
    });
  }

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
  } catch (err) {
    console.error('Error saving duo bundle to cart', err);
  }

  return cart;
}

/**
 * Update quantity of a specific item in cart
 */
export function updateCartItemQuantity(id, size, delta) {
  const cart = getCart();
  const index = cart.findIndex((item) => item.id === id && (item.size === size || (!item.size && !size)));

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
  const filtered = cart.filter((item) => !(item.id === id && (item.size === size || (!item.size && !size))));

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
export function createCartWhatsAppOrderUrl(cart = getCart()) {
  if (!cart || cart.length === 0) {
    return createWhatsAppOrderUrl({ customMessage: "Hi ÉLAVA, I'd like to explore your collection." });
  }

  const { itemCount, totalAmount } = getCartTotals(cart);
  const itemsText = cart
    .map((item) => {
      let line = `• ÉLAVA ${item.name} (${item.size || 'Standard'}) x ${item.quantity} - ₹${(item.price * item.quantity).toLocaleString()}`;
      if (item.type === 'duo_bundle' && item.includedFragrances) {
        line += `\n  Includes: ${item.includedFragrances.map((f) => f.name).join(' + ')}`;
      }
      if (item.giftDetails?.isGift) {
        line += `\n  🎁 Gift Order`;
        if (item.giftDetails.giftMessage) {
          line += ` ("${item.giftDetails.giftMessage}")`;
        }
      }
      return line;
    })
    .join('\n');

  const customMessage = `Hi ÉLAVA, I'd like to order the following items from my cart:\n\n${itemsText}\n\nTotal (${itemCount} ${itemCount === 1 ? 'item' : 'items'}): ₹${totalAmount.toLocaleString()}`;

  return createWhatsAppOrderUrl({ customMessage });
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
export function updateCartGiftOptions(patch = {}) {
  const current = getCartGiftOptions();
  const updated = { ...current, ...patch };
  try {
    localStorage.setItem(GIFT_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-updated'));
  } catch (err) {
    console.error('Error updating cart gift options', err);
  }
  return updated;
}

