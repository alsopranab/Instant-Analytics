/* =========================================
   Data Transformation for Charts
   ========================================= */

/**
 * Transform raw data into aggregated chart data
 */
export function transformData(rows, intent) {
  const { metric, dimension, aggregation } = intent;

  if (!metric || !dimension) {
    return rows;
  }

  const grouped = {};

  rows.forEach((row) => {
    const key = row[dimension] ?? "Unknown";
    const value = parseFloat(row[metric]);

    if (!grouped[key]) {
      grouped[key] = {
        sum: 0,
        count: 0
      };
    }

    if (!isNaN(value)) {
      grouped[key].sum += value;
      grouped[key].count += 1;
    }
  });

  return Object.keys(grouped).map((key) => {
    let result;

    if (aggregation === "avg") {
      result =
        grouped[key].count === 0
          ? 0
          : grouped[key].sum / grouped[key].count;
    } else if (aggregation === "count") {
      result = grouped[key].count;
    } else {
      result = grouped[key].sum;
    }

    return {
      label: key,
      value: Number(result.toFixed(2))
    };
  });
}
