export interface SocialLink {
  id: 'github' | 'linkedin' | 'instagram' | 'whatsapp' | 'email';
  label: string;
  href: string;
  displayValue: string;
  isPlaceholder: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'education', label: 'Education', href: '#education' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'certifications', label: 'Certifications', href: '#certifications' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const PROFILE = {
  brandName: 'AATHIAA',
  ownerName: 'Santhosh A.',
  contactEmail: 'santhosha382007@gmail.com',
  heroGreeting: "HELLO, I'M",
  heroHeading: 'SANTHOSH A.',
  positioning: 'Cyber Security | Software Engineering | AI Innovation',
  tagline: 'I Turn Ideas Into Intelligent Solutions.',
  heroSupportingText:
    'I build technology-driven solutions that combine creativity, intelligent automation and secure engineering to solve real-world challenges.',
  animatedRoles: [
    'Cyber Security Enthusiast',
    'Software Developer',
    'AI Innovation Enthusiast',
    'Technology Explorer',
  ],
  about: {
    sectionLabel: '01 // IDENTITY',
    heading: 'THE PERSON BEHIND THE CODE.',
    paragraphs: [
      "I'm Santhosh A., a Computer Science and Engineering student specializing in Cyber Security. I enjoy exploring technology, building software solutions and transforming innovative ideas into practical applications.",
      'My interests span cybersecurity, full-stack development, artificial intelligence and intelligent automation. I believe technology should not only solve problems but also create meaningful impact.',
    ],
    education: {
      degree: 'B.E. in Computer Science and Engineering (Cyber Security)',
      institution: 'K.S.R. College of Engineering, Tiruchengode',
      duration: '2025–2029',
      cgpa: 'CGPA: 7.24 / 10',
      status: 'Undergraduate Student',
    },
    interests: [
      {
        title: 'Cyber Security',
        description:
          'Exploring network defense fundamentals, threat awareness, and security-first software design.',
      },
      {
        title: 'Full-Stack Development',
        description:
          'Crafting responsive interfaces and dependable backend services with modern web architectures.',
      },
      {
        title: 'Artificial Intelligence',
        description:
          'Investigating predictive modeling, smart analytics, and practical AI-assisted workflows.',
      },
      {
        title: 'Intelligent Automation',
        description:
          'Connecting software logic and IoT sensors to streamline everyday systems and safety workflows.',
      },
    ],
    approach: [
      {
        title: 'Security by Design',
        detail:
          'Treating resilience, privacy, and safe defaults as core architectural pillars rather than afterthoughts.',
      },
      {
        title: 'Purposeful Engineering',
        detail:
          'Focusing on real-world friction points—from campus workflows to safety automation—and translating ideas into clear blueprints.',
      },
      {
        title: 'Continuous Exploration',
        detail:
          'Learning actively across systems, networking, software craftsmanship, and emerging AI paradigms.',
      },
    ],
  },
  // Verified social & direct contact links
  socialLinks: [
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/santhosha382007-dotcom',
      displayValue: 'github.com/santhosha382007-dotcom',
      isPlaceholder: false,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/santhosh-a-9b9140376?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      displayValue: 'Santhosh A. on LinkedIn',
      isPlaceholder: false,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/santhosh._.3807?fqnt=ejh6aTl6aDhwNXM1',
      displayValue: '@santhosh._.3807',
      isPlaceholder: false,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: 'https://wa.me/qr/HL4GDDGD7KKNI1',
      displayValue: 'Chat on WhatsApp',
      isPlaceholder: false,
    },
    {
      id: 'email',
      label: 'Email',
      href: 'mailto:santhosha382007@gmail.com',
      displayValue: 'santhosha382007@gmail.com',
      isPlaceholder: false,
    },
  ] as SocialLink[],
};
