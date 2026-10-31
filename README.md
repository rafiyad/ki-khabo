# কি খাবো? (Ki Khabo?)

**খাবার আছে, টাকা আছে, ক্ষুধাও আছে — কিন্তু কী খাবো বুঝতেছি না!**

A funny food-choosing app for people who don't know what to eat. Answer a few questions (gender, age, mood, meal time, budget) and get a dish with a funny Bengali explanation, a food wheel, a food battle and a shareable meme card. 3 chances a day. No sign-up.

An installable web app built with Vite, React, TypeScript and Tailwind CSS. It's hosted free on Vercel, with no backend.

## Run it locally

Requires Node 24.

```bash
npm install
npm run dev       # http://localhost:5173
npm test          # unit tests (Vitest)
npm run lint      # oxlint
npm run build     # type-check + production build
npm run preview   # serve the build at http://localhost:4173
```

## Deploy

Import the repo in Vercel. It detects Vite automatically, and `vercel.json` handles deep links.

## Docs

See [docs/](docs/README.md) for the brief, architecture, features, sprints, decisions, progress and next steps.
