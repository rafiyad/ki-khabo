# Feature: Installable app (PWA)

**Status:** Done
**Sprint:** [Sprint 2](../sprints/sprint-02.md)

## What it does

On a phone, the browser offers "Add to Home Screen". The app then opens full screen with the mascot icon, and keeps working offline after the first visit, since all logic runs on the device.

## How it works

- `vite-plugin-pwa` in `vite.config.ts`: manifest (`name`/`short_name` "কি খাবো?", `lang: bn`, cream theme), `registerType: "autoUpdate"`, precaching of all built files.
- Icons in `public/icons/`: 192, 512, maskable 512, and a 180px Apple touch icon, rendered from the mascot SVG. `public/favicon.svg` is the mascot.

## Acceptance criteria

- [x] Build produces `sw.js` and a manifest with icons
- [ ] Checked on a real Android and iPhone after the first deploy

## Changelog

- 2026-10-31: built
