import React from 'react';
import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Code2,
  Compass,
  Cpu,
  GraduationCap,
  Shield,
} from 'lucide-react';
import aboutPortrait from '../assets/about-portrait.png';
import { PROFILE } from '../data/profile';
import { SectionHeading } from './SectionHeading';

const INTEREST_ICONS = [Shield, Code2, BrainCircuit, Cpu];

export const About: React.FC = () => {
  const { about } = PROFILE;

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-white/6 bg-[#0B0B0D] py-24 sm:py-28"
    >
      {/* Subtle Crimson Accent Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-[-10rem] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(163,15,32,0.2)_0%,transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={about.sectionLabel} title={about.heading} />

        <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left: Editorial Profile Photo & Education Credential */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/25 bg-transparent p-3">
              {/* Subtle crimson & gold ambient aura behind the transparent portrait */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-4 rounded-2xl bg-[radial-gradient(circle_at_30%_35%,rgba(163,15,32,0.32)_0%,transparent_58%),radial-gradient(circle_at_75%_25%,rgba(212,175,55,0.22)_0%,transparent_55%)] blur-2xl"
              />
              <div className="relative overflow-hidden rounded-2xl bg-transparent pt-4">
                <img
                  src={aboutPortrait}
                  alt="Santhosh A. profile photograph in a black blazer and white shirt"
                  width={526}
                  height={807}
                  loading="lazy"
                  decoding="async"
                  className="mx-auto aspect-[4/5] w-full object-contain object-bottom drop-shadow-[0_18px_32px_rgba(0,0,0,0.55)] drop-shadow-[0_0_24px_rgba(212,175,55,0.16)]"
                />
                <div className="absolute right-4 bottom-4 left-4 rounded-xl border border-[#D4AF37]/30 bg-[#080808]/80 p-4 backdrop-blur-md">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#D4AF37]/35 bg-[#A30F20]/25 text-[#F2D68A]">
                      <GraduationCap className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono-tech text-[11px] tracking-[0.2em] text-[#D4AF37] uppercase">
                        Academic Foundation • {about.education.duration}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold text-[#F5F2ED]">
                        {about.education.degree}
                      </h3>
                      <p className="mt-0.5 text-xs text-[#A6A6A6]">
                        {about.education.institution}
                      </p>
                      <span className="font-mono-tech mt-2 inline-flex items-center rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/12 px-2.5 py-0.5 text-[11px] font-medium text-[#F2D68A]">
                        {about.education.cgpa}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Biography, Professional Interests & Approach */}
          <div className="space-y-10 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5 text-base leading-relaxed text-[#D8D4CE] sm:text-lg"
            >
              {about.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </motion.div>

            {/* Professional Interests Grid */}
            <div>
              <h3 className="font-mono-tech mb-4 text-xs font-semibold tracking-[0.24em] text-[#D4AF37] uppercase">
                Professional Interests
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {about.interests.map((interest, idx) => {
                  const Icon = INTEREST_ICONS[idx % INTEREST_ICONS.length];
                  return (
                    <motion.div
                      key={interest.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{
                        delay: idx * 0.06,
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="gold-card rounded-2xl p-5"
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-[#161618] text-[#F2D68A]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h4 className="font-display text-base font-bold text-[#F5F2ED]">
                        {interest.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-[#A6A6A6]">
                        {interest.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Personal Approach to Technology */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Compass className="h-4 w-4 text-[#E02035]" aria-hidden="true" />
                <h3 className="font-mono-tech text-xs font-semibold tracking-[0.24em] text-[#D4AF37] uppercase">
                  Approach to Technology
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {about.approach.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                      delay: idx * 0.06,
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="rounded-2xl border border-white/8 bg-[#111111]/90 p-4"
                  >
                    <p className="font-mono-tech text-[11px] text-[#E02035]">
                      0{idx + 1}
                    </p>
                    <h4 className="mt-1.5 text-sm font-semibold text-[#F5F2ED]">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#A6A6A6]">
                      {item.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
