/* =========================================
   Chart Suggestions
   ========================================= */

/**
 * Suggest improvements or alternatives
 */
export function suggestChart(intent) {
  const suggestions = [];

  if (!intent.metric) {
    suggestions.push("Try specifying a numeric column to analyze.");
  }

  if (!intent.dimension) {
    suggestions.push("Group your data by a category for clearer insights.");
  }

  if (intent.aggregation === "count") {
    suggestions.push("Counts work well with bar charts or tables.");
  }

  if (intent.aggregation === "avg") {
    suggestions.push("A line chart can highlight trends in averages.");
  }

  return suggestions;
}
