import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Public backend values (protected by Row Level Security). Used as fallbacks so a
// fresh clone runs even if the local .env file is missing.
const FALLBACK_ENV = {
  VITE_SUPABASE_PROJECT_ID: "bsqtbytoaksehgmitrnd",
  VITE_SUPABASE_URL: "https://bsqtbytoaksehgmitrnd.supabase.co",
  VITE_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_Cyt3nJhaSWaDdY0zRpgXKQ_pi7CoN0V",
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  const define = Object.fromEntries(
    Object.entries(FALLBACK_ENV)
      .filter(([key]) => !env[key])
      .map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(value)]),
  );

  return {
    server: {
      host: true,
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    define,
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname || process.cwd(), "./src"),
      },
    },
  };
});
