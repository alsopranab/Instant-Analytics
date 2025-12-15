/* =========================================
   Schema Inference
   ========================================= */

/**
 * Infer the data type of a value
 */
function inferType(value) {
  if (value === null || value === undefined || value === "") {
    return "empty";
  }

  if (!isNaN(value) && value.trim() !== "") {
    return "number";
  }

  const date = Date.parse(value);
  if (!isNaN(date)) {
    return "date";
  }

  return "string";
}

/**
 * Resolve the dominant type from a list
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
  if (!rows || rows.length === 0) return {};

  const schema = {};
  const columns = Object.keys(rows[0]);

  columns.forEach((column) => {
    const detectedTypes = new Set();

    rows.forEach((row) => {
      detectedTypes.add(inferType(row[column]));
    });

    schema[column] = {
      name: column,
      type: resolveType([...detectedTypes])
    };
  });

  return schema;
}
