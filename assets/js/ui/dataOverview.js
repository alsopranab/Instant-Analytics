/* =========================================
   Data Overview (df.info equivalent)
========================================= */

/**
 * Render dataset structure & metadata
 * Similar to pandas df.info()
 */
export function updateDataOverview(rows, schema) {
  const container = document.getElementById("dataOverview");
  if (!container) return;

  container.innerHTML = "";

  /* Title */
  const title = document.createElement("h3");
  title.textContent = "Dataset Overview";
  container.appendChild(title);

  /* Meta summary */
  const meta = document.createElement("p");
  meta.textContent = `Rows: ${rows?.length ?? 0} | Columns: ${
    schema ? Object.keys(schema).length : 0
  }`;
  container.appendChild(meta);

  if (!schema || !Object.keys(schema).length) return;

  /* Schema table */
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

  Object.entries(schema).forEach(([column, info]) => {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = column;

    const tdType = document.createElement("td");
    tdType.textContent = info.type;

    tr.appendChild(tdName);
    tr.appendChild(tdType);
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}
