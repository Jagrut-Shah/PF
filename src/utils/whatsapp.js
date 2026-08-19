/**
 * ÉLAVA WhatsApp Integration Utility
 * 
 * Centralized configuration and message link generator for direct ordering.
 */

export const WHATSAPP_CONFIG = {
  // Placeholder WhatsApp business number (include country code without '+' or special characters)
  phoneNumber: "919876543210",
  defaultGreeting: "Hello ÉLAVA, I would like to place an order:",
};

/**
 * Generate a prefilled WhatsApp order link.
 * 
 * @param {Object} options
 * @param {string} options.productName - Name of the perfume
 * @param {number|string} [options.price] - Product price
 * @param {number} [options.quantity=1] - Quantity to order
 * @param {string} [options.customMessage] - Optional custom message override
 * @returns {string} Fully encoded WhatsApp URL
 */
export function createWhatsAppOrderUrl({
  productName,
  price,
  quantity = 1,
  customMessage = ""
} = {}) {
  let message = customMessage;

  if (!message) {
    message = `${WHATSAPP_CONFIG.defaultGreeting}\n\n`;
    if (productName) {
      message += `• Product: ${productName}\n`;
    }
    if (quantity) {
      message += `• Quantity: ${quantity}\n`;
    }
    if (price) {
      message += `• Price: ₹${price}\n`;
    }
    message += `\nPlease confirm availability and payment details.`;
  }

  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`;
}

export default createWhatsAppOrderUrl;
