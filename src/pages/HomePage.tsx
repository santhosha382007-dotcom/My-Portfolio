import React, { useCallback, useEffect, useRef, useState } from 'react';
import { About } from '../components/About';
import { Certifications } from '../components/Certifications';
import { Contact } from '../components/Contact';
import { Experience } from '../components/Experience';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { Navbar } from '../components/Navbar';
import { Preloader } from '../components/Preloader';
import { Projects } from '../components/Projects';
import { Skills } from '../components/Skills';
import { ToastNotice } from '../components/ToastNotice';

export const HomePage: React.FC = () => {
  const [notice, setNotice] = useState<string | null>(null);
  const [ambientPaused, setAmbientPaused] = useState(false);
  const noticeTimerRef = useRef<number | undefined>(undefined);

  const showNotice = useCallback((message: string) => {
    setNotice(message);
    window.clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = window.setTimeout(() => {
      setNotice(null);
    }, 5200);
  }, []);

  const dismissNotice = useCallback(() => {
    window.clearTimeout(noticeTimerRef.current);
    setNotice(null);
  }, []);

  useEffect(() => {
    return () => window.clearTimeout(noticeTimerRef.current);
  }, []);

  return (
    <div
      className={`min-h-dvh bg-[#080808] text-[#F5F2ED] ${
        ambientPaused ? 'motion-paused' : ''
      }`}
    >
      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="visually-hidden focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:border focus:border-[#F2D68A] focus:bg-[#080808] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[#F2D68A]"
      >
        Skip to main content
      </a>

      <Preloader />
      <Navbar />

      <main id="main-content">
        <Hero
          onNotice={showNotice}
          ambientPaused={ambientPaused}
          onToggleAmbient={() => setAmbientPaused((prev) => !prev)}
        />
        <About />
        <Experience />
        <Skills />
        <Projects onNotice={showNotice} />
        <Certifications />
        <Contact onNotice={showNotice} />
      </main>

      <Footer onNotice={showNotice} />
      <ToastNotice message={notice} onDismiss={dismissNotice} />
    </div>
  );
};
