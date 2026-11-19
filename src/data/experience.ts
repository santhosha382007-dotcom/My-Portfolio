import hayagrivasImg from '../assets/journey/hayagrivas-school.jpg';
import lionsSchoolImg from '../assets/journey/sivakasi-lions-school.jpg';
import aarvamImg from '../assets/journey/aarvam-award.jpg';
import ksrCollegeImg from '../assets/journey/ksr-college.jpg';

export type JourneyCategory =
  | 'Education'
  | 'Internship'
  | 'Hackathon';

export interface JourneyEntry {
  id: string;
  category: JourneyCategory;
  title: string;
  organization: string;
  period: string;
  score?: string;
  description: string;
  highlights: string[];
  isPlaceholder: boolean;
  backgroundImage?: string;
}

// Ordered timeline entries:
// 1. Hackathons -> 2. Internships -> 3. Education
export const JOURNEY_ENTRIES: JourneyEntry[] = [
  // 1. Hackathons
  {
    id: 'aarvam-26-special-prize',
    category: 'Hackathon',
    title: "AARVAM '26 — Special Prize Winner",
    organization: "AARVAM '26 • Hackathon & Technical Innovation",
    period: '2026',
    score: 'Achievement: Special Prize',
    description:
      "Participated in AARVAM '26, a hackathon that provided an opportunity to explore innovative ideas, demonstrate technical capabilities and develop technology-driven solutions. Recognized with a Special Prize, marking an important milestone in my technical and innovation journey.",
    highlights: [
      'Achievement: Special Prize',
      "Event: AARVAM '26",
      'Category: Hackathon & Technical Innovation',
    ],
    isPlaceholder: false,
    backgroundImage: aarvamImg,
  },
  {
    id: 'sih-2026-exploration',
    category: 'Hackathon',
    title: 'SIH 2026 — Problem Statement Exploration',
    organization: 'Smart India Hackathon (SIH 2026)',
    period: '2026',
    score: 'AI & Technical Innovation',
    description:
      'Explored AI-driven innovation opportunities through Smart India Hackathon problem statements, including weather forecast bust detection and AI-powered Indian Standards recommendation systems, alongside technical innovation project concepts.',
    highlights: [
      'Weather Forecast Bust Detection (AI Problem Statement Exploration)',
      'AI-Powered Indian Standards Recommendation Systems',
      'Technical Innovation Projects: Oil Safety Intelligence, Adaptive Classroom Focus System, Automated Fire Suppression System',
    ],
    isPlaceholder: false,
  },

  // 2. Internships
  {
    id: 'tamiza-wordpress-intern',
    category: 'Internship',
    title: 'WordPress Developer Intern',
    organization: 'Tamiza Software Solutions • Sivakasi, Tamil Nadu',
    period: 'Internship',
    score: 'Professional Experience',
    description:
      'Worked on WordPress-based website development and customization, gaining practical exposure to theme and plugin configuration, page customization, content management, website testing, deployment and maintenance.',
    highlights: [
      'WordPress Development',
      'Theme and Plugin Customization',
      'Website Management',
      'Testing and Debugging',
      'Deployment and Maintenance',
    ],
    isPlaceholder: false,
  },

  // 3. Education
  {
    id: 'ksr-be-cse-cybersecurity',
    category: 'Education',
    title: 'B.E. in Computer Science and Engineering (Cyber Security)',
    organization: 'K.S.R. College of Engineering, Tiruchengode',
    period: '2025 - 2029',
    score: 'CGPA: 7.24 / 10',
    description:
      'Pursuing an undergraduate engineering degree specializing in Cyber Security—building strong foundations across computer science, networking, secure software development, and intelligent systems.',
    highlights: [
      'Core Computer Science & Programming Foundations',
      'Computer Networking & Network Security Fundamentals',
      'Applied Software Engineering & AI Exploration',
    ],
    isPlaceholder: false,
    backgroundImage: ksrCollegeImg,
  },
  {
    id: 'hayagrivas-hsc',
    category: 'Education',
    title: 'Higher Secondary School Leaving Certificate',
    organization: 'Hayagrivas International School, Sivakasi',
    period: '2025',
    score: 'Percentage: 56.2 / 100',
    description:
      'Completed Higher Secondary education in Sivakasi, building analytical fundamentals and preparing for undergraduate studies in Computer Science and Cyber Security.',
    highlights: [
      'Higher Secondary School Leaving Certificate (Class XII)',
      'Sivakasi, Tamil Nadu',
    ],
    isPlaceholder: false,
    backgroundImage: hayagrivasImg,
  },
  {
    id: 'sivakasi-lions-sslc',
    category: 'Education',
    title: 'Secondary School Leaving Certificate',
    organization: 'The Sivakasi Lions Mat. Hr. Sec. School, Sivakasi',
    period: '2023',
    score: 'Percentage: 64 / 100',
    description:
      'Completed Secondary School education in Sivakasi, establishing foundational skills in mathematics, science, and computing.',
    highlights: [
      'Secondary School Leaving Certificate (Class X)',
      'Sivakasi, Tamil Nadu',
    ],
    isPlaceholder: false,
    backgroundImage: lionsSchoolImg,
  },
];
