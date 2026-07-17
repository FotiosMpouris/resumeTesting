# MISSION CONTROL — Every Document, Every Repo, One Map

_Created July 16, 2026. **This is the first document you read. Always.** It tells you what exists, where it lives, what order to read it in, and how to execute. Update it whenever a new plan document is created anywhere in the ecosystem._

---

## 1. The Complete Document Map

### Repo: `poorpeopleapp` (the Poor People App / OpenCare)
**⚠️ MERGE NEEDED — this is the only repo with unmerged work.** Merge branch `claude/poorpeopleapp-foundation-plan-ymb0et` → main (5 commits: the entire PPA plan + Demos naming + AGENT_README updates).
Merge link: https://github.com/FotiosMpouris/poorpeopleapp/compare/main...claude/poorpeopleapp-foundation-plan-ymb0et

| Document | What it is |
|---|---|
| `claude-project-docs/PPA-FOUNDATION-BUILD-PLAN.md` | **The master PPA technical plan** (~900 lines): architecture, honest risk assessment, token (PPC) specification, database schemas, Nostr event registry, phases P0–P6, MVP definition, launch plan, adoption numbers, Founding Member design, community-AI path. The biggest and most important document produced. |
| `AGENT_README.md` (updated) | The repo's single source of truth — now records Demos as the PPA Agent's name in the locked-decisions table. |

### Repo: `Ethos-Hermes-Agent` (your personal agent) — ✅ MERGED
| Document | What it is |
|---|---|
| `AGENT-README.md` §12 (added) | **The two-agent boundary**: Ethos (personal) vs Demos (PPA product) — table, rules, what flows between them. |
| `ETHOS-BUILD-ROADMAP.md` (edited) | Phase 5 now points at the PPA plan instead of a "future session." |

### Repo: `resumeTesting` (fotiosmpouris.com — your command center) — ✅ MERGED through PR #1; **new commits this session need one more merge**
| Document | What it is |
|---|---|
| `MISSION-CONTROL.md` | This file. Read first, always. |
| `ATTACK-PLAN.md` | **Your personal execution playbook** — expanded with step-by-step detail (see it for "what do I literally do Monday"). |
| `BUILDER-GTM-PLAN.md` | The promotion strategy: builder-in-public on X, weekly cadence, Hard E disposition, white-glove revenue bridge, networking & Boston-area events (§10). GTM = "go to market" — the plan for how the work gets seen. |
| `SITE-COPY-PACK.md` | **Ready-to-apply website copy** for your Cursor agent — drafted text for ppa.html and the Follow-the-Build sections (answers your question: yes, the writing is done; the Cursor agent applies it). |

### Repo: `all-angles-exterior-` (Jim's company site) — ✅ MERGED through PR #1; **new commits this session need one more merge**
| Document | What it is |
|---|---|
| `ALL-ANGLES-AGENT-CRM-ROADMAP.md` | The technical plan: security remediation, Job Hub architecture (now MCP-first — see §4 below), 8-table schema, phases AA-0 → AA-5 including the sales-team layer (scoped access, WhatsApp audio briefs). |
| `FOR-JIM-THE-PLAN-IN-PLAIN-ENGLISH.md` | The Jim-facing version: ten-minute read, security checklist, the ChatGPT/Claude platform question (updated with the July 2026 landscape), and a paste-into-Cursor rules block for his Ace coding sessions. |

### Not documents, but produced: Google Drive **read-only** assessment of Jim's Ace folder (nothing touched), and the security findings now captured in both All Angles docs.

---

## 2. Read Order (when you have 90 minutes)

1. **This file** (5 min) — the map.
2. **`ATTACK-PLAN.md`** (10 min) — what you personally do, in order.
3. **PPA plan §1, §2, §6, §6.1** (25 min) — thesis, honest risks, build sequence, MVP/launch. Skim the appendices; they're for build-time, not bedtime.
4. **`BUILDER-GTM-PLAN.md`** (15 min) — the promotion machine.
5. **All Angles roadmap + FOR-JIM doc** (20 min) — before your Jim meeting.
6. Everything else is reference material agents read when building.

---

## 3. How Execution Actually Works (your Cursor question, answered)

