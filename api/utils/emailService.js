// Server-Side Centralized Email Service for ÉLAVA Perfumes
// Provider: Resend (https://resend.com)
// Environment: RESEND_API_KEY (Server-side only)

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://ynzzppjatnltpobbrhji.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_21MGWSYebjuCCi_iZa9ZTA_4LKIM8vf';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const DEFAULT_FROM = process.env.RESEND_FROM_EMAIL || 'ÉLAVA Perfumes <orders@elavaperfumes.com>';
const TEST_FALLBACK_FROM = 'ÉLAVA <onboarding@resend.dev>';

/**
 * Base Luxury HTML Email Layout Template
 */
function wrapEmailTemplate(contentHtml, previewText = '') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ÉLAVA Perfumes</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f272f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F5F1EA;">
  ${previewText ? `<div style="display: none; max-height: 0px; overflow: hidden;">${previewText}</div>` : ''}
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0f272f; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #163E49; border: 1px solid rgba(243, 235, 221, 0.15); border-radius: 16px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; background-color: #102F38; border-bottom: 1px solid rgba(243, 235, 221, 0.12);">
              <div style="font-family: Georgia, serif; font-size: 26px; font-weight: bold; letter-spacing: 4px; color: #C5A15A; text-transform: uppercase;">
                ÉLAVA
              </div>
              <div style="font-size: 9px; letter-spacing: 3px; color: #F5F1EA; text-transform: uppercase; margin-top: 4px;">
                ARTISANAL EAU DE PARFUM
              </div>
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding: 40px; font-size: 14px; line-height: 1.6; color: #F5F1EA;">
              ${contentHtml}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; text-align: center; background-color: #102F38; border-top: 1px solid rgba(243, 235, 221, 0.12); font-size: 11px; color: #B8C4C2;">
              <p style="margin: 0 0 6px 0;">ÉLAVA Perfumes · Artisanal Luxury Fragrances</p>
              <p style="margin: 0;">Ahmedabad, Gujarat, India · <a href="https://elavaperfumes.com" style="color: #C5A15A; text-decoration: none;">elavaperfumes.com</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * 1. Order Confirmed Email HTML
 */
function buildOrderConfirmedHtml(order) {
  const itemsHtml = (order.items || []).map((item) => `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid rgba(243,235,221,0.08); font-weight: bold;">
        ÉLAVA ${item.name} <span style="font-size: 11px; font-weight: normal; color: #B8C4C2;">(${item.size || '60 ML'} × ${item.quantity || 1})</span>
      </td>
      <td align="right" style="padding: 10px 0; border-bottom: 1px solid rgba(243,235,221,0.08); font-weight: bold;">
        ₹${((item.price || 0) * (item.quantity || 1)).toLocaleString()}
      </td>
    </tr>
  `).join('');

  const sampleHtml = order.freeSample ? `
    <tr style="background-color: rgba(197, 161, 90, 0.1);">
      <td style="padding: 10px; font-weight: bold; color: #C5A15A;">
        FREE 10ML SAMPLE — ${order.freeSample.name}
      </td>
      <td align="right" style="padding: 10px; font-weight: bold; color: #4ADE80;">
        COMPLIMENTARY (₹0)
      </td>
    </tr>
  ` : '';

  const content = `
    <h2 style="font-family: Georgia, serif; font-size: 22px; margin: 0 0 10px 0; color: #F5F1EA; text-transform: uppercase;">
      Your Order is Confirmed
    </h2>
    <p style="color: #B8C4C2; margin-top: 0;">
      Thank you for choosing ÉLAVA. We are preparing your artisanal fragrance order with utmost care.
    </p>

    <div style="background-color: #102F38; border: 1px solid rgba(243,235,221,0.12); border-radius: 12px; padding: 16px; margin: 24px 0;">
      <table width="100%" cellspacing="0" cellpadding="0" style="font-size: 13px;">
        <tr>
          <td style="color: #B8C4C2; padding-bottom: 6px;">ORDER NUMBER:</td>
          <td align="right" style="font-weight: bold; font-family: monospace; color: #C5A15A; font-size: 15px;">
            ${order.orderNumber || order.order_number}
          </td>
        </tr>
        <tr>
          <td style="color: #B8C4C2;">TOTAL PAID:</td>
          <td align="right" style="font-weight: bold; color: #F5F1EA; font-size: 15px;">
            ₹${(order.totalAmount || order.total_amount || 0).toLocaleString()}
          </td>
        </tr>
      </table>
    </div>

    <h3 style="font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: #C5A15A; margin: 20px 0 10px 0;">
      ORDER ITEMS
    </h3>
    <table width="100%" cellspacing="0" cellpadding="0" style="font-size: 13px; margin-bottom: 20px;">
      ${itemsHtml}
      ${sampleHtml}
    </table>

    <div style="background-color: #102F38; border: 1px solid rgba(243,235,221,0.12); border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 12px; color: #B8C4C2;">
      <strong style="color: #F5F1EA; text-transform: uppercase; display: block; margin-bottom: 4px;">Delivery Address Snapshot:</strong>
      ${order.shippingAddress?.fullName || order.email}<br>
      ${order.shippingAddress?.addressLine1 || ''} ${order.shippingAddress?.addressLine2 || ''}<br>
      ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''} - ${order.shippingAddress?.postalCode || ''}
    </div>

    <div style="text-align: center; margin-top: 30px;">
      <a href="https://elavaperfumes.com/account/orders" style="display: inline-block; background-color: #C5A15A; color: #102F38; padding: 12px 24px; border-radius: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; font-size: 12px;">
        VIEW MY ORDER →
      </a>
    </div>
  `;

  return wrapEmailTemplate(content, `Order Confirmed — ${order.orderNumber || order.order_number}`);
}

