/* =========================================
   Dashboard UI Updates (FINAL – FIXED)
========================================= */

/**
 * Update dashboard textual content
 * - Keeps chart intact
 * - Prevents duplicate text
 * - Safe for repeated renders
 *
 * @param {Object} params
 * @param {string} params.explanation
 * @param {string[]} params.suggestion
 */
export function updateDashboard({ explanation, suggestion }) {
  const dashboard = document.getElementById("dashboard");
  if (!dashboard) return;

  /* ---------------------------------------
     Ensure text container exists
  ---------------------------------------- */
  let textContainer = dashboard.querySelector(".dashboard-text");

  if (!textContainer) {
    textContainer = document.createElement("div");
    textContainer.className = "dashboard-text";
    dashboard.appendChild(textContainer);
  }

  /* ---------------------------------------
     Clear ONLY dashboard text
     (chart container must remain untouched)
  ---------------------------------------- */
  while (textContainer.firstChild) {
    textContainer.removeChild(textContainer.firstChild);
  }

  /* ---------------------------------------
     Explanation (primary context)
  ---------------------------------------- */
  if (typeof explanation === "string" && explanation.trim()) {
    const explanationEl = document.createElement("div");
    explanationEl.className = "explanation fade-in";
    explanationEl.textContent = explanation;
    textContainer.appendChild(explanationEl);
  }

  /* ---------------------------------------
     Suggestions (secondary guidance)
  ---------------------------------------- */
  if (Array.isArray(suggestion) && suggestion.length > 0) {
    const suggestionWrapper = document.createElement("div");
    suggestionWrapper.className = "suggestion slide-up";

    suggestion.forEach((text) => {
      if (typeof text !== "string" || !text.trim()) return;

      const p = document.createElement("p");
      p.textContent = text;
      suggestionWrapper.appendChild(p);
    });

    textContainer.appendChild(suggestionWrapper);
  }
}
