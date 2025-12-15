/* =========================================
   Chart Rendering Engine (PRO MAX)
========================================= */

/* -----------------------------------------
   Utilities
----------------------------------------- */
function getDashboard() {
  return document.getElementById("dashboard");
}

function clearChart() {
  const dashboard = getDashboard();
  if (!dashboard) return;

  const chart = dashboard.querySelector(".chart-container");
  if (chart) chart.remove();
}

function createContainer() {
  const div = document.createElement("div");
  div.className = "chart-container";
  return div;
}

function formatNumber(value) {
  if (typeof value !== "number") return value;
  return Number.isInteger(value)
    ? value.toLocaleString()
    : value.toFixed(2);
}

/* -----------------------------------------
   Header (Title + Axis Info)
----------------------------------------- */
function renderHeader(container, title, xLabel, yLabel) {
  const h3 = document.createElement("h3");
  h3.className = "chart-title";
  h3.textContent = title;

  const meta = document.createElement("div");
  meta.className = "chart-axis-info";
  meta.textContent = `${yLabel} by ${xLabel}`;

  container.appendChild(h3);
  container.appendChild(meta);
}

/* -----------------------------------------
   Color System
----------------------------------------- */
const COLOR_PALETTE = [
  "#4f46e5",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#8b5cf6",
  "#ec4899"
];

/* -----------------------------------------
   Legend
----------------------------------------- */
function renderLegend(container, data) {
  const legend = document.createElement("div");
  legend.className = "chart-legend";

  data.forEach((d, i) => {
    const item = document.createElement("div");
    item.className = "legend-item";

    const swatch = document.createElement("span");
    swatch.className = "legend-swatch";
    swatch.style.backgroundColor =
      COLOR_PALETTE[i % COLOR_PALETTE.length];

    const label = document.createElement("span");
    label.textContent = d.label;

    item.appendChild(swatch);
    item.appendChild(label);
    legend.appendChild(item);
  });

  container.appendChild(legend);
}

/* -----------------------------------------
   BAR CHART
----------------------------------------- */
function renderBarChart(container, data) {
  const width = container.clientWidth || 700;
  const height = 320;
  const padding = 48;

  const maxValue = Math.max(...data.map(d => d.value), 1);
  const barWidth = (width - padding * 2) / data.length;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "chart-svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);

  data.forEach((d, i) => {
    const barHeight =
      (d.value / maxValue) * (height - padding * 2);
    const color = COLOR_PALETTE[i % COLOR_PALETTE.length];

    // Bar
    const rect = document.createElementNS(svg.namespaceURI, "rect");
    rect.setAttribute("x", padding + i * barWidth);
    rect.setAttribute("y", height - padding - barHeight);
    rect.setAttribute("width", barWidth * 0.65);
    rect.setAttribute("height", barHeight);
    rect.setAttribute("fill", color);
    rect.setAttribute("rx", 6);

    // Value label
    const valueText = document.createElementNS(svg.namespaceURI, "text");
    valueText.setAttribute(
      "x",
      padding + i * barWidth + barWidth * 0.325
    );
    valueText.setAttribute(
      "y",
      height - padding - barHeight - 8
    );
    valueText.setAttribute("text-anchor", "middle");
    valueText.setAttribute("class", "chart-label");
    valueText.textContent = formatNumber(d.value);

    svg.appendChild(rect);
    svg.appendChild(valueText);
  });

  container.appendChild(svg);
  renderLegend(container, data);
}

/* -----------------------------------------
   LINE CHART
----------------------------------------- */
function renderLineChart(container, data) {
  if (data.length < 2) return;

  const width = container.clientWidth || 700;
  const height = 320;
  const padding = 48;

  const maxValue = Math.max(...data.map(d => d.value), 1);
  const stepX = (width - padding * 2) / (data.length - 1);

  const points = data.map((d, i) => {
    const x = padding + i * stepX;
    const y =
      height - padding -
      (d.value / maxValue) * (height - padding * 2);
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

/* -----------------------------------------
   TABLE (ALWAYS WORKS)
----------------------------------------- */
function renderTable(container, data) {
  const table = document.createElement("table");
  table.className = "chart-table";

  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");

  ["Category", "Value"].forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    trHead.appendChild(th);
  });

  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  data.forEach(row => {
    const tr = document.createElement("tr");

    const tdLabel = document.createElement("td");
    tdLabel.textContent = row.label;

    const tdValue = document.createElement("td");
    tdValue.textContent = formatNumber(row.value);

    tr.appendChild(tdLabel);
    tr.appendChild(tdValue);
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}

/* -----------------------------------------
   PUBLIC API
----------------------------------------- */
export function renderChart({
  chartType,
  data,
  title = "Result",
  xLabel = "Category",
  yLabel = "Value"
}) {
  const dashboard = getDashboard();
  if (!dashboard) return;

  clearChart();

  if (!Array.isArray(data) || data.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No data available for this query.";
    dashboard.prepend(empty);
    return;
  }

  const container = createContainer();
  renderHeader(container, title, xLabel, yLabel);

  if (chartType === "bar") {
    renderBarChart(container, data);
  } else if (chartType === "line") {
    renderLineChart(container, data);
  } else {
    renderTable(container, data);
  }

  dashboard.prepend(container);
}
