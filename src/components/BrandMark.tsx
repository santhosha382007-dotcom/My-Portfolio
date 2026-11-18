import React from 'react';

interface BrandMarkProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  size = 'md',
  showTagline = false,
}) => {
  const iconDimensions =
    size === 'lg' ? 'h-11 w-11' : size === 'sm' ? 'h-8 w-8' : 'h-9 w-9';
  const wordmarkClasses =
    size === 'lg'
      ? 'text-2xl tracking-[0.34em]'
      : size === 'sm'
        ? 'text-base tracking-[0.28em]'
        : 'text-lg sm:text-xl tracking-[0.3em]';

  return (
    <span className="inline-flex items-center gap-3 select-none">
      <svg
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className={`${iconDimensions} shrink-0 drop-shadow-[0_0_12px_rgba(212,175,55,0.28)]`}
      >
        <rect
          x="2"
          y="2"
          width="60"
          height="60"
          rx="14"
          fill="#0B0B0D"
          stroke="url(#brand-gold-frame)"
          strokeWidth="1.6"
        />
        {/* Sculpted geometric S monogram */}
        <path
          d="M44.5 21.5C44.5 16.8 39.6 14 32.4 14C25 14 20 17.5 20 22.8C20 28.4 25.1 30.6 32.4 32.2L35.2 32.8C39.2 33.7 41.2 35.1 41.2 37.8C41.2 40.8 37.9 42.8 32.5 42.8C27.2 42.8 24.3 40.7 23.8 37.6H17.6C18.2 44.2 23.7 48.2 32.6 48.2C41.4 48.2 47.4 44.1 47.4 37.4C47.4 31.6 42.8 28.9 35.1 27.3L32.1 26.6C28.1 25.7 26.2 24.6 26.2 22.3C26.2 20 28.7 18.8 32.4 18.8C36.4 18.8 38.6 20.1 39 22.6H44.5V21.5Z"
          fill="url(#brand-gold-letter)"
        />
        <circle cx="45.5" cy="17.5" r="2.6" fill="#E02035" />
        <defs>
          <linearGradient
            id="brand-gold-frame"
            x1="4"
            y1="4"
            x2="60"
            y2="60"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F2D68A" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="#D4AF37" stopOpacity="0.5" />
            <stop offset="1" stopColor="#A30F20" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient
            id="brand-gold-letter"
            x1="17"
            y1="14"
            x2="48"
            y2="49"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F2D68A" />
            <stop offset="0.52" stopColor="#D4AF37" />
            <stop offset="1" stopColor="#9E7B23" />
          </linearGradient>
        </defs>
      </svg>

      <span className="flex flex-col leading-none">
        <span className={`font-display font-bold text-gold-gradient ${wordmarkClasses}`}>
          SANTHOSH
        </span>
        {showTagline && (
          <span className="font-mono-tech mt-1 text-[10px] tracking-[0.22em] text-[#A6A6A6] uppercase">
            Portfolio
          </span>
        )}
      </span>
    </span>
  );
};
