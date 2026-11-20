import teamGroupImg from '../assets/team/team-group.png';
import santhoshImg from '../assets/team/santhosh.png';
import maanshiImg from '../assets/team/maanshi.png';
import kavinKumarImg from '../assets/team/kavin-kumar.png';
import pavithraImg from '../assets/team/pavithra.png';
import vijaiAnandhImg from '../assets/team/vijai-anandh.png';

export interface BusinessPillar {
  number: string;
  category: string;
  title: string;
  description: string;
  items: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  badge?: string;
  bio: string;
  expertise: string[];
  avatarUrl?: string;
  image?: string;
}

export interface PricingTier {
  id: string;
  tierNumber: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  price: string;
  pricePrefix?: string;
  description: string;
  features: string[];
  ctaLabel: string;
}

export interface AdditionalServiceRate {
  service: string;
  startingPrice: string;
  isCustom?: boolean;
  tag?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PricingData {
  eyebrow: string;
  title: string;
  tagline: string;
  introParagraphs: string[];
  packagesHeadline: string;
  tiers: PricingTier[];
  additionalServices: {
    heading: string;
    subheading: string;
    note: string;
    rates: AdditionalServiceRate[];
  };
  workingProcess: {
    heading: string;
    steps: ProcessStep[];
  };
  faqs: {
    heading: string;
    items: FAQItem[];
  };
  cta: {
    heading: string;
    subtext: string;
    brandSlogan: string;
  };
}

export interface BusinessData {
  title: string;
  companyName?: string;
  tagline: string;
  introParagraphs: string[];
  focusAreas: string[];
  pillars: BusinessPillar[];
  philosophy: {
    quote: string;
    description: string;
    goal: string;
  };
  team: {
    heading: string;
    introduction: string;
    groupImage: {
      src: string;
      alt: string;
      caption: string;
    };
    members: TeamMember[];
  };
  pricing: PricingData;
  cta: {
    heading: string;
    subtext: string;
    brandSlogan: string;
  };
}

/**
 * =======================================================================
 * MY BUSINESS & TEAM DATA
 * =======================================================================
 */
export const BUSINESS_DATA: BusinessData = {
  title: 'MY BUSINESS',
  companyName: 'AATHIAA VENTURE SOLUTIONS',
  tagline: 'Innovation Beyond Imagination.',
  introParagraphs: [
    'Welcome to my business space — where technology, entrepreneurship and innovation come together.',
    'I believe in transforming ideas into meaningful businesses and developing intelligent solutions that solve real-world challenges.',
    'My business interests focus on Software Development, Artificial Intelligence, Digital Solutions and Technology Innovation.',
  ],
  focusAreas: [
    'Software Development',
    'Artificial Intelligence',
    'Digital Solutions',
    'Technology Innovation',
  ],
  pillars: [
    {
      number: '01',
      category: 'Software & Digital Solutions',
      title: 'Turning Ideas Into Intelligent Applications.',
      description:
        'I am passionate about building practical software products that simplify operations, improve productivity and solve everyday problems.',
      items: [
        'Custom Website Development',
        'Web Application Development',
        'Mobile Application Development',
        'Business Management Systems',
        'Automation Solutions',
        'AI-Powered Applications',
        'Database-Driven Platforms',
      ],
    },
    {
      number: '02',
      category: 'Technology & Innovation',
      title: 'Ideas That Create Impact.',
      description:
        'I continuously explore new technologies and entrepreneurial opportunities through projects, hackathons and innovation initiatives.',
      items: [
        'Artificial Intelligence',
        'Internet of Things (IoT)',
        'Cybersecurity Innovation',
        'Smart Automation',
        'Digital Transformation',
        'Intelligent Business Solutions',
      ],
    },
  ],
  philosophy: {
    quote: 'Don\u2019t just follow technology. Build something meaningful with it.',
    description:
      'I believe successful businesses are built through innovation, trust, consistency and the ability to solve real problems.',
    goal: 'My goal is to transform innovative ideas into sustainable technology-driven ventures.',
  },
  team: {
    heading: 'About My Team',
    introduction:
      'We are a collective of driven problem solvers, software artisans, and security specialists. Our team combines deep technical discipline with innovative thinking to turn complex challenges into competitive advantages.',
    groupImage: {
      src: teamGroupImg,
      alt: 'Core Team members — The Minds Behind Our Solutions',
      caption: 'Our Core Engineering & Leadership Team • The Minds Behind Our Solutions',
    },
    members: [
      {
        id: 'member-santhosh',
        name: 'Santhosh',
        role: 'Founder & Chief Security Architect',
        badge: 'Founder',
        bio: 'Oversees cybersecurity architecture, core systems engineering, and strategic technology direction with a security-by-design discipline.',
        expertise: ['Cyber Security', 'Systems Architecture', 'Full-Stack Development'],
        image: santhoshImg,
      },
      {
        id: 'member-maanshi',
        name: 'Maanshi',
        role: 'Team Management (Planner & Executer)',
        badge: 'Management',
        bio: 'Drives strategic project planning, operational roadmapping, and agile execution to align team milestones and ensure timely, high-quality deliverables.',
        expertise: ['Team Management', 'Project Planning', 'Execution & Operations'],
        image: maanshiImg,
      },
      {
        id: 'member-kavin-kumar',
        name: 'Kavin Kumar',
        role: 'Lead Software Architect (Head of Engineering & Cloud)',
        badge: 'Engineering',
        bio: 'Specializes in distributed cloud infrastructure, robust API architectures, and resilient web platforms engineered for scale, speed, and reliability.',
        expertise: ['Cloud Architecture', 'Distributed Systems', 'Backend Engineering'],
        image: kavinKumarImg,
      },
      {
        id: 'member-pavithra',
        name: 'Pavithra',
        role: 'Product & Design Strategist (UI/UX & Operations Lead)',
        badge: 'Product & UX',
        bio: 'Bridges aesthetic luxury and functional ergonomics, creating cohesive design systems, intuitive UI/UX, and streamlined product operations.',
        expertise: ['UI/UX Design', 'Design Systems', 'Product Strategy'],
        image: pavithraImg,
      },
      {
        id: 'member-viaji-anandh',
        name: 'Vijai Anandh',
        role: 'AI & Automation Specialist (Head of Intelligent Systems)',
        badge: 'AI & Systems',
        bio: 'Develops machine learning pipelines, intelligent smart agent automations, and predictive models that optimize modern business workflows.',
        expertise: ['Artificial Intelligence', 'Smart Automation', 'Predictive Systems'],
        image: vijaiAnandhImg,
      },
    ],
  },
  pricing: {
    eyebrow: 'INVEST IN INNOVATION',
    title: 'PRICING',
    tagline: 'Transparent Pricing. Powerful Solutions. Real Results.',
    introParagraphs: [
      'Every great idea deserves the right technology.',
      'At AATHIAA, we believe in delivering practical, scalable and innovative digital solutions at transparent and competitive prices.',
      'Whether you\u2019re an individual, startup or established business, we have solutions designed around your requirements.',
    ],
    packagesHeadline: 'OUR SERVICE PACKAGES',
    tiers: [
      {
        id: 'tier-launch',
        tierNumber: '01',
        name: 'LAUNCH',
        badge: 'Starter',
        isPopular: false,
        pricePrefix: 'Starting at',
        price: '₹4,999',
        description:
          'Perfect for individuals, freelancers and small businesses looking to establish their digital presence.',
        features: [
          'Single-page website development',
          'Responsive design for all devices',
          'Modern UI/UX craftsmanship',
          'Basic animations & transitions',
          'Contact information integration',
          'Social media links integration',
          'Basic SEO & search indexing setup',
        ],
        ctaLabel: 'GET STARTED',
      },
      {
        id: 'tier-elevate',
        tierNumber: '02',
        name: 'ELEVATE',
        badge: 'Most Popular',
        isPopular: true,
        pricePrefix: 'Starting at',
        price: '₹12,999',
        description:
          'Designed for growing businesses that need a professional and engaging online presence.',
        features: [
          'Multi-page website development',
          'Premium bespoke UI/UX design',
          'Responsive, high-density layouts',
          'Interactive micro-animations',
          'Contact form & email integration',
          'Full SEO optimization & meta tags',
          'Complete deployment assistance',
        ],
        ctaLabel: 'CHOOSE ELEVATE',
      },
      {
        id: 'tier-enterprise',
        tierNumber: '03',
        name: 'ENTERPRISE',
        badge: 'Tailored Scope',
        isPopular: false,
        pricePrefix: 'Tailored Solution',
        price: 'Custom Pricing',
        description:
          'For businesses and organizations requiring advanced digital platforms and customized technology solutions.',
        features: [
          'Custom web application development',
          'Database architecture & integration',
          'User authentication & authorization',
          'Admin analytics & management dashboards',
          'Third-party API & webhook integrations',
          'Advanced workflow automation',
          'Custom business logic functionality',
          'Comprehensive deployment & testing',
        ],
        ctaLabel: 'REQUEST A QUOTE',
      },
    ],
    additionalServices: {
      heading: 'ADDITIONAL SERVICES',
      subheading: 'Need something specific? Explore our tailored services.',
      note: 'Pricing depends on project requirements and technical complexity.',
      rates: [
        {
          service: 'Landing page development',
          startingPrice: '₹4,999',
          tag: 'Quick Launch',
        },
        {
          service: 'Portfolio website',
          startingPrice: '₹5,999',
          tag: 'Personal Branding',
        },
        {
          service: 'AI integration',
          startingPrice: '₹9,999',
          tag: 'Intelligent Systems',
        },
        {
          service: 'Business website',
          startingPrice: '₹12,999',
          tag: 'Corporate Presence',
        },
        {
          service: 'E-commerce website',
          startingPrice: '₹19,999',
          tag: 'Store & Checkout',
        },
        {
          service: 'Web application',
          startingPrice: '₹24,999',
          tag: 'Full-Stack Platform',
        },
        {
          service: 'Website maintenance',
          startingPrice: 'Based on hosted server capacity + GST',
          isCustom: true,
          tag: 'Ongoing Support',
        },
        {
          service: 'Custom automation',
          startingPrice: 'Custom quote',
          isCustom: true,
          tag: 'Workflow Automation',
        },
      ],
    },
    workingProcess: {
      heading: 'OUR WORKING PROCESS',
      steps: [
        {
          step: '01',
          title: 'DISCOVER',
          description: 'We understand your business, goals and requirements.',
        },
        {
          step: '02',
          title: 'PLAN',
          description: 'We prepare the project scope, timeline and quotation.',
        },
        {
          step: '03',
          title: 'DEVELOP',
          description: 'We transform your idea into a functional digital solution.',
        },
        {
          step: '04',
          title: 'DELIVER',
          description: 'We test, deploy and hand over the completed project.',
        },
      ],
    },
    faqs: {
      heading: 'FREQUENTLY ASKED QUESTIONS',
      items: [
        {
          id: 'faq-1',
          question: 'Can I request a customized package?',
          answer:
            'Absolutely. Every project is different. We can prepare a customized quotation based on your unique goals and requirements.',
        },
        {
          id: 'faq-2',
          question: 'Are domain and hosting charges included?',
          answer:
            'Domain registration, hosting and third-party service subscriptions are quoted separately unless explicitly included in your service package.',
        },
        {
          id: 'faq-3',
          question: 'Do you provide maintenance?',
          answer:
            'Yes. Ongoing maintenance, security patches, and platform support can be arranged under a dedicated service agreement.',
        },
        {
          id: 'faq-4',
          question: 'How is payment handled?',
          answer:
            'Payment milestones are mutually agreed upon in writing before any development work begins, ensuring full transparency.',
        },
        {
          id: 'faq-5',
          question: 'Can I request additional features after development starts?',
          answer:
            'Yes. Additional features can be scoped, evaluated, and quoted separately as project add-ons without disrupting existing timelines.',
        },
      ],
    },
    cta: {
      heading: 'HAVE A PROJECT IN MIND?',
      subtext:
        'Let\u2019s turn your idea into something extraordinary. Tell us what you want to build. We\u2019ll help you find the right solution.',
      brandSlogan: 'AATHIAA — I Turn Ideas Into Intelligent Solutions.',
    },
  },
  cta: {
    heading: "LET'S BUILD SOMETHING GREAT.",
    subtext:
      "Have a business idea, technology requirement or collaboration opportunity? Let's connect and create something valuable together.",
    brandSlogan: 'AATHIAA — I Turn Ideas Into Intelligent Solutions.',
  },
};
