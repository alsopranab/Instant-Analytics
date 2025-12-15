/* =========================================
   Theme Toggle (Light / Dark)
========================================= */

const STORAGE_KEY = "instant-analytics-theme";

/**
 * Apply theme to document
 */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

/**
 * Get saved theme or system preference
 */
function getInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return saved;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Toggle theme
 */
function toggleTheme() {
  const current =
    document.documentElement.getAttribute("data-theme") || "light";

  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem(STORAGE_KEY, next);
}

/**
 * Initialize theme system
 */
export function initThemeToggle() {
  const theme = getInitialTheme();
  applyTheme(theme);

  const toggleBtn = document.getElementById("themeToggle");
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", toggleTheme);
}
