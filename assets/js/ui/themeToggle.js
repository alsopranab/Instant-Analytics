/* =========================================
   Theme Toggle (Light / Dark) – Deno Safe
========================================= */

const STORAGE_KEY = "instant-analytics-theme";

/**
 * Apply theme to document
 */
function applyTheme(theme) {
  globalThis.document?.documentElement?.setAttribute("data-theme", theme);
}

/**
 * Get saved theme or system preference
 */
function getInitialTheme() {
  const saved = globalThis.localStorage?.getItem(STORAGE_KEY);
  if (saved) return saved;

  const prefersDark =
    globalThis.matchMedia &&
    globalThis.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? "dark" : "light";
}

/**
 * Toggle theme
 */
function toggleTheme() {
  const root = globalThis.document?.documentElement;
  if (!root) return;

  const current = root.getAttribute("data-theme") || "light";
  const next = current === "dark" ? "light" : "dark";

  applyTheme(next);
  globalThis.localStorage?.setItem(STORAGE_KEY, next);
}

/**
 * Initialize theme system
 */
export function initThemeToggle() {
  const theme = getInitialTheme();
  applyTheme(theme);

  const btn = globalThis.document?.getElementById("themeToggle");
  if (!btn) return;

  btn.addEventListener("click", toggleTheme);
}
