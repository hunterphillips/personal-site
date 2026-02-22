export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  tags: string[];
  github: string;
  link?: string;
}

export const projects: Project[] = [
  {
    id: 'feather',
    name: 'Feather',
    shortDescription: 'Lightweight chat interface for LLMs',
    fullDescription:
      'A lightweight chat interface for LLMs. Designed as a minimalist alternative to Open WebUI or LibreChat.',
    images: ['/assets/feather.png'],
    tags: ['React', 'TypeScript', 'Tailwind', 'Express', 'Vercel AI SDK'],
    github: 'https://github.com/hunterphillips/feather',
  },
  {
    id: 'email-writer',
    name: 'Email Writer',
    shortDescription: 'Fine-tuning pipeline to write emails in your style',
    fullDescription: 'Fine-tune a model to respond to emails in your style.',
    images: ['/assets/email-writer.png'],
    tags: ['Python', 'OpenAI', 'Streamlit', 'Fine-tuning'],
    github: 'https://github.com/hunterphillips/email-writer',
  },
  {
    id: 'sn-mockup',
    name: 'SN Mockup',
    shortDescription: 'Rapid prototyping tool for ServiceNow UI',
    fullDescription: 'A rapid prototyping tool for ServiceNow platform UI.',
    images: ['/assets/sn-mockup.png'],
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Vercel AI SDK'],
    github: 'https://github.com/hunterphillips/sn-mockup',
  },
  {
    id: 'font-tester',
    name: 'Font Tester',
    shortDescription: 'Chrome extension to preview a webpage with Google Fonts',
    fullDescription:
      "Chrome extension to preview any webpage with different Google Fonts applied in real-time, without touching the site's code. Available on the Chrome Web Store.",
    images: ['/assets/fontTester.jpeg'],
    tags: ['JavaScript', 'Chrome Extension', 'Google Fonts API'],
    github: 'https://github.com/hunterphillips/font-tester',
    link: 'https://chromewebstore.google.com/detail/font-tester/imccahjhfnnifmcmfelbcijnilebgggg',
  },
  {
    id: 'countdown',
    name: 'Countdown',
    shortDescription: 'Real-time countdown to your estimated death',
    fullDescription:
      "Productivity desktop application that uses demographic information, health metrics, and the World Population API to generate a running clock counting down to the precise moment you'll drop dead.",
    images: ['/assets/clock-screenshot.jpeg'],
    tags: ['Electron', 'AngularJS', 'Chart.js'],
    github: 'https://github.com/hunterphillips/countdown',
  },
];
