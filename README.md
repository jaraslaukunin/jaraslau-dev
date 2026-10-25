<div align="center">

# jaraslau.dev

**Personal portfolio of Jaraslau Kunin — a software developer from Minsk, Belarus.**

[![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?style=for-the-badge&logo=nuxtdotjs&logoColor=white)](https://nuxt.com/)
[![Vue](https://img.shields.io/badge/Vue-3-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-jaraslau--dev-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jaraslaukunin/jaraslau-dev)

**[Features](#features)** · [Tech Stack](#tech-stack) · [Quick Start](#quick-start) · [Project Structure](#project-structure) · [Deployment](#deployment) · [License](#license)

</div>

---

## About

jaraslau.dev is the personal website and portfolio of Jaraslau Kunin, a software developer from Minsk, Belarus. It collects selected projects, a short biography, the current work-in-progress list and the tools used day to day.

The interface is built around a terminal aesthetic: JetBrains Mono everywhere, an acid-green accent (`#a3ff12`) on a near-black background (`#09090b`), command-style headings such as `$ whoami` and `ls ./projects`, and card surfaces that look like terminal output. It is a design choice, not a template — every page, component and animation lives in this repository.

The site is fully static. There is no CMS, database or backend: all content is committed to the repository and rendered at build time. Production runs at **[jaraslau.dev](https://jaraslau.dev)**, served by GitHub Pages from the `gh-pages` branch.

## Features

| Route | What it shows |
|---|---|
| `/` | Hero with a `whoami` intro, focus / core / currently panels, featured project cards and a short `now.txt` block |
| `/projects` | The full project archive, rendered from the same data source |
| `/projects/[slug]` | Case page: type, stack, year, status, role, feature list, repo and site links, language, stars and last update |
| `/about` | Short bio, location / education / focus panels and a skill list |
| `/resume` | Career timeline (`git log` style), stack proficiency levels on a 1–10 scale and languages |
| `/courses` | Completed and in-progress courses, rendered from `app/data/courses.ts` |
| `/contacts` | Social links (GitHub, LinkedIn, Telegram, Instagram, email) with inline SVG brand icons |
| `/now` | Current work and learning focus, with an explicit update date |
| `/uses` | Languages, frameworks, storage, tools and platforms |

Beyond the pages:

- **Terminal design system** — shared CSS variables and a reusable `.terminal-card` surface in `app/assets/css/main.css`.
- **One-time boot intro** — a terminal boot sequence shown once per browser session; the flag is stored as `jaraslau-intro-seen` in `sessionStorage`.
- **Pointer effects** — a soft glow follows the cursor and left clicks emit expanding waves, implemented in `ClickPulse.vue`.
- **Reduced motion respected** — the boot screen, glow and waves are skipped when `prefers-reduced-motion: reduce` is set, and are disabled on coarse pointers.
- **Per-page SEO** — titles and descriptions are set with `useSeoMeta`; global metadata, the language attribute and the font preconnect live in `nuxt.config.ts`.
- **Explicit 404** — an unknown project slug throws a Nuxt 404 via `createError`.

## Tech Stack

- **Nuxt 4** — application framework; `nuxt generate` produces the static site.
- **Vue 3** — pages and components, written with `<script setup>` and the Composition API.
- **TypeScript** — the `Project` type in `app/data/projects.ts` and typed component props.
- **Tailwind CSS** via `@nuxtjs/tailwindcss` — utility classes for layout and spacing; brand tokens and custom effects live in `main.css`.
- **JetBrains Mono** — the single typeface, loaded from Google Fonts.
- **GitHub Actions + GitHub Pages** — build and deploy on every push to `main`.
- **Cloudflare DNS** — points the apex domain at GitHub Pages.

## Quick Start

### Requirements

- Node.js 22 (the version used in CI)
- npm

### Install and run

```bash
npm install
npm run dev
```

The development server starts at [http://localhost:3000](http://localhost:3000).

Other scripts from `package.json`:

| Command | What it does |
|---|---|
| `npm run build` | Production Nuxt build |
| `npm run preview` | Preview the production build locally |
| `npm run generate` | Generate the fully static site into `.output/public` |

`postinstall` runs `nuxt prepare`, so types are generated right after installation.

### Environment variables

No `.env` file is required. One optional variable is read in `nuxt.config.ts`:

| Variable | Default | Purpose |
|---|---|---|
| `NUXT_APP_BASE_URL` | `/` | Overrides the app base URL, for example for sub-path hosting |

## Project Structure

```text
app/
  app.vue                     # root component: ClickPulse + layout + page
  layouts/
    default.vue               # header, main container, footer
  components/
    AppHeader.vue             # sticky navigation and GitHub link
    AppFooter.vue             # copyright and status line
    ProjectCard.vue           # project card used on / and /projects
    ClickPulse.vue            # cursor glow, click waves, boot intro
  pages/
    index.vue                 # home
    projects/index.vue        # project archive
    projects/[slug].vue       # project case page
    about.vue
    now.vue
    uses.vue
  data/
    projects.ts               # project entries and the Project type
  assets/css/
    main.css                  # design tokens, base styles, terminal card
public/
  CNAME                       # jaraslau.dev
  favicon.ico
  robots.txt
.github/workflows/
  deploy.yml                  # build and publish to GitHub Pages
nuxt.config.ts                # modules, SEO defaults, prerender routes
package.json
tsconfig.json
```

## Project Data

The content lives in JSON files under `app/data/` — `projects.json` (portfolio entries), `profile.json` (socials, stack levels, languages, career, events) and `courses.json`. Thin TypeScript wrappers (`projects.ts`, `profile.ts`, `courses.ts`) add the types. Each project entry carries `slug`, `name`, `type`, `description`, optional `badges` (rendered as `#chips`), `stack`, optional `tools` (kebab-case chips in the team block), `status`, `year`, `role`, `features`, `repo`, an optional `site`, `language`, `stars`, `updated` and a `team` (solo or members with roles; the team lead is highlighted).

`nuxt.config.ts` imports the same array and prerenders `/projects/<slug>` for every entry, so adding a project means adding one object — no extra route file is needed. The current entries mirror every public GitHub repository: Trackly, Moby Family (hackathon), Kvarta Landing, Avela, jaraslau.dev, Burmalda Bot, Trackly Site, MRC Schedule and Calcify.

### Content admin

Run `npm run admin` — an interactive terminal menu to edit content without touching code: list and add projects (with life periods — a single date, a range, or an ongoing `now` status), add events, add/remove `#badges` and tools, change stack skill levels, add new skills, rebuild the site, and commit & push (the push triggers the Pages deploy automatically). Timeline ordering is automatic everywhere: newest first in life shows first on the site, older entries shift right/down.

Repository statistics are committed values, not live data: the site does not call the GitHub API at runtime. Stars and update dates change only when the data file is edited.

## Deployment

Every push to `main` (or a manual `workflow_dispatch`) runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. checkout the repository;
2. install Node.js 22 with npm caching;
3. run `npm ci`;
4. run `npm run generate`;
5. publish `.output/public` to the `gh-pages` branch with `peaceiris/actions-gh-pages@v4`.

The workflow uses the default `GITHUB_TOKEN` with `contents: write` and `force_orphan: true`, so the published branch always contains a single commit. The custom domain is configured through [`public/CNAME`](public/CNAME) (`jaraslau.dev`); DNS for the apex domain is managed in Cloudflare.

Workflow runs are serialized in the `pages` concurrency group, and an in-progress run is cancelled when a newer one starts.

## License

Released under the [MIT License](LICENSE). You are free to use, modify and distribute the code as long as the copyright notice and permission notice are preserved.

---

<div align="center">

Built and maintained by **[Jaraslau Kunin](https://github.com/jaraslaukunin)**.

If you find the site or its code useful, consider giving the [repository](https://github.com/jaraslaukunin/jaraslau-dev) a ⭐

</div>
