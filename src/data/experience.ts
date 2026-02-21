export interface Role {
  title: string;
  company: string;
  companyUrl?: string;
  dates: string;
  tagline: string;
  bullets: string[];
  art?: {
    src: string;
    alt: string;
    side: 'left' | 'right';
  };
}

export const experience: Role[] = [
  {
    title: 'Technical Architect',
    company: 'IntegrityPro Consulting',
    companyUrl: 'https://integritypro.com/',
    dates: '2022',
    tagline: 'Leading AI product and tooling adoption',
    bullets: [
      // 'Designed an agent framework to generate application files directly from user stories via elicitation, instance analysis, and spec-driven development',
    ],
  },
  {
    title: 'Lead Developer',
    company: 'GovCIO',
    companyUrl: 'https://govcio.com/',
    dates: '2021',
    tagline:
      'Built JEDI - an ETL integration used to synchronize millions of records in ServiceNow to external reporting software, supporting both real-time and batched updates',
    art: {
      src: '/assets/jedi.png',
      alt: 'ETL data pipeline illustration',
      side: 'left',
    },
    bullets: [
      // 'Built an ETL integration used to synchronize millions of records in ServiceNow to external reporting software, supporting both real-time and batched updates',
    ],
  },
  {
    title: 'Senior Technical Consultant',
    company: 'Finite Partners',
    companyUrl: 'https://finite-partners.com/',
    dates: '2019',
    tagline:
      'Promoted to lead our first major defense contract, enabling systems engineers to plan, configure, and provision satellite communications equipment',
    art: {
      src: '/assets/satellite-art.png',
      alt: 'Satellite communications illustration',
      side: 'right',
    },
    bullets: [
      // 'Promoted to lead our largest defense contract, enabling systems engineers to plan, configure, and provision satellite communications equipment',
    ],
  },
  {
    title: 'Solutions Engineer',
    company: 'Brookdale Senior Living',
    companyUrl: 'https://www.brookdale.com/',
    dates: '2018',
    tagline:
      'Replaced a Service Portal, generating 2000 additional self-service requests per month',
    bullets: [],
  },
  {
    title: 'Software Engineer (Contract)',
    company: 'Neurotargeting',
    dates: '2018',
    tagline:
      'Built an interface for physicians to monitor neural implant configurations',
    art: {
      src: '/assets/neurotargeting.png',
      alt: 'Neural implant illustration',
      side: 'left',
    },
    bullets: [],
  },
  {
    title: 'Coding Tutor',
    company: 'Wyzant',
    dates: '2017',
    tagline:
      'Taught JavaScript and programming fundamentals to student and early-career professionals',
    bullets: [],
  },
];
