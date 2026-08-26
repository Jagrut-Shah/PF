// Serverless API Endpoint: Create Razorpay Order
// Route: /api/create-razorpay-order

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://ynzzppjatnltpobbrhji.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_21MGWSYebjuCCi_iZa9ZTA_4LKIM8vf';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { cartItems, referralCode, addGiftWrapping, selectedFreeSample, user_id, email, shippingAddress } = req.body || {};

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid or empty cart items.' });
    }

    // 1. Authoritative Subtotal Calculation
    const subtotalAmount = cartItems.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0
    );

    // 2. Authoritative Referral Discount (capped at subtotal)
    let referralDiscount = 0;
    if (referralCode && subtotalAmount > 0) {
      referralDiscount = Math.min(200, subtotalAmount);
    }

    // 3. Gift Wrapping Charge
    const giftWrappingFee = addGiftWrapping ? 100 : 0;

    // 4. Authoritative Final Total Amount
    const finalTotalAmount = Math.max(0, subtotalAmount - referralDiscount + giftWrappingFee);

    // 5. Razorpay Key Credentials (SERVER-SIDE)
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Generate Order Receipt / Order Number (ELV-YYYYMMDD-XXXX)
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const receipt = `ELV-${dateStr}-${randomNum}`;

    let razorpayOrderId = null;

    if (keyId && keySecret && keySecret !== 'YOUR_RAZORPAY_KEY_SECRET') {
      // Call Razorpay API server-to-server
      const authString = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

      const rzpResp = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${authString}`,
        },
        body: JSON.stringify({
          amount: finalTotalAmount * 100, // in paise
          currency: 'INR',
          receipt: receipt,
          notes: {
            user_id: user_id || 'guest',
            email: email || 'guest@elava.com',
            referral_code: referralCode || '',
          },
        }),
      });

      const rzpData = await rzpResp.json();
      if (!rzpResp.ok) {
        console.error('Razorpay Order API Error:', rzpData);
        return res.status(500).json({ success: false, message: rzpData.error?.description || 'Razorpay order creation failed.' });
      }

      razorpayOrderId = rzpData.id;
    } else {
      // Direct / Test Mode Fallback Order ID
      razorpayOrderId = `order_test_${receipt}`;
    }

    return res.status(200).json({
      success: true,
      razorpayOrderId,
      keyId: keyId || 'rzp_test_KEY_ID',
      amount: finalTotalAmount * 100,
      currency: 'INR',
      authoritativeTotalAmount: finalTotalAmount,
      subtotalAmount,
      referralDiscount,
      giftWrappingFee,
    });
  } catch (err) {
    console.error('Error in create-razorpay-order handler:', err);
    return res.status(500).json({ success: false, message: err.message || 'Internal server error' });
  }
}
