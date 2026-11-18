import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../data/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import { BrandMark } from './BrandMark';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(NAV_ITEMS.map((item) => item.id));

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);
    setMobileOpen(false);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', href);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'glass-nav py-3'
          : 'border-b border-transparent bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: AATHIAA Wordmark */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          aria-label="AATHIAA — Return to Home"
          className="shrink-0 rounded-lg focus-visible:outline-[#F2D68A]"
        >
          <BrandMark size="md" />
        </a>

        {/* Center: Desktop Navigation */}
        <nav aria-label="Primary navigation" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-white/8 bg-[#0E0E10]/70 px-2 py-1.5 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-[#F2D68A]'
                        : 'text-[#A6A6A6] hover:text-[#F5F2ED]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-full border border-[#D4AF37]/40 bg-gradient-to-r from-[#A30F20]/30 via-[#1A1410]/80 to-[#D4AF37]/15"
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: Let's Talk CTA + Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="group hidden items-center gap-2 rounded-full border border-[#D4AF37]/55 bg-gradient-to-r from-[#A30F20] to-[#7D0B19] px-5 py-2.5 text-sm font-semibold text-[#F5F2ED] shadow-[0_0_24px_rgba(163,15,32,0.35)] transition-all duration-300 hover:border-[#F2D68A] hover:from-[#E02035] hover:to-[#A30F20] hover:shadow-[0_0_30px_rgba(224,32,53,0.45)] sm:inline-flex"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight
              className="h-4 w-4 text-[#F2D68A] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#111111]/90 text-[#F5F2ED] transition-colors hover:border-[#D4AF37]/70 hover:text-[#F2D68A] lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-navigation-drawer"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[#D4AF37]/15 bg-[#080808]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-1.5 px-4 pt-3 pb-6 sm:px-6">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.035, duration: 0.22 }}
                    aria-current={isActive ? 'location' : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? 'border border-[#D4AF37]/35 bg-[#A30F20]/20 text-[#F2D68A]'
                        : 'text-[#A6A6A6] hover:bg-white/5 hover:text-[#F5F2ED]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono-tech text-[11px] text-[#D4AF37]/70">
                      0{idx + 1}
                    </span>
                  </motion.a>
                );
              })}

              <div className="pt-3">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/55 bg-gradient-to-r from-[#A30F20] to-[#7D0B19] px-5 py-3 text-sm font-semibold text-[#F5F2ED] transition-colors hover:from-[#E02035] hover:to-[#A30F20]"
                >
                  <span>Let&apos;s Talk</span>
                  <ArrowUpRight className="h-4 w-4 text-[#F2D68A]" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
