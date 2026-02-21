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
      'A lightweight chat interface for LLMs. Supports OpenAI, Anthropic, and Google providers simultaneously via a unified Express backend powered by the Vercel AI SDK. Features real-time message streaming, persistent chat history via Zustand, and a clean React/TypeScript/Tailwind frontend using shadcn/ui components.',
    images: ['/assets/feather.png'],
    tags: ['React', 'TypeScript', 'Tailwind', 'Express', 'Vercel AI SDK'],
    github: 'https://github.com/hunterphillips/feather',
  },
  {
    id: 'email-writer',
    name: 'Email Writer',
    shortDescription: 'Fine-tuning pipeline to write emails in your style',
    fullDescription:
      'A fine-tuning pipeline that trains OpenAI models to write emails in your personal style. Processes Gmail exports, strips noise, generates synthetic prompts, and monitors fine-tuning progress. Includes a side-by-side comparison mode to evaluate the fine-tuned model against the base. Offers both a Streamlit web UI and CLI workflow.',
    images: ['/assets/email-writer.png'],
    tags: ['Python', 'OpenAI', 'Streamlit', 'Fine-tuning'],
    github: 'https://github.com/hunterphillips/email-writer',
  },
  {
    id: 'sn-mockup',
    name: 'SN Mockup',
    shortDescription: 'Rapid prototyping tool for ServiceNow UI',
    fullDescription:
      'A rapid prototyping tool for ServiceNow platform UI. Build high-fidelity list views, forms, and navigation locally without a live instance. Implements the Horizon design system with Tailwind, supports live table imports, full CRUD on local records, and AI-powered field content generation via the Vercel AI SDK.',
    images: ['/assets/sn-mockup.png'],
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Vercel AI SDK'],
    github: 'https://github.com/hunterphillips/sn-mockup',
  },
  {
    id: 'font-tester',
    name: 'Font Tester',
    shortDescription: 'Chrome extension to preview Google Fonts live',
    fullDescription:
      "A Chrome extension that lets designers and developers preview any live webpage with different Google Fonts applied in real-time, without touching the site's code. Persists user preferences across sessions. Available on the Chrome Web Store.",
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
      'A desktop app that calculates and displays a real-time countdown to your statistically estimated death using demographic inputs and the World Population API. Built with Electron and AngularJS, with Chart.js for data visualization. Packaged as a native macOS application. 21 GitHub stars, two public releases.',
    images: ['/assets/clock-screenshot.jpeg'],
    tags: ['Electron', 'AngularJS', 'Chart.js'],
    github: 'https://github.com/hunterphillips/countdown',
  },
];
