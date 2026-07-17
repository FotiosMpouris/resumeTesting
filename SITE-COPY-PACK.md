# SITE-COPY-PACK — Ready-to-Apply Copy for fotiosmpouris.com

_Created July 16, 2026. Instructions for the Cursor agent working this repo: apply each block to its target file. Preserve the design system (Luminous Glass), the existing HTML structure, and the tagline rotation. This copy follows SITE-STRATEGY.md voice rules — specific numbers, no kill-list phrases, no forced sentences. Fotios reviews every diff; tone edits are his to make._

---

## BLOCK 1 — `ppa.html` corrections (the overdue sync)

**Find-and-replace fixes (do all of these):**
1. Every instance of "TheGreekClawd" or "TGC" → **"Ethos"**.
2. Any sentence asserting Bitcoin necessity (e.g., "it's a necessity") → replace with: *"We are investigating Bitcoin as a treasury reserve — carefully, with counsel, and after the product earns it."*
3. Remove the five-tier agent table if still present (per whitepaper-notes.md pending items). Replace with BLOCK 2's narrative.

## BLOCK 2 — `ppa.html` new section: "The Agents Are Real Now"

> **The Agents Are Real Now**
>
> The white paper described an AI workforce. Here's what's actually running.
>
> **OpenCare** — live care coordination at opencare.poorpeople.app. Circles, tasks, contacts, digests, ID verification. Built because coordinating my own parents' care across siblings, doctors, and insurance offices needed it to exist. Free, bilingual, installable on a phone.
>
> **Recover E** — an AI recovery companion living inside OpenCare's recovery circles. Its own memory, its own personality, tools that read and write real recovery data. Voice is next: real-time conversation, not chatbot menus.
>
> **Demos** — the platform agent now in build, named for δῆμος: the people. One agent, many skills — care coordination, recovery support, and community funding intelligence that reads federal spending data and finds grants a neighborhood could actually apply for.
>
> Three agents, one boundary: they serve users, never surveil them. Recovery data never leaves its vault, crisis resources never depend on an AI's judgment, and the whole thing runs on infrastructure a family could afford — because it has to.

## BLOCK 3 — `ppa.html` new section: "What's Next" (replaces any stale roadmap text)

> **What's Next**
>
> The build plan is public inside the repo and it's sequenced, not dreamed: voice for Recover E, Demos managing real circles, a contribution ledger where verified help earns access — never speculation — and a Sentinel program where retired military, EMTs, and first responders review the people entering vulnerable homes. Care coordination first. Marketplace when the trust layer has earned it.

## BLOCK 4 — Homepage: the "Follow the Build" door

Add beneath the existing evidence blocks (style: match existing glass panels):

> **Follow the Build**
>
> Everything here ships in public — the wins, the broken deploys, the real costs. Build logs on X, demos as they land, and early access when new pieces open up.
>
> [Follow on X →]  [See what's live →](https://opencare.poorpeople.app)

(Cursor agent: link the X button to Fotios's profile once he confirms the handle; until then leave an `href="#"` with a `TODO` comment.)

## BLOCK 5 — `hard-e-technical.html` reframe (top of page, replacing Leap-centric intro)

> **Hard E — the harness that keeps getting reborn**
>
> Hard E started as a voice-first AI sales engineer for exterior contracting: Pipecat pipeline, ~1-second round-trip voice, tool calls into a live CRM, product knowledge deep enough to talk James Hardie installation details. That system now lives three lives: the original build, the recovery companion it was re-souled into (Recover E), and an agent-run back office being built for a real Massachusetts contractor. The CRM it was first wired to is gone; the harness outlived it — which was always the bet.

## BLOCK 6 — `the-work.html` status lines (add/update per card)

- **PPA / OpenCare:** "Live in production · care circles coordinating real families · bilingual · free"
- **Ethos:** "Running 24/7 since June 2026 · Hermes framework · $2–4/day in tokens"
- **Recover E:** "Backend live · 8 tools · voice pipeline in port"
- **Demos:** "In build · the Poor People App platform agent"
- **All Angles:** "Live site + AI lead pipeline · agent-run back office in build"

---

## APPLICATION NOTES (for the Cursor agent)

- Apply blocks 1–3 to `ppa.html`, block 4 to `index.html`, block 5 to `hard-e-technical.html`, block 6 to `the-work.html`.
- Do not invent numbers beyond those written here; where a stat is unknown, omit the sentence.
- Keep every heading in the site's existing typographic hierarchy; these blocks are copy, not markup mandates.
- After applying, run the site locally and hand Fotios a per-file diff summary for tone review before pushing.
