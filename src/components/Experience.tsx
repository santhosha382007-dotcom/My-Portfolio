import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  GraduationCap,
  Trophy,
} from 'lucide-react';
import {
  JOURNEY_ENTRIES,
  type JourneyCategory,
} from '../data/experience';
import { SectionHeading } from './SectionHeading';

const CATEGORY_FILTERS: Array<'All' | JourneyCategory> = [
  'All',
  'Hackathon',
  'Internship',
  'Education',
];

const CATEGORY_ICONS: Record<JourneyCategory, React.ComponentType<{ className?: string }>> = {
  Education: GraduationCap,
  Internship: Briefcase,
  Hackathon: Trophy,
};

export const Experience: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | JourneyCategory>('All');

  const filteredEntries =
    selectedCategory === 'All'
      ? JOURNEY_ENTRIES
      : JOURNEY_ENTRIES.filter((entry) => entry.category === selectedCategory);

  return (
    <section
      id="education"
      className="relative overflow-hidden border-t border-white/6 bg-[#080808] py-24 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-24 left-[-12rem] h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="03 // EXPERIENCE & EDUCATION"
            title="MY JOURNEY."
            subtitle="Hackathon milestones, industry internship experience, and academic foundations."
          />
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter timeline entries"
          className="mt-10 flex flex-wrap gap-2"
        >
          {CATEGORY_FILTERS.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200 sm:text-sm ${active
                  ? 'border-[#D4AF37]/70 bg-gradient-to-r from-[#A30F20]/45 to-[#1B1510] text-[#F2D68A] shadow-[0_0_20px_rgba(212,175,55,0.16)]'
                  : 'border-white/10 bg-[#111111]/80 text-[#A6A6A6] hover:border-[#D4AF37]/35 hover:text-[#F5F2ED]'
                  }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Vertical Timeline */}
        <div className="relative mt-14">
          {/* Illuminated vertical spine */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-4 w-[2px] bg-gradient-to-b from-[#D4AF37] via-[#A30F20]/75 to-white/10 md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="space-y-8 md:space-y-10">
            {filteredEntries.map((entry, idx) => {
              const Icon = CATEGORY_ICONS[entry.category];
              const isLeft = idx % 2 === 0;

              return (
                <motion.li
                  key={entry.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    delay: idx * 0.05,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative grid grid-cols-1 md:grid-cols-2 md:gap-10"
                >
                  {/* Timeline Node Marker */}
                  <div
                    aria-hidden="true"
                    className={`absolute top-6 left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border md:left-1/2 ${entry.isPlaceholder
                      ? 'border-white/25 bg-[#121214] text-[#A6A6A6]'
                      : 'border-[#F2D68A] bg-gradient-to-br from-[#A30F20] to-[#1A130D] text-[#F2D68A] shadow-[0_0_22px_rgba(212,175,55,0.45)]'
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  {/* Card Container */}
                  <div
                    className={`pl-12 md:pl-0 ${isLeft
                      ? 'md:col-start-1 md:pr-8'
                      : 'md:col-start-2 md:pl-8'
                      }`}
                  >
                    <article
                      className={`gold-card group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${entry.isPlaceholder
                        ? 'border-dashed border-white/14 opacity-90'
                        : 'border-[#D4AF37]/38 hover:border-[#D4AF37]/65'
                        }`}
                    >
                      {/* Background Image with 60% opacity level and tuned contrast scrims */}
                      {entry.backgroundImage && (
                        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                          <img
                            src={entry.backgroundImage}
                            alt=""
                            aria-hidden="true"
                            className="h-full w-full object-cover object-center opacity-60 filter contrast-[1.05] brightness-[0.8] transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-75"
                            loading="lazy"
                          />
                          {/* Dark gradient scrims tuned to keep the 60% image vibrant while ensuring high text contrast */}
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-b from-[#080808]/75 via-[#080808]/65 to-[#080808]/85"
                          />
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-[#080808]/60"
                          />
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.08)_0%,transparent_65%)]"
                          />
                        </div>
                      )}

                      <div className="relative z-10 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-mono-tech inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-[11px] font-medium tracking-wider text-[#F2D68A] uppercase">
                              {entry.category}
                            </span>

                            <div className="flex items-center gap-2">
                              {entry.isPlaceholder && (
                                <span className="font-mono-tech rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] tracking-wider text-[#A6A6A6] uppercase">
                                  Editable Slot
                                </span>
                              )}
                              <span className="font-mono-tech inline-flex items-center gap-1.5 text-xs text-[#A6A6A6]">
                                <Calendar className="h-3.5 w-3.5 text-[#E02035]" aria-hidden="true" />
                                {entry.period}
                              </span>
                            </div>
                          </div>

                          <h3 className="font-display mt-4 text-lg font-bold text-[#F5F2ED] sm:text-xl">
                            {entry.title}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-[#D4AF37]">
                            {entry.organization}
                          </p>

                          {entry.score && (
                            <div className="mt-3">
                              <span className="font-mono-tech inline-flex items-center rounded-full border border-[#D4AF37]/40 bg-gradient-to-r from-[#A30F20]/30 to-[#D4AF37]/15 px-3 py-1 text-xs font-semibold text-[#F2D68A]">
                                {entry.score}
                              </span>
                            </div>
                          )}

                          <p className="mt-3 text-sm leading-relaxed text-[#A6A6A6]">
                            {entry.description}
                          </p>
                        </div>

                        {entry.highlights.length > 0 && (
                          <ul className="mt-4 space-y-1.5 border-t border-white/8 pt-4">
                            {entry.highlights.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 text-xs text-[#CFCBC4] sm:text-[13px]"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E02035]"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </article>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
