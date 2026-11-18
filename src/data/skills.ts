export type SkillCategoryId =
  | 'programming'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'cybersecurity'
  | 'tools';

export interface SkillItem {
  name: string;
  note: string;
}

export interface SkillCategory {
  id: SkillCategoryId;
  title: string;
  code: string;
  summary: string;
  skills: SkillItem[];
}

// Editable technical skills catalog.
// Intentionally omits fabricated proficiency percentages, experience years, or expertise levels.
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    code: 'CORE // 01',
    summary: 'Foundational languages for problem solving, scripting, and systems thinking.',
    skills: [
      { name: 'Python', note: 'Scripting, automation & AI exploration' },
      { name: 'JavaScript', note: 'Interactive web & full-stack applications' },
      { name: 'C', note: 'Core computer science & systems fundamentals' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    code: 'UI // 02',
    summary: 'Building responsive, accessible, and cinematic user interfaces.',
    skills: [
      { name: 'HTML', note: 'Semantic structure & modern accessibility' },
      { name: 'CSS', note: 'Responsive layouts, visual systems & motion' },
      { name: 'React', note: 'Component-driven interactive web applications' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    code: 'API // 03',
    summary: 'Designing clean server-side logic and RESTful application architectures.',
    skills: [
      { name: 'Node.js', note: 'Event-driven JavaScript runtime' },
      { name: 'Express.js', note: 'Structured routing & middleware services' },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    code: 'DATA // 04',
    summary: 'Modeling structured relational records and flexible document collections.',
    skills: [
      { name: 'MongoDB', note: 'Document-oriented NoSQL data storage' },
      { name: 'MySQL', note: 'Relational schemas & structured SQL queries' },
    ],
  },
  {
    id: 'cybersecurity',
    title: 'Cyber Security',
    code: 'SEC // 05',
    summary: 'Academic specialization in networking, defensive concepts, and threat awareness.',
    skills: [
      { name: 'Computer Networking', note: 'Protocols, packet flow & network models' },
      { name: 'Network Security Fundamentals', note: 'Defense-in-depth & core security controls' },
      { name: 'Kali Linux', note: 'Security research & lab environment tooling' },
      { name: 'Security Awareness', note: 'Phishing defense & safe digital hygiene' },
    ],
  },
  {
    id: 'tools',
    title: 'Development Tools',
    code: 'OPS // 06',
    summary: 'Everyday developer environment for version control, API testing, and Linux workflows.',
    skills: [
      { name: 'Visual Studio Code', note: 'Primary code editing & debugging workspace' },
      { name: 'Git', note: 'Distributed version control & branching' },
      { name: 'GitHub', note: 'Repository hosting & collaborative workflows' },
      { name: 'Postman', note: 'API inspection, testing & documentation' },
      { name: 'Linux', note: 'Command-line productivity & system navigation' },
      { name: 'WordPress', note: 'Theme & plugin customization, CMS deployment & maintenance' },
    ],
  },
];
