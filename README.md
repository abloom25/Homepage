# Abloom Homepage

Abloom · 唤青的个人主页。这里展示作品、技术栈、开源项目、个人链接，以及一个简单的 Now 页面。

## Features

- Vue 3 + TypeScript single page application
- Responsive personal homepage layout
- Dark and light theme switching
- GitHub profile and repository data integration
- Project cards, skills, contact links, and Now page
- SEO metadata, Open Graph tags, sitemap, robots.txt, and web manifest
- Static deployment support with SPA fallback

## Tech Stack

- Vue 3
- Vue Router
- TypeScript
- Vite
- SCSS
- pnpm

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm run dev
```

Run type checking:

```bash
pnpm run check
```

Build for production:

```bash
pnpm run build
```

Preview the production build:

```bash
pnpm run preview
```

## Project Structure

```text
src/
  components/     Reusable Vue components
  composables/    Vue composables for theme, time, GitHub data, and scroll state
  config/         Site content and project configuration
  pages/          Route-level pages
  router/         Vue Router setup
  styles/         Global SCSS tokens, base styles, layout, and animations
public/           Static assets, SEO files, manifest, and deployment helpers
```

## Deployment

The site builds to `dist/` and can be deployed to any static hosting provider.

This repository includes configuration for:

- GitHub Pages
- Vercel
- Cloudflare Pages

For custom domains, update:

- `public/CNAME`
- `src/config/site.ts`
- `public/sitemap.xml`
- `public/robots.txt`
- canonical and Open Graph URLs in `index.html`

## License

This project is licensed under the GNU Affero General Public License v3.0 or later.

SPDX-License-Identifier: `AGPL-3.0-or-later`
