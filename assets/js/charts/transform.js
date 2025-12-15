/* =========================================
   Data Transformation for Charts (FINAL)
========================================= */

import { toNumber, isEmpty } from "../utils/helpers.js";

/**
 * Transform raw data into aggregated chart data
 */
export function transformData(rows, intent) {
  const { metric, dimension, aggregation } = intent;

  if (!Array.isArray(rows) || !dimension) {
    return [];
  }

  const grouped = Object.create(null);

  rows.forEach((row) => {
    const key = isEmpty(row[dimension]) ? "Unknown" : String(row[dimension]);

    if (!grouped[key]) {
      grouped[key] = { sum: 0, count: 0 };
    }

    // Always count rows (important for entity data)
    grouped[key].count += 1;

    // Only sum when metric is numeric
    if (metric) {
      const value = toNumber(row[metric]);
      if (value !== null) {
        grouped[key].sum += value;
      }
    }
  });

  const result = Object.entries(grouped).map(([label, stats]) => {
    let value;

    // Default behavior:
    // - If aggregation is count OR metric is missing → COUNT
    if (aggregation === "count" || !metric) {
      value = stats.count;
    } else if (aggregation === "avg") {
      value = stats.count ? stats.sum / stats.count : 0;
    } else {
      // sum
      value = stats.sum;
    }

    return {
      label,
      value: Number(value.toFixed(2))
    };
  });

  /* ---------------------------------------
     Stable sorting (descending)
---------------------------------------- */
  return result.sort((a, b) => b.value - a.value);
}
