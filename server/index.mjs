import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import {
  checkRateLimit,
  getMailConfig,
  sendContactEmail,
  validateContactPayload,
} from './mailer.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load .env.local first (if present), then fallback to .env
dotenv.config({ path: path.join(rootDir, '.env.local'), quiet: true });
dotenv.config({ path: path.join(rootDir, '.env'), quiet: true });

const app = express();
const PORT = Number(process.env.API_PORT || process.env.PORT || 3004);

app.set('trust proxy', 1);

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
  : true;

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'OPTIONS'],
  }),
);
app.use(express.json({ limit: '32kb' }));

app.get('/api/health', (_req, res) => {
  const config = getMailConfig();
  res.json({
    ok: true,
    receiverEmail: config.receiverEmail,
    smtpConfigured: config.isConfigured,
  });
});

app.post('/api/contact', async (req, res) => {
  const clientIp =
    (typeof req.headers['x-forwarded-for'] === 'string'
      ? req.headers['x-forwarded-for'].split(',')[0].trim()
      : req.ip) || 'unknown';

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

  const validation = validateContactPayload(req.body);
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
      error:
        'Backend Gmail SMTP App Password is not configured yet in .env.local.',
    });
  }

  try {
    const result = await sendContactEmail(validation.data);
    return res.status(200).json({
      ok: true,
      provider: 'smtp',
      messageId: result.messageId,
      message: `Thank you for reaching out. Your message has been delivered directly to Santhosh A. (${result.receiverEmail}).`,
    });
  } catch (error) {
    console.error('[contact-api] Failed to send email:', error);
    return res.status(502).json({
      ok: false,
      code: 'SMTP_SEND_FAILED',
      fallbackAllowed: true,
      error:
        'Unable to deliver via SMTP right now. Please try again shortly or email santhosha382007@gmail.com directly.',
    });
  }
});

// Serve built static frontend when running the backend in production mode
const distDir = path.join(rootDir, 'dist');
if (process.env.NODE_ENV === 'production' && fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('/{*splat}', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, '127.0.0.1', () => {
  const config = getMailConfig();
  console.log(
    `[contact-api] Running on http://localhost:${PORT} | Receiver: ${config.receiverEmail} | Gmail SMTP: ${
      config.isConfigured ? 'READY' : 'NOT CONFIGURED (add GMAIL_APP_PASSWORD in .env.local)'
    }`,
  );
});
