/* =========================================
   Data Transformation for Charts (FINAL)
========================================= */

import { toNumber, isEmpty } from "../utils/helpers.js";

export function transformData(rows, intent) {
  const { metric, dimension, aggregation } = intent;

  if (!Array.isArray(rows) || !dimension) {
    return { data: [], meta: {} };
  }

  const grouped = Object.create(null);
  let nonNullCount = 0;

  rows.forEach((row) => {
    const key = isEmpty(row[dimension]) ? "Unknown" : String(row[dimension]);
    const value = metric ? toNumber(row[metric]) : 1;

    if (!grouped[key]) {
      grouped[key] = { sum: 0, count: 0 };
    }

    if (value !== null) {
      grouped[key].sum += value;
      grouped[key].count += 1;
      nonNullCount++;
    }
  });

  const data = Object.entries(grouped).map(([label, stats]) => {
    let value;

    switch (aggregation) {
      case "avg":
        value = stats.count ? stats.sum / stats.count : 0;
        break;
      case "count":
        value = stats.count;
        break;
      case "sum":
      default:
        value = stats.sum;
    }

    return {
      label,
      value: Number(value.toFixed(2))
    };
  });

  return {
    data: data.sort((a, b) => b.value - a.value),
    meta: {
      totalRows: rows.length,
      nonNullCount,
      groupCount: data.length
    }
  };
}
