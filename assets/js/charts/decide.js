/* =========================================
   Chart Type Decision (FINAL – FIXED)
========================================= */

/**
 * Decide chart type based on parsed intent
 */
export function decideChart(intent) {
  if (!intent || typeof intent !== "object") {
    return "table";
  }

  const { metric, dimension, aggregation } = intent;

  // Missing structure → safest fallback
  if (!dimension) {
    return "table";
  }

  // COUNT is always categorical → BAR
  if (aggregation === "count") {
    return "bar";
  }

  // Numeric aggregations
  if (metric) {
    // Time-series heuristic
    if (
      typeof dimension === "string" &&
      dimension.toLowerCase().includes("date")
    ) {
      return "line";
    }

    // Default numeric aggregation → BAR
    return "bar";
  }

  // Absolute fallback
  return "table";
}