/**
 * 2. Payment Success Email HTML
 */
function buildPaymentSuccessHtml(order, paymentRef) {
  const content = `
    <h2 style="font-family: Georgia, serif; font-size: 22px; margin: 0 0 10px 0; color: #F5F1EA; text-transform: uppercase;">
      Payment Confirmed
    </h2>
    <p style="color: #B8C4C2; margin-top: 0;">
      We have successfully received your payment for order <strong style="color: #C5A15A;">${order.orderNumber || order.order_number}</strong>.
    </p>

    <div style="background-color: #102F38; border: 1px solid rgba(243,235,221,0.12); border-radius: 12px; padding: 16px; margin: 24px 0; font-size: 13px;">
      <p style="margin: 0 0 8px 0;"><strong>Amount Paid:</strong> ₹${(order.totalAmount || order.total_amount || 0).toLocaleString()}</p>
      <p style="margin: 0 0 8px 0;"><strong>Payment Method:</strong> Razorpay Online Payment</p>
      ${paymentRef ? `<p style="margin: 0; font-family: monospace; color: #C5A15A;"><strong>Transaction Ref:</strong> ${paymentRef}</p>` : ''}
    </div>

    <div style="text-align: center; margin-top: 30px;">
      <a href="https://elavaperfumes.com/account/orders" style="display: inline-block; background-color: #C5A15A; color: #102F38; padding: 12px 24px; border-radius: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; font-size: 12px;">
        VIEW MY ORDER →
      </a>
    </div>
  `;

  return wrapEmailTemplate(content, `Payment Confirmed — ${order.orderNumber || order.order_number}`);
}

/**
 * 3. Payment Failed Email HTML
 */
function buildPaymentFailedHtml(order) {
  const content = `
    <h2 style="font-family: Georgia, serif; font-size: 22px; margin: 0 0 10px 0; color: #F87171; text-transform: uppercase;">
      Payment Could Not Be Completed
    </h2>
    <p style="color: #B8C4C2; margin-top: 0;">
      Your payment for ÉLAVA order <strong style="color: #F5F1EA;">${order.orderNumber || order.order_number}</strong> could not be processed.
    </p>

    <p style="font-size: 13px; color: #B8C4C2;">
      Don't worry — your cart items are safe. You can return to checkout to retry your payment with your preferred method.
    </p>

    <div style="text-align: center; margin-top: 30px;">
      <a href="https://elavaperfumes.com/checkout" style="display: inline-block; background-color: #C5A15A; color: #102F38; padding: 12px 24px; border-radius: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; font-size: 12px;">
        RETURN TO CHECKOUT →
      </a>
    </div>
  `;

  return wrapEmailTemplate(content, `Payment Failed — ${order.orderNumber || order.order_number}`);
}

