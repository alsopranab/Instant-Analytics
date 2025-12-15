/* =========================================
   Chart Rendering Engine (FINAL – FIXED)
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

  dashboard.querySelectorAll(".chart-container").forEach(el => el.remove());
}

function createContainer() {
  const wrapper = document.createElement("div");
  wrapper.className = "chart-container";
  return wrapper;
}

function formatNumber(value) {
  if (typeof value !== "number") return value;
  return Number.isInteger(value)
    ? value.toLocaleString()
    : value.toFixed(2);
}

/* -----------------------------------------
   Header (Title + Meta)
----------------------------------------- */
function renderHeader(parent, title, xLabel, yLabel) {
  const header = document.createElement("div");
  header.className = "chart-header";

  const h3 = document.createElement("h3");
  h3.className = "chart-title";
  h3.textContent = title;

  const meta = document.createElement("div");
  meta.className = "chart-axis-info";
  meta.textContent = `${yLabel} by ${xLabel}`;

  header.appendChild(h3);
  header.appendChild(meta);
  parent.appendChild(header);
}

/* -----------------------------------------
   Color Palette
----------------------------------------- */
const COLORS = [
  "#6366f1",
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
function renderLegend(parent, data) {
  const legend = document.createElement("div");
  legend.className = "chart-legend";

  data.forEach((d, i) => {
    const item = document.createElement("div");
    item.className = "legend-item";

    const swatch = document.createElement("span");
    swatch.className = "legend-swatch";
    swatch.style.backgroundColor = COLORS[i % COLORS.length];

    const label = document.createElement("span");
    label.textContent = d.label;

    item.appendChild(swatch);
    item.appendChild(label);
    legend.appendChild(item);
  });

  parent.appendChild(legend);
}

/* -----------------------------------------
   SVG BASE
----------------------------------------- */
function createSVG(container) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("chart-svg");
  svg.setAttribute("viewBox", "0 0 1000 360");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  container.appendChild(svg);
  return svg;
}

/* -----------------------------------------
   BAR CHART
----------------------------------------- */
function renderBarChart(container, data) {
  const svg = createSVG(container);

  const padding = 60;
  const chartWidth = 1000 - padding * 2;
  const chartHeight = 360 - padding * 2;

  const maxValue = Math.max(...data.map(d => d.value), 1);
  const barWidth = chartWidth / data.length;

  data.forEach((d, i) => {
    const height = (d.value / maxValue) * chartHeight;
    const x = padding + i * barWidth;
    const y = padding + (chartHeight - height);

    const rect = document.createElementNS(svg.namespaceURI, "rect");
    rect.setAttribute("x", x + barWidth * 0.15);
    rect.setAttribute("y", y);
    rect.setAttribute("width", barWidth * 0.7);
    rect.setAttribute("height", height);
    rect.setAttribute("rx", 6);
    rect.setAttribute("fill", COLORS[i % COLORS.length]);

    const label = document.createElementNS(svg.namespaceURI, "text");
    label.setAttribute("x", x + barWidth / 2);
    label.setAttribute("y", y - 8);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("class", "chart-label");
    label.textContent = formatNumber(d.value);

    svg.appendChild(rect);
    svg.appendChild(label);
  });

  renderLegend(container, data);
}

/* -----------------------------------------
   LINE CHART
----------------------------------------- */
function renderLineChart(container, data) {
  if (data.length < 2) return;

  const svg = createSVG(container);

  const padding = 60;
  const chartWidth = 1000 - padding * 2;
  const chartHeight = 360 - padding * 2;

  const maxValue = Math.max(...data.map(d => d.value), 1);
  const stepX = chartWidth / (data.length - 1);

  const points = data.map((d, i) => {
    const x = padding + i * stepX;
    const y =
      padding + chartHeight -
      (d.value / maxValue) * chartHeight;
    return `${x},${y}`;
  });

  const polyline = document.createElementNS(svg.namespaceURI, "polyline");
  polyline.setAttribute("points", points.join(" "));
  polyline.setAttribute("class", "chart-line");

  svg.appendChild(polyline);

  renderLegend(container, data);
}

/* -----------------------------------------
   TABLE (Fallback)
----------------------------------------- */
function renderTable(container, data) {
  const table = document.createElement("table");

  const thead = document.createElement("thead");
  const trh = document.createElement("tr");
  ["Category", "Value"].forEach(t => {
    const th = document.createElement("th");
    th.textContent = t;
    trh.appendChild(th);
  });
  thead.appendChild(trh);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  data.forEach(d => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");

    td1.textContent = d.label;
    td2.textContent = formatNumber(d.value);

    tr.appendChild(td1);
    tr.appendChild(td2);
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

  if (!Array.isArray(data) || !data.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No data available.";
    dashboard.appendChild(empty);
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

  dashboard.appendChild(container);
}
