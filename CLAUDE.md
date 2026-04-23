# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MediaPlan Pro — an AI-powered media planning UI application. Currently a frontend-only React SPA with mock data (no backend/API). All data lives in `src/data/mock-data.ts`.

## Commands

- **Dev server:** `npm run dev` (Vite, default port 5173)
- **Build:** `npm run build` (runs `tsc -b && vite build`, output in `dist/`)
- **Lint:** `npm run lint` (ESLint with TypeScript + React hooks plugins)
- **Type check only:** `npx tsc -b` (no emit, checks types across the project)
- **Preview prod build:** `npm run preview`
- **Test:** `npm test` (Vitest, single run) or `npm run test:watch` (watch mode)

Tests live alongside source as `*.test.ts` / `*.test.tsx` under `src/`. Config is in `vitest.config.ts` (Node environment — jsdom/RTL will be added when component tests land).

## Architecture

React 19 + TypeScript + Vite + Tailwind CSS v4 (via `@tailwindcss/vite` plugin). Routing via `react-router-dom` v7.

### Routing & Layout

`src/App.tsx` defines all routes inside a single `<AppLayout>` wrapper:

| Route | Page Component | Purpose |
|-------|---------------|---------|
| `/` | `Dashboard` | Stats cards, quick actions, recent plans table |
| `/chat` | `Chat` | Multi-conversation chat UI with mock AI responses |
| `/files` | `FileUpload` | Drag-and-drop file upload with simulated progress |
| `/plans` | `MediaPlans` | Filterable/sortable plans list (table + card views) |

`AppLayout` (`src/layouts/AppLayout.tsx`) renders a fixed dark sidebar (nav + user info) and an `<Outlet>` for page content.

### Data Layer

All types (`MediaPlan`, `ChatMessage`, `Conversation`, `UploadedFile`) and mock data are exported from `src/data/mock-data.ts`. Utility functions `formatCurrency` and `formatFileSize` live there too. There is no API layer — pages import mock data directly.

### Styling

Tailwind CSS v4 with a custom theme defined in `src/index.css` via `@theme` directive. Key design tokens: `--color-primary` (blue), `--color-sidebar` (dark slate), `--color-surface` (cool gray). Most styling uses inline Tailwind classes with hardcoded hex values matching the design spec.

### Stitch Design Prompts

`.stitch/prompts/` contains per-screen design specifications (color palette, layout structure, component details) used to generate the UI. Reference these when modifying screen designs to maintain visual consistency.
