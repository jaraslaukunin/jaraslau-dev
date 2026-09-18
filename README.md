# jaraslau.dev

Personal website of Jaraslau Kunin — software developer from Minsk, Belarus.

Terminal-inspired dark portfolio built with Nuxt 4, Vue 3 and Tailwind CSS.

## Pages

- `/` — home with featured projects
- `/projects` — project archive
- `/projects/[slug]` — project details with GitHub repo data
- `/about` — bio and skills
- `/now` — what I am working on right now
- `/uses` — languages, frameworks and tools

## Project data

Projects are defined in [`app/data/projects.ts`](app/data/projects.ts). Each entry
contains a link to the GitHub repository, language, stars and last update date.

## Setup

Make sure to install dependencies:

```bash
npm install
```

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview the production build:

```bash
npm run preview
```

Generate a fully static site:

```bash
npm run generate
```

## Deploy

The site is deployed to GitHub Pages automatically on every push to
`main` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

https://jaraslau.dev/

Custom domain is configured through the `public/CNAME` file (apex domain,
A records on Cloudflare pointing to GitHub Pages).

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
