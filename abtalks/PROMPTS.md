# PROMPTS.md — AI Usage Log

This project was initially developed with Claude (Anthropic) as an AI
pair-programming assistant during the early implementation phase.

**Important:** This log documents the initial AI-assisted build process only.
After the initial implementation, the project was substantially reviewed,
modified, debugged, redesigned, and extended by the project team. The final
submitted version is not necessarily identical to the version produced
during the logged AI-assisted build sequence.

The team made additional changes to the UI, functionality, code structure,
styling, content, and overall implementation after the initial AI-assisted
generation. Therefore, the entries below should be understood as a record of
the AI's contribution during the initial development stage, not as a claim
that Claude independently created the entire final project.

## 1. Brief intake

Prompt: Full ABTalks hackathon brief was provided — three-screen redesign
(`/`, `/dashboard`, `/day/12`), mobile-first at 390px, mocked data, no auth.

**Initial Claude contribution**
Claude assisted with:
- Reading the internal frontend-design guidance before writing code.
- Suggesting a design direction derived from the brief's content
  (GitHub commits + LinkedIn posts + late-night student usage).
- Proposing a dark indigo-navy palette, a GitHub-contribution-graph-inspired
  "Proof Grid," and a Space Grotesk / Inter / JetBrains Mono type system.

**Subsequent team work**
After the initial AI-assisted implementation, the team independently
reviewed and modified the project. This included changes to the design, UI,
content, functionality, component behavior, styling, and/or code as required
during development and testing.

## 2. Project scaffolding

Claude initially assisted with scaffolding a Vite + React + React Router +
Tailwind project and establishing the initial project structure.

The team subsequently worked on the generated codebase and made additional
changes and corrections throughout development.

## 3. Mock data

Claude initially assisted in creating mock data covering the edge cases
described in the brief.

The team subsequently reviewed and modified the data and application
behavior to better match the final project requirements.

## 4. Signature component — ProofGrid

Claude initially assisted with the implementation of the ProofGrid
component.

The team subsequently reviewed, modified, and integrated the component into
the final application as part of the overall UI and functionality.

## 5. Three screens

Claude initially assisted with the first implementation of:
- `src/pages/Landing.jsx`
- `src/pages/Dashboard.jsx`
- `src/pages/ChallengeDay.jsx`

The team subsequently made substantial changes to these screens and their
supporting components, styling, content, interactions, and functionality.
The final versions of these screens should therefore be considered the
result of team development with AI assistance, rather than solely
Claude-generated work.

Team commits after the initial build included, among others:
- "Highlight completed daily tasks" (Dashboard)
- "Show completed days in progress card" (Dashboard)
- "Improve navigation active states"
- "Improve landing page hero messaging" (Landing)
- "Fix formatting of showNav assignment"

## 6. Verification

Claude initially assisted with build verification by running:

\`\`\`bash
npm install
npm run build
\`\`\`

The team subsequently performed additional development, testing, debugging,
and verification while preparing the final submission.

## 7. Deployment and debugging

The team handled deployment to Vercel, including resolving a subdirectory
routing configuration issue (setting the project Root Directory and
Framework Preset so the build tool could locate and build the app correctly)
and adding SPA rewrite rules via `vercel.json` for client-side routing on
direct page loads.

The team also diagnosed and fixed a production-only bug: a later edit to
`Dashboard.jsx` introduced a reference to a variable (`todayEntry`) outside
its component scope, causing a runtime `ReferenceError` that blanked the
app. This was root-caused via browser console inspection and fixed by
reverting the affected component to its original styling.

## Notes

- Claude/AI tools were used as development assistance during the project.
- The team reviewed, edited, modified, debugged, and extended the generated
  implementation.
- The final project contains team-authored changes beyond the initial
  AI-assisted implementation.
- This document records the AI-assisted portion of development and should
  not be interpreted as a complete attribution of every part of the final
  codebase to Claude.
- No copyrighted third-party copy, images, or code were intentionally
  reproduced.