import nodemailer from 'nodemailer';

export const DEFAULT_CONTACT_EMAIL = 'santhosha382007@gmail.com';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

const rateLimitStore = new Map();

function isRealSecret(value) {
  const cleaned = String(value || '').trim();
  if (!cleaned) return false;
  const lower = cleaned.toLowerCase();
  return !lower.startsWith('your_') && !lower.includes('replace_with');
}

export function getMailConfig() {
  const receiverEmail =
    process.env.CONTACT_RECEIVER_EMAIL?.trim() || DEFAULT_CONTACT_EMAIL;

  // Option A: Resend HTTPS API (Port 443 — works on Render Free Tier & everywhere)
  const resendApiKey = process.env.RESEND_API_KEY?.trim() || '';
  const resendFrom =
    process.env.RESEND_FROM?.trim() ||
    'AATHIAA Portfolio <onboarding@resend.dev>';
  const resendConfigured = isRealSecret(resendApiKey);

  // Option B: Gmail / Custom SMTP (works locally, Vercel, and Render Paid plans)
  const smtpUser =
    process.env.GMAIL_USER?.trim() ||
    process.env.SMTP_USER?.trim() ||
    receiverEmail;
  const rawPass =
    process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || '';
  const smtpPass = rawPass.replace(/\s+/g, '');
  const smtpHost = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpSecure =
    process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === 'true'
      : smtpPort === 465;

  const smtpConfigured = Boolean(smtpUser && isRealSecret(smtpPass));
  const provider = resendConfigured
    ? 'resend'
    : smtpConfigured
      ? 'smtp'
      : 'none';

  return {
    receiverEmail,
    resendApiKey,
    resendFrom,
    resendConfigured,
    smtpUser,
    smtpPass,
    smtpHost,
    smtpPort,
    smtpSecure,
    smtpConfigured,
    provider,
    isConfigured: resendConfigured || smtpConfigured,
  };
}

export function checkRateLimit(clientKey) {
  const now = Date.now();
  const key = clientKey || 'unknown';
  const timestamps = (rateLimitStore.get(key) || []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS,
  );

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldest = timestamps[0];
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((RATE_LIMIT_WINDOW_MS - (now - oldest)) / 1000),
    );
    rateLimitStore.set(key, timestamps);
    return { allowed: false, retryAfterSeconds };
  }

  timestamps.push(now);
  rateLimitStore.set(key, timestamps);
  return { allowed: true, retryAfterSeconds: 0 };
}

