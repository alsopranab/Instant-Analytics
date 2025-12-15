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

  if (/\b(most|highest|top|maximum|max)\b/.test(q)) return "count";

  return null;
}

/**
 * Detect explicit dimension phrase
 */
function detectExplicitDimension(query) {
  const q = query.toLowerCase();

  const patterns = [
    /\bby\s+([\w\s]+)/,
    /\bper\s+([\w\s]+)/,
    /\bgrouped\s+by\s+([\w\s]+)/
  ];

  for (const regex of patterns) {
    const match = q.match(regex);
    if (match) return match[1].trim();
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
 * Pick best fallback dimension
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

  // 1️⃣ Aggregation
  let aggregation = detectAggregation(query);

  // 2️⃣ Metric (numeric preferred)
  const metric = matchSchemaField(query, schema, "number");

  // 3️⃣ Dimension (explicit → schema match → fallback)
  const explicitPhrase = detectExplicitDimension(query);
  const explicitDimension =
    explicitPhrase
      ? matchSchemaField(explicitPhrase, schema, "string")
      : null;

  const dimension =
    explicitDimension || fallbackDimension(schema, metric);

  // 4️⃣ Defaults
  if (!aggregation) {
    aggregation = metric ? "sum" : "count";
  }

  // 5️⃣ Confidence
  let confidence = "high";
  if (!dimension || !metric) confidence = "medium";
  if (!dimension && !metric) confidence = "low";

  return {
    raw: query,
    aggregation,
    metric,
    dimension,
    confidence
  };
}
