/* =========================================
   Unified Data Load Pipeline (FINAL)
   ========================================= */

import { parseCSV } from "./csv.js";
import { inferSchema } from "./schema.js";
import { loadGoogleSheet } from "./sheets.js";

/**
 * Load data from CSV file OR Google Sheet
 */
export async function loadData({ file = null, sheetUrl = null }) {
  if (!file && !sheetUrl) {
    throw new Error("No data source provided");
  }

  let csvText = "";

  try {
    /* -------------------------------------
       Source selection (explicit priority)
       ------------------------------------- */
    if (sheetUrl) {
      csvText = await loadGoogleSheet(sheetUrl);
    } else if (file) {
      csvText = await file.text();
    }
  } catch (error) {
    console.error("Data loading failed:", error);
    throw new Error("Failed to load data source");
  }

  const rows = parseCSV(csvText);

  if (!Array.isArray(rows) || rows.length === 0) {
    return {
      rawData: [],
      tables: {},
      schema: {}
    };
  }

  const tableName = "data";
  const schema = inferSchema(rows);

  return {
    rawData: rows,
    tables: {
      [tableName]: rows
    },
    schema: {
      [tableName]: schema
    }
  };
}
