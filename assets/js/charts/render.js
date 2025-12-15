/* =========================================
   Chart Rendering Engine (FINAL – CLEAN)
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
   Header (TITLE ONLY – NO DUPLICATES)
----------------------------------------- */
function renderHeader(parent, title) {
  const header = document.createElement("div");
  header.className = "chart-header";

  const h3 = document.createElement("h3");
  h3.className = "chart-title";
  h3.textContent = title;

  header.appendChild(h3);
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
   Legend (BAR ONLY)
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
  const width = 1000 - padding * 2;
  const height = 360 - padding * 2;

  const maxValue = Math.max(...data.map(d => d.value), 1);
  const barWidth = width / data.length;

  data.forEach((d, i) => {
    const barHeight = (d.value / maxValue) * height;
    const x = padding + i * barWidth;
    const y = padding + (height - barHeight);

    const rect = document.createElementNS(svg.namespaceURI, "rect");
    rect.setAttribute("x", x + barWidth * 0.15);
    rect.setAttribute("y", y);
    rect.setAttribute("width", barWidth * 0.7);
    rect.setAttribute("height", barHeight);
    rect.setAttribute("rx", 6);
    rect.setAttribute("fill", COLORS[i % COLORS.length]);

    const value = document.createElementNS(svg.namespaceURI, "text");
    value.setAttribute("x", x + barWidth / 2);
    value.setAttribute("y", y - 8);
    value.setAttribute("text-anchor", "middle");
    value.setAttribute("class", "chart-label");
    value.textContent = formatNumber(d.value);

    svg.appendChild(rect);
    svg.appendChild(value);
  });

  renderLegend(container, data);
}

/* -----------------------------------------
   LINE CHART (NO LEGEND)
----------------------------------------- */
function renderLineChart(container, data) {
  if (data.length < 2) return;

  const svg = createSVG(container);

  const padding = 60;
  const width = 1000 - padding * 2;
  const height = 360 - padding * 2;

  const maxValue = Math.max(...data.map(d => d.value), 1);
  const stepX = width / (data.length - 1);

  const points = data.map((d, i) => {
    const x = padding + i * stepX;
    const y =
      padding + height -
      (d.value / maxValue) * height;
    return `${x},${y}`;
  });

  const polyline = document.createElementNS(svg.namespaceURI, "polyline");
  polyline.setAttribute("points", points.join(" "));
  polyline.setAttribute("class", "chart-line");

  svg.appendChild(polyline);
}

/* -----------------------------------------
   TABLE (FALLBACK)
----------------------------------------- */
function renderTable(container, data) {
  const table = document.createElement("table");

  const thead = document.createElement("thead");
  const trh = document.createElement("tr");

  ["Category", "Value"].forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
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
  title = "Result"
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
  renderHeader(container, title);

  if (chartType === "bar") {
    renderBarChart(container, data);
  } else if (chartType === "line") {
    renderLineChart(container, data);
  } else {
    renderTable(container, data);
  }

  dashboard.appendChild(container);
}
