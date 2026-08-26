import { supabase } from './supabase';

/**
 * Fetch customer saved addresses from Supabase database
 */
export async function fetchCustomerAddresses(userId) {
  if (!userId) return [];

  try {
    const { data, error } = await supabase
      .from('customer_addresses')
      .select('*')
      .eq('user_id', userId)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching customer addresses:', error.message);
      return [];
    }

    return (data || []).map((addr) => ({
      id: addr.id,
      fullName: addr.full_name,
      phone: addr.phone,
      addressLine1: addr.address_line_1,
      addressLine2: addr.address_line_2 || '',
      city: addr.city,
      state: addr.state,
      postalCode: addr.postal_code,
      country: addr.country || 'India',
      isDefault: addr.is_default,
      createdAt: addr.created_at,
    }));
  } catch (err) {
    console.error('Error in fetchCustomerAddresses:', err);
    return [];
  }
}

/**
 * Save new or updated address for customer
 */
export async function saveCustomerAddress(addressData, userId) {
  if (!userId || !addressData) {
    return { success: false, message: 'Invalid user or address data.' };
  }

  try {
    const payload = {
      user_id: userId,
      full_name: addressData.fullName.trim(),
      phone: addressData.phone.trim(),
      address_line_1: addressData.addressLine1.trim(),
      address_line_2: addressData.addressLine2 ? addressData.addressLine2.trim() : null,
      city: addressData.city.trim(),
      state: addressData.state.trim(),
      postal_code: addressData.postalCode.trim(),
      country: addressData.country ? addressData.country.trim() : 'India',
      is_default: Boolean(addressData.isDefault),
      updated_at: new Date().toISOString(),
    };

    if (payload.is_default) {
      await supabase
        .from('customer_addresses')
        .update({ is_default: false })
        .eq('user_id', userId);
    }

    let result;
    if (addressData.id) {
      const { data, error } = await supabase
        .from('customer_addresses')
        .update(payload)
        .eq('id', addressData.id)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      const { data, error } = await supabase
        .from('customer_addresses')
        .insert(payload)
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return { success: true, data: result };
  } catch (err) {
    console.error('Error saving customer address:', err);
    return { success: false, message: err.message || 'Failed to save address.' };
  }
}

/**
 * Set target address as default address for customer
 */
export async function setDefaultCustomerAddress(addressId, userId) {
  if (!addressId || !userId) return { success: false };

  try {
    const { error: rpcErr } = await supabase.rpc('set_default_address', {
      p_address_id: addressId,
      p_user_id: userId,
    });

    if (rpcErr) {
      await supabase.from('customer_addresses').update({ is_default: false }).eq('user_id', userId);
      await supabase.from('customer_addresses').update({ is_default: true }).eq('id', addressId).eq('user_id', userId);
    }

    return { success: true };
  } catch (err) {
    console.error('Error setting default address:', err);
    return { success: false, message: err.message };
  }
}

/**
 * Delete saved customer address
 */
export async function deleteCustomerAddress(addressId, userId) {
  if (!addressId || !userId) return { success: false };

  try {
    const { error } = await supabase
      .from('customer_addresses')
      .delete()
      .eq('id', addressId)
      .eq('user_id', userId);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Error deleting address:', err);
    return { success: false, message: err.message };
  }
}
