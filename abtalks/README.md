# ABTalks — Redesign

A mobile-first (390px) redesign of ABTalks' 60-day coding challenge product:
Landing → Dashboard → Challenge Day, built with mocked data.

## Route Map

```text
/
/dashboard
/day/12
```

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

Static SPA — deploy the `dist/` folder to Vercel or Netlify.
`vercel.json` is included to handle client-side routing (`/day/12` etc.)
on refresh/direct-load.

## Stack

- Vite + React + React Router
- Tailwind CSS
- No backend — all data comes from `src/data/mock.json`

## Design approach

- **Dark, terminal-adjacent palette** (deep indigo-navy, not pure black) —
  chosen because the brief explicitly says students use this late at night,
  and the audience already lives in GitHub/VS Code dark themes.
- **The Proof Grid** (`src/components/ProofGrid.jsx`) is the signature
  device: a 60-cell heatmap styled after the GitHub contribution graph —
  the students' own visual language — reused on all three screens
  (aspirational preview on landing, real progress on dashboard, a
  compact slice on the day page).
- **Type**: Space Grotesk for display, Inter for body, JetBrains Mono for
  streak counts / day numbers / proof status — mono type signals "this is
  data," which matters for a product about verifiable proof of work.

## Edge cases handled

- **First day, no streak** — Dashboard has a "Day 1 (no streak yet)" demo
  state: streak shows 0 with a "light your first flame" prompt instead of
  a broken UI, and no badges are pre-earned.
- **A missed day** — the default dashboard data includes Day 8 as missed.
  The streak card explicitly calls out *which* day broke the streak and
  reassures the student their history stays visible rather than hiding it.
  The Proof Grid renders missed days as a hollow red ring, distinct from
  "upcoming" (dim) and "done" (filled), so the state is always legible at
  a glance.
- **Empty profile** — a "Empty profile" demo state on the Dashboard shows
  a student who hasn't picked a track yet: no streak, no rank, no badges,
  and a single clear call to action ("Choose your track") instead of a
  half-populated dashboard.
- **Unknown day route** (e.g. `/day/45` before it unlocks) — `ChallengeDay`
  falls back to a friendly "not available yet" state with a link back to
  today's actual task, instead of a blank page or crash.

A small "preview:" switcher at the top of `/dashboard` lets you toggle
between these states without needing separate logins — useful for review,
since the product has no real auth in this build.

## Thoughtful addition: Streak Freeze

Students on this platform are college students coding late at night,
which means exam weeks and one-off bad days are inevitable. Losing a
30-day visible streak to a single bad night discourages exactly the
consistency the product is trying to build. The **Streak Freeze**
(one every 15 days) lets a student protect against *one* missed day —
but the frozen day is marked distinctly, never disguised as a real
submission, so the profile a recruiter sees stays honest. It's shown on
the Dashboard's streak card.
