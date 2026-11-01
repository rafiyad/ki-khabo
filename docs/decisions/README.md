# Decisions

Important decisions and the reasons behind them, so nobody has to re-argue them later.
Copy [_template.md](_template.md) to `NNNN-short-title.md` for each new one.

| # | Decision | Date | Status |
| --- | --- | --- | --- |
| [0001](0001-framework-nextjs.md) | Next.js + TypeScript + Tailwind CSS | 2026-10-31 | Replaced by 0004 |
| [0002](0002-hosting-vercel.md) | Host on Vercel, deploy from GitHub | 2026-10-31 | Accepted |
| [0003](0003-data-static-json.md) | Catalog data in typed files, no database | 2026-10-31 | Accepted |
| [0004](0004-vite-react-pwa.md) | Vite + React installable web app | 2026-10-31 | Accepted |
| [0005](0005-no-backend.md) | No backend for the MVP (no Spring Boot) | 2026-10-31 | Accepted; live counters changed by 0006 |
| [0006](0006-live-counters.md) | Live counters: Vercel Function + Redis (Upstash or `REDIS_URL`) | 2026-11-01 | Accepted |
