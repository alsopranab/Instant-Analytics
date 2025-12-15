/* =========================================
   Result Explanation
   ========================================= */

/**
 * Generate explanation text
 */
export function explainResult(intent, chartType) {
  if (!intent.metric || !intent.dimension) {
    return "The chart displays the available data based on your query.";
  }

  const aggregationText =
    intent.aggregation === "sum"
      ? "total"
      : intent.aggregation === "avg"
      ? "average"
      : "count";

  return `This ${chartType} chart shows the ${aggregationText} of "${intent.metric}" grouped by "${intent.dimension}".`;
}
