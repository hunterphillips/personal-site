import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const siteUrl = 'https://hunterphillips.dev';
const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(rootDir, 'dist');
const ssrDir = resolve(rootDir, 'dist-ssr');
const entryPath = resolve(ssrDir, 'entry-server.js');

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function serializeJsonLd(value) {
  return JSON.stringify(value, null, 2).replaceAll('<', '\\u003c');
}

function homeMetadata() {
  const title = 'Hunter Phillips — AI Architect';
  const description =
    'Hunter Phillips is an AI Architect building agent-native systems and developer tooling, with a decade of platform modernization across federal and commercial organizations.';
  const socialDescription =
    'AI Architect building agent-native systems and developer tooling across federal and commercial organizations.';
  const canonical = `${siteUrl}/`;
  const image = `${siteUrl}/assets/site-landing.png`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: 'Hunter Phillips',
        jobTitle: 'AI Architect',
        url: canonical,
        worksFor: {
          '@type': 'Organization',
          name: 'NowGentic',
          url: 'https://nowgentic.com/',
        },
        sameAs: [
          'https://www.linkedin.com/in/hunter-phillips/',
          'https://github.com/hunterphillips',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'Hunter Phillips',
        url: canonical,
        author: { '@id': `${siteUrl}/#person` },
      },
    ],
  };

  return routeMetadata({
    title,
    description,
    socialDescription,
    canonical,
    image,
    type: 'website',
    jsonLd,
  });
}

function caseStudyMetadata(caseStudy) {
  const title = `${caseStudy.title} — Hunter Phillips`;
  const canonical = `${siteUrl}${caseStudy.path}`;
  const image = new URL(caseStudy.heroImage, siteUrl).href;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: caseStudy.title,
    description: caseStudy.summary,
    image,
    url: canonical,
    mainEntityOfPage: canonical,
    author: {
      '@type': 'Person',
      name: 'Hunter Phillips',
      url: `${siteUrl}/`,
    },
  };

  return routeMetadata({
    title,
    description: caseStudy.summary,
    socialDescription: caseStudy.summary,
    canonical,
    image,
    type: 'article',
    jsonLd,
  });
}

function routeMetadata({
  title,
  description,
  socialDescription,
  canonical,
  image,
  type,
  jsonLd,
}) {
  return `<!-- route-meta:start -->
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(socialDescription)}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${serializeJsonLd(jsonLd)}</script>
    <!-- route-meta:end -->`;
}

function injectRoute(template, markup, metadata) {
  return template
    .replace(
      /<!-- route-meta:start -->[\s\S]*?<!-- route-meta:end -->/,
      metadata,
    )
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
}

function renderCaseStudyMarkdown(caseStudy) {
  const lines = [
    `# ${caseStudy.title}`,
    '',
    caseStudy.summary,
    '',
    '## Role',
    '',
    caseStudy.role,
    '',
    '## Stack',
    '',
    ...caseStudy.stack.map((item) => `- ${item}`),
    '',
    '## Metrics',
    '',
    ...caseStudy.metrics.map(
      (metric) => `- **${metric.value} — ${metric.label}:** ${metric.detail}`,
    ),
    '',
    '## Architecture',
    '',
    ...caseStudy.architecture.map(
      (step, index) => `${index + 1}. **${step.title}:** ${step.detail}`,
    ),
  ];

  for (const section of caseStudy.sections) {
    lines.push('', `## ${section.heading}`, '');
    for (const paragraph of section.paragraphs ?? []) {
      lines.push(paragraph, '');
    }
    for (const bullet of section.bullets ?? []) {
      lines.push(`- ${bullet}`);
    }
  }

  lines.push('', '## Links', '');
  lines.push(...caseStudy.links.map((link) => `- [${link.label}](${link.href})`));

  return `${lines.join('\n').trim()}\n`;
}

function renderLlmsTxt(projects, caseStudies) {
  const lines = [
    '# Hunter Phillips',
    '',
    '> Personal portfolio of Hunter Phillips, an AI Architect specializing in agent-native systems, developer tooling, and platform modernization for federal and commercial organizations.',
    '',
    'This site is a prerendered single-page portfolio. All substantive content is also available as plain markdown at the URLs below; prefer those over parsing the HTML. No contact form or email address is published in the HTML or markdown — the intended channels are [LinkedIn](https://www.linkedin.com/in/hunter-phillips/) and [GitHub](https://github.com/hunterphillips).',
    '',
    '## Profile',
    '',
    '- [Full profile](/me/README.md): canonical work history with roles, dates, and outcome metrics, plus projects and education',
    '- [Summary](/me/summary.md): short personal introduction',
    '- [Qualifications](/me/qualifications.md): common job-description requirements mapped to specific experience',
    '- [Resume](/me/resume.pdf): formatted resume (PDF)',
    '',
    '## Projects',
    '',
    ...projects.map(
      (project) =>
        `- [${project.name}](${project.github}): ${project.shortDescription}`,
    ),
    '',
    '## Case Studies',
    '',
    ...caseStudies.map(
      (caseStudy) =>
        `- [${caseStudy.title}](/case-studies/${caseStudy.slug}.md): ${caseStudy.summary} HTML version at ${caseStudy.path}`,
    ),
    '',
    '## Agents',
    '',
    '- [Profile lookup skill](/agents/SKILL.md): agent skill (SKILL.md format) describing how to retrieve structured information from this site',
    '',
    '## Optional',
    '',
    '- [Detailed project write-ups](/me/projects.md): longer prose descriptions of selected projects',
    '- [Sitemap](/sitemap.xml): all HTML routes',
  ];

  return `${lines.join('\n')}\n`;
}

function renderSitemap(caseStudies) {
  const urls = [
    `${siteUrl}/`,
    ...caseStudies.map(({ path }) => `${siteUrl}${path}`),
  ];
  const entries = urls
    .map((url) => `  <url>\n    <loc>${url}</loc>\n  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

async function main() {
  try {
    const { caseStudies, projects, render } = await import(
      pathToFileURL(entryPath).href
    );
    const template = await readFile(resolve(distDir, 'index.html'), 'utf8');
    const routes = [
      { path: '/', metadata: homeMetadata() },
      ...caseStudies.map((caseStudy) => ({
        path: caseStudy.path,
        metadata: caseStudyMetadata(caseStudy),
      })),
    ];

    for (const route of routes) {
      const html = injectRoute(template, render(route.path), route.metadata);
      const outputPath =
        route.path === '/'
          ? resolve(distDir, 'index.html')
          : resolve(distDir, route.path.slice(1), 'index.html');
      await mkdir(dirname(outputPath), { recursive: true });
      await writeFile(outputPath, html);

      if (route.path !== '/') {
        await writeFile(resolve(distDir, `${route.path.slice(1)}.html`), html);
      }
    }

    for (const caseStudy of caseStudies) {
      await writeFile(
        resolve(distDir, 'case-studies', `${caseStudy.slug}.md`),
        renderCaseStudyMarkdown(caseStudy),
      );
    }

    await writeFile(
      resolve(distDir, 'llms.txt'),
      renderLlmsTxt(projects, caseStudies),
    );
    await writeFile(resolve(distDir, 'sitemap.xml'), renderSitemap(caseStudies));
  } finally {
    await rm(ssrDir, { recursive: true, force: true });
  }
}

await main();
