/* =========================================
   Chart Type Decision (FINAL)
   ========================================= */

/**
 * Decide chart type based on intent
 */
export function decideChart(intent) {
  if (!intent || typeof intent !== "object") {
    return "table";
  }

  const { metric, dimension, aggregation } = intent;

  if (!metric || !dimension) {
    return "table";
  }

  switch (aggregation) {
    case "avg":
      return "line";
    case "count":
      return "bar";
    case "sum":
    default:
      return "bar";
  }
}
