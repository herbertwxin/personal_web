# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # TypeScript compile + Vite bundle
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier write
npm run type-check   # tsc --noEmit
npm run test         # Vitest watch mode
npm run test:run     # Vitest single run
```

## Architecture

This is a **React + Vite SPA** (not Next.js) — a personal academic portfolio for Herbert Xin, economics PhD candidate.

### Routing

No React Router or Next.js. Routing is pure React state in `App.tsx`: a `currentPage` string drives a switch/render to lazily-loaded page components. Navigation is handled by the `StaggeredMenu` component and internal link clicks that call `setCurrentPage`.

Routes: `/` (home), `/stack` (model list), `/stack-model/:id` (LaTeX model detail), `/publications`, `/resume`, `/teaching`, `/blog`, `/blog/:id`.

### Content Data

All content is **static and bundled** — no API calls:
- `lib/stackModels.ts` — macroeconomics model metadata + LaTeX file paths
- `lib/blogPosts.ts` — blog posts with inline markdown content
- `public/` — PDFs and static assets served directly

### LaTeX & Markdown Rendering

- `components/NewLaTeXRenderer.tsx` — KaTeX-based renderer that loads `.tex` files from `/lib`
- `components/MarkdownRenderer.tsx` — custom markdown renderer
- `components/TableOfContents.tsx` — auto-generated from headings

### Styling

Dark theme throughout. Primary accent: `#B19EEF` (purple-blue). Tailwind CSS with class-based dark mode. Custom design tokens and animations are defined in `tailwind.config.js`. shadcn/ui components (zinc base, `components.json`).

### Path Aliases

TypeScript and Vite both resolve `@/*` to the project root. Available: `@/components/*`, `@/lib/*`, `@/types/*`, `@/hooks/*`, `@/ui/*`.

### Performance

Pages are code-split via `React.lazy()` + `Suspense`. Vite pre-bundles React, Framer Motion, and Radix UI; defers Recharts and Embla Carousel. Asset inline threshold: 4KB.
