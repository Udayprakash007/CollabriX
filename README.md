# CollabriX

Freelance collaboration platform connecting developers and clients — projects, teams, challenges, ratings and leaderboards.

## Tech stack

- TypeScript, React 18, Vite 5
- Tailwind CSS + shadcn/ui
- React Router, TanStack Query
- Backend: Lovable Cloud (Supabase / PostgreSQL, Auth, Realtime, Storage)

## Running locally (VS Code)

1. Install Node.js 18 or newer (`node -v` to check).
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create the environment file — this step is required, the app shows a blank/broken screen without it:

   ```bash
   cp .env.example .env      # Windows PowerShell: copy .env.example .env
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

5. Open the printed URL (http://localhost:8080).

## Common problems

| Symptom | Cause / fix |
| --- | --- |
| Blank page, console errors about `undefined` Supabase URL | `.env` missing — do step 3, then restart `npm run dev` |
| `vite: command not found` / import errors | Dependencies not installed — run `npm install` |
| Port already in use | Stop the other process or run `npm run dev -- --port 5173` |
| Errors after pulling changes | Run `npm install` again, then delete `node_modules` and reinstall if needed |

Environment variables must start with `VITE_` and the dev server must be restarted after editing `.env`.

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build
- `npm run lint` — ESLint
