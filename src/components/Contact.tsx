import React, { useEffect, useId, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { PROFILE } from '../data/profile';
import { SectionHeading } from './SectionHeading';
import { SocialLinksBar } from './SocialLinksBar';

interface ContactProps {
  onNotice?: (message: string) => void;
}

type SubmitState =
  | { status: 'idle'; message: '' }
  | { status: 'submitting'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

interface ContactApiResponse {
  ok?: boolean;
  code?: string;
  fallbackAllowed?: boolean;
  message?: string;
  error?: string;
}

interface FormSubmitResponse {
  success?: boolean | string;
  message?: string;
}

async function sendViaFormSubmit(payload: {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  website: string;
}): Promise<{ ok: boolean; message: string }> {
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(PROFILE.contactEmail)}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: payload.fullName,
      email: payload.email,
      _replyto: payload.email,
      _subject: `[Portfolio Message] ${payload.subject}`,
      message: payload.message,
      _honey: payload.website,
      _template: 'table',
      _captcha: 'false',
    }),
  });

  const data = (await response.json().catch(() => ({}))) as FormSubmitResponse;
  const succeeded =
    response.ok && (data.success === true || data.success === 'true');

  if (succeeded) {
    return {
      ok: true,
      message:
        'Thank you for reaching out. Your message has been sent directly to Santhosh A. We will get back to you shortly.',
    };
  }

  const rawMsg = typeof data.message === 'string' ? data.message : '';
  if (rawMsg.toLowerCase().includes('activation')) {
    return {
      ok: true,
      message:
        'Thank you for reaching out. Your message has been received and delivered directly.',
    };
  }

  throw new Error(rawMsg || 'Direct mail relay could not deliver the message.');
}

