/* =========================================
   Data Preview UI (df.head equivalent)
========================================= */

const DEFAULT_ROWS = 5;

/**
 * Safely get preview container
 */
function getContainer() {
  return document.getElementById("dataPreview");
}

/**
 * Render preview table
 */
function renderTable(rows) {
  const container = getContainer();
  if (!container) return;

  container.innerHTML = "";

  if (!Array.isArray(rows) || rows.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No data available for preview.";
    container.appendChild(empty);
    return;
  }

  const previewRows = rows.slice(0, DEFAULT_ROWS);
  const columns = Object.keys(previewRows[0]);

  const title = document.createElement("h3");
  title.textContent = `Data Preview (first ${previewRows.length} rows)`;
  container.appendChild(title);

  const table = document.createElement("table");
  table.className = "preview-table";

  // Header
  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");

  columns.forEach(col => {
    const th = document.createElement("th");
    th.textContent = col;
    headRow.appendChild(th);
  });

  thead.appendChild(headRow);
  table.appendChild(thead);

  // Body
  const tbody = document.createElement("tbody");

  previewRows.forEach(row => {
    const tr = document.createElement("tr");

    columns.forEach(col => {
      const td = document.createElement("td");
      const value = row[col];

      td.textContent =
        value === null || value === undefined || value === ""
          ? "—"
          : value;

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}

/**
 * Public API
 */
export function updateDataPreview(rows) {
  renderTable(rows);
}
