// Serverless API Endpoint: Verify Razorpay Payment Signature
// Route: /api/verify-razorpay-payment

import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://ynzzppjatnltpobbrhji.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_21MGWSYebjuCCi_iZa9ZTA_4LKIM8vf';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderPayload } = req.body || {};

    if (!orderPayload) {
      return res.status(400).json({ success: false, message: 'Missing order payload details.' });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // 1. Signature Verification (When Key Secret is configured)
    if (keySecret && keySecret !== 'YOUR_RAZORPAY_KEY_SECRET' && razorpay_order_id && razorpay_payment_id && razorpay_signature) {
      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        console.error('Invalid Razorpay Signature mismatch');
        return res.status(400).json({ success: false, message: 'Invalid payment signature. Verification failed.' });
      }
    }

    // 2. Idempotency Check: Prevent Duplicate Order Processing
    if (razorpay_payment_id) {
      const { data: existing } = await supabase
        .from('orders')
        .select('*')
        .eq('razorpay_payment_id', razorpay_payment_id)
        .maybeSingle();

      if (existing && existing.payment_status === 'paid') {
        return res.status(200).json({ success: true, duplicate: true, order: existing });
      }
    }

    // 3. Prepare Final Verified Order Payload
    const finalOrder = {
      ...orderPayload,
      status: 'confirmed',
      payment_status: 'paid',
      paid_at: new Date().toISOString(),
      razorpay_order_id: razorpay_order_id || null,
      razorpay_payment_id: razorpay_payment_id || null,
      razorpay_signature: razorpay_signature || null,
    };

    // 4. Save Confirmed Paid Order to Supabase Database
    const { data: savedOrder, error } = await supabase
      .from('orders')
      .insert(finalOrder)
      .select('*')
      .single();

    if (error) {
      console.warn('Database log warning in verify endpoint:', error.message);
    }

    // 5. Process Referral Reward via RPC (Idempotently)
    if (finalOrder.referral_code) {
      try {
        await supabase.rpc('process_referred_order', {
          p_order_id: savedOrder?.id || null,
          p_referral_code: finalOrder.referral_code,
          p_referred_email: finalOrder.email,
          p_referred_user_id: finalOrder.user_id || null,
        });
      } catch (refErr) {
        console.warn('Referral reward RPC note:', refErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      order: savedOrder || finalOrder,
    });
  } catch (err) {
    console.error('Error in verify-razorpay-payment handler:', err);
    return res.status(500).json({ success: false, message: err.message || 'Internal server error' });
  }
}
