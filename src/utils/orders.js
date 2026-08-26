import { supabase } from './supabase';

/**
 * Generate a clean, unique customer-facing order number (ELV-YYYYMMDD-XXXX)
 */
export function generateOrderNumber() {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `ELV-${dateStr}-${randomSuffix}`;
}

/**
 * Helper to normalize order data snapshot from database record
 */
function formatOrderRecord(ord) {
  if (!ord) return null;
  return {
    id: ord.id,
    orderNumber: ord.order_number || `ELV-${ord.id.substring(0, 8).toUpperCase()}`,
    userId: ord.user_id || null,
    email: ord.email || '',
    phone: ord.shipping_address?.phone || ord.phone || '',
    items: ord.items || [],
    subtotal: Number(ord.subtotal) || 0,
    discountAmount: Number(ord.discount_amount) || 0,
    giftWrappingAmount: Number(ord.gift_wrapping_amount) || 0,
    totalAmount: Number(ord.total_amount) || 0,
    referralCode: ord.referral_code || null,
    status: ord.status || 'confirmed',
    paymentStatus: ord.payment_status || 'paid',
    shippingAddress: ord.shipping_address || {},
    billingAddress: ord.billing_address || ord.shipping_address || {},
    giftDetails: ord.gift_details || {},
    freeSample: ord.free_sample || null,
    razorpayOrderId: ord.razorpay_order_id || null,
    razorpayPaymentId: ord.razorpay_payment_id || null,
    paidAt: ord.paid_at || ord.created_at,
    createdAt: ord.created_at,
    updatedAt: ord.updated_at || ord.created_at,
  };
}

/**
 * Fetch all orders belonging to the authenticated customer
 */
export async function fetchCustomerOrders(userId, userEmail = '') {
  if (!userId && !userEmail) return [];

  try {
    let query = supabase.from('orders').select('*');

    if (userId && userEmail) {
      query = query.or(`user_id.eq.${userId},email.eq.${userEmail}`);
    } else if (userId) {
      query = query.eq('user_id', userId);
    } else {
      query = query.eq('email', userEmail);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching customer orders:', error.message);
      return [];
    }

    return (data || []).map(formatOrderRecord);
  } catch (err) {
    console.error('Error in fetchCustomerOrders:', err);
    return [];
  }
}

/**
 * Fetch a single order by ID or Order Number belonging strictly to current customer
 */
export async function fetchOrderByIdOrNumber(orderIdentifier, userId = null, userEmail = '') {
  if (!orderIdentifier) return null;

  try {
    let query = supabase.from('orders').select('*');

    // Match either by UUID `id` or string `order_number`
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(orderIdentifier);
    if (isUuid) {
      query = query.eq('id', orderIdentifier);
    } else {
      query = query.eq('order_number', orderIdentifier);
    }

    const { data, error } = await query.maybeSingle();

    if (error || !data) {
      return null;
    }

    // Security check: verify user owns this order
    if (userId && data.user_id && data.user_id !== userId) {
      if (userEmail && data.email !== userEmail) {
        console.warn('Unauthorized attempt to access order:', orderIdentifier);
        return null;
      }
    }

    return formatOrderRecord(data);
  } catch (err) {
    console.error('Error in fetchOrderByIdOrNumber:', err);
    return null;
  }
}

// Backwards compatibility export
export const fetchOrderById = (id, userId) => fetchOrderByIdOrNumber(id, userId);
