import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Info, X } from 'lucide-react';

interface ToastNoticeProps {
  message: string | null;
  onDismiss: () => void;
}

export const ToastNotice: React.FC<ToastNoticeProps> = ({ message, onDismiss }) => (
  <AnimatePresence>
    {message && (
      <motion.div
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-6 left-1/2 z-40 w-[min(92vw,34rem)] -translate-x-1/2"
      >
        <div className="glass-panel flex items-start gap-3 rounded-2xl border border-[#D4AF37]/45 px-4 py-3.5 shadow-[0_20px_55px_rgba(0,0,0,0.8)]">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#F2D68A]" aria-hidden="true" />
          <p className="flex-1 text-xs leading-relaxed text-[#F5F2ED] sm:text-sm">
            {message}
          </p>
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss notification"
            className="inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[#A6A6A6] transition-colors hover:bg-white/10 hover:text-[#F5F2ED]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
