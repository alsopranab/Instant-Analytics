/* =========================================
   Chart Rendering Engine (FINAL)
   ========================================= */

/**
 * Get dashboard element safely
 */
function getDashboard() {
  return document.getElementById("dashboard");
}

/**
 * Clear only chart content (not text)
 */
function clearChart() {
  const dashboard = getDashboard();
  if (!dashboard) return;

  const existingChart = dashboard.querySelector(".chart-container");
  if (existingChart) {
    existingChart.remove();
  }
}

/**
 * Create chart container
 */
function createChartContainer() {
  const container = document.createElement("div");
  container.className = "chart-container";
  return container;
}

/**
 * Render Bar Chart (SVG)
 */
function renderBarChart(container, data) {
  const width = container.clientWidth || 600;
  const height = 300;
  const padding = 40;

  const maxValue = Math.max(...data.map(d => d.value), 0) || 1;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "chart-svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);

  const barWidth = (width - padding * 2) / data.length;

  data.forEach((d, i) => {
    const barHeight = (d.value / maxValue) * (height - padding * 2);

    const rect = document.createElementNS(svg.namespaceURI, "rect");
    rect.setAttribute("x", padding + i * barWidth);
    rect.setAttribute("y", height - padding - barHeight);
    rect.setAttribute("width", barWidth * 0.8);
    rect.setAttribute("height", barHeight);
    rect.setAttribute("class", "chart-bar");

    svg.appendChild(rect);
  });

  container.appendChild(svg);
}

/**
 * Render Line Chart (SVG)
 */
function renderLineChart(container, data) {
  if (data.length < 2) return;

  const width = container.clientWidth || 600;
  const height = 300;
  const padding = 40;

  const maxValue = Math.max(...data.map(d => d.value), 0) || 1;
  const stepX = (width - padding * 2) / (data.length - 1);

  const points = data.map((d, i) => {
    const x = padding + i * stepX;
    const y =
      height - padding - (d.value / maxValue) * (height - padding * 2);
    return `${x},${y}`;
  });

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "chart-svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);

  const polyline = document.createElementNS(svg.namespaceURI, "polyline");
  polyline.setAttribute("points", points.join(" "));
  polyline.setAttribute("class", "chart-line");

  svg.appendChild(polyline);
  container.appendChild(svg);
}

/**
 * Render Table
 */
function renderTable(container, data) {
  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  ["Label", "Value"].forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    th.style.textAlign = "left";
    th.style.padding = "8px";
    th.style.borderBottom = "1px solid #e5e7eb";
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  data.forEach(row => {
    const tr = document.createElement("tr");

    const tdLabel = document.createElement("td");
    tdLabel.textContent = row.label;
    tdLabel.style.padding = "8px";

    const tdValue = document.createElement("td");
    tdValue.textContent = row.value;
    tdValue.style.padding = "8px";

    tr.appendChild(tdLabel);
    tr.appendChild(tdValue);
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}

/**
 * Public render function
 */
export function renderChart({ chartType, data }) {
  const dashboard = getDashboard();
  if (!dashboard) return;

  clearChart();

  if (!Array.isArray(data) || data.length === 0) return;

  const container = createChartContainer();

  if (chartType === "line") {
    renderLineChart(container, data);
  } else if (chartType === "bar") {
    renderBarChart(container, data);
  } else {
    renderTable(container, data);
  }

  dashboard.prepend(container);
}
