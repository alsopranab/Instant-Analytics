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

  // Ranking words imply COUNT for entity data
  if (/\b(most|highest|top|maximum|max)\b/.test(q)) return "count";

  return null; // allow smart fallback later
}

/**
 * Detect explicit dimension keywords
 */
function detectExplicitDimension(query) {
  const q = query.toLowerCase();

  const patterns = [
    { regex: /\bby\s+([\w\s]+)/, index: 1 },
    { regex: /\bper\s+([\w\s]+)/, index: 1 },
    { regex: /\bgrouped\s+by\s+([\w\s]+)/, index: 1 }
  ];

  for (const { regex, index } of patterns) {
    const match = q.match(regex);
    if (match) return match[index].trim();
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
 * Pick best fallback dimension (string-like field)
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
      aggregation: "count",
      metric: null,
      dimension: null,
      confidence: "low"
    };
  }

  // Step 1: aggregation intent
  let aggregation = detectAggregation(query);

  // Step 2: detect numeric metric first
  const metric = matchSchemaField(query, schema, "number");

  // Step 3: detect dimension
  const explicitDimension = detectExplicitDimension(query);
  const dimension =
    (explicitDimension && schema[explicitDimension]
      ? explicitDimension
      : null) || fallbackDimension(schema, metric);

  // Step 4: intelligent defaults
  if (!metric) {
    aggregation = "count";
  }

  // Step 5: confidence scoring
  let confidence = "high";
  if (!dimension) confidence = "medium";
  if (!metric && !dimension) confidence = "low";

  return {
    raw: query,
    aggregation,
    metric,
    dimension,
    confidence
  };
}
