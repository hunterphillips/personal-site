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

export interface CaseStudy {
  slug: string;
  path: string;
  eyebrow: string;
  title: string;
  summary: string;
  heroImage: string;
  heroAlt: string;
  role: string;
  stack: string[];
  metrics: CaseStudyMetric[];
  architecture: CaseStudyStep[];
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
