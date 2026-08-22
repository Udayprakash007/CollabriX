import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Public backend values (protected by Row Level Security). Used as fallbacks so a
// fresh clone runs even if the local .env file is missing.
const FALLBACK_ENV = {
  VITE_SUPABASE_PROJECT_ID: "iegrcanvmydypldpepzy",
  VITE_SUPABASE_URL: "https://iegrcanvmydypldpepzy.supabase.co",
  VITE_SUPABASE_PUBLISHABLE_KEY:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZ3JjYW52bXlkeXBsZHBlcHp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5ODU2OTYsImV4cCI6MjA4MTU2MTY5Nn0.J4BPOETJELGvu-C9M4WtM8TEMw6ZZzl04rFXtFSoaBs",
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
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    define,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

