# 0001: Use Next.js + TypeScript + Tailwind CSS

**Date:** 2026-10-31
**Status:** Replaced by [0004](0004-vite-react-pwa.md)

## Context

ki-khabo is a small, fun website built on Node.js and hosted on Vercel. We want something quick to build, free to host, and easy to extend if the idea grows.

## Options considered

1. **Next.js (App Router)**: built by Vercel, so it deploys with no configuration. Pages can be fully static, and API routes are available later if needed. A bit more framework than a tiny site strictly needs.
2. **Vite + React**: very light and fast to develop. Static only, so any backend logic would need a separate setup.
3. **Astro**: excellent for content sites with little JavaScript. Less natural for a highly interactive "spin and pick" style UI.
4. **Express server**: full control, but more code to write for a simple site, and it runs as serverless functions on Vercel rather than as a long-running server.

## Decision

- **Next.js (latest stable) with the App Router**, scaffolded with `create-next-app`
- **TypeScript**, to catch mistakes early at almost no cost
- **Tailwind CSS**, for fast styling without separate CSS files
- **ESLint** (the `create-next-app` default) for linting
- **npm** as the package manager, and **Node 24 LTS** (`"engines": { "node": "24.x" }`)

## Consequences

- Zero-config deploys on Vercel, with preview URLs for every branch or PR.
- Pages are static by default, so the site is served from Vercel's CDN: fast and free.
- If we later need server logic (saving favorites, calling an external API), we add a Route Handler in `app/api/` with no new infrastructure.
