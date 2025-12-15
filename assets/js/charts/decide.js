/* =========================================
   Chart Type Decision
   ========================================= */

/**
 * Decide chart type based on intent
 */
export function decideChart(intent) {
  if (!intent.metric || !intent.dimension) {
    return "table";
  }

  if (intent.aggregation === "count") {
    return "bar";
  }

  if (intent.aggregation === "avg") {
    return "line";
  }

  return "bar";
}
