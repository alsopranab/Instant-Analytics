/* =========================================
   Data Transformation for Charts (FINAL)
   ========================================= */

import { toNumber, isEmpty } from "../utils/helpers.js";

/**
 * Transform raw data into aggregated chart data
 */
export function transformData(rows, intent) {
  const { metric, dimension, aggregation } = intent;

  if (!Array.isArray(rows) || !metric || !dimension) {
    return [];
  }

  const grouped = Object.create(null);

  rows.forEach((row) => {
    const key = isEmpty(row[dimension]) ? "Unknown" : String(row[dimension]);
    const value = toNumber(row[metric]);

    if (!grouped[key]) {
      grouped[key] = { sum: 0, count: 0 };
    }

    if (value !== null) {
      grouped[key].sum += value;
      grouped[key].count += 1;
    }
  });

  const result = Object.entries(grouped).map(([label, stats]) => {
    let value;

    switch (aggregation) {
      case "avg":
        value = stats.count ? stats.sum / stats.count : 0;
        break;
      case "count":
        value = stats.count;
        break;
      default:
        value = stats.sum;
    }

    return {
      label,
      value: Number(value.toFixed(2))
    };
  });

  /* ---------------------------------------
     Stable sorting (descending)
     --------------------------------------- */
  return result.sort((a, b) => b.value - a.value);
}
