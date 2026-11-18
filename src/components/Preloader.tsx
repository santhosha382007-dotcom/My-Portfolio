import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BrandMark } from './BrandMark';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(false);
      onComplete?.();
      return;
    }

    const timer = window.setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 1150);

    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading AATHIAA portfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808]"
        >
          {/* Ambient crimson & gold halo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(163,15,32,0.34)_0%,rgba(212,175,55,0.1)_45%,transparent_72%)] blur-2xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            <BrandMark size="lg" />

            <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'left center' }}
                className="h-full w-full bg-gradient-to-r from-[#A30F20] via-[#D4AF37] to-[#F2D68A]"
              />
            </div>

            <p className="font-mono-tech text-[11px] tracking-[0.32em] text-[#A6A6A6] uppercase">
              Initializing Experience
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
