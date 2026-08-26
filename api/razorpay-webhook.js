// Serverless API Endpoint: Razorpay Webhook Handler
// Route: /api/razorpay-webhook

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
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET;
    const signature = req.headers['x-razorpay-signature'];

    // Verify webhook signature if secret configured
    if (webhookSecret && signature) {
      const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

      if (expectedSignature !== signature) {
        console.error('Webhook signature mismatch');
        return res.status(400).json({ success: false, message: 'Invalid webhook signature' });
      }
    }

    const event = req.body?.event;
    const paymentEntity = req.body?.payload?.payment?.entity;

    if (event === 'payment.captured' || event === 'order.paid') {
      const rzpOrderId = paymentEntity?.order_id;
      const rzpPaymentId = paymentEntity?.id;

      if (rzpOrderId || rzpPaymentId) {
        // Update database order to paid
        await supabase
          .from('orders')
          .update({
            status: 'confirmed',
            payment_status: 'paid',
            paid_at: new Date().toISOString(),
          })
          .or(`razorpay_order_id.eq.${rzpOrderId},razorpay_payment_id.eq.${rzpPaymentId}`);
      }
    }

    return res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.error('Error in razorpay-webhook handler:', err);
    return res.status(500).json({ success: false, message: err.message || 'Webhook processing failed' });
  }
}