/**
 * 4. Refund Processed Email HTML
 */
function buildRefundHtml(refund) {
  const content = `
    <h2 style="font-family: Georgia, serif; font-size: 22px; margin: 0 0 10px 0; color: #F5F1EA; text-transform: uppercase;">
      Refund Processed
    </h2>
    <p style="color: #B8C4C2; margin-top: 0;">
      Your refund for order <strong style="color: #C5A15A;">${refund.orderNumber}</strong> has been issued.
    </p>

    <div style="background-color: #102F38; border: 1px solid rgba(243,235,221,0.12); border-radius: 12px; padding: 16px; margin: 24px 0; font-size: 13px;">
      <p style="margin: 0 0 8px 0;"><strong>Refund Amount:</strong> ₹${refund.amount.toLocaleString()}</p>
      ${refund.reference ? `<p style="margin: 0; font-family: monospace; color: #C5A15A;"><strong>Refund Ref:</strong> ${refund.reference}</p>` : ''}
    </div>
  `;

  return wrapEmailTemplate(content, `Refund Processed — ${refund.orderNumber}`);
}

/**
 * 5. Referral Reward Available Email HTML
 */
function buildReferralRewardHtml(data) {
  const content = `
    <h2 style="font-family: Georgia, serif; font-size: 22px; margin: 0 0 10px 0; color: #C5A15A; text-transform: uppercase;">
      You Earned ₹100 CASH!
    </h2>
    <p style="color: #B8C4C2; margin-top: 0;">
      Great news! A friend completed their purchase using your referral code. Your <strong style="color: #4ADE80;">₹100 CASH</strong> reward is now available in your ÉLAVA wallet.
    </p>

    <div style="background-color: #102F38; border: 1px solid rgba(243,235,221,0.12); border-radius: 12px; padding: 16px; margin: 24px 0; text-align: center;">
      <div style="font-size: 11px; color: #B8C4C2; text-transform: uppercase; letter-spacing: 2px;">AVAILABLE REWARDS BALANCE</div>
      <div style="font-family: Georgia, serif; font-size: 32px; font-weight: bold; color: #C5A15A; margin: 6px 0;">₹${(data.availableRewards || 100).toLocaleString()}</div>
    </div>

    <div style="text-align: center; margin-top: 30px;">
      <a href="https://elavaperfumes.com/account/refer-and-earn" style="display: inline-block; background-color: #C5A15A; color: #102F38; padding: 12px 24px; border-radius: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; font-size: 12px;">
        VIEW MY REWARDS →
      </a>
    </div>
  `;

  return wrapEmailTemplate(content, `You Earned ₹100 CASH with ÉLAVA!`);
}

/**
 * 6. Withdrawal Status Email HTML
 */
function buildWithdrawalStatusHtml(data) {
  const titles = {
    received: 'Withdrawal Request Received',
    processing: 'Withdrawal Request Processing',
    completed: 'Withdrawal Completed',
    failed: 'Withdrawal Request Failed',
  };

  const title = titles[data.status] || 'Withdrawal Update';

  const content = `
    <h2 style="font-family: Georgia, serif; font-size: 22px; margin: 0 0 10px 0; color: #F5F1EA; text-transform: uppercase;">
      ${title}
    </h2>
    <p style="color: #B8C4C2; margin-top: 0;">
      Update regarding your ÉLAVA wallet payout request of <strong style="color: #C5A15A;">₹${data.amount.toLocaleString()}</strong>.
    </p>

    <div style="background-color: #102F38; border: 1px solid rgba(243,235,221,0.12); border-radius: 12px; padding: 16px; margin: 24px 0; font-size: 13px;">
      <p style="margin: 0 0 8px 0;"><strong>Status:</strong> ${data.status.toUpperCase()}</p>
      <p style="margin: 0 0 8px 0;"><strong>Payout Method:</strong> ${data.payoutMethod?.toUpperCase() || 'UPI/BANK'}</p>
      ${data.reference ? `<p style="margin: 0; font-family: monospace; color: #C5A15A;"><strong>Payout Ref:</strong> ${data.reference}</p>` : ''}
    </div>

    <div style="text-align: center; margin-top: 30px;">
      <a href="https://elavaperfumes.com/account/refer-and-earn" style="display: inline-block; background-color: #C5A15A; color: #102F38; padding: 12px 24px; border-radius: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; font-size: 12px;">
        VIEW MY WALLET →
      </a>
    </div>
  `;

  return wrapEmailTemplate(content, `${title} — ₹${data.amount}`);
}

