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
        <path
          d="M32 13L49.5 49H42.3L38.2 40H25.8L21.7 49H14.5L32 13ZM32 24.8L28.3 33.4H35.7L32 24.8Z"
          fill="url(#brand-gold-letter)"
        />
        <circle cx="32" cy="46.2" r="2.4" fill="#E02035" />
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
            x1="15"
            y1="13"
            x2="50"
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
          AATHIAA
        </span>
        {showTagline && (
          <span className="font-mono-tech mt-1 text-[10px] tracking-[0.22em] text-[#A6A6A6] uppercase">
            Santhosh A.
          </span>
        )}
      </span>
    </span>
  );
};
