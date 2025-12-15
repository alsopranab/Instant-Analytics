/* =========================================
   Result Explanation Intelligence (FINAL)
   ========================================= */

/**
 * Generate human-readable explanation for the result
 */
export function explainResult(intent, chartType) {
  if (!intent || typeof intent !== "object") {
    return "The chart represents the processed data based on your query.";
  }

  const { metric, dimension, aggregation } = intent;

  /* ---------------------------------------
     Fallback explanation
     --------------------------------------- */
  if (!metric || !dimension) {
    return "The chart displays the available data based on your query.";
  }

  /* ---------------------------------------
     Aggregation language
     --------------------------------------- */
  const aggregationText = getAggregationText(aggregation);
  const chartText = getChartText(chartType);

  /* ---------------------------------------
     Core explanation
     --------------------------------------- */
  let explanation = `This ${chartText} shows the ${aggregationText} of "${metric}" grouped by "${dimension}".`;

  /* ---------------------------------------
     Analytical intelligence (contextual)
     --------------------------------------- */
  explanation += getAnalyticalInsight(aggregation, chartType);

  return explanation;
}

/* =========================================
   Intelligence helpers
   ========================================= */

/**
 * Human-readable aggregation text
 */
function getAggregationText(aggregation) {
  switch (aggregation) {
    case "avg":
      return "average";
    case "count":
      return "count";
    case "sum":
    default:
      return "total";
  }
}

/**
 * Human-readable chart text
 */
function getChartText(chartType) {
  switch (chartType) {
    case "line":
      return "line chart";
    case "bar":
      return "bar chart";
    case "table":
    default:
      return "table";
  }
}

/**
 * Add contextual analytical insight
 */
function getAnalyticalInsight(aggregation, chartType) {
  let insight = "";

  /* Aggregation-based intelligence */
  if (aggregation === "avg") {
    insight += " This helps identify typical values and smooth out fluctuations.";
  }

  if (aggregation === "sum") {
    insight += " This highlights overall contribution and scale across categories.";
  }

  if (aggregation === "count") {
    insight += " This reveals frequency and distribution across groups.";
  }

  /* Chart-based intelligence */
  if (chartType === "line") {
    insight += " Trends and patterns over the sequence are easier to observe.";
  }

  if (chartType === "bar") {
    insight += " Differences between categories are clearly comparable.";
  }

  if (chartType === "table") {
    insight += " Exact values are presented for detailed inspection.";
  }

  return insight;
}
