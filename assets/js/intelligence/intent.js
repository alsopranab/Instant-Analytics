/* =========================================
   Query Intent Parsing Intelligence (FINAL)
   ========================================= */

/**
 * Detect aggregation intent from query
 */
function detectAggregation(query) {
  const q = query.toLowerCase();

  if (/\b(avg|average|mean)\b/.test(q)) return "avg";
  if (/\b(count|number of|how many)\b/.test(q)) return "count";
  if (/\b(sum|total|overall)\b/.test(q)) return "sum";

  /* Default analytical assumption */
  return "sum";
}

/**
 * Detect explicit dimension keywords
 */
function detectExplicitDimension(query) {
  const q = query.toLowerCase();

  const patterns = [
    { regex: /\bby\s+(\w+)/, index: 1 },
    { regex: /\bper\s+(\w+)/, index: 1 },
    { regex: /\bgrouped\s+by\s+(\w+)/, index: 1 }
  ];

  for (const { regex, index } of patterns) {
    const match = q.match(regex);
    if (match) return match[index];
  }

  return null;
}

/**
 * Match schema field against query text
 */
function matchSchemaField(query, schema, typeFilter = null) {
  const q = query.toLowerCase();

  for (const field in schema) {
    if (typeFilter && schema[field].type !== typeFilter) continue;
    if (q.includes(field.toLowerCase())) return field;
  }

  return null;
}

/**
 * Fallback dimension selection
 */
function fallbackDimension(schema, metric) {
  return Object.keys(schema).find(
    (key) => schema[key].type === "string" && key !== metric
  );
}

/**
 * Parse query into structured intent
 */
export function parseQuery(query, schema) {
  if (!query || typeof query !== "string" || !schema) {
    return {
      raw: query,
      aggregation: "sum",
      metric: null,
      dimension: null,
      confidence: "low"
    };
  }

  const aggregation = detectAggregation(query);

  /* Metric detection (prefer numeric fields) */
  const metric =
    matchSchemaField(query, schema, "number") ||
    matchSchemaField(query, schema);

  /* Dimension detection */
  const explicitDimension = detectExplicitDimension(query);
  const dimension =
    (explicitDimension && schema[explicitDimension]
      ? explicitDimension
      : null) || fallbackDimension(schema, metric);

  /* Confidence scoring (simple but effective) */
  let confidence = "high";
  if (!metric || !dimension) confidence = "medium";
  if (!metric && !dimension) confidence = "low";

  return {
    raw: query,
    aggregation,
    metric,
    dimension,
    confidence
  };
}
