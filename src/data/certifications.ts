export interface CertificationItem {
  id: string;
  code: string;
  title: string;
  issuer: string;
  completionDate: string;
  category: string;
  verificationUrl: string | null;
  imageUrl: string | null;
  summary: string;
  isPlaceholder: boolean;
}

// Editable certifications & achievements catalog.
// Add verified certificate scans in `src/assets/certifications/` or `public/certificates/` and update entries below.
export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'aarvam-26-special-prize',
    code: 'ACHIEVEMENT // 01',
    title: "AARVAM '26 — Special Prize Winner",
    issuer: "AARVAM '26 Hackathon",
    completionDate: '2026',
    category: 'Hackathon & Technical Innovation',
    verificationUrl: null,
    imageUrl: null,
    summary:
      "Recognized with a Special Prize at AARVAM '26 for exploring innovative ideas, demonstrating technical capabilities, and developing technology-driven solutions.",
    isPlaceholder: false,
  },
  {
    id: 'tamiza-wordpress-internship',
    code: 'EXPERIENCE // 02',
    title: 'WordPress Developer Internship',
    issuer: 'Tamiza Software Solutions, Sivakasi',
    completionDate: 'Completed',
    category: 'Software & Web Development',
    verificationUrl: null,
    imageUrl: null,
    summary:
      'Practical internship exposure covering WordPress website development, theme and plugin customization, content management, testing, debugging, deployment, and maintenance.',
    isPlaceholder: false,
  },
  {
    id: 'cert-slot-03',
    code: 'CERT // 03',
    title: 'Cyber Security Certification (Placeholder)',
    issuer: 'Issuing Organization — Update in src/data/certifications.ts',
    completionDate: 'Date Pending',
    category: 'Cyber Security',
    verificationUrl: null,
    imageUrl: null,
    summary:
      'Placeholder slot ready for your verified Cyber Security or Network Defense credential. Supply the certificate image and verification URL in src/data/certifications.ts.',
    isPlaceholder: true,
  },
  {
    id: 'cert-slot-04',
    code: 'CERT // 04',
    title: 'Artificial Intelligence & Automation (Placeholder)',
    issuer: 'Issuing Organization — Update in src/data/certifications.ts',
    completionDate: 'Date Pending',
    category: 'AI Innovation',
    verificationUrl: null,
    imageUrl: null,
    summary:
      'Placeholder slot ready for your verified AI, Machine Learning, or Intelligent Automation certificate.',
    isPlaceholder: true,
  },
];
