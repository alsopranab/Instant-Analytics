/* =========================================
   Query Intent Parsing
   ========================================= */

/**
 * Detect aggregation type from query
 */
function detectAggregation(query) {
  const q = query.toLowerCase();

  if (q.includes("average") || q.includes("avg") || q.includes("mean")) {
    return "avg";
  }
  if (q.includes("count") || q.includes("number of")) {
    return "count";
  }
  if (q.includes("sum") || q.includes("total")) {
    return "sum";
  }

  return "sum";
}

/**
 * Match schema fields against query
 */
function matchField(query, schema) {
  const q = query.toLowerCase();

  for (const field in schema) {
    if (q.includes(field.toLowerCase())) {
      return field;
    }
  }

  return null;
}

/**
 * Parse query into intent object
 */
export function parseQuery(query, schema) {
  const aggregation = detectAggregation(query);

  const metric = matchField(query, schema);
  const dimension = Object.keys(schema).find(
    (key) => schema[key].type === "string" && key !== metric
  );

  return {
    raw: query,
    aggregation,
    metric,
    dimension
  };
}
