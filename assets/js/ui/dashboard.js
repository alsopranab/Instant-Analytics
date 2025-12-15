/* =========================================
   Dashboard UI Updates
   ========================================= */

/**
 * Update dashboard textual content
 * @param {Object} params
 * @param {string} params.explanation
 * @param {string[]} params.suggestion
 */
export function updateDashboard({ explanation, suggestion }) {
  const dashboard = document.getElementById("dashboard");

  if (!dashboard) return;

  /* ---------------------------------------
     Explanation
     --------------------------------------- */
  if (explanation) {
    const explanationEl = document.createElement("div");
    explanationEl.className = "explanation fade-in";
    explanationEl.textContent = explanation;

    dashboard.appendChild(explanationEl);
  }

  /* ---------------------------------------
     Suggestions
     --------------------------------------- */
  if (Array.isArray(suggestion) && suggestion.length > 0) {
    const suggestionWrapper = document.createElement("div");
    suggestionWrapper.className = "suggestion slide-up";

    suggestion.forEach((text) => {
      const p = document.createElement("p");
      p.textContent = text;
      suggestionWrapper.appendChild(p);
    });

    dashboard.appendChild(suggestionWrapper);
  }
}
