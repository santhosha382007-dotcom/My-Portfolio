import React, { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { ArrowDown, ArrowRight, Pause, Play, ShieldCheck, Sparkles } from 'lucide-react';
import heroPortrait from '../assets/hero-portrait.png';
import { PROFILE } from '../data/profile';
import { ParticleBackground } from './ParticleBackground';
import { SocialLinksBar } from './SocialLinksBar';

interface HeroProps {
  onNotice?: (message: string) => void;
  ambientPaused: boolean;
  onToggleAmbient: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onNotice,
  ambientPaused,
  onToggleAmbient,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  // Subtle interactive portrait parallax on desktop pointer movement
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const portraitX = useSpring(rawX, { stiffness: 120, damping: 24 });
  const portraitY = useSpring(rawY, { stiffness: 120, damping: 24 });

  useEffect(() => {
    if (prefersReducedMotion || ambientPaused) return;

    const interval = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PROFILE.animatedRoles.length);
    }, 3100);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, ambientPaused]);

  const handlePointerMove = (event: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || ambientPaused) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const normX = (event.clientX - rect.left) / rect.width - 0.5;
    const normY = (event.clientY - rect.top) / rect.height - 0.5;
    rawX.set(normX * -14);
    rawY.set(normY * -10);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-[#080808] pt-24 pb-16 sm:pt-28 lg:pt-24 lg:pb-12"
    >
      {/* Subtle architectural grid */}
      <div
        aria-hidden="true"
        className="bg-luxury-grid pointer-events-none absolute inset-0 z-0 opacity-65 [mask-image:radial-gradient(ellipse_at_center,black_38%,transparent_82%)]"
      />

      {/* Soft crimson & metallic gold ambient illumination */}
      <div
        aria-hidden="true"
        className="animate-ambient-pulse pointer-events-none absolute -top-24 -left-24 z-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(163,15,32,0.34)_0%,rgba(163,15,32,0.08)_46%,transparent_72%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-ambient-pulse pointer-events-none absolute right-[-6rem] bottom-[-4rem] z-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.2)_0%,rgba(163,15,32,0.16)_44%,transparent_72%)] blur-3xl"
      />

      {/* Interactive tsParticles layer */}
      <ParticleBackground paused={ambientPaused} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Brand Narrative & CTAs */}
          <div className="order-2 flex flex-col items-start lg:order-1 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#111111]/85 px-3.5 py-1.5 backdrop-blur-md"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-[#E02035]" aria-hidden="true" />
              <span className="font-mono-tech text-[11px] font-medium tracking-[0.16em] text-[#F2D68A] uppercase">
                {PROFILE.positioning}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono-tech text-sm font-medium tracking-[0.34em] text-[#D4AF37] uppercase"
            >
              {PROFILE.heroGreeting}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-display mt-3 text-4xl font-extrabold tracking-tight text-[#F5F2ED] sm:text-6xl xl:text-[4.35rem] xl:leading-[1.04]"
            >
              {PROFILE.heroHeading}
            </motion.h1>

            {/* Animated Role Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 flex min-h-[2.25rem] items-center gap-3"
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full bg-[#E02035] shadow-[0_0_12px_#E02035]"
              />
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={PROFILE.animatedRoles[roleIndex]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                    className="font-mono-tech text-base font-medium tracking-wide text-[#F2D68A] sm:text-lg"
                  >
                    {PROFILE.animatedRoles[roleIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Primary Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-xl font-semibold tracking-tight text-[#F5F2ED] sm:text-2xl"
            >
              &ldquo;{PROFILE.tagline}&rdquo;
            </motion.p>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 max-w-xl text-base leading-relaxed text-[#A6A6A6] sm:text-[1.05rem]"
            >
              {PROFILE.heroSupportingText}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex w-full flex-wrap items-center gap-4 sm:w-auto"
            >
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="group inline-flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-full border border-[#D4AF37]/65 bg-gradient-to-r from-[#A30F20] via-[#B81326] to-[#870C1A] px-7 py-3.5 text-sm font-semibold tracking-wide text-[#F5F2ED] shadow-[0_10px_30px_rgba(163,15,32,0.42)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F2D68A] hover:shadow-[0_14px_36px_rgba(224,32,53,0.48)] sm:flex-none"
              >
                <span>Explore My Work</span>
                <ArrowRight
                  className="h-4 w-4 text-[#F2D68A] transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#111111]/85 px-7 py-3.5 text-sm font-semibold tracking-wide text-[#F2D68A] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F2D68A] hover:bg-[#D4AF37]/10 sm:flex-none"
              >
                <span>Let&apos;s Connect</span>
              </button>
            </motion.div>

            {/* Social Row + WCAG 2.2.2 Ambient Motion Control */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex w-full flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6"
            >
              <SocialLinksBar onPlaceholderClick={onNotice} variant="compact" />

              {!prefersReducedMotion && (
                <button
                  type="button"
                  onClick={onToggleAmbient}
                  className="font-mono-tech inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-[#111111]/80 px-3.5 py-2 text-[11px] tracking-wider text-[#A6A6A6] uppercase transition-colors hover:border-[#D4AF37]/45 hover:text-[#F2D68A]"
                >
                  {ambientPaused ? (
                    <>
                      <Play className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
                      <span>Play motion</span>
                    </>
                  ) : (
                    <>
                      <Pause className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
                      <span>Pause motion</span>
                    </>
                  )}
                </button>
              )}
            </motion.div>
          </div>

          {/* Right Column: Cinematic Portrait Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end"
          >
            <motion.div
              style={{ x: portraitX, y: portraitY }}
              className="animate-subtle-float relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px]"
            >
              {/* Crimson & Gold Rim Aura Behind Portrait */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-5 rounded-[2.2rem] bg-[radial-gradient(circle_at_24%_38%,rgba(224,32,53,0.44)_0%,transparent_54%),radial-gradient(circle_at_82%_28%,rgba(212,175,55,0.34)_0%,transparent_56%)] blur-2xl"
              />

              {/* Architectural Gold Corner Framing */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-2.5 -left-2.5 z-20 h-9 w-9 rounded-tl-2xl border-t-2 border-l-2 border-[#D4AF37]/75"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-2.5 -bottom-2.5 z-20 h-9 w-9 rounded-br-2xl border-r-2 border-b-2 border-[#E02035]/80"
              />

              {/* Transparent Portrait Frame (No Black Background Box) */}
              <div className="relative overflow-hidden rounded-[1.75rem] border border-[#D4AF37]/25 bg-transparent pt-4">
                <img
                  src={heroPortrait}
                  alt="Santhosh A. portrait in a black blazer and white shirt"
                  width={470}
                  height={718}
                  fetchPriority="high"
                  decoding="async"
                  className="mx-auto aspect-[3/4] w-full object-contain object-bottom drop-shadow-[0_18px_32px_rgba(0,0,0,0.55)] drop-shadow-[0_0_28px_rgba(212,175,55,0.18)]"
                />

                {/* Minimal Editorial Identity Strip */}
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-xl border border-[#D4AF37]/30 bg-[#080808]/75 px-4 py-3 backdrop-blur-md">
                  <div>
                    <p className="font-display text-sm font-bold tracking-[0.22em] text-[#F2D68A]">
                      SANTHOSH
                    </p>
                    <p className="font-mono-tech mt-0.5 text-[11px] text-[#A6A6A6]">
                      B.E. CSE (Cyber Security)
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E02035]/40 bg-[#A30F20]/25 px-2.5 py-1 text-[11px] font-medium text-[#F5F2ED]">
                    <Sparkles className="h-3 w-3 text-[#F2D68A]" aria-hidden="true" />
                    2025–2029
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Cue */}
        <div className="mt-10 hidden justify-center lg:flex">
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            aria-label="Scroll to About section"
            className="group inline-flex cursor-pointer flex-col items-center gap-2 text-[#A6A6A6] transition-colors hover:text-[#F2D68A]"
          >
            <span className="font-mono-tech text-[10px] tracking-[0.3em] uppercase">
              Scroll to Explore
            </span>
            <ArrowDown
              className="h-4 w-4 text-[#D4AF37] transition-transform duration-300 group-hover:translate-y-1"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </section>
  );
};
