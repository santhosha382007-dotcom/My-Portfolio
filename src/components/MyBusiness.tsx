import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Code2,
  Globe,
  Quote,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';
import { BUSINESS_DATA } from '../data/business';
import { SectionHeading } from './SectionHeading';

export const MyBusiness: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const { pricing } = BUSINESS_DATA;

  return (
    <section
      id="business"
      className="relative overflow-hidden border-t border-white/6 bg-[#080808] py-24 sm:py-28"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 left-[-12rem] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 right-[-12rem] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(163,15,32,0.14)_0%,transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="02 // VENTURE & ENTREPRENEURSHIP"
            title={BUSINESS_DATA.title}
            companyName={BUSINESS_DATA.companyName}
            subtitle={BUSINESS_DATA.tagline}
          />

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#D4AF37]/35 bg-[#121214] px-4 py-2 text-xs font-semibold text-[#F2D68A] shadow-[0_0_20px_rgba(212,175,55,0.12)] lg:self-auto">
            <Sparkles className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
            <span>AATHIAA VENTURE SOLUTIONS</span>
          </div>
        </div>

        {/* =======================================================================
            1. ABOUT MY TEAM (Group Image Showcase + Details directly below it)
            ======================================================================= */}
        <div className="mt-12">
          <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2.5">
              <span className="h-[1px] w-6 bg-[#E02035]" />
              <span className="font-mono-tech text-xs font-semibold tracking-widest text-[#E02035] uppercase">
                {BUSINESS_DATA.team.heading}
              </span>
            </div>
            <p className="max-w-xl text-xs text-[#A6A6A6] sm:text-right">
              {BUSINESS_DATA.team.introduction}
            </p>
          </div>

          {/* Featured Group Photo Banner */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-3xl border border-[#E02035]/50 shadow-[0_24px_70px_rgba(0,0,0,0.8),0_0_35px_rgba(224,32,53,0.18)]"
          >
            <div className="relative aspect-[16/9] max-h-[520px] w-full overflow-hidden bg-gradient-to-b from-[#120a0d] via-[#0a0809] to-[#040405]">
              {/* Sleek tech grid & ambient ruby/red glow backdrop */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(224,32,53,0.18)_0%,rgba(139,0,0,0.06)_50%,transparent_80%)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff25_1px,transparent_1px)] [background-size:24px_24px]"
              />

              {/* Cutout Team Image with Glowing Red Outlined Silhouette Border */}
              <img
                src={BUSINESS_DATA.team.groupImage.src}
                alt={BUSINESS_DATA.team.groupImage.alt}
                className="relative z-10 h-full w-full object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.02] drop-shadow-[0_12px_45px_rgba(224,32,53,0.35)]"
                loading="lazy"
              />

              {/* Top Left Title: "MY PILLARS" (Font size 48 and White) */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-7 z-20 flex items-center">
                <span className="font-display text-2xl sm:text-[48px] font-black tracking-wider text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] uppercase">
                  MY PILLARS
                </span>
              </div>

              {/* Top Right Team Badge */}
              <div className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-[#E02035]/50 bg-[#080808]/85 px-3.5 py-1.5 text-xs font-semibold text-[#FF6B6B] backdrop-blur-md shadow-lg">
                <Users className="h-3.5 w-3.5 text-[#E02035]" />
                <span>Our Core Team</span>
              </div>

              {/* Bottom Centre: "THE MINDS BEHIND SOLUTION" (Extended Length Banner) */}
              <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center px-4">
                <div className="flex w-full max-w-4xl items-center justify-center gap-3 sm:gap-6 rounded-full border border-[#E02035]/40 bg-[#080808]/90 px-6 sm:px-10 py-2 sm:py-2.5 shadow-[0_4px_25px_rgba(224,32,53,0.35)] backdrop-blur-md">
                  <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#E02035] to-[#E02035]" />
                  <span className="font-mono-tech text-xs sm:text-sm font-bold tracking-[0.35em] sm:tracking-[0.55em] text-[#F5F2ED] uppercase drop-shadow-[0_0_12px_rgba(224,32,53,0.7)] whitespace-nowrap">
                    THE MINDS BEHIND SOLUTION
                  </span>
                  <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#E02035] to-[#E02035]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details of My Team (Placed directly BELOW the group image) */}
          <div className="mt-8">
            <div className="mb-3.5 flex items-center justify-between gap-2">
              <span className="font-mono-tech text-xs font-semibold tracking-wider text-[#D4AF37] uppercase">
                Core Leadership &amp; Engineering Members
              </span>
              <span className="text-xs text-[#A6A6A6]">
                {BUSINESS_DATA.team.members.length} Core Specialists
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
              {BUSINESS_DATA.team.members.map((member, idx) => {
                // Arranging in 3 & 2 Order on desktop (6-column layout):
                // Row 1 (Items 0, 1, 2): 2 columns each = 6 columns (3 cards)
                // Row 2 (Items 3, 4): Item 3 starts at col 2 (cols 2-3), Item 4 at cols 4-5 = centered 2 cards!
                const colSpanClass =
                  idx === 3
                    ? 'lg:col-span-2 lg:col-start-2'
                    : idx === 4
                    ? 'lg:col-span-2 sm:col-span-2 lg:col-auto sm:max-w-md sm:mx-auto sm:w-full lg:max-w-none'
                    : 'lg:col-span-2';

                return (
                  <motion.article
                    key={member.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: idx * 0.05, duration: 0.45 }}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-[#8B0000]/70 bg-[#0A0A0C] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(139,0,0,0.2)] transition-all duration-300 hover:border-[#E02035]/90 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_28px_rgba(224,32,53,0.3)] ${colSpanClass}`}
                  >
                    {/* Background Cutout Portrait at 70% Opacity */}
                    {member.image && (
                      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="h-full w-full object-cover object-top opacity-70 transition-transform duration-700 ease-out group-hover:scale-105"
                          style={{
                            filter:
                              'drop-shadow(0 0 12px rgba(163,15,32,0.8)) drop-shadow(0 0 4px rgba(139,0,0,0.95))',
                          }}
                        />
                        {/* Dark luxury contrast scrims so all text, badges and metadata stay crystal clear */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-[#080808]/45"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_30%,#080808_90%)] opacity-70"
                        />
                      </div>
                    )}

                    {/* Content Layer */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-2">
                        {member.image ? (
                          <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#A30F20] bg-[#140C0D] shadow-[0_0_15px_rgba(163,15,32,0.5)]">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="h-full w-full object-cover object-top"
                            />
                          </div>
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-gradient-to-br from-[#A30F20]/40 to-[#1B1510] font-bold text-[#F2D68A] shadow-inner">
                            {member.name
                              .split(' ')
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join('')}
                          </div>
                        )}

                        {member.badge && (
                          <span className="font-mono-tech rounded-full border border-[#D4AF37]/45 bg-[#0A0A0C]/85 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-[#F2D68A] uppercase backdrop-blur-sm shadow-sm">
                            {member.badge}
                          </span>
                        )}
                      </div>

                      <h4 className="font-display mt-4 text-lg font-bold text-[#F5F2ED] transition-colors group-hover:text-[#F2D68A]">
                        {member.name}
                      </h4>
                      <p className="mt-0.5 text-xs font-medium text-[#D4AF37]">
                        {member.role}
                      </p>

                      <p className="mt-3 text-xs leading-relaxed text-[#D0CCC6]">
                        {member.bio}
                      </p>
                    </div>

                    <div className="relative z-10 mt-5 border-t border-white/10 pt-3">
                      <p className="font-mono-tech text-[10px] tracking-wider text-[#D4AF37] uppercase">
                        Key Focus
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {member.expertise.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-[#D4AF37]/20 bg-[#080808]/75 px-2 py-0.5 text-[10px] text-[#E0DCD6] backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>

        {/* =======================================================================
            2. ABOUT MY BUSINESS CONTAINER (Created right BELOW the team section)
            ======================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="gold-card mt-14 rounded-3xl p-6 sm:p-10"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="font-mono-tech text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
              About My Business
            </span>
          </div>

          <div className="max-w-4xl space-y-4">
            {BUSINESS_DATA.introParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? 'font-display text-lg font-bold text-[#F5F2ED] sm:text-xl'
                    : 'text-sm leading-relaxed text-[#CFCBC4] sm:text-base'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Core Focus Badges */}
          <div className="mt-8 flex flex-wrap gap-2.5 border-t border-white/8 pt-6">
            {BUSINESS_DATA.focusAreas.map((area) => (
              <span
                key={area}
                className="font-mono-tech inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-gradient-to-r from-[#A30F20]/25 via-[#1A1410]/80 to-[#D4AF37]/15 px-4 py-1.5 text-xs font-medium text-[#F2D68A]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#E02035]" />
                {area}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 3. Two Core Pillars: 01. Software & Digital Solutions | 02. Technology & Innovation */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {BUSINESS_DATA.pillars.map((pillar, idx) => {
            const isFirst = idx === 0;
            const Icon = isFirst ? Code2 : Globe;

            return (
              <motion.article
                key={pillar.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="gold-card group flex flex-col justify-between rounded-3xl p-7 sm:p-9"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono-tech inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#F2D68A] uppercase">
                      <span className="font-bold text-[#E02035]">{pillar.number}.</span>
                      {pillar.category}
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#141416] text-[#F2D68A] transition-colors group-hover:border-[#F2D68A] group-hover:bg-[#A30F20]/30">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="font-display mt-5 text-xl font-bold text-[#F5F2ED] sm:text-2xl">
                    {pillar.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#A6A6A6]">
                    {pillar.description}
                  </p>

                  <div className="mt-6 border-t border-white/8 pt-5">
                    <p className="font-mono-tech text-[11px] tracking-wider text-[#D4AF37] uppercase">
                      {isFirst ? 'My Development Interests Include:' : 'Areas of Focus & Exploration:'}
                    </p>

                    <ul className="mt-3.5 space-y-2.5">
                      {pillar.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2.5 text-xs text-[#E5E2DC] sm:text-[13px]"
                        >
                          <CheckCircle2
                            className="h-4 w-4 shrink-0 text-[#E02035]"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* 4. MY BUSINESS PHILOSOPHY */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="gold-card relative mt-14 overflow-hidden rounded-3xl p-8 sm:p-12"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -bottom-6 text-white/[0.03]"
          >
            <Quote className="h-48 w-48 rotate-180" />
          </div>

          <div className="relative z-10 max-w-4xl">
            <span className="font-mono-tech inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#121214] px-3.5 py-1 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase">
              Core Principles
            </span>

            <h3 className="font-display mt-3 text-xs tracking-widest text-[#A6A6A6] uppercase">
              My Business Philosophy
            </h3>

            <blockquote className="mt-4 border-l-2 border-[#D4AF37] pl-4 sm:pl-6">
              <p className="font-display text-xl font-bold tracking-tight text-[#F5F2ED] sm:text-2xl lg:text-3xl">
                &ldquo;{BUSINESS_DATA.philosophy.quote}&rdquo;
              </p>
            </blockquote>

            <div className="mt-6 space-y-2 text-sm leading-relaxed text-[#CFCBC4] sm:text-base">
              <p>{BUSINESS_DATA.philosophy.description}</p>
              <p className="font-medium text-[#F2D68A]">
                {BUSINESS_DATA.philosophy.goal}
              </p>
            </div>
          </div>
        </motion.div>

        {/* =======================================================================
            5. PRICING CONTAINER
            ======================================================================= */}
        <section
          id="pricing"
          aria-labelledby="pricing-heading"
          className="mt-24 border-t border-white/8 pt-16"
        >
          {/* Pricing Header */}
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2.5">
                <span className="h-[1px] w-6 bg-gradient-to-r from-[#E02035] to-[#D4AF37]" />
                <span className="font-mono-tech text-xs font-semibold tracking-[0.24em] text-[#D4AF37] uppercase">
                  {pricing.eyebrow}
                </span>
              </div>
              <h3
                id="pricing-heading"
                className="font-display text-3xl font-bold tracking-tight text-[#F5F2ED] sm:text-4xl"
              >
                {pricing.title}
              </h3>
              <p className="font-display mt-2 text-base font-semibold text-[#D4AF37] sm:text-lg">
                {pricing.tagline}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#D4AF37]/35 bg-[#121214] px-4 py-2 text-xs font-medium text-[#F2D68A] shadow-[0_0_18px_rgba(212,175,55,0.12)] lg:self-auto">
              <Zap className="h-4 w-4 text-[#E02035]" />
              <span>Transparent &amp; Competitive Value</span>
            </div>
          </div>

          {/* Pricing Introduction Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="gold-card mt-8 rounded-2xl p-6 sm:p-8"
          >
            <div className="space-y-2 text-sm leading-relaxed text-[#CFCBC4] sm:text-[15px]">
              {pricing.introParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </motion.div>

          {/* Pricing Packages Grid (Launch, Elevate, Enterprise) */}
          <div className="mt-14">
            <div className="flex items-center gap-2.5">
              <span className="h-[1px] w-5 bg-[#D4AF37]" />
              <span className="font-mono-tech text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
                {pricing.packagesHeadline}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {pricing.tiers.map((tier, idx) => {
                const isPopular = tier.isPopular;

                return (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                    className={`relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 transition-all duration-300 sm:p-9 ${
                      isPopular
                        ? 'border-2 border-[#D4AF37] bg-gradient-to-b from-[#181310] via-[#0E0C0B] to-[#0A0A0C] shadow-[0_0_40px_rgba(212,175,55,0.18)] lg:-translate-y-2'
                        : 'gold-card border border-white/10 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute top-0 right-0 rounded-bl-2xl bg-gradient-to-r from-[#A30F20] to-[#E02035] px-4 py-1 text-[11px] font-bold tracking-wider text-[#F5F2ED] uppercase shadow-md">
                        {tier.badge}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono-tech text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
                          Tier {tier.tierNumber}
                        </span>
                        {!isPopular && tier.badge && (
                          <span className="font-mono-tech rounded-full border border-white/12 bg-white/5 px-2.5 py-0.5 text-[10px] text-[#A6A6A6] uppercase">
                            {tier.badge}
                          </span>
                        )}
                      </div>

                      <h4 className="font-display mt-3 text-2xl font-bold tracking-tight text-[#F5F2ED]">
                        {tier.name}
                      </h4>

                      <div className="mt-4 border-b border-white/8 pb-5">
                        <p className="font-mono-tech text-[11px] tracking-wider text-[#A6A6A6] uppercase">
                          {tier.pricePrefix}
                        </p>
                        <p className="font-display mt-1 text-3xl font-extrabold text-[#F2D68A] sm:text-4xl">
                          {tier.price}
                        </p>
                      </div>

                      <p className="mt-4 text-xs leading-relaxed text-[#A6A6A6] sm:text-[13px]">
                        {tier.description}
                      </p>

                      <div className="mt-6 border-t border-white/8 pt-5">
                        <p className="font-mono-tech text-[11px] font-semibold tracking-wider text-[#D4AF37] uppercase">
                          What&apos;s Included:
                        </p>

                        <ul className="mt-3.5 space-y-2.5">
                          {tier.features.map((feat) => (
                            <li
                              key={feat}
                              className="flex items-start gap-2.5 text-xs text-[#E5E2DC]"
                            >
                              <CheckCircle2
                                className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                                  isPopular ? 'text-[#F2D68A]' : 'text-[#E02035]'
                                }`}
                                aria-hidden="true"
                              />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-4">
                      <a
                        href="#contact"
                        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                          isPopular
                            ? 'border border-[#F2D68A] bg-gradient-to-r from-[#A30F20] to-[#E02035] text-[#F5F2ED] shadow-[0_0_25px_rgba(224,32,53,0.35)] hover:from-[#E02035] hover:to-[#A30F20]'
                            : 'border border-[#D4AF37]/50 bg-[#121214] text-[#F2D68A] hover:border-[#D4AF37] hover:bg-[#D4AF37]/15'
                        }`}
                      >
                        <span>{tier.ctaLabel}</span>
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Additional Services & Rate Catalog */}
          <div className="mt-20">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="h-[1px] w-5 bg-[#D4AF37]" />
                  <span className="font-mono-tech text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
                    {pricing.additionalServices.heading}
                  </span>
                </div>
                <h4 className="font-display mt-1 text-xl font-bold text-[#F5F2ED] sm:text-2xl">
                  {pricing.additionalServices.subheading}
                </h4>
              </div>
              <p className="text-xs text-[#A6A6A6]">
                {pricing.additionalServices.note}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pricing.additionalServices.rates.map((rate, idx) => (
                <motion.div
                  key={rate.service}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: idx * 0.04, duration: 0.4 }}
                  className="gold-card group flex flex-col justify-between rounded-2xl p-5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono-tech rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-[#A6A6A6]">
                        {rate.tag}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#E02035]" />
                    </div>

                    <h5 className="font-display mt-3 text-sm font-bold text-[#F5F2ED] transition-colors group-hover:text-[#F2D68A]">
                      {rate.service}
                    </h5>
                  </div>

                  <div className="mt-4 border-t border-white/8 pt-3">
                    <p className="font-mono-tech text-[10px] uppercase text-[#A6A6A6]">
                      Starting Price
                    </p>
                    <p className="font-mono-tech mt-0.5 text-base font-bold text-[#F2D68A]">
                      {rate.startingPrice}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Working Process (4 Steps) */}
          <div className="mt-20">
            <div className="flex items-center gap-2.5">
              <span className="h-[1px] w-5 bg-[#D4AF37]" />
              <span className="font-mono-tech text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
                {pricing.workingProcess.heading}
              </span>
            </div>
            <h4 className="font-display mt-1 text-xl font-bold text-[#F5F2ED] sm:text-2xl">
              From Idea to Execution in 4 Structured Steps
            </h4>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pricing.workingProcess.steps.map((step, idx) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: idx * 0.06, duration: 0.45 }}
                  className="gold-card group relative rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tech flex h-9 w-9 items-center justify-center rounded-xl border border-[#D4AF37]/50 bg-gradient-to-br from-[#A30F20]/30 to-[#1A1410] text-xs font-bold text-[#F2D68A]">
                      {step.step}
                    </span>
                    <span className="font-mono-tech text-[10px] tracking-widest text-[#A6A6A6] uppercase">
                      Stage {idx + 1}
                    </span>
                  </div>

                  <h5 className="font-display mt-4 text-lg font-bold text-[#F5F2ED] transition-colors group-hover:text-[#F2D68A]">
                    {step.title}
                  </h5>

                  <p className="mt-2 text-xs leading-relaxed text-[#A6A6A6]">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="mt-20">
            <div className="flex items-center gap-2.5">
              <span className="h-[1px] w-5 bg-[#D4AF37]" />
              <span className="font-mono-tech text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
                {pricing.faqs.heading}
              </span>
            </div>
            <h4 className="font-display mt-1 text-xl font-bold text-[#F5F2ED] sm:text-2xl">
              Clear Answers to Common Questions
            </h4>

            <div className="mt-8 space-y-3.5 max-w-4xl">
              {pricing.faqs.items.map((faq) => {
                const isOpen = openFaqId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className="gold-card overflow-hidden rounded-2xl transition-colors duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-center justify-between p-5 text-left transition-colors hover:text-[#F2D68A]"
                    >
                      <span className="font-display text-sm font-bold text-[#F5F2ED] sm:text-base pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-[#D4AF37] transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-white/6 px-5 pb-5 pt-3"
                      >
                        <p className="text-xs leading-relaxed text-[#CFCBC4] sm:text-sm">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl border border-[#D4AF37]/45 bg-gradient-to-r from-[#1E1113] via-[#0E0E10] to-[#18130E] p-8 text-center sm:p-12 md:flex-row md:text-left shadow-[0_16px_50px_rgba(0,0,0,0.65)]"
          >
            <div>
              <h4 className="font-display text-2xl font-bold text-[#F5F2ED] sm:text-3xl">
                {pricing.cta.heading}
              </h4>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#CFCBC4]">
                {pricing.cta.subtext}
              </p>
              <p className="font-display mt-3 text-sm font-semibold text-[#F2D68A]">
                {pricing.cta.brandSlogan}
              </p>
            </div>

            <a
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-[#D4AF37]/70 bg-gradient-to-r from-[#A30F20] to-[#7D0B19] px-7 py-3.5 text-sm font-semibold text-[#F5F2ED] shadow-[0_0_25px_rgba(163,15,32,0.35)] transition-all duration-300 hover:border-[#F2D68A] hover:from-[#E02035] hover:to-[#A30F20] hover:shadow-[0_0_35px_rgba(224,32,53,0.5)]"
            >
              <span>Discuss Your Project</span>
              <ArrowUpRight
                className="h-4 w-4 text-[#F2D68A] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </motion.div>
        </section>

        {/* 6. LET'S BUILD SOMETHING GREAT (Section Bottom CTA) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl border border-[#D4AF37]/40 bg-gradient-to-r from-[#1A1012] via-[#0E0E10] to-[#16120D] p-8 text-center sm:p-12 md:flex-row md:text-left"
        >
          <div>
            <h3 className="font-display text-2xl font-bold text-[#F5F2ED] sm:text-3xl">
              {BUSINESS_DATA.cta.heading}
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#CFCBC4]">
              {BUSINESS_DATA.cta.subtext}
            </p>
            <p className="font-display mt-3 text-sm font-semibold text-[#F2D68A]">
              {BUSINESS_DATA.cta.brandSlogan}
            </p>
          </div>

          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-[#D4AF37]/60 bg-gradient-to-r from-[#A30F20] to-[#7D0B19] px-7 py-3.5 text-sm font-semibold text-[#F5F2ED] shadow-[0_0_25px_rgba(163,15,32,0.35)] transition-all duration-300 hover:border-[#F2D68A] hover:from-[#E02035] hover:to-[#A30F20] hover:shadow-[0_0_35px_rgba(224,32,53,0.5)]"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight
              className="h-4 w-4 text-[#F2D68A] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
