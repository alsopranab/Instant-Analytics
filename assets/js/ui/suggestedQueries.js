/* =========================================
   Suggested Queries Generator
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
  if (!schema) return [];

  const numeric = [];
  const categorical = [];

  for (const [field, meta] of Object.entries(schema)) {
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

  container.innerHTML = "";
  if (!items.length) return;

  const title = document.createElement("h3");
  title.textContent = "Suggested Questions";
  container.appendChild(title);

  items.forEach((text) => {
    const btn = document.createElement("button");
    btn.className = "suggestion-btn";
    btn.textContent = text;

    btn.addEventListener("click", () => {
      const input = document.getElementById("queryInput");
      if (!input) return;

      input.value = text;

      // 🔥 Trigger the same path as pressing Enter
      input.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Enter",
          bubbles: true
        })
      );
    });

    container.appendChild(btn);
  });
}

/**
 * Public API
 */
export function updateSuggestedQueries(schema) {
  const suggestions = buildSuggestions(schema);
  renderSuggestions(suggestions);
}
