/* =========================================
   Query Intent Parsing Intelligence (FINAL)
   Robust, Underscore-Safe, Human-Friendly
========================================= */

/* -----------------------------------------
   Text Normalization
----------------------------------------- */
function normalize(text) {
  return String(text)
    .toLowerCase()
    .replace(/[_\s]+/g, "");
}

/* -----------------------------------------
   Detect aggregation intent
----------------------------------------- */
function detectAggregation(query) {
  const q = query.toLowerCase();

  if (/\b(avg|average|mean)\b/.test(q)) return "avg";
  if (/\b(count|number of|how many)\b/.test(q)) return "count";
  if (/\b(sum|total|overall)\b/.test(q)) return "sum";
  if (/\b(most|highest|top|max|maximum)\b/.test(q)) return "count";

  return null;
}

/* -----------------------------------------
   Detect explicit dimension phrase
----------------------------------------- */
function detectExplicitDimension(query) {
  const q = query.toLowerCase();

  const patterns = [
    /\bby\s+([\w\s_]+)/,
    /\bper\s+([\w\s_]+)/,
    /\bgrouped\s+by\s+([\w\s_]+)/
  ];

  for (const regex of patterns) {
    const match = q.match(regex);
    if (match) return match[1].trim();
  }

  return null;
}

/* -----------------------------------------
   Match schema field against query text
   (underscore & space safe)
----------------------------------------- */
function matchSchemaField(query, schema, typeFilter = null) {
  const q = normalize(query);

  for (const field in schema) {
    if (typeFilter && schema[field].type !== typeFilter) continue;

    const normalizedField = normalize(field);
    if (q.includes(normalizedField)) {
      return field;
    }
  }

  return null;
}

/* -----------------------------------------
   Pick fallback dimension (string column)
----------------------------------------- */
function fallbackDimension(schema, metric) {
  for (const key in schema) {
    if (schema[key].type === "string" && key !== metric) {
      return key;
    }
  }
  return null;
}

/* -----------------------------------------
   Parse query into structured intent
----------------------------------------- */
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

  /* 1️⃣ Aggregation */
  let aggregation = detectAggregation(query);

  /* 2️⃣ Metric (numeric field) */
  const metric = matchSchemaField(query, schema, "number");

  /* 3️⃣ Dimension (explicit → fallback) */
  const explicitPhrase = detectExplicitDimension(query);

  let dimension = null;
  if (explicitPhrase) {
    dimension = matchSchemaField(
      explicitPhrase,
      schema,
      "string"
    );
  }

  if (!dimension) {
    dimension = fallbackDimension(schema, metric);
  }

  /* 4️⃣ Defaults */
  if (!aggregation) {
    aggregation = metric ? "sum" : "count";
  }

  /* 5️⃣ Confidence */
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
