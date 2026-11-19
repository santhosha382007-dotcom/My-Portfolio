import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Database,
  Layout,
  Server,
  ShieldAlert,
  Terminal,
  Wrench,
} from 'lucide-react';
import {
  SKILL_CATEGORIES,
  type SkillCategoryId,
} from '../data/skills';
import { SectionHeading } from './SectionHeading';

const CATEGORY_ICON_MAP: Record<
  SkillCategoryId,
  React.ComponentType<{ className?: string }>
> = {
  programming: Code2,
  frontend: Layout,
  backend: Server,
  database: Database,
  cybersecurity: ShieldAlert,
  tools: Wrench,
};

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | SkillCategoryId>('all');

  const visibleCategories =
    activeCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === activeCategory);

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-t border-white/6 bg-[#0B0B0D] py-24 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8rem] bottom-12 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(163,15,32,0.22)_0%,transparent_72%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="04 // CAPABILITIES"
          title="MY TECHNICAL ARSENAL."
          subtitle="Core languages, web engineering technologies, cybersecurity fundamentals, and everyday development tools used to bring ideas to life."
        />

        {/* Interactive Skill Category Filter */}
        <div
          role="tablist"
          aria-label="Filter technical skill categories"
          className="mt-10 flex flex-wrap gap-2.5"
        >
          <button
            role="tab"
            type="button"
            aria-selected={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
            className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200 sm:text-sm ${
              activeCategory === 'all'
                ? 'border-[#D4AF37]/75 bg-gradient-to-r from-[#A30F20]/45 to-[#1B1510] text-[#F2D68A] shadow-[0_0_20px_rgba(212,175,55,0.16)]'
                : 'border-white/10 bg-[#111111] text-[#A6A6A6] hover:border-[#D4AF37]/35 hover:text-[#F5F2ED]'
            }`}
          >
            <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
            <span>All Domains</span>
          </button>

          {SKILL_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICON_MAP[category.id];
            const isSelected = activeCategory === category.id;
            return (
              <button
                key={category.id}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200 sm:text-sm ${
                  isSelected
                    ? 'border-[#D4AF37]/75 bg-gradient-to-r from-[#A30F20]/45 to-[#1B1510] text-[#F2D68A] shadow-[0_0_20px_rgba(212,175,55,0.16)]'
                    : 'border-white/10 bg-[#111111] text-[#A6A6A6] hover:border-[#D4AF37]/35 hover:text-[#F5F2ED]'
                }`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* Category Panels */}
        <div
          className={`mt-10 grid grid-cols-1 gap-6 ${
            activeCategory === 'all' ? 'md:grid-cols-2 xl:grid-cols-3' : 'max-w-3xl'
          }`}
        >
          {visibleCategories.map((category, idx) => {
            const Icon = CATEGORY_ICON_MAP[category.id];
            return (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: idx * 0.05,
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="gold-card flex flex-col rounded-3xl p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/35 bg-gradient-to-br from-[#A30F20]/30 to-[#141416] text-[#F2D68A]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-mono-tech text-[10px] tracking-[0.24em] text-[#D4AF37] uppercase">
                        {category.code}
                      </p>
                      <h3 className="font-display text-lg font-bold text-[#F5F2ED]">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                  <span className="font-mono-tech rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-[#A6A6A6]">
                    {category.skills.length}{' '}
                    {category.skills.length === 1 ? 'skill' : 'skills'}
                  </span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-[#A6A6A6] sm:text-sm">
                  {category.summary}
                </p>

                <ul className="mt-5 grid grid-cols-1 gap-2.5">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="group/item flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-[#0D0D0F]/90 px-4 py-3 transition-colors duration-200 hover:border-[#D4AF37]/45 hover:bg-[#141312]"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#F5F2ED] transition-colors group-hover/item:text-[#F2D68A]">
                          {skill.name}
                        </p>
                        <p className="mt-0.5 text-xs text-[#A6A6A6]">{skill.note}</p>
                      </div>
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 shrink-0 rounded-full bg-[#D4AF37]/50 transition-colors group-hover/item:bg-[#E02035] group-hover/item:shadow-[0_0_10px_#E02035]"
                      />
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
