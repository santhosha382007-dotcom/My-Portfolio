export type ProjectStatus = 'Concept' | 'In Development' | 'Completed';

export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  category: string;
  shortDescription: string;
  overview: string;
  keyObjectives: string[];
  techStack: string[];
  status: ProjectStatus;
  imageKey:
  | 'uzhavan-queue'
  | 'notifyshield'
  | 'pharmatrack'
  | 'fire-suppression'
  | 'spoko-academy'
  | 'classroom-focus'
  | 'oil-safety-intelligence';
  imageAlt: string;
  // Set actual URLs when repositories or live deployments are published.
  githubUrl: string | null;
  liveDemoUrl: string | null;
}

// Editable portfolio project entries.
// Statuses reflect honest stage tracking (Concept / In Development / Completed).
export const PROJECTS: ProjectItem[] = [
  {
    id: 'uzhavan-queue',
    number: '01',
    name: 'UZHAVAN QUEUE',
    category: 'Queue Management System',
    shortDescription:
      'A digital queue management concept designed to improve queue tracking and user experience through technology.',
    overview:
      'Uzhavan Queue explores how structured digital token scheduling and live queue visibility can reduce physical waiting uncertainty, streamline service desk throughput, and deliver a calmer experience for both visitors and operators.',
    keyObjectives: [
      'Digital token allocation with transparent queue position tracking.',
      'Operator-side service counter flow to minimize bottlenecks.',
      'Accessible mobile-first interface for clear status visibility.',
    ],
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    status: 'Concept',
    imageKey: 'uzhavan-queue',
    imageAlt:
      'Conceptual dark geometric queue pathway visualization for Uzhavan Queue with illuminated gold token nodes',
    githubUrl: null,
    liveDemoUrl: null,
  },
  {
    id: 'notifyshield',
    number: '02',
    name: 'NOTIFYSHIELD',
    category: 'Cyber Security',
    shortDescription:
      'A smart phishing memory and delayed alert system concept designed to improve phishing awareness and threat response.',
    overview:
      'NotifyShield is a defensive security concept focused on bridging the gap between suspicious link interactions and user awareness—introducing structured phishing memory cues and thoughtful delayed verification prompts to discourage impulsive clicks.',
    keyObjectives: [
      'Pattern-aware phishing memory records to reinforce user threat recognition.',
      'Delayed alert confirmation mechanics that interrupt rushed social-engineering triggers.',
      'Clear security awareness insights tailored for everyday users.',
    ],
    techStack: ['Python', 'JavaScript', 'Security Awareness', 'Network Security'],
    status: 'Concept',
    imageKey: 'notifyshield',
    imageAlt:
      'Conceptual obsidian and metallic gold cryptographic shield deflecting crimson digital phishing arcs for NotifyShield',
    githubUrl: null,
    liveDemoUrl: null,
  },
  {
    id: 'pharmatrack',
    number: '03',
    name: 'PHARMATRACK',
    category: 'AI and Intelligent Route Optimization',
    shortDescription:
      'An intelligent traffic prediction and route optimization concept for improving delivery and transportation efficiency.',
    overview:
      'PharmaTrack investigates how AI-assisted traffic forecasting and intelligent route planning can support time-sensitive pharmaceutical deliveries—prioritizing predictable transit windows and adaptive routing around congestion.',
    keyObjectives: [
      'Predictive congestion modeling to evaluate alternate dispatch paths.',
      'Priority-aware route planning tailored for sensitive delivery schedules.',
      'Visual dispatch monitoring designed for clear route comparison.',
    ],
    techStack: ['Python', 'JavaScript', 'React', 'MySQL'],
    status: 'Concept',
    imageKey: 'pharmatrack',
    imageAlt:
      'Conceptual 3D dark topographic city road network with illuminated metallic gold routes and crimson traffic nodes for PharmaTrack',
    githubUrl: null,
    liveDemoUrl: null,
  },
  {
    id: 'automated-fire-suppression',
    number: '04',
    name: 'AUTOMATED FIRE SUPPRESSION SYSTEM',
    category: 'IoT and Safety Automation',
    shortDescription:
      'An automated fire monitoring and suppression concept designed to improve fire safety through sensors and intelligent response mechanisms.',
    overview:
      'This IoT safety automation concept combines multi-sensor thermal and smoke monitoring with automated response logic to accelerate hazard detection and coordinate targeted suppression mechanisms while alerting stakeholders.',
    keyObjectives: [
      'Continuous sensor telemetry for early thermal and smoke anomaly detection.',
      'Automated response trigger architecture designed for rapid safety intervention.',
      'Status dashboard concept for alert visibility and incident logging.',
    ],
    techStack: ['C', 'Python', 'IoT Sensors', 'Automation Logic'],
    status: 'Concept',
    imageKey: 'fire-suppression',
    imageAlt:
      'Conceptual dark smart thermal sensor dome with crimson scanning rings and gold micro-circuitry for Automated Fire Suppression System',
    githubUrl: null,
    liveDemoUrl: null,
  },
  {
    id: 'spoko-academy',
    number: '05',
    name: 'SPOKO ACADEMY',
    category: 'Web Application Development',
    shortDescription:
      'An academy management and assessment platform designed to support student administration, examinations and learning management.',
    overview:
      'Spoko Academy is a full-stack web application initiative aimed at unifying student administration, structured online assessments, and organized learning modules inside a single modern academic portal.',
    keyObjectives: [
      'Centralized student enrollment and batch administration workflows.',
      'Structured examination and assessment module with clean progress tracking.',
      'Role-conscious architecture separating educator and learner workspaces.',
    ],
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    status: 'In Development',
    imageKey: 'spoko-academy',
    imageAlt:
      'Conceptual dark frosted-glass architectural dashboard panels with metallic gold grid geometry for Spoko Academy',
    githubUrl: null,
    liveDemoUrl: null,
  },
  {
    id: 'adaptive-classroom-focus',
    number: '06',
    name: 'ADAPTIVE CLASSROOM FOCUS SYSTEM',
    category: 'IoT and Smart Automation',
    shortDescription:
      'An IoT-based classroom focus management concept involving teacher and student interfaces.',
    overview:
      'Adaptive Classroom Focus System envisions an interconnected smart-classroom architecture pairing teacher controls and student interfaces with ambient IoT feedback to encourage structured, distraction-minimized learning sessions.',
    keyObjectives: [
      'Synchronized teacher and student interface concept for session pacing.',
      'IoT-assisted classroom environment cues supporting sustained focus.',
      'Lightweight modular architecture designed for academic environments.',
    ],
    techStack: ['React', 'Node.js', 'C', 'IoT Architecture'],
    status: 'Concept',
    imageKey: 'classroom-focus',
    imageAlt:
      'Conceptual minimalist dark smart classroom hub emitting metallic gold harmonic wave rings for Adaptive Classroom Focus System',
    githubUrl: null,
    liveDemoUrl: null,
  },
  {
    id: 'oil-safety-intelligence',
    number: '07',
    name: 'OIL SAFETY INTELLIGENCE',
    category: 'AI & Safety Intelligence',
    shortDescription:
      'A technical innovation concept applying intelligent monitoring and risk analysis to strengthen oil safety awareness and operational protection.',
    overview:
      'Oil Safety Intelligence explores how sensor-informed analytics and intelligent hazard monitoring can surface early safety anomalies, guide safer handling workflows, and improve incident prevention in oil-related environments.',
    keyObjectives: [
      'Intelligent anomaly monitoring concept for early oil safety risk visibility.',
      'Data-driven safety status insights supporting timely preventive action.',
      'Modular monitoring architecture designed for clarity and reliability.',
    ],
    techStack: ['Python', 'AI Analytics', 'IoT Sensors', 'Safety Automation'],
    status: 'Concept',
    imageKey: 'oil-safety-intelligence',
    imageAlt:
      'Conceptual dark obsidian and metallic gold safety droplet with crimson pulse waveform for Oil Safety Intelligence',
    githubUrl: null,
    liveDemoUrl: null,
  },
];
