/* =========================================
   Data Transformation for Charts (FINAL)
   Stable, Intent-Safe, UI-Compatible
========================================= */

import { toNumber, isEmpty } from "../utils/helpers.js";

/**
 * Transform raw rows into chart-ready data
 * RETURNS:
 * {
 *   data: Array<{ label, value }>,
 *   meta: { aggregation, metric, dimension }
 * }
 */
export function transformData(rows, intent) {
  if (
    !Array.isArray(rows) ||
    !intent ||
    !intent.dimension ||
    !intent.aggregation
  ) {
    return { data: [], meta: {} };
  }

  const { metric, dimension, aggregation } = intent;

  const grouped = Object.create(null);

  /* -----------------------------------------
     Group rows
  ----------------------------------------- */
  for (const row of rows) {
    const rawKey = row[dimension];
    const key = isEmpty(rawKey) ? "Unknown" : String(rawKey);

    const value =
      metric && aggregation !== "count"
        ? toNumber(row[metric])
        : 1;

    if (!grouped[key]) {
      grouped[key] = { sum: 0, count: 0 };
    }

    if (value !== null && !Number.isNaN(value)) {
      grouped[key].sum += value;
      grouped[key].count += 1;
    }
  }

  /* -----------------------------------------
     Aggregate
  ----------------------------------------- */
  const data = Object.entries(grouped).map(([label, stats]) => {
    let value = 0;

    switch (aggregation) {
      case "avg":
        value = stats.count ? stats.sum / stats.count : 0;
        break;

      case "count":
        value = stats.count;
        break;

      case "sum":
        value = stats.sum;
        break;

      default:
        return null;
    }

    return {
      label,
      value: Number(value.toFixed(2))
    };
  }).filter(Boolean);

  /* -----------------------------------------
     Stable sort (descending)
  ----------------------------------------- */
  data.sort((a, b) => b.value - a.value);

  return {
    data,
    meta: {
      aggregation,
      metric,
      dimension
    }
  };
}
