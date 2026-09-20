# hunterphillips.dev

![alt text](/public/assets/site-landing.png)

Personal portfolio site

## Stack

| Layer     | Technology                                                |
| --------- | --------------------------------------------------------- |
| Framework | React 19 + TypeScript                                     |
| Build     | Vite 7                                                    |
| Styling   | Tailwind CSS v4 (via `@tailwindcss/vite`, no config file) |
| Icons     | `@phosphor-icons/react` + `lucide-react`                  |
| Carousel  | `embla-carousel-react`                                    |
| Deploy    | Vercel                                                    |

## Project Structure

```
site/
├── scripts/
│   └── prerender.mjs     # Post-build: static HTML per route, sitemap.xml, llms.txt
├── src/
│   ├── components/       # One file per section (About, Projects, Experience, etc.)
│   │   ├── Sidebar.tsx   # Desktop nav + theme toggle
│   │   └── MobileNav.tsx # Mobile nav
│   ├── data/
│   │   ├── projects.ts   # Project cards — edit content here
│   │   ├── experience.ts # Work history — edit content here
│   │   └── caseStudies.ts # Case study pages — edit content here
│   ├── pages/
│   │   ├── HomePage.tsx  # Section order, scrollspy (IntersectionObserver)
│   │   └── CaseStudyPage.tsx # Case study page layout
│   ├── App.tsx           # Route resolver
│   ├── entry-server.tsx  # SSR entry for prerendering
│   ├── ThemeContext.tsx  # 3-theme system (default / warm / sage)
│   └── index.css         # Tailwind import, @theme tokens, Google Fonts
└── public/
    ├── assets/           # Project screenshot images
    ├── agents/           # SKILL.md — published agent skill
    └── me/               # Profile markdown + resume.pdf
```

## Agent readability

`npm run build` prerenders each route to static HTML (with per-route meta and
JSON-LD) and generates `sitemap.xml`, `llms.txt`, a markdown mirror per case
study, and `.well-known/agent-skills/index.json` — so crawlers and AI agents that
don't execute JavaScript still see full content. Each page carries
`rel="alternate" type="text/markdown"` pointing at its markdown mirror, and
`vercel.json` sets a matching RFC 8288 `Link` header at the origin. `robots.txt`
declares Content Signals (`search=yes, ai-input=yes, ai-train=no`). See
`/llms.txt` on the deployed site for the agent-facing index.
