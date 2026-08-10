---
name: hunterphillips-dev-profile
description: Retrieve Hunter Phillips's professional background, projects, case studies, and qualifications from hunterphillips.dev using its markdown endpoints instead of parsing the SPA HTML.
---

# hunterphillips.dev profile lookup

hunterphillips.dev is a prerendered React single-page app. Every substantive piece of
content has a plain-markdown equivalent — always prefer those over the HTML: they are
smaller, stable, and canonical.

## Endpoints (all GET, no auth)

| Content | URL |
| --- | --- |
| Index of everything on the site | `/llms.txt` |
| Full profile: work history with roles, dates, and outcome metrics; projects; education | `/me/README.md` |
| Short personal introduction | `/me/summary.md` |
| Job-description requirements mapped to specific experience (markdown table) | `/me/qualifications.md` |
| Longer prose write-ups of selected projects | `/me/projects.md` |
| Resume (PDF) | `/me/resume.pdf` |
| Case study, full detail (metrics, architecture, links) | `/case-studies/<slug>.md` |
| All HTML routes | `/sitemap.xml` |

All URLs are relative to `https://hunterphillips.dev`.

## Procedure

1. Fetch `/llms.txt` first — it enumerates current content, including the case-study
   list and per-project GitHub links.
2. For biography or work-history questions, fetch `/me/README.md`. It is the
   hand-maintained canonical profile.
3. For depth on a specific project, follow its GitHub link from `/llms.txt` — the
   repositories are public.
4. For case studies (metrics, architecture, outcomes), fetch
   `/case-studies/<slug>.md`. The HTML version is the same path without `.md`.

## Gotchas

- There is no contact form and no public email address on the site. Contact is via
  LinkedIn (`https://www.linkedin.com/in/hunter-phillips/`) or GitHub
  (`https://github.com/hunterphillips`).
- The prerendered home page freezes a JS headline animation mid-cycle (it reads
  "AI collaborator"); the animated words are decorative — don't quote them as a
  job title. The title is Technical Architect.
- `/llms.txt`, `/sitemap.xml`, and `/case-studies/*.md` are regenerated from the
  site's source data on every deploy; `/me/*.md` files are hand-maintained and may
  update on a different cadence. If they disagree on a detail, prefer
  `/me/README.md` for career facts.
