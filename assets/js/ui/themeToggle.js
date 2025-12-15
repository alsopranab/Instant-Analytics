/* =========================================
   Theme Toggle (Light / Dark)
   - Deno safe
   - Browser safe
   - GitHub Pages safe
========================================= */

const STORAGE_KEY = "ia-theme";

/**
 * Apply theme to document
 */
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

/**
 * Detect system preference
 */
function getSystemTheme() {
  return globalThis.matchMedia &&
    globalThis.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Initialize theme toggle
 */
export function initThemeToggle(buttonId) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;

  const saved = localStorage.getItem(STORAGE_KEY);
  const theme = saved || getSystemTheme();

  applyTheme(theme);
  btn.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";

  btn.addEventListener("click", () => {
    const next =
      document.documentElement.dataset.theme === "dark"
        ? "light"
        : "dark";

    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    btn.textContent = next === "dark" ? "☀️ Light" : "🌙 Dark";
  });
}
