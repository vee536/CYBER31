# CYBER31

**31 Days. 31 Missions. One Safer Digital Life.**

A gamified cybersecurity awareness campaign built with React + Vite + Tailwind CSS. Each of the 31 missions simulates a real-world online threat — phishing emails, smishing texts, fake QR codes, rogue Wi-Fi, deepfake calls, and more — as an interactive, tap-to-investigate scenario.

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

## Progress Persistence

Mission completion, streaks, and achievements are saved to `localStorage` by default — no setup required.

### Optional: cross-device cloud sync

The app can optionally sync progress to a [Supabase](https://supabase.com) project so progress follows a visitor across devices/browsers:

1. Create a free Supabase project.
2. Run [`supabase/schema.sql`](supabase/schema.sql) in the project's SQL editor.
3. Copy `.env.example` to `.env.local` and fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from **Project Settings → API Keys → "Publishable and secret API keys"** tab — use the **Publishable key** (`sb_publishable_...`). Do not use the Secret key or the legacy `service_role`/`anon` JWT keys.
4. Restart the dev server.

Without those env vars set, the app runs exactly as before, on `localStorage` alone.

## Reviewer / Demo Controls

A "Command Controls" panel (jump to any mission, unlock all, reset progress) is available:

- Automatically in local development (`npm run dev`)
- On a deployed build, by appending `?review=1` to the URL

It is hidden from ordinary visitors otherwise, so a live link can't be used to instantly cheat the game.

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

## Tech Stack

- React 18 + Vite 6
- Tailwind CSS
- `canvas-confetti` for celebration effects
- `lucide-react` for icons
- `@supabase/supabase-js` for optional cloud sync
