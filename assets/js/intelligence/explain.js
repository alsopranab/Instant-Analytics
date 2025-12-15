/* =========================================
   Result Explanation Intelligence (FINAL)
   ========================================= */

/**
 * Generate human-readable explanation for the result
 */
export function explainResult(intent, chartType, meta = {}) {
  if (!intent || typeof intent !== "object") {
    return "The result shows a summary of the loaded data.";
  }

  const { metric, dimension, aggregation } = intent;
  const {
    totalRows = null,
    groupCount = null,
    nonNullCount = null
  } = meta;

  /* ---------------------------------------
     Base explanation (SQL-like)
---------------------------------------- */
  let explanation = "";

  if (!metric && !dimension) {
    explanation =
      "The result displays a preview and summary of the dataset, similar to inspecting table rows and structure.";
    return explanation;
  }

  /* ---------------------------------------
     Core aggregation explanation
---------------------------------------- */
  const aggregationText = getAggregationText(aggregation);
  const chartText = getChartText(chartType);

  explanation += `This ${chartText} represents the ${aggregationText} of \`${metric}\` grouped by \`${dimension}\`.`;

  /* ---------------------------------------
     Dataset context (like df.info)
---------------------------------------- */
  if (totalRows !== null) {
    explanation += ` The dataset contains ${totalRows} rows.`;
  }

  if (nonNullCount !== null) {
    explanation += ` ${nonNullCount} records were used for aggregation after excluding missing values.`;
  }

  if (groupCount !== null) {
    explanation += ` The data is grouped into ${groupCount} distinct \`${dimension}\` values.`;
  }

  /* ---------------------------------------
     Analytical meaning (like pandas docs)
---------------------------------------- */
  explanation += getAnalyticalInsight(aggregation, chartType);

  return explanation;
}

/* =========================================
   Intelligence helpers
   ========================================= */

function getAggregationText(aggregation) {
  switch (aggregation) {
    case "avg":
      return "average";
    case "count":
      return "count";
    case "sum":
    default:
      return "sum";
  }
}

function getChartText(chartType) {
  switch (chartType) {
    case "line":
      return "line chart";
    case "bar":
      return "bar chart";
    case "table":
      return "table";
    default:
      return "result";
  }
}

/**
 * Analytical insight similar to SQL / pandas docs
 */
function getAnalyticalInsight(aggregation, chartType) {
  let insight = "";

  if (aggregation === "count") {
    insight +=
      " This operation is equivalent to `COUNT(*) GROUP BY`, useful for understanding distribution and frequency.";
  }

  if (aggregation === "sum") {
    insight +=
      " This operation is equivalent to `SUM(column) GROUP BY`, highlighting total contribution across groups.";
  }

  if (aggregation === "avg") {
    insight +=
      " This operation is equivalent to `AVG(column) GROUP BY`, useful for comparing typical values.";
  }

  if (chartType === "table") {
    insight +=
      " Tabular output is useful when exact values are more important than visual comparison.";
  }

  if (chartType === "bar") {
    insight +=
      " Bar charts are effective for comparing magnitude across discrete categories.";
  }

  if (chartType === "line") {
    insight +=
      " Line charts are effective for observing trends and changes over an ordered sequence.";
  }

  return insight;
}
