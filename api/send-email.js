// Serverless API Endpoint: Send Transactional Email via Resend
// Route: /api/send-email

import { sendTransactionalEmail } from './utils/emailService.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { eventType, idempotencyKey, recipient, data } = req.body || {};

    if (!eventType || !idempotencyKey || !recipient || !data) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters (eventType, idempotencyKey, recipient, data)',
      });
    }

    const result = await sendTransactionalEmail({
      eventType,
      idempotencyKey,
      recipient,
      data,
    });

    if (result.success) {
      return res.status(200).json({ success: true, providerId: result.providerId, duplicate: Boolean(result.duplicate) });
    } else {
      return res.status(500).json({ success: false, message: result.error || 'Email sending failed' });
    }
  } catch (err) {
    console.error('Error in send-email handler:', err);
    return res.status(500).json({ success: false, message: err.message || 'Internal server error' });
  }
}
