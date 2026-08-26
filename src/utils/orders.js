import { supabase } from './supabase';

/**
 * Fetch all orders belonging to the authenticated customer
 */
export async function fetchCustomerOrders(userId) {
  if (!userId) return [];

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching customer orders:', error.message);
      return [];
    }

    return (data || []).map((ord) => ({
      id: ord.id,
      orderNumber: ord.order_number || `#ELV${ord.id.substring(0, 4).toUpperCase()}`,
      email: ord.email,
      items: ord.items || [],
      subtotal: Number(ord.subtotal) || 0,
      discountAmount: Number(ord.discount_amount) || 0,
      totalAmount: Number(ord.total_amount) || 0,
      referralCode: ord.referral_code,
      status: ord.status || 'confirmed',
      paymentStatus: ord.payment_status || 'paid',
      shippingAddress: ord.shipping_address || {},
      createdAt: ord.created_at,
    }));
  } catch (err) {
    console.error('Error in fetchCustomerOrders:', err);
    return [];
  }
}

/**
 * Fetch a single order by ID belonging strictly to current customer
 */
export async function fetchOrderById(orderId, userId) {
  if (!orderId || !userId) return null;

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('user_id', userId)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      orderNumber: data.order_number || `#ELV${data.id.substring(0, 4).toUpperCase()}`,
      email: data.email,
      items: data.items || [],
      subtotal: Number(data.subtotal) || 0,
      discountAmount: Number(data.discount_amount) || 0,
      totalAmount: Number(data.total_amount) || 0,
      referralCode: data.referral_code,
      status: data.status || 'confirmed',
      paymentStatus: data.payment_status || 'paid',
      shippingAddress: data.shipping_address || {},
      createdAt: data.created_at,
    };
  } catch (err) {
    console.error('Error in fetchOrderById:', err);
    return null;
  }
}
