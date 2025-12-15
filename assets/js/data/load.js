/* =========================================
   CSV Load Pipeline
   ========================================= */

import { parseCSV } from "./csv.js";
import { inferSchema } from "./schema.js";

/**
 * Load and process CSV file
 */
export async function loadCSV(file) {
  const text = await file.text();
  const rows = parseCSV(text);

  if (!rows || rows.length === 0) {
    return {
      rawData: [],
      tables: {},
      schema: {}
    };
  }

  // Single-table model (future-safe for multi-table)
  const tableName = "data";

  const tables = {
    [tableName]: rows
  };

  const schema = {
    [tableName]: inferSchema(rows)
  };

  return {
    rawData: rows,
    tables,
    schema
  };
}
