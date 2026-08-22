import createWhatsAppOrderUrl from './whatsapp';

const CART_STORAGE_KEY = 'elava_cart';

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
 * Add a product variant to the shared cart
 */
export function addToCartItem(product, selectedSize = '60 ML') {
  if (!product) return getCart();

  const cart = getCart();
  const targetSize = selectedSize || product.size || '60 ML';

  const existingIndex = cart.findIndex(
    (item) => item.id === product.id && item.size === targetSize
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
  } else {
    cart.push({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: Number(product.price) || 0,
      size: targetSize,
      image: product.image,
      quantity: 1,
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
export function createCartWhatsAppOrderUrl(cart = getCart()) {
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

  const customMessage = `Hi ÉLAVA, I'd like to order the following items from my cart:\n\n${itemsText}\n\nTotal (${itemCount} ${itemCount === 1 ? 'item' : 'items'}): ₹${totalAmount.toLocaleString()}`;

  return createWhatsAppOrderUrl({ customMessage });
}
