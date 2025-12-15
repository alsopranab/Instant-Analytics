/* =========================================
   Data Overview UI (df.info equivalent)
========================================= */

/**
 * Build dataset overview metadata
 */
function buildOverview(rows, schema) {
  const totalRows = Array.isArray(rows) ? rows.length : 0;
  const columns = [];

  if (!schema || typeof schema !== "object") {
    return { totalRows, columns };
  }

  for (const [column, meta] of Object.entries(schema)) {
    let nonNullCount = 0;

    if (Array.isArray(rows)) {
      rows.forEach((row) => {
        if (row[column] !== null && row[column] !== undefined && row[column] !== "") {
          nonNullCount++;
        }
      });
    }

    columns.push({
      name: column,
      type: meta.type || "unknown",
      nonNullCount
    });
  }

  return {
    totalRows,
    totalColumns: columns.length,
    columns
  };
}

/**
 * Render overview into container (if exists)
 */
function renderOverview(overview) {
  const container = document.getElementById("dataOverview");
  if (!container) return;

  container.innerHTML = "";

  const title = document.createElement("h3");
  title.textContent = "Dataset Overview";
  container.appendChild(title);

  const summary = document.createElement("p");
  summary.textContent = `Rows: ${overview.totalRows} | Columns: ${overview.totalColumns}`;
  container.appendChild(summary);

  const table = document.createElement("table");
  table.className = "overview-table";

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");

  ["Column", "Type", "Non-Null Count"].forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    headRow.appendChild(th);
  });

  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  overview.columns.forEach(col => {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = col.name;

    const tdType = document.createElement("td");
    tdType.textContent = col.type;

    const tdCount = document.createElement("td");
    tdCount.textContent = col.nonNullCount;

    tr.appendChild(tdName);
    tr.appendChild(tdType);
    tr.appendChild(tdCount);
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}

/**
 * Public API
 */
export function updateDataOverview(rows, schema) {
  const overview = buildOverview(rows, schema);
  renderOverview(overview);
}
