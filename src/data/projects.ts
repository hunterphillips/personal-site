export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  tags: string[];
  github?: string;
  link?: string;
  caseStudyPath?: string;
}

export const projects: Project[] = [
  {
    id: 'whiteboard',
    name: 'Whiteboard',
    shortDescription: 'Live notes and diagrams on screen during a call',
    fullDescription:
      'A live note-taking board for online meetings. It reads the transcript of a meeting in progress and keeps a running agenda on screen, and sketches a diagram when the conversation turns to a process or a data model.',
    images: ['/assets/whiteboard-notes.png', '/assets/whiteboard-diagram.png'],
    tags: ['TypeScript', 'React', 'Hono', 'Vercel AI SDK', 'Fireflies'],
    caseStudyPath: '/case-studies/whiteboard',
  },
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
    id: 'servicenow-docs-mcp',
    name: 'ServiceNow Docs MCP',
    shortDescription: 'Hosted MCP server for ServiceNow documentation search',
    fullDescription:
      'A Python MCP server that gives AI agents semantic search over 287k chunks of ServiceNow documentation, with product-bundle filtering, full-page reconstruction, and both local stdio and hosted HTTP transports.',
    images: ['/assets/sn-doc-mcp-demo.png'],
    tags: ['Python', 'MCP', 'RAG', 'ChromaDB', 'Fly.io'],
    github: 'https://github.com/hunterphillips/sn-doc-search',
    caseStudyPath: '/case-studies/servicenow-docs-mcp',
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
