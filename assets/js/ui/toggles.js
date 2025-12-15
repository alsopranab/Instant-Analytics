/* =========================================
   UI Toggle Utility (FINAL)
   - CSS-driven animation
   - No inline height hacks
   - Matches current HTML structure
========================================= */

/**
 * Initialize all toggle panels
 * Automatically wires:
 * .toggle-panel > .panel-header
 */
export function initToggles() {
  const panels = document.querySelectorAll(".toggle-panel");

  panels.forEach((panel) => {
    const header = panel.querySelector(".panel-header");
    if (!header) return;

    header.addEventListener("click", () => {
      panel.classList.toggle("collapsed");
    });
  });
}
