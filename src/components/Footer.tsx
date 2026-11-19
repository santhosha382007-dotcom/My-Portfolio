import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Mail } from 'lucide-react';
import { NAV_ITEMS, PROFILE } from '../data/profile';
import { BrandMark } from './BrandMark';
import { SocialLinksBar } from './SocialLinksBar';

interface FooterProps {
  onNotice?: (message: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNotice }) => {
  const [showFloatingTop, setShowFloatingTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => {
      setShowFloatingTop(window.scrollY > 520);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();
    const target = document.getElementById(href.replace('#', ''));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <footer className="relative border-t border-[#D4AF37]/20 bg-[#060607] pt-16 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12 lg:items-center">
            {/* Brand & Tagline */}
            <div className="lg:col-span-5">
              <BrandMark size="md" showTagline />
              <p className="mt-4 max-w-md text-base font-medium text-[#F2D68A]">
                &ldquo;{PROFILE.tagline}&rdquo;
              </p>
              <p className="mt-2 text-xs tracking-wide text-[#A6A6A6]">
                {PROFILE.positioning}
              </p>
              <a
                href={`mailto:${PROFILE.contactEmail}`}
                aria-label="Send direct email to Santhosh A."
                className="font-mono-tech mt-3 inline-flex items-center gap-2 text-xs text-[#D4AF37] transition-colors hover:text-[#F2D68A]"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Contact via Direct Email</span>
              </a>
            </div>

            {/* Footer Navigation Links */}
            <nav
              aria-label="Footer navigation"
              className="lg:col-span-4"
            >
              <p className="font-mono-tech mb-3 text-[11px] tracking-[0.24em] text-[#D4AF37] uppercase">
                Navigation
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="text-sm text-[#A6A6A6] transition-colors hover:text-[#F2D68A]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Socials & Back to Top */}
            <div className="flex flex-col items-start gap-5 lg:col-span-3 lg:items-end">
              <SocialLinksBar onPlaceholderClick={onNotice} variant="compact" />
              <button
                type="button"
                onClick={scrollToTop}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#111111] px-4 py-2 text-xs font-semibold tracking-wider text-[#F2D68A] uppercase transition-all duration-300 hover:border-[#F2D68A] hover:bg-[#D4AF37]/12"
              >
                <span>Back to Top</span>
                <ArrowUp
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 text-xs text-[#A6A6A6] sm:flex-row">
            <p>
              &copy; {currentYear}{' '}
              <span className="font-semibold text-[#F5F2ED]">
                {PROFILE.ownerName}
              </span>
              . All rights reserved.
            </p>
            <p className="font-mono-tech text-[11px] text-[#A6A6A6]">
              Crafted with precision • Obsidian, Crimson &amp; Gold
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Animated Back-to-Top Control */}
      <AnimatePresence>
        {showFloatingTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            initial={{ opacity: 0, y: 18, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed right-5 bottom-5 z-30 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#D4AF37]/55 bg-[#0D0D0F]/90 text-[#F2D68A] shadow-[0_12px_32px_rgba(0,0,0,0.7)] backdrop-blur-md transition-colors hover:border-[#F2D68A] hover:bg-[#A30F20]"
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
