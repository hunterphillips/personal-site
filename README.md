# hunterphillips.dev

![alt text](/site/public/assets/site-landing.png)

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
├── src/
│   ├── components/       # One file per section (About, Projects, Experience, etc.)
│   │   ├── Sidebar.tsx   # Desktop nav + theme toggle
│   │   └── MobileNav.tsx # Mobile nav
│   ├── data/
│   │   ├── projects.ts   # Project cards — edit content here
│   │   ├── experience.ts # Work history — edit content here
│   │   └── caseStudies.ts # Case study pages — edit content here
│   ├── pages/
│   │   └── CaseStudyPage.tsx # Case study page layout
│   ├── App.tsx           # Layout, section order, scrollspy (IntersectionObserver)
│   ├── ThemeContext.tsx  # 3-theme system (default / warm / sage)
│   └── index.css         # Tailwind import, @theme tokens, Google Fonts
└── public/
    ├── assets/           # Project screenshot images
    └── me/               # resume.pdf
```
