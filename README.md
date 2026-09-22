<div align="center">

# 🛡️ CYBER31

### 31 Days. 31 Missions. One Safer Digital Life.

A gamified cybersecurity awareness campaign that turns real-world online threats — phishing emails, smishing texts, fake QR codes, rogue Wi-Fi, deepfake calls, and more — into interactive, tap-to-investigate missions.

[![Live Demo](https://img.shields.io/badge/demo-live-00f0ff?style=for-the-badge&logo=vercel&logoColor=white)](https://cyber31.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-optional-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)

**[▶ View Live Site](https://cyber31.vercel.app)**

</div>

<br>

<div align="center">
  <img src="docs/screenshots/dashboard.png" alt="CYBER31 mission control dashboard" width="100%">
</div>

<br>

## Table of Contents

- [About](#about)
- [Features](#features)
- [Mission Categories](#mission-categories)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Daily Unlock Calendar](#daily-unlock-calendar)
- [Progress Persistence & Accounts](#progress-persistence--accounts)
- [Reviewer / Demo Controls](#reviewer--demo-controls)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)

## About

CYBER31 is a 31-day cybersecurity awareness challenge presented as an interactive "mission control" experience. Each day unlocks a new scenario — a suspicious email, an unfamiliar QR code, a too-good-to-be-true investment DM — and the player has to spot the red flags themselves rather than just read a static tip.

It was built for **THM Cyber Week**, but works as a standalone awareness tool for students, teams, or anyone who wants a hands-on refresher on staying safe online.

## Features

| | |
|---|---|
| 🎯 **31 distinct missions** | Password hygiene, phishing, smishing, deepfakes, QR scams, rogue Wi-Fi, ransomware, SIM swapping, and more — each with its own interaction style |
| 🕹️ **Tap-to-investigate gameplay** | Spot the red flags yourself inside a simulated email/SMS/website/app rather than reading a wall of text |
| 🌐 **3D "Digital Universe" view** | All 31 missions rendered as an explorable, draggable node graph on an HTML canvas |
| 🏆 **Achievements & streaks** | Milestone badges unlock as missions are completed, with a defense-streak counter |
| 📅 **Daily-unlock calendar** | Day N unlocks on October N — miss a day and catch up anytime, it stays unlocked afterward |
| 👤 **Accounts (optional)** | Email/password sign-up via Supabase Auth; progress follows you across devices once signed in |
| 📱 **Fully responsive** | Works down to small mobile viewports, with a dedicated bottom nav bar |
| ☁️ **Optional cloud sync** | Progress persists to `localStorage` by default, with opt-in cross-device sync via Supabase |
| ♿ **Keyboard accessible** | Mission cards and interactive choices are reachable and operable without a mouse |

## Mission Categories

The 31 missions are grouped into 7 threat categories:

| Category | Focus |
|---|---|
| 🔐 Digital Identity | Passwords, passphrases, 2FA, password managers, credential stuffing |
| 📧 Communication | Phishing, smishing, social engineering DMs, deepfake calls |
| 🌐 Browsing Safety | Typosquatting, HTTPS, malicious extensions, malvertising |
| 📱 Digital Life | Oversharing, spam traps, app permissions, software updates |
| 💳 Transactions | Overpayment scams, investment/pig-butchering scams, OTP theft |
| 🦠 Digital Threats | Malware attachments, BadUSB, ransomware, scareware, IoT defaults |
| ☁️ Data & Privacy | Public Wi-Fi, cloud sharing, data brokers, QR codes, SIM swapping |

## Tech Stack

- **[React 18](https://react.dev)** + **[Vite 6](https://vitejs.dev)** — UI and build tooling
- **[Tailwind CSS](https://tailwindcss.com)** — utility-first styling with a custom cyber theme
- **[lucide-react](https://lucide.dev)** — icon set
- **[canvas-confetti](https://github.com/catdad/canvas-confetti)** — milestone celebration effects
- **HTML Canvas** — hand-rolled 3D projection for the Digital Universe view (no 3D library dependency)
- **[@supabase/supabase-js](https://supabase.com/docs/reference/javascript)** — optional cross-device progress sync

## Getting Started

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Daily Unlock Calendar

Missions follow a real advent-calendar schedule: **Day N unlocks on October N** (of the campaign year configured in [`src/utils/dateGate.js`](src/utils/dateGate.js)). Once a day's date arrives, it stays unlocked permanently — so a visitor who misses a few days can always catch up. Locked missions show a "Classified until unlock" state instead of their content.

Two escape hatches bypass the calendar entirely (both also unlock the reviewer toolbar — see below):
- Running locally in dev mode (`npm run dev`)
- Appending `?review=1` to any deployed URL

## Progress Persistence & Accounts

Mission completion, streaks, and achievements are saved to `localStorage` by default — no setup required, and no account needed to play.

### Optional: accounts + cross-device cloud sync

The app can optionally sync progress to a [Supabase](https://supabase.com) project, with two identities layered on top of each other:

- **Anonymous**: every visitor gets a random device id on first visit; progress syncs to that id so it survives a page refresh or reopening the tab later on the same browser.
- **Authenticated**: signing up (email + password, via the account icon in the header) attaches progress to a real account, so it follows the visitor across devices/browsers. Any existing on-device progress is merged into the account automatically on signup/login.

To enable it:

1. Create a free Supabase project.
2. Run [`supabase/schema.sql`](supabase/schema.sql) in the project's SQL editor. It's safe to re-run — the script is idempotent and will migrate an older device-id-only version of the table if you ran an earlier version of this schema.
3. Copy `.env.example` to `.env.local` and fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from **Project Settings → API Keys → "Publishable and secret API keys"** tab — use the **Publishable key** (`sb_publishable_...`). Do not use the Secret key or the legacy `service_role`/`anon` JWT keys.
4. Restart the dev server.

Without those env vars set, the app runs exactly as before, on `localStorage` alone — accounts and cloud sync are fully optional and fail silently if unreachable. Email/password sign-up is enabled by default on new Supabase projects; if your project has "Confirm email" turned on (Authentication → Providers → Email), new users will need to click the confirmation link before their first login.

## Reviewer / Demo Controls

A "Command Controls" panel (jump to any mission, unlock all, reset progress) is available:

- Automatically in local development (`npm run dev`)
- On a deployed build, by appending `?review=1` to the URL

It is hidden from ordinary visitors otherwise, so a live link can't be used to instantly cheat the game.

## Project Structure

```
src/
├── components/
│   ├── missions/        # One component per mission interaction type
│   │                     # (phishing, smishing, scenario, deepfake, wifi, ...)
│   ├── Dashboard.jsx     # Mission grid, filters, security level summary
│   ├── DigitalUniverse.jsx  # Canvas-based 3D node graph of all 31 missions
│   ├── MissionModal.jsx  # Mission runner: routes to the right mission component
│   ├── CyberHeader.jsx   # Nav, security badge, achievements, audio, account
│   ├── AuthPanel.jsx     # Sign up / log in / account modal
│   └── ...
├── data/
│   ├── missionsData.js   # All 31 mission definitions (briefing, scenario, takeaway)
│   ├── achievementsData.js
│   └── categories.js
├── utils/
│   ├── storage.js        # localStorage persistence + Supabase sync orchestration
│   ├── supabaseClient.js # Optional Supabase client (no-op if unconfigured)
│   ├── authClient.js     # Supabase Auth wrapper (no-op if unconfigured)
│   ├── dateGate.js        # Day-N-unlocks-on-Oct-N calendar logic
│   └── audio.js          # Web Audio SFX
└── App.jsx

supabase/
└── schema.sql            # Optional cloud-sync table + RLS policies
```

## Deployment

This is a static Vite build — deploy `dist/` to any static host.

**Vercel**
```bash
npm i -g vercel
vercel
```
(Framework preset: Vite. No extra config needed.)

**Netlify**
```bash
npm run build
# Drag-and-drop the dist/ folder at app.netlify.com/drop,
# or connect the repo with build command `npm run build` and publish dir `dist`.
```

If using Supabase cloud sync, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables in your host's project settings (not just `.env.local`, which isn't deployed).

## Contributing

Issues and pull requests are welcome. If you're adding a new mission, follow the existing shape in [`missionsData.js`](src/data/missionsData.js) — each entry needs a `day`, `category`, `title`, `briefing`, `missionType`, and `takeaway` at minimum, plus either a `scenario` (for the generic multiple-choice format) or a matching component in `src/components/missions/`.

---

<div align="center">
<sub>Built for THM Cyber Week — 31 Days. 31 Missions. One Safer Digital Life.</sub>
</div>
