export interface CaseStudyLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface CaseStudyMetric {
  value: string;
  label: string;
  detail: string;
}

export interface CaseStudySection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface CaseStudyStep {
  title: string;
  detail: string;
}

export interface CaseStudyImage {
  src: string;
  alt: string;
  caption: string;
}

export interface CaseStudy {
  slug: string;
  path: string;
  eyebrow: string;
  title: string;
  summary: string;
  heroImage: string;
  heroAlt: string;
  socialImage?: string;
  gallery?: CaseStudyImage[];
  role: string;
  stack: string[];
  metrics: CaseStudyMetric[];
  architecture: CaseStudyStep[];
  architectureLayout?: 'pipeline' | 'steps';
  sections: CaseStudySection[];
  links: CaseStudyLink[];
}

export const serviceNowDocsCaseStudy: CaseStudy = {
  slug: 'servicenow-docs-mcp',
  path: '/case-studies/servicenow-docs-mcp',
  eyebrow: 'Case Study',
  title: 'ServiceNow Docs MCP Server',
  summary:
    'An MCP server that gives AI agents fast, reliable access to the full ServiceNow documentation catalog.',
  heroImage: '/assets/sn-doc-mcp-demo.png',
  heroAlt: 'ServiceNow Docs MCP demo screenshot',
  role: 'A retrieval layer purpose-built for AI agents working on the ServiceNow platform.',
  stack: ['Python', 'FastMCP', 'ChromaDB', 'HuggingFace', 'Fly.io'],
  metrics: [
    {
      value: '287,271',
      label: 'chunks indexed',
      detail: 'Full ServiceNow docs ingested into ChromaDB.',
    },
    {
      value: '231',
      label: 'bundle filters',
      detail: 'Scope searches to a specific product area or release.',
    },
    {
      value: '4',
      label: 'MCP tools',
      detail: 'Search, list bundles, reassemble full docs, and health stats.',
    },
  ],
  architecture: [
    {
      title: 'Ingest',
      detail:
        'Downloads the ServiceNow documentation dataset, generates embeddings, and loads the full corpus into ChromaDB.',
    },
    {
      title: 'Index',
      detail:
        'Each chunk is stored with its product area, title, URL, and position so agents can filter results or retrieve the full source page.',
    },
    {
      title: 'Serve',
      detail:
        'FastMCP exposes four tools: search, product-area discovery, full-page retrieval, and health.',
    },
    {
      title: 'Operate',
      detail:
        'Runs on Fly.io with a persistent volume, bearer-token auth, and a startup warmup to absorb cold-start latency.',
    },
  ],
  sections: [
    {
      heading: 'Problem',
      paragraphs: [
        'AI agents working on ServiceNow tasks need documentation that is both broad and trustworthy. Live scraping is fragile and slow; general web search is unreliable.',
        'ServiceNow currently does not have an official MCP Server that serves up product documentation.',
      ],
    },
    {
      heading: 'Features',
      bullets: [
        'Tools: semantic search, bundle discovery, full-document reconstruction, health reporting.',
        'Runs locally with zero config or accessible from any MCP-compatible client.',
        'Tests cover tool behavior, auth middleware, startup validation, and ingest logic.',
      ],
    },
    {
      heading: 'Retrieval Quality',
      paragraphs: [
        'A simple evaluation benchmarks the index against representative ServiceNow tasks such as incident management, Flow Designer error handling, GlideRecord usage, and Event Management rules.',
        'Average top-1 score of 0.741',
      ],
    },
  ],
  links: [
    {
      label: 'Demo',
      href: 'https://sn-docs-mcp-demo.vercel.app/',
      external: true,
    },
  ],
};

export const whiteboardCaseStudy: CaseStudy = {
  slug: 'whiteboard',
  path: '/case-studies/whiteboard',
  eyebrow: 'Case Study',
  title: 'Whiteboard',
  summary:
    'A live note-taking board for online meetings. It reads the transcript of a meeting in progress and keeps a running agenda on screen: decisions, open questions, and follow-ups.',
  heroImage: '/assets/whiteboard-replay.gif',
  heroAlt: 'The board filling in during a replayed discovery call',
  socialImage: '/assets/whiteboard-notes.png',
  gallery: [
    {
      src: '/assets/whiteboard-notes.png',
      alt: 'Whiteboard notes tab during a call',
      caption: 'Live note-taking',
    },
    {
      src: '/assets/whiteboard-diagram.png',
      alt: 'Whiteboard diagram tab showing a request intake flow',
      caption: 'A supporting diagram drawn during a workflow discussion',
    },
  ],
  role: 'A shared screen for discovery calls and workshops.',
  stack: ['TypeScript', 'React', 'Hono', 'Vercel AI SDK', 'Fireflies'],
  metrics: [
    {
      value: '$1.75',
      label: 'per meeting hour',
      detail: 'Model cost at the default settings.',
    },
    {
      value: '3',
      label: 'diagram types',
      detail: 'Workflows, data models, and comparison grids.',
    },
  ],
  architectureLayout: 'steps',
  architecture: [
    {
      title: 'Listen',
      detail: 'Fireflies streams the meeting transcript as people talk.',
    },
    {
      title: 'Take notes',
      detail:
        'Every ten seconds a model reads the new lines and updates the board.',
    },
    {
      title: 'Tidy',
      detail:
        'Every ninety seconds a second model removes notes that repeat or have gone stale.',
    },
    {
      title: 'Draw',
      detail:
        'When the conversation walks through a process, a data model, or a comparison, a model draws it.',
    },
  ],
  sections: [
    {
      heading: 'Problem',
      paragraphs: [
        'Meeting summaries arrive after the meeting is over. Whiteboard shows the notes while it is still going, and draws diagrams to help visualize technical discussions.',
      ],
    },
    {
      heading: 'Features',
      bullets: [
        'Tracks topics, decisions, open questions, and follow-ups as they come up.',
        'Draws workflows, data models, and comparisons as they are discussed.',
        'Suggests follow-up questions during the meeting.',
        'Lets the host edit or remove anything on the board.',
        'Saves a recap when the meeting ends.',
      ],
    },
  ],
  links: [],
};

export const caseStudies: CaseStudy[] = [
  serviceNowDocsCaseStudy,
  whiteboardCaseStudy,
];
