import React, { useId, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Calendar,
  ExternalLink,
  Maximize2,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  CERTIFICATIONS,
  type CertificationItem,
} from '../data/certifications';
import { useDialogModal } from '../hooks/useDialogModal';
import { SectionHeading } from './SectionHeading';

const CertificatePlaceholderArtwork: React.FC<{
  item: CertificationItem;
  large?: boolean;
}> = ({ item, large = false }) => (
  <div
    className={`relative flex w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#141110] via-[#0B0B0D] to-[#19090D] ${
      large ? 'aspect-[16/10] p-7 sm:p-10' : 'aspect-[16/10] p-5'
    }`}
  >
    <div
      aria-hidden="true"
      className="bg-luxury-grid pointer-events-none absolute inset-0 opacity-60"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-3 rounded-xl border border-[#D4AF37]/35"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-4 rounded-lg border border-dashed border-[#D4AF37]/18"
    />

    <div className="relative z-10 flex items-center justify-between gap-2">
      <span className="font-mono-tech text-[10px] tracking-[0.26em] text-[#D4AF37] uppercase">
        SANTHOSH // {item.code}
      </span>
      <span
        className={`font-mono-tech rounded border px-2 py-0.5 text-[10px] tracking-wider uppercase ${
          item.isPlaceholder
            ? 'border-[#E02035]/40 bg-[#A30F20]/25 text-[#F5F2ED]'
            : 'border-[#D4AF37]/55 bg-[#D4AF37]/15 text-[#F2D68A]'
        }`}
      >
        {item.isPlaceholder ? 'Placeholder' : 'Verified'}
      </span>
    </div>

    <div className="relative z-10 my-auto py-3 text-center">
      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/45 bg-[#080808]/80 text-[#F2D68A]">
        <Award className="h-5 w-5" aria-hidden="true" />
      </div>
      <p
        className={`font-display font-bold text-[#F5F2ED] ${
          large ? 'text-xl sm:text-2xl' : 'text-sm sm:text-base'
        }`}
      >
        {item.title}
      </p>
      <p className="mt-1.5 text-xs text-[#A6A6A6]">{item.category}</p>
    </div>

    <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-2.5 text-[10px] text-[#A6A6A6]">
      <span className="font-mono-tech uppercase">Santhosh A.</span>
      <span className="font-mono-tech text-[#D4AF37] uppercase">
        {item.completionDate}
      </span>
    </div>
  </div>
);

export const Certifications: React.FC = () => {
  const [activeCert, setActiveCert] = useState<CertificationItem | null>(null);
  const dialogTitleId = useId();

  const dialogRef = useDialogModal(activeCert !== null, () => {
    setActiveCert(null);
  });

  return (
    <section
      id="certifications"
      className="relative overflow-hidden border-t border-white/6 bg-[#0B0B0D] py-24 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-[-10rem] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.14)_0%,transparent_72%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="05 // CREDENTIALS"
            title="PROOF OF PROGRESS."
            subtitle="Verified courses, security labs, and technical achievements. Placeholder frames below are pre-wired with lightbox inspection—supply real credentials in src/data/certifications.ts."
          />

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#D4AF37]/25 bg-[#111111] px-4 py-2 text-xs text-[#CFCBC4] lg:self-auto">
            <ShieldCheck className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
            <span>Click any certificate to inspect</span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: idx * 0.06,
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="gold-card group flex flex-col overflow-hidden rounded-3xl"
            >
              <button
                type="button"
                onClick={() => setActiveCert(cert)}
                aria-label={`Inspect ${cert.title} in full-size modal`}
                className="relative w-full cursor-pointer overflow-hidden text-left focus-visible:outline-offset-[-3px]"
              >
                {cert.imageUrl ? (
                  <img
                    src={cert.imageUrl}
                    alt={`${cert.title} certificate issued by ${cert.issuer}`}
                    width={640}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <CertificatePlaceholderArtwork item={cert} />
                )}

                <span className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/45 bg-[#080808]/85 px-2.5 py-1 text-[11px] font-medium text-[#F2D68A] opacity-90 backdrop-blur-md transition-opacity group-hover:opacity-100">
                  <Maximize2 className="h-3 w-3" aria-hidden="true" />
                  <span>Inspect</span>
                </span>
              </button>

              <div className="flex flex-1 flex-col p-5">
                <p className="font-mono-tech text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase">
                  {cert.category}
                </p>

                <h3 className="font-display mt-2 text-base font-bold text-[#F5F2ED] transition-colors group-hover:text-[#F2D68A]">
                  {cert.title}
                </h3>

                <p className="mt-1.5 text-xs leading-relaxed text-[#A6A6A6]">
                  {cert.issuer}
                </p>

                <div className="mt-auto flex items-center justify-between gap-2 border-t border-white/8 pt-4 text-xs">
                  <span className="font-mono-tech inline-flex items-center gap-1.5 text-[#A6A6A6]">
                    <Calendar className="h-3.5 w-3.5 text-[#E02035]" aria-hidden="true" />
                    {cert.completionDate}
                  </span>

                  {cert.verificationUrl ? (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-[#F2D68A] hover:underline"
                    >
                      <span>Verify</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveCert(cert)}
                      className="cursor-pointer font-medium text-[#D4AF37] transition-colors hover:text-[#F2D68A]"
                    >
                      View Preview
                    </button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Native <dialog> Certificate Lightbox Modal */}
      <dialog
        ref={dialogRef}
        aria-labelledby={dialogTitleId}
        {...({ closedby: 'any' } as Record<string, string>)}
        className="aathiaa-dialog"
      >
        {activeCert && (
          <div className="glass-panel overflow-hidden rounded-3xl border border-[#D4AF37]/35 shadow-[0_32px_90px_rgba(0,0,0,0.85)]">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
              <div>
                <p className="font-mono-tech text-[11px] tracking-[0.22em] text-[#D4AF37] uppercase">
                  {activeCert.code} • {activeCert.category}
                </p>
                <h3
                  id={dialogTitleId}
                  className="font-display mt-1 text-lg font-bold text-[#F5F2ED] sm:text-xl"
                >
                  {activeCert.title}
                </h3>
              </div>

              <button
                type="button"
                autoFocus
                onClick={() => dialogRef.current?.close()}
                aria-label="Close certificate preview modal"
                className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#D4AF37]/35 bg-[#0A0A0C] text-[#F5F2ED] transition-colors hover:border-[#F2D68A] hover:text-[#F2D68A]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="overflow-hidden rounded-2xl border border-[#D4AF37]/30">
                {activeCert.imageUrl ? (
                  <img
                    src={activeCert.imageUrl}
                    alt={`${activeCert.title} full certificate`}
                    className="max-h-[60vh] w-full bg-[#080808] object-contain"
                  />
                ) : (
                  <CertificatePlaceholderArtwork item={activeCert} large />
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-white/8 bg-[#0B0B0D]/90 p-5 sm:grid-cols-3">
                <div>
                  <p className="font-mono-tech text-[10px] tracking-[0.2em] text-[#A6A6A6] uppercase">
                    Issuing Organization
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#F5F2ED]">
                    {activeCert.issuer}
                  </p>
                </div>
                <div>
                  <p className="font-mono-tech text-[10px] tracking-[0.2em] text-[#A6A6A6] uppercase">
                    Completion Date
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#F2D68A]">
                    {activeCert.completionDate}
                  </p>
                </div>
                <div>
                  <p className="font-mono-tech text-[10px] tracking-[0.2em] text-[#A6A6A6] uppercase">
                    Verification URL
                  </p>
                  {activeCert.verificationUrl ? (
                    <a
                      href={activeCert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-[#F2D68A] hover:underline"
                    >
                      <span>Open Credential</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-[#A6A6A6]">Pending verification link</p>
                  )}
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#A6A6A6]">
                {activeCert.summary}
              </p>

              <div className="mt-6 flex justify-end">
                <form method="dialog">
                  <button
                    type="submit"
                    className="cursor-pointer rounded-xl border border-white/15 bg-[#121214] px-5 py-2.5 text-sm font-medium text-[#F5F2ED] transition-colors hover:border-[#D4AF37]/50 hover:text-[#F2D68A]"
                  >
                    Close Preview
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
};
