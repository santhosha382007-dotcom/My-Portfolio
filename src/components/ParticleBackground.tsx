import React, { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

interface ParticleBackgroundProps {
  paused?: boolean;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  paused = false,
}) => {
  const [engineReady, setEngineReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncQueries = () => {
      setIsMobile(mobileQuery.matches);
      setReducedMotion(motionQuery.matches);
    };

    syncQueries();
    mobileQuery.addEventListener('change', syncQueries);
    motionQuery.addEventListener('change', syncQueries);

    return () => {
      mobileQuery.removeEventListener('change', syncQueries);
      motionQuery.removeEventListener('change', syncQueries);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return;

    let active = true;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      if (active) setEngineReady(true);
    });

    return () => {
      active = false;
    };
  }, [reducedMotion, paused]);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      detectRetina: true,
      background: { color: { value: 'transparent' } },
      interactivity: {
        events: {
          onHover: {
            enable: !isMobile,
            mode: 'grab',
          },
          resize: { enable: true },
        },
        modes: {
          grab: {
            distance: 145,
            links: { opacity: 0.28, color: '#D4AF37' },
          },
        },
      },
      particles: {
        number: {
          value: isMobile ? 22 : 46,
          density: { enable: true, width: 1200, height: 800 },
        },
        color: {
          value: ['#D4AF37', '#F2D68A', '#E02035'],
        },
        opacity: {
          value: { min: 0.14, max: 0.5 },
        },
        size: {
          value: { min: 1, max: 2.4 },
        },
        links: {
          enable: true,
          color: '#D4AF37',
          distance: isMobile ? 115 : 145,
          opacity: 0.11,
          width: 1,
        },
        move: {
          enable: true,
          speed: isMobile ? 0.32 : 0.48,
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'out' },
        },
      },
    }),
    [isMobile],
  );

  if (reducedMotion || paused || !engineReady) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-80"
    >
      <Particles id="aathiaa-hero-particles" className="h-full w-full" options={options} />
    </div>
  );
};
