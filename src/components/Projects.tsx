import React, { useId, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Eye,
  Github,
  Layers,
  X,
} from 'lucide-react';
import { PROJECT_IMAGES } from '../assets/projectImages';
import {
  PROJECTS,
  type ProjectItem,
  type ProjectStatus,
} from '../data/projects';
import { useDialogModal } from '../hooks/useDialogModal';
import { SectionHeading } from './SectionHeading';

interface ProjectsProps {
  onNotice?: (message: string) => void;
}

const STATUS_STYLES: Record<ProjectStatus, string> = {
  Concept:
    'border-[#D4AF37]/40 bg-[#D4AF37]/12 text-[#F2D68A]',
  'In Development':
    'border-[#E02035]/50 bg-[#A30F20]/30 text-[#FF9CA6]',
  Completed:
    'border-emerald-400/40 bg-emerald-500/15 text-emerald-300',
};

const STATUS_FILTERS: Array<'All' | ProjectStatus> = [
  'All',
  'Concept',
  'In Development',
  'Completed',
];

export const Projects: React.FC<ProjectsProps> = ({ onNotice }) => {
  const [statusFilter, setStatusFilter] = useState<'All' | ProjectStatus>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const dialogTitleId = useId();

  const dialogRef = useDialogModal(selectedProject !== null, () => {
    setSelectedProject(null);
  });

  const filteredProjects =
    statusFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((project) => project.status === statusFilter);

  const handleUnavailableLink = (projectName: string, kind: 'GitHub' | 'Live Demo') => {
    onNotice?.(
      `${projectName} ${kind} link is not published yet. Add it in src/data/projects.ts when ready.`,
    );
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-white/6 bg-[#080808] py-24 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-16 left-1/2 h-[420px] w-[740px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(163,15,32,0.16)_0%,rgba(212,175,55,0.06)_48%,transparent_75%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="04 // FEATURED WORK"
            title="IDEAS TRANSFORMED INTO REALITY."
            subtitle="Original engineering concepts and active development initiatives spanning cybersecurity, AI routing, IoT automation, and web platforms."
          />

          <div
            role="tablist"
            aria-label="Filter projects by development status"
            className="flex flex-wrap gap-2"
          >
            {STATUS_FILTERS.map((status) => {
              const active = statusFilter === status;
              return (
                <button
                  key={status}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setStatusFilter(status)}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200 ${
                    active
                      ? 'border-[#D4AF37]/75 bg-gradient-to-r from-[#A30F20]/45 to-[#1B1510] text-[#F2D68A]'
                      : 'border-white/10 bg-[#111111] text-[#A6A6A6] hover:border-[#D4AF37]/35 hover:text-[#F5F2ED]'
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-white/15 bg-[#111111]/70 p-12 text-center">
            <Layers className="mx-auto h-8 w-8 text-[#D4AF37]/70" aria-hidden="true" />
            <p className="mt-3 text-base font-medium text-[#F5F2ED]">
              No projects currently marked as &ldquo;{statusFilter}&rdquo;.
            </p>
            <p className="mt-1 text-sm text-[#A6A6A6]">
              Update project status fields anytime in{' '}
              <code className="font-mono-tech text-[#F2D68A]">src/data/projects.ts</code>.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{
                  delay: idx * 0.06,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className="gold-card group flex flex-col overflow-hidden rounded-3xl"
              >
                {/* Project Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#0D0D0F]">
                  <img
                    src={PROJECT_IMAGES[project.imageKey]}
                    alt={project.imageAlt}
                    width={960}
                    height={540}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101012] via-[#101012]/25 to-transparent"
                  />

                  {/* Number & Status Badges */}
                  <div className="absolute top-3.5 right-3.5 left-3.5 flex items-center justify-between gap-2">
                    <span className="font-mono-tech rounded-full border border-[#D4AF37]/35 bg-[#080808]/80 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-[#F2D68A] backdrop-blur-md">
                      PROJECT {project.number}
                    </span>
                    <span
                      className={`font-mono-tech rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md ${STATUS_STYLES[project.status]}`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono-tech text-[11px] font-medium tracking-[0.16em] text-[#D4AF37] uppercase">
                    {project.category}
                  </p>

                  <h3 className="font-display mt-2 text-xl font-bold tracking-tight text-[#F5F2ED] transition-colors group-hover:text-[#F2D68A]">
                    {project.name}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#A6A6A6]">
                    {project.shortDescription}
                  </p>

                  {/* Tech Stack Pills */}
                  <ul
                    aria-label={`${project.name} technology stack`}
                    className="mt-5 flex flex-wrap gap-1.5"
                  >
                    {project.techStack.map((tech) => (
                      <li
                        key={tech}
                        className="font-mono-tech rounded-md border border-white/10 bg-[#0A0A0C] px-2.5 py-1 text-[11px] text-[#CFCBC4]"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  {/* Card Actions */}
                  <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-white/8 pt-5">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/45 bg-gradient-to-r from-[#A30F20]/85 to-[#7A0B18] px-4 py-2.5 text-xs font-semibold tracking-wide text-[#F5F2ED] transition-all duration-200 hover:border-[#F2D68A] hover:from-[#E02035] hover:to-[#A30F20]"
                    >
                      <Eye className="h-3.5 w-3.5 text-[#F2D68A]" aria-hidden="true" />
                      <span>View Details</span>
                    </button>

                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} GitHub repository`}
                        title="View GitHub Repository"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-[#111111] text-[#D8D4CE] transition-colors hover:border-[#D4AF37]/60 hover:text-[#F2D68A]"
                      >
                        <Github className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleUnavailableLink(project.name, 'GitHub')}
                        aria-label={`${project.name} GitHub repository (not yet linked)`}
                        title="GitHub repository link pending"
                        className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#111111] text-[#A6A6A6] transition-colors hover:border-[#D4AF37]/45 hover:text-[#F2D68A]"
                      >
                        <Github className="h-4 w-4" aria-hidden="true" />
                      </button>
                    )}

                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} Live Demo`}
                        title="Open Live Demo"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#F2D68A] transition-colors hover:border-[#F2D68A] hover:bg-[#D4AF37]/20"
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* Native <dialog> Project Details Modal */}
      <dialog
        ref={dialogRef}
        aria-labelledby={dialogTitleId}
        {...({ closedby: 'any' } as Record<string, string>)}
        className="aathiaa-dialog"
      >
        {selectedProject && (
          <div className="glass-panel overflow-hidden rounded-3xl border border-[#D4AF37]/35 shadow-[0_32px_90px_rgba(0,0,0,0.85)]">
            {/* Modal Banner */}
            <div className="relative aspect-[21/9] w-full overflow-hidden bg-[#0A0A0C]">
              <img
                src={PROJECT_IMAGES[selectedProject.imageKey]}
                alt={selectedProject.imageAlt}
                width={960}
                height={540}
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-[#0E0E10]/40 to-transparent"
              />
              <button
                type="button"
                autoFocus
                onClick={() => dialogRef.current?.close()}
                aria-label="Close project details modal"
                className="absolute top-4 right-4 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#080808]/85 text-[#F5F2ED] backdrop-blur-md transition-colors hover:border-[#F2D68A] hover:text-[#F2D68A]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="absolute bottom-4 left-6 flex flex-wrap items-center gap-2.5">
                <span className="font-mono-tech rounded-full border border-[#D4AF37]/40 bg-[#080808]/85 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-[#F2D68A]">
                  PROJECT {selectedProject.number}
                </span>
                <span
                  className={`font-mono-tech rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wider uppercase ${STATUS_STYLES[selectedProject.status]}`}
                >
                  {selectedProject.status}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              <p className="font-mono-tech text-xs tracking-[0.2em] text-[#D4AF37] uppercase">
                {selectedProject.category}
              </p>
              <h3
                id={dialogTitleId}
                className="font-display mt-2 text-2xl font-bold text-[#F5F2ED] sm:text-3xl"
              >
                {selectedProject.name}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-[#D8D4CE] sm:text-base">
                {selectedProject.overview}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-[#0B0B0D]/90 p-5">
                  <h4 className="font-mono-tech text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
                    Key Design Objectives
                  </h4>
                  <ul className="mt-3.5 space-y-2.5">
                    {selectedProject.keyObjectives.map((objective) => (
                      <li
                        key={objective}
                        className="flex items-start gap-2.5 text-sm text-[#CFCBC4]"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#E02035]"
                          aria-hidden="true"
                        />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/8 bg-[#0B0B0D]/90 p-5">
                  <h4 className="font-mono-tech text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
                    Target Technology Stack
                  </h4>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono-tech rounded-lg border border-[#D4AF37]/30 bg-[#141312] px-3 py-1.5 text-xs text-[#F2D68A]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-[#A6A6A6]">
                    Current stage:{' '}
                    <strong className="text-[#F5F2ED]">{selectedProject.status}</strong>.
                    Status, repository URLs, and live deployments are editable in{' '}
                    <code className="font-mono-tech text-[#F2D68A]">
                      src/data/projects.ts
                    </code>
                    .
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                <div className="flex flex-wrap items-center gap-3">
                  {selectedProject.githubUrl ? (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-[#D4AF37]/50 bg-[#141416] px-4 py-2.5 text-sm font-semibold text-[#F2D68A] transition-colors hover:border-[#F2D68A]"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      <span>View on GitHub</span>
                    </a>
                  ) : (
                    <span className="font-mono-tech inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs text-[#A6A6A6]">
                      <Github className="h-4 w-4 text-[#D4AF37]/70" aria-hidden="true" />
                      Repository link pending
                    </span>
                  )}

                  {selectedProject.liveDemoUrl && (
                    <a
                      href={selectedProject.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-[#D4AF37]/60 bg-gradient-to-r from-[#A30F20] to-[#7A0B18] px-4 py-2.5 text-sm font-semibold text-[#F5F2ED]"
                    >
                      <span>Open Live Demo</span>
                      <ArrowUpRight className="h-4 w-4 text-[#F2D68A]" aria-hidden="true" />
                    </a>
                  )}
                </div>

                <form method="dialog">
                  <button
                    type="submit"
                    className="cursor-pointer rounded-xl border border-white/15 bg-[#121214] px-5 py-2.5 text-sm font-medium text-[#F5F2ED] transition-colors hover:border-[#D4AF37]/50 hover:text-[#F2D68A]"
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
};
