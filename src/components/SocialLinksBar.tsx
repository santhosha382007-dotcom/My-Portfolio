import React from 'react';
import { Github, Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { PROFILE, type SocialLink } from '../data/profile';

interface SocialLinksBarProps {
  onPlaceholderClick?: (message: string) => void;
  variant?: 'compact' | 'detailed';
}

const ICON_MAP: Record<SocialLink['id'], React.ReactNode> = {
  github: <Github className="h-[18px] w-[18px]" aria-hidden="true" />,
  linkedin: <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />,
  instagram: <Instagram className="h-[18px] w-[18px]" aria-hidden="true" />,
  whatsapp: <MessageCircle className="h-[18px] w-[18px]" aria-hidden="true" />,
  email: <Mail className="h-[18px] w-[18px]" aria-hidden="true" />,
};

export const SocialLinksBar: React.FC<SocialLinksBarProps> = ({
  onPlaceholderClick,
  variant = 'compact',
}) => {
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    link: SocialLink,
  ) => {
    if (!link.isPlaceholder && link.href) return;

    e.preventDefault();
    if (link.id === 'email') {
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
      onPlaceholderClick?.(
        'Email placeholder active — use the contact form below or configure your email in src/data/profile.ts.',
      );
      return;
    }

    onPlaceholderClick?.(
      `${link.label} link is a placeholder. Add your verified ${link.label} URL in src/data/profile.ts.`,
    );
  };

  if (variant === 'detailed') {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {PROFILE.socialLinks.map((link, index) => {
          const isExternal = !link.isPlaceholder && link.href.startsWith('http');
          const spanFullRow =
            PROFILE.socialLinks.length % 2 === 1 &&
            index === PROFILE.socialLinks.length - 1
              ? 'sm:col-span-2'
              : '';
          const content = (
            <>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#D4AF37]/25 bg-[#111111] text-[#D4AF37] transition-colors group-hover:border-[#D4AF37]/60 group-hover:text-[#F2D68A]">
                {ICON_MAP[link.id]}
              </span>
              <span className="min-w-0 flex-1 text-left">
                <span className="flex items-center gap-2 text-sm font-semibold text-[#F5F2ED]">
                  {link.label}
                  {link.isPlaceholder && (
                    <span className="font-mono-tech rounded border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-1.5 py-0.5 text-[10px] font-normal text-[#F2D68A]">
                      Editable
                    </span>
                  )}
                </span>
                <span className="mt-0.5 block truncate text-xs text-[#A6A6A6]">
                  {link.displayValue}
                </span>
              </span>
            </>
          );

          if (!link.isPlaceholder && link.href) {
            return (
              <a
                key={link.id}
                href={link.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={`gold-card group flex items-center gap-3.5 rounded-xl p-3.5 ${spanFullRow}`}
              >
                {content}
              </a>
            );
          }

          return (
            <button
              key={link.id}
              type="button"
              onClick={(e) => handleLinkClick(e, link)}
              className={`gold-card group flex w-full cursor-pointer items-center gap-3.5 rounded-xl p-3.5 ${spanFullRow}`}
            >
              {content}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3" aria-label="Social links">
      {PROFILE.socialLinks.map((link) => {
        const isExternal = !link.isPlaceholder && link.href.startsWith('http');
        const classes =
          'group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-[#111111]/85 text-[#A6A6A6] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/65 hover:text-[#F2D68A] hover:shadow-[0_0_20px_rgba(212,175,55,0.22)]';

        if (!link.isPlaceholder && link.href) {
          return (
            <a
              key={link.id}
              href={link.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              aria-label={link.label}
              title={link.label}
              className={classes}
            >
              {ICON_MAP[link.id]}
            </a>
          );
        }

        return (
          <button
            key={link.id}
            type="button"
            onClick={(e) => handleLinkClick(e, link)}
            aria-label={`${link.label} (editable placeholder)`}
            title={`${link.label} — configure in src/data/profile.ts`}
            className={`${classes} cursor-pointer`}
          >
            {ICON_MAP[link.id]}
          </button>
        );
      })}
    </div>
  );
};