export function validateContactPayload(body) {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body.' };
  }

  // Honeypot trap for automated spam bots
  const honeypot = String(body.website ?? body._honey ?? '').trim();
  if (honeypot.length > 0) {
    return { valid: true, isSpam: true };
  }

  const fullName = String(body.fullName ?? body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const subject = String(body.subject ?? '').trim();
  const message = String(body.message ?? '').trim();

  if (fullName.length < 2 || fullName.length > 100) {
    return {
      valid: false,
      error: 'Please enter your full name (2 to 100 characters).',
    };
  }

  if (!EMAIL_REGEX.test(email) || email.length > 254) {
    return {
      valid: false,
      error: 'Please enter a valid email address.',
    };
  }

  if (subject.length < 3 || subject.length > 150) {
    return {
      valid: false,
      error: 'Please provide a clear subject (3 to 150 characters).',
    };
  }

  if (message.length < 10 || message.length > 5000) {
    return {
      valid: false,
      error: 'Please enter a message between 10 and 5000 characters.',
    };
  }

  return {
    valid: true,
    isSpam: false,
    data: { fullName, email, subject, message },
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripHeaderInjection(value) {
  return String(value).replace(/[\r\n]+/g, ' ').trim();
}

function buildEmailContent({ fullName, email, subject, message }, receiverEmail) {
  const safeSubject = stripHeaderInjection(subject);
  const safeName = stripHeaderInjection(fullName);
  const safeEmail = stripHeaderInjection(email);
  const sentAt = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });

  const plainText = [
    'New message from your AATHIAA Portfolio contact form',
    '----------------------------------------------------',
    `Name:    ${safeName}`,
    `Email:   ${safeEmail}`,
    `Subject: ${safeSubject}`,
    `Sent:    ${sentAt} (IST)`,
    '',
    'Message:',
    message,
  ].join('\n');

  const htmlMessage = escapeHtml(message).replace(/\n/g, '<br />');
  const replyMailto = `mailto:${encodeURIComponent(safeEmail)}?subject=${encodeURIComponent(`Re: ${safeSubject}`)}`;

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background-color:#080808;color:#F5F2ED;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;margin:0 auto;background-color:#111113;border:1px solid #D4AF37;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="padding:24px 28px;background:linear-gradient(135deg,#A30F20 0%,#141416 100%);border-bottom:1px solid rgba(212,175,55,0.35);">
          <p style="margin:0;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#F2D68A;">AATHIAA PORTFOLIO // NEW MESSAGE</p>
          <h1 style="margin:8px 0 0;font-size:20px;line-height:1.3;color:#F5F2ED;">${escapeHtml(safeSubject)}</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:20px;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;font-size:12px;color:#A6A6A6;width:90px;">From</td>
              <td style="padding:8px 0;font-size:14px;font-weight:bold;color:#F5F2ED;">${escapeHtml(safeName)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:12px;color:#A6A6A6;">Email</td>
              <td style="padding:8px 0;font-size:14px;color:#F2D68A;">
                <a href="mailto:${escapeHtml(safeEmail)}" style="color:#F2D68A;text-decoration:none;">${escapeHtml(safeEmail)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:12px;color:#A6A6A6;">Received</td>
              <td style="padding:8px 0;font-size:13px;color:#D8D4CE;">${escapeHtml(sentAt)} (IST)</td>
            </tr>
          </table>

          <div style="padding:18px 20px;background-color:#0B0B0D;border:1px solid rgba(255,255,255,0.1);border-radius:12px;font-size:14px;line-height:1.65;color:#F5F2ED;">
            ${htmlMessage}
          </div>

          <div style="margin-top:24px;">
            <a href="${replyMailto}" style="display:inline-block;padding:12px 22px;background-color:#A30F20;border:1px solid #D4AF37;border-radius:999px;color:#F5F2ED;font-size:13px;font-weight:bold;text-decoration:none;">
              Reply to ${escapeHtml(safeName)}
            </a>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 28px;border-top:1px solid rgba(255,255,255,0.08);font-size:11px;color:#8E8E93;">
          Delivered directly to ${escapeHtml(receiverEmail)} from your AATHIAA portfolio contact bar.
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return {
    safeName,
    safeEmail,
    safeSubject,
    emailSubject: `[Portfolio Message] ${safeSubject}`,
    plainText,
    html,
  };
}

export async function sendContactEmail(payload) {
  const config = getMailConfig();

  if (!config.isConfigured) {
    const err = new Error('Mail credentials are not configured.');
    err.code = 'SMTP_NOT_CONFIGURED';
    throw err;
  }

  const content = buildEmailContent(payload, config.receiverEmail);

  // 1. Prefer Resend HTTPS API (Port 443 — never blocked on Render Free Tier)
  if (config.resendConfigured) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: config.resendFrom,
        to: [config.receiverEmail],
        reply_to: content.safeEmail,
        subject: content.emailSubject,
        text: content.plainText,
        html: content.html,
      }),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(
        result?.message || `Resend API error (HTTP ${response.status})`,
      );
    }

    return {
      provider: 'resend',
      messageId: result.id || 'resend',
      receiverEmail: config.receiverEmail,
    };
  }

  // 2. Fallback to Gmail / Custom SMTP via Nodemailer
  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpSecure,
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  });

  const info = await transporter.sendMail({
    from: `"AATHIAA Portfolio" <${config.smtpUser}>`,
    to: config.receiverEmail,
    replyTo: `"${content.safeName.replace(/"/g, '')}" <${content.safeEmail}>`,
    subject: content.emailSubject,
    text: content.plainText,
    html: content.html,
  });

  return {
    provider: 'smtp',
    messageId: info.messageId,
    receiverEmail: config.receiverEmail,
  };
}