/**
 * Dispatch Transactional Email via Resend HTTP API with Idempotency Guard
 */
export async function sendTransactionalEmail({ eventType, idempotencyKey, recipient, data }) {
  if (!recipient || !eventType || !idempotencyKey) {
    console.warn('Missing required email payload parameters');
    return { success: false, error: 'Missing payload parameters' };
  }

  // 1. Idempotency Check in email_logs Table
  try {
    const { data: existingLog } = await supabase
      .from('email_logs')
      .select('*')
      .eq('idempotency_key', idempotencyKey)
      .maybeSingle();

    if (existingLog && existingLog.status === 'sent') {
      console.log(`Email event ${idempotencyKey} already sent. Skipping duplicate.`);
      return { success: true, duplicate: true, providerId: existingLog.provider_message_id };
    }
  } catch (logErr) {
    console.warn('Email log idempotency query note:', logErr.message);
  }

  // 2. Build HTML Subject & Content
  let subject = 'ÉLAVA Perfumes';
  let html = '';

  switch (eventType) {
    case 'order-confirmed':
      subject = `Your ÉLAVA order is confirmed — #${data.orderNumber || data.order_number}`;
      html = buildOrderConfirmedHtml(data);
      break;

    case 'payment-success':
      subject = `Payment confirmed — ÉLAVA #${data.orderNumber || data.order_number}`;
      html = buildPaymentSuccessHtml(data, data.razorpayPaymentId || data.razorpay_payment_id);
      break;

    case 'payment-failed':
      subject = `Payment could not be completed — ÉLAVA #${data.orderNumber || data.order_number}`;
      html = buildPaymentFailedHtml(data);
      break;

    case 'refund-processed':
      subject = `Your ÉLAVA refund has been processed — #${data.orderNumber}`;
      html = buildRefundHtml(data);
      break;

    case 'referral-reward-available':
      subject = `You earned ₹100 CASH with ÉLAVA!`;
      html = buildReferralRewardHtml(data);
      break;

    case 'withdrawal-status':
      subject = `ÉLAVA Withdrawal Update — ₹${data.amount}`;
      html = buildWithdrawalStatusHtml(data);
      break;

    default:
      return { success: false, error: 'Unknown event type' };
  }

  // 3. Dispatch Email via Resend API
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY environment variable is not configured server-side.');
    // Record failure in email_logs safely
    await recordEmailLog(idempotencyKey, eventType, data.orderNumber || data.id, recipient, 'failed', null, 'Missing RESEND_API_KEY');
    return { success: false, error: 'RESEND_API_KEY not configured' };
  }

  try {
    const fromAddress = DEFAULT_FROM;
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [recipient],
        subject,
        html,
      }),
    });

    const resData = await response.json();

    if (response.ok && resData.id) {
      await recordEmailLog(idempotencyKey, eventType, data.orderNumber || data.id, recipient, 'sent', resData.id, null);
      return { success: true, providerId: resData.id };
    } else {
      const errMsg = resData.message || JSON.stringify(resData);
      await recordEmailLog(idempotencyKey, eventType, data.orderNumber || data.id, recipient, 'failed', null, errMsg);
      return { success: false, error: errMsg };
    }
  } catch (err) {
    console.error('Error dispatching Resend email:', err);
    await recordEmailLog(idempotencyKey, eventType, data.orderNumber || data.id, recipient, 'failed', null, err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Record email log entry in public.email_logs
 */
async function recordEmailLog(idempotencyKey, eventType, referenceId, recipient, status, providerId, errorMsg) {
  try {
    await supabase.from('email_logs').upsert({
      idempotency_key: idempotencyKey,
      event_type: eventType,
      reference_id: referenceId ? String(referenceId) : null,
      recipient,
      status,
      provider_message_id: providerId || null,
      error: errorMsg || null,
      sent_at: status === 'sent' ? new Date().toISOString() : null,
    }, { onConflict: 'idempotency_key' });
  } catch (dbErr) {
    console.warn('Unable to write to email_logs table:', dbErr.message);
  }
}
