/* =========================================
   Data Awareness Orchestrator (FINAL)
========================================= */

import { updateDataOverview } from "./dataOverview.js";
import { updateDataPreview } from "./dataPreview.js";
import { updateDataKpis } from "./dataKpis.js";

/**
 * Update all persistent data-awareness views
 */
export function updateDataAwareness({ rows, schema }) {
  updateDataOverview(rows, schema);
  updateDataPreview(rows);
  updateDataKpis(rows, schema);
}
