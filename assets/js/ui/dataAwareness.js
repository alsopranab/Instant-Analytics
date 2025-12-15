/* =========================================
   Data Awareness Orchestrator
   -----------------------------------------
   Single source to update:
   - Overview (df.info)
   - Preview (df.head)
   - KPIs
   - Suggested Queries
========================================= */

import { updateDataOverview } from "./dataOverview.js";
import { updateDataPreview } from "./dataPreview.js";
import { updateDataKpis } from "./dataKpis.js";
import { updateSuggestedQueries } from "./suggestedQueries.js";

/**
 * Update all data awareness panels together
 */
export function updateDataAwareness({ rows = [], schema = {} }) {
  // Dataset structure & metadata
  updateDataOverview(rows, schema);

  // Preview first N rows
  updateDataPreview(rows);

  // KPIs
  updateDataKpis(rows, schema);

  // Suggested questions
  updateSuggestedQueries(schema);
}
