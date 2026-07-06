# Poor People App — White Paper Development Notes

This document captures conceptual material developed during the site build (v4.7–v4.9)
that should be incorporated into the full white paper. Each item below is a note for
a future writing session.

---

## 1. The Harness Concept

**Site reference:** `the-stack.html` — Origin Story section; `opencare.html` — AI Agent Architecture

**Core idea:**
We are not building products that are tied to any single LLM. We are building a harness —
the infrastructure, agents, APIs, memory systems, and coordination layers that let frontier
AI do useful work for real people, and that get stronger every time a better model ships.
The models will improve regardless of what we do. The question is whether the scaffolding
is ready when they do.

**Karpathy reference:**
Andrej Karpathy (former Tesla AI Director, OpenAI co-founder): "The hottest new programming
language is English." — cite in the section on model-agnostic architecture.

**White paper section:** Architecture Overview / Design Philosophy

---

## 2. Nostr as Security Infrastructure (not just decentralization philosophy)

**Site reference:** `opencare.html` — AI Agent Architecture section (Decentralized by Design)

**Core argument:**
We don't know what adversarial AI models (e.g., Fable, Mythos, or future open-source agents
with misaligned goals) will be capable of. A centralized platform is a single point of failure.
A Nostr-based identity layer means:
- No central database to breach
- No central authority to compromise or coerce
- No single infrastructure dependency to attack
- Community survives even if the company fails or is attacked

**Upgrade note:** This reframes decentralization from ideological (anti-censorship) to
practical (resilience against AI-powered adversarial attacks). This is a stronger pitch to
institutional and government partners who may be skeptical of crypto-adjacent language.

**White paper section:** Security Architecture / Risk Mitigation

---

## 3. Military / Veterans / First Responders — Reciprocal Ecosystem

**Site references:** `opencare.html` — "Built for Those Who Served"; `index.html` — "Serving Defense, Healthcare, Social Services & Government"

**Core argument:**
- Military families are primary users (deployments, relocations, VA backlog, elder care)
- Retired military, law enforcement, fire, EMS are the backbone of the Sentinel Program
- This creates a reciprocal ecosystem: the people who need the platform most are also
  the people best positioned to provide its trust infrastructure
- Application to VA programs, DoD community services, veteran-focused nonprofits

**Stats to cite in white paper:**
- 19 million US veterans
- ~1 million annual military retirees
- 2.9 million federal civilian employees
- 3.5 million state/local health and social service workers
- 900,000 first responders
- 53 million unpaid family caregivers

**Funding angles:**
- VA Innovation Ecosystem
- DoD SBIR/STTR programs
- Veteran-focused foundation grants
- State-level elder care and military family programs

**White paper section:** Target Markets / The Sentinel Program / Funding Strategy

---

## 4. The Sentinel Program — Trust as Infrastructure

**Site reference:** `opencare.html` — Sentinel Program section

**Core idea:**
Every coordination network lives or dies on trust. The Sentinel Program recruits people
communities have always trusted — retired military, law enforcement, firefighters, EMS —
as verified trust anchors within local networks. Not symbolically. Because they have spent
careers keeping people safe.

**Key detail for white paper:**
The Sentinel relationship is genuinely reciprocal:
- Military families are users of the platform
- Military retirees are providers of trust infrastructure
- The same person who needed eldercare coordination for their parents during a deployment
  becomes a Sentinel after retirement

**White paper section:** Trust Infrastructure / The Sentinel Program / Network Design

---

## 5. Token Structure and Community Ownership

**Site reference:** `opencare.html` — AI Agent Architecture

**Core idea:**
A token structure designed to keep value circulating within the network rather than being
extracted by intermediaries. Legal compliance framework for tokenization is a planned use
of raised funds.

**Note:** Keep this section forward-looking and legally cautious. Reference the GiveSendGo
campaign language: "Not an investment opportunity. Not a token presale."

**White paper section:** Financial Architecture / Tokenomics

---

## 6. The Platform Is Not an App

**Site reference:** `opencare.html`

**Core framing:**
PPA.app is coordination infrastructure, not a traditional software product. The .app in
the domain is intentional and ironic — this is a protocol-level coordination layer that
happens to have a user interface. The AI handles the coordination overhead. Humans handle
judgment. The ratio will shift as models improve; the harness is designed to accommodate
any major shift.

---

## 7. The Coordination Model — Two Things Everyone Has Heard Of

**Site reference:** `opencare.html` — "Two Things Everyone Has Heard Of" section

**Core framing (v4.11):**
Think Uber's research and coordination infrastructure and Tinder's profile-centric matching. Both are anywhere, anytime. People have already learned to trust both to deliver a service predictably and safely. Uber: timely, predictable rides. Tinder: image and description-based trust verification before conversation.

PPA uses this same behavioral baseline — people already know how to interact with reputation-based, on-demand platforms. We're applying that learned trust to community care coordination.

**White paper section:** Product Introduction / Market Positioning

---

## 8. Bitcoin Treasury and Asset Integration Strategy

**Site reference:** `opencare.html` — Why Bitcoin section

**Current position (v4.11):**
We are investigating the use of Bitcoin to back the PPA treasury. We are also exploring integration of various other forms of assets — both digital and hard assets. This is not a commitment, not a presale, not an investment opportunity.

**Why this matters for the white paper:**
The treasury architecture has implications for community ownership, sustainability without VC dependency, and long-term network resilience. The white paper should address this in a financially and legally responsible way.

**Language guidance:** Forward-looking, legally cautious. Reference GiveSendGo campaign framing as a baseline for tone.

**White paper section:** Financial Architecture / Treasury Strategy

---

## 9. Decentralization as Resilience (not ideology)

**Site reference:** `opencare.html` — AI Agent Architecture (updated v4.11)

**Upgraded framing:**
A solely centralized platform might be a single point of failure — especially as adversarial AI capabilities increase. A Nostr-native identity layer means:
- No central database to breach
- No central authority to compromise or coerce
- Community survives platform failure or attack

This reframes decentralization for institutional and government audiences who are skeptical of crypto-adjacent language. The argument is practical resilience, not ideology.

**White paper section:** Security Architecture / Risk Mitigation (expand from Note 2)

---

## Pending Items for White Paper Sessions

- [ ] Full agent architecture diagram (replace the removed agent table with a proper visual)
- [ ] Sentinel Program onboarding process — how does a retired military officer become a verified Sentinel?
- [ ] Token structure / legal compliance framework
- [ ] VA and DoD integration pathway (detailed) — VA Innovation Ecosystem, DoD SBIR/STTR
- [ ] Financial projections and use of funds breakdown
- [ ] Security architecture (Nostr + distributed network) — detailed technical section
- [ ] Bitcoin / hard asset treasury — legal review section
- [ ] The Coordination Model section — expand Uber/Tinder analogy into full behavioral design rationale
- [ ] OpenRecovery standalone section (if still in scope)

---

## Session Log — July 2026

**Key decisions made this session:**
- Removed agent table from `opencare.html` AI Agent Architecture — too prescriptive, replace with narrative
- "Decentralized by Design" section removed from opencare.html — content integrated into other sections
- Military framing: kept in Sentinel Program and index.html "Who This Is For", but opencare.html hero changed to universal ("your family") rather than exclusively military
- Bitcoin section: changed from declarative ("It's a necessity") to investigative ("We are investigating...")
- PPA signup form: removed founding contributor/PPC allocation language — legally cautious decision
- All four production systems confirmed: Hard-E, OpenCare, All Angles Exterior, Ethos
