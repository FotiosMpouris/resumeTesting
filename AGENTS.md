# AGENTS.md — Context for AI Coding Assistants

This file gives any AI assistant working on this repo the full context it needs to work effectively without asking unnecessary questions.

---

## What This Repo Is

Personal portfolio site for **Fotios Mpouris** at **fotiosmpouris.com**.
Served via **GitHub Pages** from the `main` branch of the `FotiosMpouris/resumeTesting` repo.
No build step. No framework. Pure HTML/CSS/JS.

---

## Critical Rules

1. **Push to `origin` only** — `origin` = `resumeTesting` (the live site). There is a `backup` remote (`backup_fotiosmpouris_resuma`) that is a pre-redesign snapshot. Never push to it.
2. **`.nojekyll` must stay** — Without it, GitHub Pages tries to run Jekyll and silently fails. Do not delete it.
3. **Do not touch `index.backup.html`, `style.backup.css`, or `script.backup.js`** — These are safety backups. Leave them alone.
4. **PowerShell on Windows** — This repo is on a Windows machine. Use semicolons (`;`) not `&&` between shell commands. No `cat`, `head`, `tail` — use Read tool.

---

## File Map

| File | Role |
|------|------|
| `index.html` | Homepage — cinematic hero, origin cards, evidence blocks, method, door |
| `the-work.html` | Project cards for all active builds |
| `the-stack.html` | Technical background + skill grid |
| `opencare.html` | Poor People App deep-dive page |
| `style.css` | Full design system — edit here for all visual changes |
| `script.js` | Hero sequence, hamburger nav, GSAP scroll, atmosphere warmth |
| `atmosphere.js` | Procedural canvas: particles, god-rays, celestial background |
| `whitepaper-notes.md` | PPA white paper conceptual notes — do not delete |
| `CNAME` | `fotiosmpouris.com` — do not modify |
| `.nojekyll` | Empty file — critical for GitHub Pages — do not delete |

---

## Design System

```css
--accent-sky: #5B9FD4        /* Primary blue — use for labels, links, highlights */
--text-primary: #1A1D23      /* Dark text */
--text-secondary: #5F6478
--text-tertiary: #8A90A5
--glass: rgba(255,255,255,0.68)
--font-display: 'Space Grotesk'
--font-body: 'Inter'
--font-mono: 'JetBrains Mono'
body background: #ffffff      /* Pure white — not grey */
```

---

## Hero Sequence (script.js)

The homepage and Stack page hero text is driven by `data-cinematic` on the `h1` element:

```json
[
  {"large": "Large phrase text.", "small": "Sub-phrase text.", "white": false},
  {"large": "Another phrase.", "small": null, "white": true}
]
```

- `white: true` → large text renders white (for sky backgrounds)
- `small: null` → no sub-phrase for that set
- Sub-phrases appear in `.hero-positioning` element
- Stack page sub-phrases use `.stack-hero .hero-positioning { color: #1a5fa0; }` (darker blue for cloud video)

---

## Mobile Nav

The hamburger menu uses `#mobile-nav-overlay` — a `<div>` that is a **direct child of `<body>`**, NOT inside `<header>`. This is intentional. The header uses `transform: translateY(-100%)` for its scroll-reveal, and `position: fixed` inside a transformed ancestor is clipped to that ancestor's bounding box. The body-level overlay avoids this.

Every page (index, the-work, the-stack, opencare) has this pattern after `</header>`:

```html
<div id="mobile-nav-overlay" class="mobile-nav-overlay">
  <a href="index.html">Home</a>
  <a href="the-work.html">The Work</a>
  <a href="the-stack.html">The Stack</a>
  <a href="opencare.html">OpenCare</a>
</div>
```

---

## Who Fotios Is (for writing context)

- Ran The Grillin Greek restaurant for ~10 years
- Art school background — graphic design, Unity game development
- ~5 years in nonprofit organizations — operations, community coordination
- Self-taught Python / AI systems developer
- Builds and operates four production AI systems: Hard-E, OpenCare, All Angles Exterior, Ethos
- Founded the Poor People App — community care coordination platform targeting families, veterans, first responders, underserved communities
- Voice is authentic, direct, builder-operator — not salesy, not corporate, not a list of buzzwords
- Quotes to remember: *"People are the solution."* / Andrej Karpathy: *"The hottest new programming language is English."*

---

## Current Projects

| System | Stack | Status |
|--------|-------|--------|
| Hard-E | FastAPI, React, Redis, Claude Sonnet 4, Pipecat, Deepgram, Cartesia, EC2 | Production |
| OpenCare | Next.js, Supabase, Clerk, Docker, AWS | Live, free |
| All Angles Exterior | Next.js, Supabase, GPT-4o Vision, Perplexity, AWS | Production |
| Ethos | Hermes (NousResearch), Telegram, AWS Lightsail | Always on |
| Poor People App | Nostr identity, Bitcoin treasury, Lightning payments | In build |

---

## Writing Voice

The site's editorial voice is deliberate. When writing copy:
- First-person "I" or "we" (PPA is a we, personal projects are I)
- No overselling, no hype, no buzzwords
- Karpathy-level confidence — state the thing plainly
- Magazine quality on origin story sections (think Playboy/Maxim feature writing circa 2000 — literary, forward-looking, not listicle)
- "People are the solution" is the north star

Avoid: "leveraging cutting-edge AI", "transformative solutions", "passionate about", "proven track record"
