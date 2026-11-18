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
const isProduction =
  process.env.NODE_ENV === 'production' || Boolean(process.env.RENDER);
const PORT = Number(process.env.PORT || process.env.API_PORT || 3004);
const HOST = process.env.HOST || (isProduction ? '0.0.0.0' : '127.0.0.1');

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
    mailProvider: config.provider,
    mailConfigured: config.isConfigured,
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
        'Backend mail credentials (RESEND_API_KEY or GMAIL_APP_PASSWORD) are not configured yet.',
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
    console.error('[contact-api] Failed to send email:', error);
    return res.status(502).json({
      ok: false,
      code: 'SMTP_SEND_FAILED',
      fallbackAllowed: true,
      error:
        'Unable to deliver via backend mail right now. Please try again shortly or email santhosha382007@gmail.com directly.',
    });
  }
});

// Serve built static frontend on Render or in production mode
const distDir = path.join(rootDir, 'dist');
const shouldServeStatic =
  process.env.SERVE_STATIC !== 'false' &&
  (isProduction || process.env.SERVE_STATIC === 'true') &&
  fs.existsSync(distDir);

if (shouldServeStatic) {
  app.use(express.static(distDir));
  app.get('/{*splat}', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, HOST, () => {
  const config = getMailConfig();
  console.log(
    `[contact-api] Running on http://${HOST}:${PORT} | Static UI: ${
      shouldServeStatic ? 'ON' : 'OFF'
    } | Receiver: ${config.receiverEmail} | Mail Provider: ${
      config.isConfigured ? config.provider.toUpperCase() : 'NOT CONFIGURED'
    }`,
  );
});
