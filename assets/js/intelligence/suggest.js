/* =========================================
   Chart Suggestions Intelligence (FINAL)
   ========================================= */

/**
 * Generate intelligent suggestions based on intent
 */
export function suggestChart(intent) {
  const suggestions = [];

  if (!intent || typeof intent !== "object") {
    return ["Refine your question to get more meaningful insights."];
  }

  const { metric, dimension, aggregation } = intent;

  /* ---------------------------------------
     Missing intent intelligence
     --------------------------------------- */
  if (!metric) {
    suggestions.push(
      "Specify a numeric column (e.g., sales, revenue, amount) to analyze."
    );
  }

  if (!dimension) {
    suggestions.push(
      "Group the data by a category (e.g., region, product, month) for clearer insights."
    );
  }

  if (!metric || !dimension) {
    return suggestions;
  }

  /* ---------------------------------------
     Aggregation-based intelligence
     --------------------------------------- */
  switch (aggregation) {
    case "sum":
      suggestions.push(
        "Totals are useful for understanding overall contribution by category."
      );
      break;

    case "avg":
      suggestions.push(
        "Averages help compare typical values while reducing the impact of outliers."
      );
      suggestions.push(
        "If this data is time-based, consider grouping by date to observe trends."
      );
      break;

    case "count":
      suggestions.push(
        "Counts highlight frequency and distribution across categories."
      );
      suggestions.push(
        "If categories are many, a table view may be easier to interpret."
      );
      break;

    default:
      suggestions.push(
        "Try using sum, average, or count to clarify your analysis intent."
      );
  }

  /* ---------------------------------------
     Comparative & exploratory intelligence
     --------------------------------------- */
  suggestions.push(
    "You can refine the question further, for example: 'top 5 categories by value'."
  );

  suggestions.push(
    "If results look uneven, consider checking for missing or inconsistent data."
  );

  return suggestions;
}
