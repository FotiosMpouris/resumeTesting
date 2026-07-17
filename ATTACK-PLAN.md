# ATTACK PLAN — Fotios's Execution Playbook

_Rewritten July 16, 2026 with full step-by-step detail. Read `MISSION-CONTROL.md` first if you're lost — it's the map; this is the marching order. Re-read this every Monday; update every 30 days._

**The priority stack (when anything conflicts, higher wins):**
1. **PPA build** (per `poorpeopleapp/claude-project-docs/PPA-FOUNDATION-BUILD-PLAN.md`)
2. **All Angles** (per `all-angles-exterior-/ALL-ANGLES-AGENT-CRM-ROADMAP.md`)
3. **Promotion** (per `BUILDER-GTM-PLAN.md`, 60 min/day cap)
4. **Ethos** (its own roadmap; quality-of-life only)
5. **Hard E** (dormant until All Angles AA-2 or the open-source extraction)

---

## STEP 0 — Housekeeping (do once, ~45 minutes total)

**0.1 Merge the poorpeopleapp branch (10 min).** This is the only unmerged repo.
- Go to: https://github.com/FotiosMpouris/poorpeopleapp/compare/main...claude/poorpeopleapp-foundation-plan-ymb0et
- Click "Create pull request" → title it "PPA Foundation Build Plan" → "Create" → "Merge pull request" → "Delete branch."
- The other three repos (Ethos, resumeTesting, all-angles) you already merged ✅ — but resumeTesting and all-angles received NEW commits after your merges (this file, MISSION-CONTROL, SITE-COPY-PACK, FOR-JIM updates). Repeat the same compare→PR→merge for their `claude/…` branches one more time.

**0.2 Send Jim the security fixes (5 min to send, 30 for him).**
- Text him: "Before anything else — two Claude API keys and your Telegram bot token are sitting in plain text in the shared Ace folder. Treat them as stolen. I'm sending a doc with the 30-minute fix." Then send him `FOR-JIM-THE-PLAN-IN-PLAIN-ENGLISH.md` Part 2 (or walk him through it on a call).

**0.3 Verify your five Cursor projects are synced (10 min).**
- Open each Cursor project → terminal → `git checkout main && git pull`. Now every project's files match GitHub, and every project agent can see its plan document.

**0.4 X account prep (20 min).**
- Bio: `Building @PoorPeopleApp — AI agents for care, recovery & community. Live: opencare.poorpeople.app. I also set up agents for businesses — DMs open.`
- (Create the @PoorPeopleApp handle too if it's free — even parked, it protects the name.)
- Follow ~30 accounts: agent builders, Nous/Hermes community, Boston tech, care-economy voices. This seeds your feed so the daily reply block has targets.

---

## WEEK 1 — Ignition

**Day 1 — PPA P0 green light (your effort: one instruction; the agent does the rest).**
Open the PPA Cursor project and say exactly this:
> "Read claude-project-docs/PPA-FOUNDATION-BUILD-PLAN.md, Section 11 first, then Section 6. Execute Phase P0 item by item: CI with smoke tests, SSL webroot fix, secrets to SSM, backups + restore drill, the agent-ACL chokepoint, Persona to production. One item per session. Start with CI. Show me your plan for the item before you touch anything."
Review what it proposes, approve, let it work. Repeat per item across the week. **P0 is mostly agent-work; your job is review and the two credentials only you hold (AWS console, Persona dashboard).**

**Day 1 (same day) — First post.** One tweet: what you're building, that it's live, that you'll be posting the build daily. Screenshot of OpenCare. No thread, no perfection. This breaks the seal.

**Day 2–3 — Jim meeting (1 hour).** Agenda in order: (1) security fixes confirmed done; (2) walk FOR-JIM doc Part 1 (the plan) and Part 3 (the platform question — let him keep ChatGPT curiosity, show him it plugs in via MCP); (3) confirm the §8 open questions: infrastructure in All Angles' accounts, Ace's tools get pointed at the Job Hub, PLAUD lead flow shape; (4) agree what "done" looks like for AA-1.

**Day 3–5 — Resume site copy applied (agent work, 1 evening).**
Open the resumeTesting Cursor project and say:
> "Read SITE-COPY-PACK.md and apply it exactly per its instructions. Do not change the design system. Show me a diff summary per file before committing."

**Day 5 — Daily rhythm starts for real:** 15-min reply block + build-log post (what P0 shipped this week — there will be real material by Friday).

## WEEKS 2–4 — Two Tracks + Cadence

- **PPA:** P1 begins — Recover E **chat** interface first (instruction to the PPA agent: "P0 is verified done; begin P1 per the plan: chat UI in recovery circle pages, then the voice pipeline port"). Voice follows. When Recover E speaks for the first time: that's your first big clip — plan a real 90-second video.
- **All Angles:** AA-1 (Job Hub tables + website lead rewire) — two evenings/week ceiling. Instruction to that Cursor agent: "Read ALL-ANGLES-AGENT-CRM-ROADMAP.md. Execute AA-1: create the 8 Job Hub tables in the site's existing Supabase, then add a Job Hub write to /api/contact in parallel with the existing flow. MCP server interface per the roadmap. Show schema before creating."
- **Promotion:** 3 build logs/wk + daily replies + Friday wrap post. First demo clip when chat UI works.
- **Background:** start Loom transcription batch (Deepgram, cheap) — it feeds All Angles AA-4 and Hard E's knowledge story later.

## WEEKS 5–8 — The Demo Season

- PPA P1 voice live (**Recover E speaks** — the year's best clip) + P2 Demos foundation on its own Lightsail instance.
- All Angles AA-2: Hard E rewired to the Job Hub — which doubles as the start of the open-source harness extraction (same code, two payoffs).
- First "come test OpenCare" cohort invite (GTM plan §4 invitation loop).
- First in-person event attended (Venture Café Cambridge or Code for Boston — GTM §10; 3 real conversations, follow up within 24h).

---

## THE WEEKLY RHYTHM (steady state — print this part)

| When | What | Time |
|---|---|---|
| **Mon AM** | Read this page. Pick the week's ONE priority per active project (max 3 active). Write them as three lines somewhere you'll see. | 15 min |
| **Mon–Fri** | PPA build block (agent-driven; your review). | your call |
| **Tue + Thu eve** | All Angles block (hard ceiling: two evenings). | 2×2 hrs |
| **Daily** | X: 15-min reply block; build-log post 3–5×/wk (voice-memo → Ethos drafts → you edit). | ≤60 min |
| **Fri PM** | Wrap post + record the week's 5 numbers (GTM §8: demo requests, conversations, activated circles, stars, white-glove inquiries). | 20 min |
| **Monthly** | One in-person event. 30-day review: retire what produced nothing; update this file + MISSION-CONTROL. | ½ day |

## STANDING RULES

1. **One demo moment per month minimum** — chat UI → voice → Demos → funding-intel → pilot results. The calendar is built around them.
2. **Nothing new enters the stack** unless something leaves. Five projects is the ceiling and you're at it.
3. **Division of labor:** agents write the code and long documents; you make decisions, review, film, talk to humans (Jim, pilots, events). When you catch yourself hand-writing code or docs an agent could produce, stop and delegate.
4. **Every Cursor session starts the same way:** `git pull` → "read the plan doc, tell me where we left off" → assign ONE item.
5. **If a week collapses:** protect the PPA build block and the Monday reset. Everything else skips cleanly and resumes.
