/* =========================================
   Data Awareness Orchestrator (FINAL)
   -----------------------------------------
   Single entry point for:
   - Dataset overview (df.info)
   - Data preview (df.head)
   - Future: KPIs, suggested queries
========================================= */

import { updateDataOverview } from "./dataOverview.js";
import { updateDataPreview } from "./dataPreview.js";

/**
 * Update all persistent data-awareness views
 *
 * @param {Object} params
 * @param {Array<Object>} params.rows
 * @param {Object} params.schema
 */
export function updateDataAwareness({ rows, schema }) {
  // Dataset structure & metadata (df.info)
  updateDataOverview(rows, schema);

  // Data preview (df.head)
  updateDataPreview(rows);

  // 🔒 Future-safe extension point:
  // updateKpis(rows, schema);
  // updateSuggestedQueries(schema);
}

