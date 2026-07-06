# fotiosmpouris.com — Personal Site & Portfolio

Live at **[fotiosmpouris.com](https://fotiosmpouris.com)**

Built with HTML, CSS, and JavaScript. Served via GitHub Pages. No frameworks, no build step — just production code and atmosphere.

---

## What This Is

A personal portfolio site designed as a cinematic scroll experience: sky video backgrounds, procedural canvas atmosphere, GSAP-driven animations, and a typewriter hero sequence. The writing is first-person and direct. The aesthetic is atmospheric and luminous.

The site documents four production AI systems built and operated by Fotios Mpouris, plus the Poor People App — a platform for community care coordination targeting families, veterans, first responders, and underserved communities.

---

## Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `index.html` | Cinematic hero sequence, origin story, evidence blocks, method section |
| The Work | `the-work.html` | Project cards for all active builds |
| The Stack | `the-stack.html` | Technical background, skill grid, infrastructure overview |
| OpenCare | `opencare.html` | Deep-dive on the Poor People App / OpenCare / PPA architecture |

---

## Core Systems Documented

- **Poor People App / OpenCare** — Care coordination platform for families. Live at [opencare.poorpeople.app](https://opencare.poorpeople.app)
- **Hard-E** — Voice AI sales agent for home service contractors. 21 CRM tools, real-time WebRTC voice, 3-tier memory. [harde.app](https://harde.app)
- **All Angles Exterior** — AI-enriched lead pipeline with GPT-4o vision and Perplexity property research. [aaexterior.com](https://aaexterior.com)
- **Ethos** — Personal autonomous agent on Hermes (NousResearch). 24/7, voice-enabled via Telegram, 100+ page living knowledge base.

---

## Technical Architecture

```
index.html / the-work.html / the-stack.html / opencare.html
       ↓
style.css          — Design system, glass effects, animations, responsive
script.js          — Cinematic hero sequence, GSAP scroll, hamburger nav
atmosphere.js      — Procedural canvas background (particles, god-rays)
```

**Key CSS variables:** `--accent-sky: #5B9FD4`, `--text-primary: #1A1D23`, `--glass: rgba(255,255,255,0.68)`

**Mobile nav:** Body-level `#mobile-nav-overlay` (not inside header) to avoid `position:fixed` inside transformed-ancestor clipping bug.

**Hero animation:** Data-driven cinematic sequence via `data-cinematic` attribute on `h1`. Each phrase set: large text types in → pause → small sub-phrase fades in → both hold → both fade out → next set.

**Deployment:** GitHub Pages from `main` branch. `.nojekyll` present to skip Jekyll processing.

---

## Notes for Future Development

- `whitepaper-notes.md` — Conceptual material for the Poor People App white paper (harness concept, Nostr security argument, military/veteran reciprocal ecosystem)
- `AGENTS.md` — Context file for AI coding assistants
- Do not push to the `backup` remote — it is a snapshot of the pre-redesign site
- All edits go to `origin` (resumeTesting) only

---

*People are the solution.*
