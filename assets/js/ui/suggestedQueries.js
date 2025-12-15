/* =========================================
   Suggested Queries Generator (FINAL – FIXED)
========================================= */

/**
 * Safely get container
 */
function getContainer() {
  return document.getElementById("suggestedQueries");
}

/**
 * Build suggested queries from schema
 */
function buildSuggestions(schema) {
  if (!schema || typeof schema !== "object") return [];

  const numeric = [];
  const categorical = [];

  for (const [field, meta] of Object.entries(schema)) {
    if (!meta || !meta.type) continue;

    if (meta.type === "number") numeric.push(field);
    if (meta.type === "string") categorical.push(field);
  }

  const suggestions = [];

  categorical.forEach((dim) => {
    suggestions.push(`count by ${dim}`);
  });

  numeric.forEach((metric) => {
    categorical.forEach((dim) => {
      suggestions.push(`total ${metric} by ${dim}`);
      suggestions.push(`average ${metric} by ${dim}`);
    });
  });

  return suggestions.slice(0, 6);
}

/**
 * Render suggestions
 */
function renderSuggestions(items) {
  const container = getContainer();
  if (!container) return;

  /* 🔥 MUST clear previous buttons */
  container.innerHTML = "";
  if (!Array.isArray(items) || !items.length) return;

  /* Wrapper ensures proper layout */
  const wrapper = document.createElement("div");
  wrapper.className = "suggestions-wrapper";

  items.forEach((text) => {
    const btn = document.createElement("button");
    btn.className = "suggestion-btn";
    btn.type = "button";
    btn.textContent = text;

    btn.addEventListener("click", () => {
      const input = document.getElementById("queryInput");
      if (!input) return;

      input.value = text;

      input.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Enter",
          bubbles: true
        })
      );
    });

    wrapper.appendChild(btn);
  });

  container.appendChild(wrapper);
}

/**
 * Public API
 */
export function updateSuggestedQueries(schema) {
  const suggestions = buildSuggestions(schema);
  renderSuggestions(suggestions);
}
