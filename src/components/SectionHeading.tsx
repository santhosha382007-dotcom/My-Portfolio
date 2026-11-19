import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  companyName?: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  companyName,
  subtitle,
  align = 'left',
}) => {
  const isCentered = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={isCentered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl text-left'}
    >
      <div
        className={`mb-4 inline-flex items-center gap-3 ${
          isCentered ? 'justify-center' : 'justify-start'
        }`}
      >
        <span className="h-[1px] w-8 bg-gradient-to-r from-[#E02035] to-[#D4AF37]" />
        <span className="font-mono-tech text-xs font-medium tracking-[0.26em] text-[#D4AF37] uppercase">
          {eyebrow}
        </span>
      </div>

      <h2 className="font-display text-3xl font-bold tracking-tight text-[#F5F2ED] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
        {title}
      </h2>

      {companyName && (
        <div
          className={`mt-2.5 flex items-center gap-2.5 ${
            isCentered ? 'justify-center' : 'justify-start'
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-[#E02035] shadow-[0_0_8px_#E02035]" />
          <span className="font-display text-xl font-bold tracking-wide text-[#F2D68A] sm:text-2xl">
            {companyName}
          </span>
        </div>
      )}

      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-[#A6A6A6] sm:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
