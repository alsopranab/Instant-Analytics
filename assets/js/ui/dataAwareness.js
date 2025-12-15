/* =========================================
   Data Overview (df.info equivalent)
========================================= */

/**
 * Show dataset metadata:
 * - row count
 * - column count
 * - column names + types
 */
export function updateDataOverview(rows, schema) {
  const container = document.getElementById("dataOverview");
  if (!container) return;

  container.innerHTML = "";

  const title = document.createElement("h3");
  title.textContent = "Dataset Overview";
  container.appendChild(title);

  const meta = document.createElement("p");
  meta.textContent = `Rows: ${rows.length} | Columns: ${Object.keys(schema).length}`;
  container.appendChild(meta);

  const table = document.createElement("table");

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Column</th>
      <th>Type</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  Object.entries(schema).forEach(([col, info]) => {
    const tr = document.createElement("tr");

    const tdCol = document.createElement("td");
    tdCol.textContent = col;

    const tdType = document.createElement("td");
    tdType.textContent = info.type;

    tr.appendChild(tdCol);
    tr.appendChild(tdType);
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}
