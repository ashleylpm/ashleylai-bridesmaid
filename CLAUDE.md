# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at localhost:5173
npm run build    # tsc type check + vite production build
npm run preview  # serve the production build locally
```

There are no tests. Type-check only with:
```bash
npx tsc --noEmit -p tsconfig.app.json
```

Install always uses the public registry (configured in `.npmrc`) to bypass the corporate Nexus proxy:
```bash
npm install
```

## Architecture

This is a static single-page app (Vite + React + TypeScript) with no backend. Deployed to Vercel; `vercel.json` rewrites all routes to `index.html` for client-side routing.

### Routing

Each bridesmaid gets a personal URL (`/annabel`, `/lauren`, `/chelsea`, `/alison`). Routes are generated dynamically in `App.tsx` from `config.bridesmaids` — adding a bridesmaid to the config automatically creates their route. Any unknown path renders `NotFound`.

### Single source of truth: `src/config.ts`

All content (names, messages, photos, dates, proposal copy) lives in one exported `config` object. Components never hardcode strings. To add a bridesmaid, add a key to `config.bridesmaids` matching the desired URL slug — routing and the page both pick it up automatically.

Photo paths in config are relative to `public/`. Placeholders render the person's initial when the image 404s (`onError` fallback in `PersonalCard` and `PhotoGallery`).

### Page structure

`BridesmaidPage` composes the full scroll experience in fixed section order: `Envelope → Hero → PersonalCard → PhotoGallery → Countdown → BigQuestion → Footer`, with `FloralDivider` between sections. All content is driven by the `bridesmaid` prop passed from the route.

### Design tokens

`src/tokens.css` defines all colors, fonts, spacing, shadows, and transitions as CSS custom properties. `src/global.css` imports tokens, sets resets, and defines all shared `@keyframes`. Components use CSS Modules (`.module.css` co-located with each component) and reference tokens via `var(--*)`.

### Key interaction details

- **Envelope**: CSS 3D flip (`rotateX` on the flap, `perspective: 1000px` on parent). State lives in `Envelope.tsx`. The inner card slides up via `translateY` after the flap opens.
- **Dodging NO button**: `DodgingButton.tsx` holds absolute position state. `onMouseEnter` recalculates a random position within the parent container bounds. On touch, `preventDefault()` fires before the tap registers. The dodge area container (`dodgeArea` class in `BigQuestion.module.css`) is `position: relative` with a fixed min-height to constrain movement.
- **Countdown**: `useCountdown` hook (`src/hooks/useCountdown.ts`) uses a `setInterval` and computes diff from the ISO date string in config (which encodes `+08:00` so Malaysia time is correct in any viewer timezone).
- **Confetti**: `canvas-confetti` fires two bursts from left and right on YES, then React state replaces the question UI with the celebration message.

### Reduced motion

`global.css` has a blanket `prefers-reduced-motion` rule disabling all animations. `FloatingPetals` also checks `window.matchMedia` and renders nothing when reduced motion is preferred.