Your mental model is right with one correction. **Five projects, but not five equal agents:**

| Cursor project | Repo | The agent's standing job |
|---|---|---|
| PPA | poorpeopleapp | Execute the PPA plan phase by phase. First instruction: "Read `claude-project-docs/PPA-FOUNDATION-BUILD-PLAN.md` Section 11 (onboarding protocol), then execute P0." |
| All Angles | all-angles-exterior- | Execute the roadmap. First instruction: "Read `ALL-ANGLES-AGENT-CRM-ROADMAP.md`; we are starting AA-0/AA-1." |
| Resume site | resumeTesting | Apply `SITE-COPY-PACK.md` per its instructions; keep design system intact. |
| Ethos | Ethos-Hermes-Agent | Its own roadmap, on its own schedule — **lowest priority**, it already works. |
| Hard E | Next-Gen-Harde / hardeclone | **Dormant until the open-source extraction or All Angles AA-2** — don't open it before then. |

**The startup ritual for any Cursor session** (same three lines every time):
1. `git pull` (get latest main — this is why merging matters).
2. "Read [the repo's plan document] and tell me where we left off."
3. Give it ONE phase/task from the plan. Never "continue everything."

**And the rule that keeps five projects from becoming chaos:** you don't work five projects in a week. The ATTACK-PLAN's weekly rhythm picks which 2–3 are live in any given week; the others stay parked at their last merged state.

---

## 4. What Changed With the July 2026 Platform Landscape (the OpenAI correction)

You were right to push. With ChatGPT 5.6's Work Mode (Slack/Gmail/Drive connections, skills, scheduled tasks, hosted Sites — per the Matt Wolfe breakdown) and Anthropic's Claude for Small Business + Cowork + 735 verified MCP connectors, hosted assistants are now legitimately powerful business tools. Two consequences, written into the plans:

1. **The Job Hub matters MORE, custom agent plumbing matters LESS.** The durable, defensible asset is the *owned data layer*, because the assistant layer is being commoditized by giants. So the All Angles Job Hub is now specified **MCP-first**: it exposes its actions as an MCP server, which means Ace, Hard E, ChatGPT Work Mode, and Claude Cowork can ALL operate on All Angles data as interchangeable clients. Jim can literally use ChatGPT if he prefers it — pointed at his own database. That converts the vendor question from a war into a feature.
2. **Same logic already lived in the PPA plan** (MCP server exposure is in P2/component C) — this validates rather than changes it. Demos remains necessary because PPA needs multi-tenant, mission-specific, cost-controlled agents serving *other people* — something no hosted consumer assistant offers.

## 5. Questions You'd Ask Next (answered now)

**Q: Did you write actual website copy, or just tell me to write it?**
A: Written — `SITE-COPY-PACK.md`. Your Cursor agent applies it; you review tone.

**Q: Which document do I hand to an investor / a partner / Jim / a new agent?**
A: Investor or partner: nothing yet — the pitch is a *demo* plus the metrics page (per GTM plan); documents come later. Jim: FOR-JIM doc only. New AI agent in any repo: that repo's plan document (they're written for agents).

**Q: If plans conflict, which wins?**
A: ATTACK-PLAN's priority stack: PPA build > All Angles > promotion > Ethos > Hard E.

**Q: Do I need to keep every branch after merging?**
A: No. After merging, delete the branch on GitHub (there's a button) — clean repos, and the history survives in main.

**Q: What did we decide the PPA agent is called, and where's that recorded?**
A: **Demos** (δῆμος, "the people"). Locked in `poorpeopleapp/AGENT_README.md` §10 and the PPA plan §7.D/§9.

**Q: What hasn't been done that I might assume has?**
A: (1) No code has been written or changed anywhere — everything so far is planning, documentation, and site copy. (2) The poorpeopleapp merge. (3) Jim's key rotations. (4) The X account setup. (5) The white paper on poorpeople.app hasn't been touched — its update is PPA plan item, post-P2.

**Q: Where do new documents go from now on?**
A: The repo they belong to, listed here within a day. If it doesn't clearly belong anywhere, it goes in resumeTesting and gets a row in Section 1.
