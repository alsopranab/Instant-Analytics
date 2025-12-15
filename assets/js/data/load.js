/* =========================================
   Unified Data Load Pipeline
   ========================================= */

import { parseCSV } from "./csv.js";
import { inferSchema } from "./schema.js";
import { loadGoogleSheet } from "./sheets.js";

/**
 * Load data from CSV file OR Google Sheet
 */
export async function loadData({ file, sheetUrl }) {
  let csvText = "";

  if (file) {
    csvText = await file.text();
  } else if (sheetUrl) {
    csvText = await loadGoogleSheet(sheetUrl);
  } else {
    throw new Error("No data source provided");
  }

  const rows = parseCSV(csvText);

  if (!rows.length) {
    return { rawData: [], tables: {}, schema: {} };
  }

  const tableName = "data";

  return {
    rawData: rows,
    tables: { [tableName]: rows },
    schema: { [tableName]: inferSchema(rows) }
  };
}