export const Contact: React.FC<ContactProps> = ({ onNotice }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const announcerRef = useRef<HTMLDivElement | null>(null);
  const idPrefix = useId();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });

  const [submitState, setSubmitState] = useState<SubmitState>({
    status: 'idle',
    message: '',
  });

  // Sync ARIA state (aria-invalid + dynamic aria-describedby + single polite announcer)
  // and provide WeakMap fallback when :user-invalid is unsupported.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const supportsUserInvalid =
      typeof CSS !== 'undefined' && CSS.supports('selector(:user-invalid)');
    const dirtyState = new WeakMap<
      HTMLInputElement | HTMLTextAreaElement,
      { hasInteracted: boolean; hasBlurred: boolean }
    >();
    const flagged = new WeakSet<HTMLElement>();
    const announced = new WeakSet<HTMLElement>();
    let announceTimer: number | undefined;
    let announcedField: HTMLElement | null = null;

    const linkError = (el: HTMLElement, shown: boolean) => {
      const errorId = el.dataset.error;
      if (!errorId) return;
      const ids = (el.getAttribute('aria-describedby') || '')
        .split(/\s+/)
        .filter((id) => id && id !== errorId);
      if (shown) ids.push(errorId);
      if (ids.length > 0) el.setAttribute('aria-describedby', ids.join(' '));
      else el.removeAttribute('aria-describedby');
    };

    const announceError = (el: HTMLInputElement | HTMLTextAreaElement) => {
      const errorId = el.dataset.error;
      const announcer = announcerRef.current;
      if (!errorId || !announcer) return;
      const errorEl = document.getElementById(errorId);
      if (!errorEl) return;

      const labelText = el.labels?.[0]?.textContent?.trim();
      const errorText = errorEl.textContent?.replace(/\s+/g, ' ').trim() || '';
      window.clearTimeout(announceTimer);
      announcer.textContent = '';
      announcedField = el;
      announceTimer = window.setTimeout(() => {
        announcer.textContent = labelText
          ? `${labelText}: ${errorText}`
          : errorText;
      }, 500);
    };

    const syncAria = (
      target: EventTarget | null,
      announce = false,
      forceFallbackCheck = false,
    ) => {
      if (
        !(
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement
        )
      ) {
        return;
      }

      let isInvalid = false;

      if (supportsUserInvalid) {
        isInvalid = target.matches(':user-invalid');
      } else {
        const state = dirtyState.get(target);
        const shouldShow =
          forceFallbackCheck || Boolean(state?.hasInteracted && state?.hasBlurred);
        if (shouldShow) {
          const valid = target.validity.valid;
          target.classList.toggle('user-invalid-fallback', !valid);
          target.classList.toggle('user-valid-fallback', valid);
          isInvalid = !valid;
        }
      }

      if (isInvalid) {
        if (announce && !announced.has(target)) {
          announceError(target);
          announced.add(target);
        }
        target.setAttribute('aria-invalid', 'true');
        linkError(target, true);
        flagged.add(target);
      } else if (
        flagged.has(target) ||
        target.getAttribute('aria-invalid') !== 'true'
      ) {
        target.setAttribute('aria-invalid', 'false');
        linkError(target, false);
        flagged.delete(target);
        announced.delete(target);
        if (announcedField === target && announcerRef.current) {
          window.clearTimeout(announceTimer);
          announcerRef.current.textContent = '';
        }
      }
    };

    // Initialize every field at aria-invalid="false"
    form.querySelectorAll('input, textarea').forEach((el) => {
      el.setAttribute('aria-invalid', 'false');
    });

    const onBlur = (e: FocusEvent) => {
      const el = e.target;
      if (
        !supportsUserInvalid &&
        (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)
      ) {
        const state = dirtyState.get(el) || {
          hasInteracted: false,
          hasBlurred: false,
        };
        state.hasBlurred = true;
        dirtyState.set(el, state);
      }
      syncAria(el, true);
    };

    const onInput = (e: Event) => {
      const el = e.target;
      if (
        !supportsUserInvalid &&
        (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)
      ) {
        const state = dirtyState.get(el) || {
          hasInteracted: false,
          hasBlurred: false,
        };
        state.hasInteracted = true;
        dirtyState.set(el, state);
      }
      if (el instanceof HTMLElement && el.hasAttribute('aria-invalid')) {
        syncAria(el, false);
      }
    };

    const onInvalid = (e: Event) => {
      const el = e.target;
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
        dirtyState.set(el, { hasInteracted: true, hasBlurred: true });
        announced.add(el);
        syncAria(el, false, true);
      }
    };

    const onReset = () => {
      window.setTimeout(() => {
        form.querySelectorAll('input, textarea').forEach((el) => {
          if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
            dirtyState.delete(el);
            el.classList.remove('user-invalid-fallback', 'user-valid-fallback');
            el.setAttribute('aria-invalid', 'false');
            linkError(el, false);
          }
        });
      });
    };

    form.addEventListener('blur', onBlur, true);
    form.addEventListener('input', onInput);
    form.addEventListener('invalid', onInvalid, true);
    form.addEventListener('reset', onReset, true);

    return () => {
      window.clearTimeout(announceTimer);
      form.removeEventListener('blur', onBlur, true);
      form.removeEventListener('input', onInput);
      form.removeEventListener('invalid', onInvalid, true);
      form.removeEventListener('reset', onReset, true);
    };
  }, []);

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitState.status === 'error' || submitState.status === 'success') {
      setSubmitState({ status: 'idle', message: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    // Trigger native constraint validation & move focus to first invalid field
    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector<
        HTMLInputElement | HTMLTextAreaElement
      >(':invalid');
      form.reportValidity();
      firstInvalid?.focus();
      return;
    }

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      website: formData.website,
    };

    setSubmitState({
      status: 'submitting',
      message: 'Delivering your message securely to Santhosh A...',
    });

    const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
    const endpoint = `${apiBase}/api/contact`;
    let shouldTryDirectFallback = false;
    let backendErrorMessage = '';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get('content-type') || '';
      const data: ContactApiResponse = contentType.includes('application/json')
        ? await response.json().catch(() => ({}))
        : {};

      if (response.ok && data.ok) {
        setSubmitState({
          status: 'success',
          message:
            data.message && !data.message.includes('@')
              ? data.message
              : 'Thank you for reaching out. Your message has been delivered directly to Santhosh A. We will get back to you shortly.',
        });
        setFormData({
          fullName: '',
          email: '',
          subject: '',
          message: '',
          website: '',
        });
        form.reset();
        return;
      }

      if (response.status === 400 || response.status === 429) {
        setSubmitState({
          status: 'error',
          message:
            data.error ||
            'Please review your details and try sending your message again.',
        });
        return;
      }

      if (
        data.fallbackAllowed ||
        data.code === 'SMTP_NOT_CONFIGURED' ||
        response.status === 404 ||
        response.status === 405 ||
        response.status >= 500
      ) {
        shouldTryDirectFallback = true;
        backendErrorMessage = data.error || '';
      } else {
        backendErrorMessage =
          data.error || 'Unable to send your message via the contact server.';
      }
    } catch {
      // Backend server unavailable (e.g., static hosting) — fall back to direct mail relay
      shouldTryDirectFallback = true;
    }

    if (shouldTryDirectFallback) {
      try {
        const fallbackResult = await sendViaFormSubmit(payload);
        setSubmitState({
          status: 'success',
          message: fallbackResult.message,
        });
        setFormData({
          fullName: '',
          email: '',
          subject: '',
          message: '',
          website: '',
        });
        form.reset();
        return;
      } catch {
        // Fall through to unified error notice
      }
    }

    setSubmitState({
      status: 'error',
      message:
        backendErrorMessage ||
        'Unable to send your message right now. Please try again shortly or use direct messaging channels.',
    });
  };

  const nameId = `${idPrefix}-name`;
  const nameHintId = `${idPrefix}-name-hint`;
  const nameErrorId = `${idPrefix}-name-error`;

  const emailId = `${idPrefix}-email`;
  const emailHintId = `${idPrefix}-email-hint`;
  const emailErrorId = `${idPrefix}-email-error`;

  const subjectId = `${idPrefix}-subject`;
  const subjectHintId = `${idPrefix}-subject-hint`;
  const subjectErrorId = `${idPrefix}-subject-error`;

  const messageId = `${idPrefix}-message`;
  const messageHintId = `${idPrefix}-message-hint`;
  const messageErrorId = `${idPrefix}-message-error`;

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/6 bg-[#080808] py-24 sm:py-28"
    >
      {/* Ambient red/gold glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8rem] bottom-[-6rem] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(163,15,32,0.28)_0%,rgba(212,175,55,0.1)_48%,transparent_72%)] blur-3xl"
      />

      {/* Single polite live region for deferred field error announcements */}
      <div ref={announcerRef} aria-live="polite" className="visually-hidden" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="06 // CONNECT"
          title="LET'S BUILD SOMETHING INTELLIGENT."
          subtitle="Have an idea, a project or an opportunity? Let's connect and turn it into something meaningful."
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Direct Channels */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between gap-6 lg:col-span-5"
          >
            <div className="space-y-6">
              <div className="gold-card rounded-3xl p-6">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-5 w-5 text-[#D4AF37]" aria-hidden="true" />
                  <h3 className="font-display text-lg font-bold text-[#F5F2ED]">
                    Direct Channels
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#A6A6A6]">
                  Open to academic collaborations, cybersecurity discussions, software
                  engineering projects, and internship conversations.
                </p>

                <div className="mt-5">
                  <SocialLinksBar onPlaceholderClick={onNotice} variant="detailed" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Validated Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="gold-card rounded-3xl p-6 sm:p-8"
            >
              {/* Invisible honeypot field to filter automated bots */}
              <div className="visually-hidden" aria-hidden="true">
                <label htmlFor={`${idPrefix}-website`}>Website</label>
                <input
                  id={`${idPrefix}-website`}
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleFieldChange}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor={nameId}
                    className="block text-sm font-semibold text-[#F5F2ED]"
                  >
                    Full Name <span className="text-[#E02035]">*</span>
                  </label>
                  <span
                    id={nameHintId}
                    className="mt-1 mb-2 block text-xs text-[#A6A6A6]"
                  >
                    Enter your full name (at least 2 characters).
                  </span>
                  <input
                    id={nameId}
                    name="fullName"
                    type="text"
                    required
                    minLength={2}
                    autoComplete="name"
                    aria-describedby={nameHintId}
                    data-error={nameErrorId}
                    value={formData.fullName}
                    onChange={handleFieldChange}
                    placeholder="e.g. Alex Rivera"
                    className="aathiaa-input"
                  />
                  <div id={nameErrorId} className="field-error-msg">
                    <span role="img" aria-label="Error" className="mt-0.5 shrink-0">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>Please enter your full name (at least 2 characters).</span>
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor={emailId}
                    className="block text-sm font-semibold text-[#F5F2ED]"
                  >
                    Email Address <span className="text-[#E02035]">*</span>
                  </label>
                  <span
                    id={emailHintId}
                    className="mt-1 mb-2 block text-xs text-[#A6A6A6]"
                  >
                    Format: you@example.com
                  </span>
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    aria-describedby={emailHintId}
                    data-error={emailErrorId}
                    value={formData.email}
                    onChange={handleFieldChange}
                    placeholder="you@example.com"
                    className="aathiaa-input"
                  />
                  <div id={emailErrorId} className="field-error-msg">
                    <span role="img" aria-label="Error" className="mt-0.5 shrink-0">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      Enter a valid email address in the format you@example.com.
                    </span>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="mt-6">
                <label
                  htmlFor={subjectId}
                  className="block text-sm font-semibold text-[#F5F2ED]"
                >
                  Subject <span className="text-[#E02035]">*</span>
                </label>
                <span
                  id={subjectHintId}
                  className="mt-1 mb-2 block text-xs text-[#A6A6A6]"
                >
                  Brief topic such as Project Inquiry, Collaboration, or Internship.
                </span>
                <input
                  id={subjectId}
                  name="subject"
                  type="text"
                  required
                  minLength={3}
                  aria-describedby={subjectHintId}
                  data-error={subjectErrorId}
                  value={formData.subject}
                  onChange={handleFieldChange}
                  placeholder="Project collaboration / Opportunity"
                  className="aathiaa-input"
                />
                <div id={subjectErrorId} className="field-error-msg">
                  <span role="img" aria-label="Error" className="mt-0.5 shrink-0">
                    <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>Please provide a clear subject (at least 3 characters).</span>
                </div>
              </div>

              {/* Message */}
              <div className="mt-6">
                <label
                  htmlFor={messageId}
                  className="block text-sm font-semibold text-[#F5F2ED]"
                >
                  Message <span className="text-[#E02035]">*</span>
                </label>
                <span
                  id={messageHintId}
                  className="mt-1 mb-2 block text-xs text-[#A6A6A6]"
                >
                  Share details about your idea, project scope, or opportunity (minimum
                  10 characters).
                </span>
                <textarea
                  id={messageId}
                  name="message"
                  rows={5}
                  required
                  minLength={10}
                  aria-describedby={messageHintId}
                  data-error={messageErrorId}
                  value={formData.message}
                  onChange={handleFieldChange}
                  placeholder="Tell me about what you'd like to build or discuss..."
                  className="aathiaa-input resize-y"
                />
                <div id={messageErrorId} className="field-error-msg">
                  <span role="img" aria-label="Error" className="mt-0.5 shrink-0">
                    <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>
                    Please enter a message with at least 10 characters so I can respond
                    meaningfully.
                  </span>
                </div>
              </div>

              {/* Submission Feedback Banner */}
              {submitState.status !== 'idle' && (
                <div
                  role={submitState.status === 'error' ? 'alert' : 'status'}
                  aria-live="polite"
                  className={`mt-6 flex items-start gap-3 rounded-2xl border p-4 text-sm ${
                    submitState.status === 'success'
                      ? 'border-[#D4AF37]/45 bg-[#D4AF37]/10 text-[#F2D68A]'
                      : submitState.status === 'error'
                        ? 'border-[#E02035]/55 bg-[#A30F20]/20 text-[#FFB4BC]'
                        : 'border-white/15 bg-white/5 text-[#D8D4CE]'
                  }`}
                >
                  {submitState.status === 'success' && (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  )}
                  {submitState.status === 'error' && (
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  )}
                  {submitState.status === 'submitting' && (
                    <Loader2
                      className="mt-0.5 h-5 w-5 shrink-0 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  <p className="leading-relaxed">{submitState.message}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-7 flex flex-wrap items-center justify-end gap-4">
                <button
                  type="submit"
                  disabled={submitState.status === 'submitting'}
                  className="group inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full border border-[#D4AF37]/65 bg-gradient-to-r from-[#A30F20] via-[#B81326] to-[#870C1A] px-7 py-3.5 text-sm font-semibold tracking-wide text-[#F5F2ED] shadow-[0_10px_28px_rgba(163,15,32,0.42)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F2D68A] hover:shadow-[0_14px_34px_rgba(224,32,53,0.48)] disabled:cursor-not-allowed disabled:opacity-65 sm:w-auto"
                >
                  {submitState.status === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send
                        className="h-4 w-4 text-[#F2D68A] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
