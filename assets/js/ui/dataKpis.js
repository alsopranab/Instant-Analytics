/* =========================================
   Data KPIs (Single-number metrics)
========================================= */

/**
 * Safely get KPI container
 */
function getContainer() {
  return document.getElementById("dataKpis");
}

/**
 * Build basic KPIs
 */
function buildKpis(rows, schema) {
  const totalRows = Array.isArray(rows) ? rows.length : 0;

  let nonNullCells = 0;
  let totalCells = 0;

  if (Array.isArray(rows) && schema) {
    const columns = Object.keys(schema);

    rows.forEach((row) => {
      columns.forEach((col) => {
        totalCells++;
        const v = row[col];
        if (v !== null && v !== undefined && v !== "") {
          nonNullCells++;
        }
      });
    });
  }

  return [
    { label: "Total Rows", value: totalRows },
    { label: "Columns", value: schema ? Object.keys(schema).length : 0 },
    { label: "Non-Null Cells", value: nonNullCells },
    { label: "Total Cells", value: totalCells }
  ];
}

/**
 * Render KPI cards
 */
function renderKpis(kpis) {
  const container = getContainer();
  if (!container) return;

  container.innerHTML = "";

  kpis.forEach((kpi) => {
    const card = document.createElement("div");
    card.className = "kpi-card";

    const value = document.createElement("div");
    value.className = "kpi-value";
    value.textContent = kpi.value.toLocaleString();

    const label = document.createElement("div");
    label.className = "kpi-label";
    label.textContent = kpi.label;

    card.appendChild(value);
    card.appendChild(label);
    container.appendChild(card);
  });
}

/**
 * Public API
 */
export function updateDataKpis(rows, schema) {
  const kpis = buildKpis(rows, schema);
  renderKpis(kpis);
}
