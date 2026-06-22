# SITE-STRATEGY.md — fotiosmpouris.com

Single source of truth for any agent or session working on this site.
Last updated: June 2026.

---

## Who This Is

Fotios Mpouris. Builder, operator, caregiver, former restaurateur. Runs four production AI systems simultaneously. Has a 24/7 autonomous AI assistant coordinating between them. Built OpenCare because he was drowning in group texts and sticky notes while managing his parents' care. Built Hard-E because a contractor needed an AI sales director that actually understood the CRM. Leads the technical side of All Angles Exterior because a 30-year remodeling company needed AI eyes on their lead pipeline. Built Ethos because someone had to keep all of it running while the human sleeps.

---

## Positioning

**One breath:**
I don't build demos. I build the thing the demo promised. Four systems are running in production right now — a voice agent closing sales, a care platform coordinating families, a lead pipeline that sees houses through AI eyes, and my own AI managing all of it while I sleep. Behind them is a vision for something larger: infrastructure that replaces bureaucratic bloat with AI agents that actually serve people.

**Not a consultant.** Not looking for the word "consultant" anywhere on this site. The work speaks. The systems are live. People who need what I build will recognize it.

---

## The Evidence Stack

### 1. The Poor People App / OpenCare

**The Legend:** The Poor People App is "The Mobilization America Needs" — a decentralized human-services marketplace where AI agents handle the 95% of bureaucratic work that is procedural, and human Sentinels handle the 5% that requires real judgment. Identity on Nostr (portable, censorship-resistant, survives if the platform dies). PPC coordination currency. Bitcoin treasury. Five-tier autonomous AI organization replacing administrative overhead. "The name isn't an insult — it's a battle cry."

**The Live Product:** OpenCare at `opencare.poorpeople.app`. Care coordination for families. Used daily. Free. Care Circles, 19 task categories, contacts, resources, email/Telegram digests, EN/ES, PWA, AI Agent REST API. Built by a caregiver, not by a startup that interviewed caregivers.

**The Stack:** Next.js 15, Supabase, Clerk, Docker on AWS EC2 (t3.medium). Recover-E backend: FastAPI + Claude Haiku 4.5. Mobilization Agent v2.3: Lambda + GPT-4o.

**The Horizon:** Service marketplace. PPC token economy. Nostr-native decentralized instances. Community cooking track. Financial empowerment track.

**Key Quote:** "The question isn't whether platforms like this will be built. The question is whether they'll be built by people who serve working families or by those who extract from them."

### 2. Hard-E

Voice-first AI sales director for home service contractors. Lives inside the contractor's CRM, knowledge base, and pricing sheets. Claude Sonnet 4 brain. Cartesia Sonic voice at ~40ms. Deepgram STT at ~200ms. 21 Leap CRM tools. Multi-tenant. Pipecat WebRTC.

Live at `nextgen.harde.app` / `harde.app`.
~300 API calls/day. 99.7% success rate.

### 3. All Angles Exterior

AI-enriched lead pipeline for a 30-year exterior remodeling company. Fotios is Technical Lead. Upload a house photo, GPT-4o vision analyzes it, Perplexity researches the property, enriched lead hits DynamoDB and SES before a human touches it. Next.js 14 on EC2/PM2.

Live at `aaexterior.com`.

### 4. Ethos

24/7 autonomous AI executive assistant. Hermes Agent v0.16.0 on Lightsail. Claude Sonnet 4.6 + Haiku 4.5. Communicates via Telegram. Manages real care tasks through OpenCare API. Runs video intelligence pipeline. Orchestrates FotiFoti art pipeline. 105-page LLM wiki. $2-4/day.

---

## Language Rules

### Kill List — Never Use on This Site

- "Work with me" / "Hire me" / "Available for"
- "Let's build something" / "Let's connect"
- "Book a call" / "Schedule a consultation"
- "Full-stack developer" / "Senior engineer"
- "Passionate about technology"
- "AI-powered" as a differentiator
- "Synergy," "leverage," "cutting-edge," "game-changer"
- "Consultant" / "consulting"
- Any cookie-cutter CTA language

### Voice Guidelines

- Lead with what is running, not what you know
- Name specific numbers: 40ms, 300 calls/day, 99.7%, $2-4/day, 53 million caregivers
- Use actual voice: sarcastic, direct, Greek, human
- Boundary statements: what you DON'T do
- The tagline rotation stays — personality is what AI can't replicate
- The PPA language has its own register: urgent, constructive, sharp, backed by facts not rebellion
- Never force it. If a sentence doesn't earn its seat, cut it.

---

## Design Tokens — Luminous Glass

Light mode. We are the Rebellion, not the Empire.

### Colors

```
--canvas:          #FAFBFD
--glass:           rgba(255,255,255,0.72)
--glass-border:    rgba(255,255,255,0.5)
--glass-shadow:    rgba(0,0,0,0.04)
--blur:            12px
--text-primary:    #1A1D23
--text-secondary:  #6B7084
--text-tertiary:   #9CA3B4
--accent-warm:     #C4872E
--accent-teal:     #2A8D8D
--accent-live:     #1A9E48
--accent-rose:     #C05D5D
--gradient-bg:     linear-gradient(135deg, #F0E6D8 0%, #E8EAF2 50%, #F5F0E8 100%)
```

### Typography

```
Display:  Space Grotesk (500-700) — headings
Body:     Inter (300-500) — body text
Mono:     JetBrains Mono (400) — metrics, labels, badges
```

### Glass Panel

```css
.glass {
  background: var(--glass);
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  box-shadow: 0 4px 24px var(--glass-shadow);
}
```

Rules: Glass for hero, cards, evidence blocks, nav. Opaque white for long-form text. Max 3 glass surfaces visible at once. Respect prefers-reduced-transparency.

### Atmospheric Particles

Luminous light motes. Canvas API. Warm gold/cream. Slow upward drift. 30-50 particles. Sparse. Scroll-reactive parallax. Occasional warm flare.

---

## Site Architecture

```
fotiosmpouris.com (index.html)
├── Scene 1: The Arrival (hero, video, profile, typewriter)
├── Scene 2: The Signal (positioning, boundary)
├── Scene 3: The Evidence (PPA/OpenCare, Hard-E, All Angles, Ethos)
├── Scene 4: The Method (human in the loop)
├── Scene 5: The Door (email, restraint)
└── Footer (project links, nav, social)

/the-work.html — Portfolio archive
/the-stack.html — Technical background
/opencare.html — PPA/OpenCare deep dive
/multimedia.html — Motion graphics archive
/unity-projects.html — Unity archive
```

---

## What the Site Should Make a Visitor Feel

Not impressed. Not sold. **Curious.**

The feeling of walking into a room where someone is clearly in the middle of building something real — and the room itself is beautiful, and the light is good, and you want to sit down and understand what's happening here.

The absence of a hard sell is the sell. The restraint is the authority.
