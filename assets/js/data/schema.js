/* =========================================
   Schema Inference (FINAL)
   ========================================= */

/**
 * Safely infer primitive type of a value
 */
function inferType(value) {
  if (value === null || value === undefined) return "empty";

  const text = String(value).trim();
  if (text === "") return "empty";

  /* Strict number check */
  if (!isNaN(text) && text !== "") {
    return "number";
  }

  /* Strict date check (ISO / common formats only) */
  const timestamp = Date.parse(text);
  if (!isNaN(timestamp) && /[-/]/.test(text)) {
    return "date";
  }

  return "string";
}

/**
 * Resolve dominant column type
 */
function resolveType(types) {
  if (types.includes("string")) return "string";
  if (types.includes("date")) return "date";
  if (types.includes("number")) return "number";
  return "string";
}

/**
 * Infer schema from dataset
 */
export function inferSchema(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return {};

  const schema = {};
  const columns = Object.keys(rows[0]);

  columns.forEach((column) => {
    const detectedTypes = new Set();

    rows.forEach((row) => {
      detectedTypes.add(inferType(row[column]));
    });

    const type = resolveType([...detectedTypes]);

    schema[column] = {
      name: column,
      type,
      role: type === "number" ? "metric" : "dimension"
    };
  });

  return schema;
}
