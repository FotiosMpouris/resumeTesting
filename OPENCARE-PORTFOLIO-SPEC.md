# OpenCare — Portfolio Spec for Personal Website Integration

## For the Cursor Agent Working on Fotios's Personal Site

This document gives you everything you need to feature OpenCare prominently on Fotios's personal website. OpenCare is a **live, production application** — not a concept, not a demo. It's deployed, used daily, and actively coordinating real family care.

---

## Quick Facts

| | |
|---|---|
| **Live URL** | [https://opencare.poorpeople.app](https://opencare.poorpeople.app) |
| **Status** | Production — live and in daily use |
| **What It Is** | A care coordination platform for caregivers and their circles |
| **Built By** | Fotios Mpouris |
| **Stack** | Next.js, TypeScript, Supabase (PostgreSQL), Clerk Auth, AWS EC2, Docker, Nginx |
| **Platform** | Progressive Web App — installable on any phone from the browser, no app store |
| **Cost to Users** | Free |

---

## What OpenCare Does

OpenCare solves a problem millions of family caregivers face: **coordinating care across people who don't use the same tools, don't live in the same place, and don't always communicate well.**

A caregiver creates a **Care Circle** — a shared workspace for everyone involved in someone's care. Inside that circle, they manage tasks (medical appointments, insurance renewals, grocery runs, home repairs), assign those tasks to members or to people who don't even have the app, set recurring schedules, and keep everyone informed through automated email summaries and Telegram digests.

**The key insight:** the people around the caregiver — siblings, neighbors, caseworkers, church volunteers — don't need to download anything. They receive email notifications and summaries. If they want to go deeper, they sign up. But the system works without forcing adoption.

---

## Core Features (All Live)

### Care Circles
- Create private care circles for your family, community group, or care team
- Add members by email invitation
- Coordinator controls — add/remove members, require identity verification for sensitive circles
- Circle-level summary with stats: active tasks, overdue items, completed count

### Task Management
- Full task lifecycle: create, assign, prioritize, track, complete
- Categories: medical, insurance, household, financial, legal, transportation, personal care, social
- Priority levels: low, medium, high, urgent
- Recurring tasks: daily, weekly, biweekly, monthly, quarterly, yearly, or custom intervals (e.g., every 5 years for document renewals)
- Due dates with optional time-of-day
- Google Calendar integration — one tap to add any task to your calendar
- Task assignment to registered members OR offline contacts

### Offline Contacts
- Add people who don't use the app — by name, email, and phone
- Assign tasks to them — they get email notifications with full task details
- They appear in circle summaries so everyone knows who's responsible for what
- No signup friction. No app download required.

### Notifications & Reminders
- **Daily Telegram digest** — automated morning summary of all tasks due today, sent via Telegram bot
- **Daily email digest** — same summary, delivered to your inbox
- **Task assignment emails** — when someone gets assigned a task, they receive a detailed email with task name, description, priority, due date, and recurrence info
- **One-tap circle summary emails** — share a full branded HTML summary of your circle with anyone (family, caseworkers, coordinators)

### Sentinel Identity Verification
- Government ID verification powered by **Persona** — the same identity platform used by banks and fintech companies
- Coordinators can require verification before members gain access to sensitive circles
- Verification status displayed on member profiles
- Designed to build institutional trust — churches, nursing homes, and social service organizations can trust the identity layer without building their own

### AI Agent API (REST)
- Full REST API for external AI agents to manage OpenCare programmatically
- API key authentication with SHA-256 hashing, per-user scoping, and key management from the profile page
- Endpoints: list circles, CRUD tasks, manage contacts, get summaries, trigger email shares
- Safety guardrails: no delete endpoints, explicit confirmation required for cancellations, all data scoped to the authenticated user
- **Currently integrated with TheGreekClawd** — Fotios's personal AI agent manages care tasks through the API via natural language commands
- Multi-tenant architecture: designed so other users can generate their own API keys and connect their own AI agents

### Progressive Web App
- Installable from any mobile browser — no App Store, no Google Play
- Full offline-capable shell with responsive mobile-first design
- Sky blue gradient aesthetic with branded OpenCare identity

---

## Tech Stack Deep Dive

| Layer | Technology | Why It Matters |
|---|---|---|
| **Frontend** | Next.js 14 + TypeScript + Tailwind CSS | Server-side rendering, static optimization, type safety |
| **Auth** | Clerk | Enterprise-grade auth used by Notion, Stripe, and thousands of production apps. Google SSO, session management, user profiles — zero custom auth code |
| **Database** | Supabase (PostgreSQL) | Row Level Security, real-time subscriptions, managed infrastructure. Used by 1M+ projects worldwide |
| **Identity Verification** | Persona | Government ID + selfie liveness checks. Same platform used by Square, Postmates, and major fintech. Free tier: 500 verifications/month |
| **Hosting** | AWS EC2 + Docker + Nginx | Production-hardened deployment with SSL, reverse proxy, container orchestration |
| **Email** | Resend | Transactional email delivery for notifications, digests, and summaries |
| **Messaging** | Telegram Bot API | Automated daily task digests delivered directly to Telegram |
| **API** | Custom REST API with Bearer token auth | Multi-tenant, scoped, with built-in safety guardrails |

---

## The Vision (Where It's Heading)

OpenCare isn't just a task manager. It's the coordination layer for a care ecosystem.

1. **Today** — Caregivers organize their circles, manage tasks, keep family in the loop without drowning in group texts
2. **Now** — AI agents (like TheGreekClawd) manage care tasks through the API using natural language
3. **Next** — A community layer built on the Nostr protocol where helpers discover caregivers who need them. Piano teachers find piano requests. Retired nurses find medical coordination tasks. Church groups find volunteer opportunities. Decentralized, censorship-resistant, identity-portable
4. **The Endgame** — Stigmergic care coordination modeled after superorganism intelligence. The system tells you what needs doing — like ants following pheromone trails — so no single person has to hold everything in their head

---

## Why It's Portfolio-Worthy

This isn't a tutorial project or a hackathon demo. This is:

- **A production app** deployed on AWS, used daily to coordinate real elder care
- **An AI-integrated platform** where an autonomous agent manages tasks through a custom API
- **A full-stack showcase** spanning auth, database design with RLS, identity verification, email systems, messaging bots, PWA, REST API architecture, Docker deployment, and SSL
- **A social impact project** solving a real problem for the 53 million unpaid family caregivers in the US
- **An open ecosystem play** with a decentralized identity layer (Nostr) and community coordination inspired by swarm intelligence research

---

## Suggested Copy for the Website

### Headline Options
- "OpenCare — Care Coordination That Actually Works"
- "I Built OpenCare Because I Was Drowning in Sticky Notes and Group Texts"
- "Stop Texting Your Siblings. Start Coordinating Care."

### Short Description (for project cards)
> A production care coordination platform used daily to manage elder care across family members, caseworkers, and community volunteers. Features AI agent integration, identity verification, automated notifications, and a REST API — built on Next.js, Supabase, Clerk, and AWS.

### Medium Description (for project detail pages)
> OpenCare is a care coordination platform I built because I needed it. As the primary caregiver for my parents, I was managing doctor appointments, insurance renewals, home repairs, and grocery runs across multiple siblings in different states — through group texts and memory. OpenCare replaced that chaos with organized care circles, assignable tasks, automated reminders, and email summaries that keep everyone informed without requiring anyone to download an app.
>
> The platform features government ID verification (Persona), daily Telegram and email digests, a REST API that my AI agent uses to manage tasks through natural language, and a progressive web app installable from any browser. It's built on Next.js, TypeScript, Supabase, Clerk, and Docker — deployed on AWS with SSL and production-hardened security.
>
> It's live. It's free. And it's being used right now to coordinate care for real people.

### Call to Action
- "Try OpenCare" → https://opencare.poorpeople.app
- "View the White Paper" → https://opencare.poorpeople.app/white-paper

---

## Assets

- **App URL:** https://opencare.poorpeople.app
- **White Paper:** https://opencare.poorpeople.app/white-paper
- **How It Works:** https://opencare.poorpeople.app/how-it-works
- **Trust Stack Logos:** Clerk, Supabase, Persona (available in the project root as `clerklogo.png`, `supabaselogo.png`, `personalogo.png`)

---

## Key Differentiators to Highlight

1. **Not a to-do app.** It's care coordination — built for the specific chaos of managing someone else's life across multiple people.
2. **People don't need the app.** Offline contacts get emails. No signup wall. No adoption friction.
3. **AI agent integration.** An autonomous AI agent manages care tasks through the API. This isn't a chatbot — it's an operational agent that creates, updates, and monitors tasks.
4. **Identity verification.** Government ID checks powered by Persona. The same tech banks use. Not homemade security theater.
5. **Decentralized future.** Nostr protocol integration for community discovery. Your identity travels with you.
6. **Built by a caregiver.** Not by a startup that interviewed caregivers. By someone who lives it every day.
