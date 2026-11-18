import {
  checkRateLimit,
  getMailConfig,
  sendContactEmail,
  validateContactPayload,
} from '../server/mailer.mjs';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({
      ok: false,
      code: 'METHOD_NOT_ALLOWED',
      error: 'Method not allowed. Use POST.',
    });
  }

  const forwarded = req.headers['x-forwarded-for'];
  const clientIp =
    (typeof forwarded === 'string'
      ? forwarded.split(',')[0].trim()
      : req.socket?.remoteAddress) || 'unknown';

  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds));
    return res.status(429).json({
      ok: false,
      code: 'RATE_LIMITED',
      error:
        'Too many messages sent from this connection. Please wait a few minutes and try again.',
    });
  }

  const body =
    typeof req.body === 'string'
      ? (() => {
          try {
            return JSON.parse(req.body);
          } catch {
            return null;
          }
        })()
      : req.body;

  const validation = validateContactPayload(body);
  if (!validation.valid) {
    return res.status(400).json({
      ok: false,
      code: 'VALIDATION_ERROR',
      error: validation.error,
    });
  }

  if (validation.isSpam) {
    return res.status(200).json({
      ok: true,
      provider: 'filtered',
      message: 'Thank you for reaching out. Your message has been received.',
    });
  }

  const config = getMailConfig();
  if (!config.isConfigured) {
    return res.status(503).json({
      ok: false,
      code: 'SMTP_NOT_CONFIGURED',
      fallbackAllowed: true,
      receiverEmail: config.receiverEmail,
      error: 'SMTP credentials are not configured on the server.',
    });
  }

  try {
    const result = await sendContactEmail(validation.data);
    return res.status(200).json({
      ok: true,
      provider: result.provider,
      messageId: result.messageId,
      message: `Thank you for reaching out. Your message has been delivered directly to Santhosh A. (${result.receiverEmail}).`,
    });
  } catch (error) {
    console.error('[api/contact] Failed to send email:', error);
    return res.status(502).json({
      ok: false,
      code: 'SMTP_SEND_FAILED',
      fallbackAllowed: true,
      error:
        'Unable to deliver via SMTP right now. Please try again shortly or email santhosha382007@gmail.com directly.',
    });
  }
}
