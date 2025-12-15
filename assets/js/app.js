/* =========================================
   App Bootstrap & Orchestration (FINAL)
========================================= */

/* ---------- Data Loading ---------- */
import { loadData } from "./data/load.js";
import { createTabs, setActiveTab } from "./data/tabs.js";

/* ---------- Data Awareness ---------- */
import { updateDataAwareness } from "./ui/dataAwareness.js";

/* ---------- Toggles ---------- */
import { initToggles } from "./ui/toggles.js";
import { initThemeToggle } from "./ui/themeToggle.js";

/* ---------- UI ---------- */
import { initInput } from "./ui/input.js";
import { initQuery } from "./ui/query.js";
import { updateDashboard } from "./ui/dashboard.js";

/* ---------- Intelligence ---------- */
import { parseQuery } from "./intelligence/intent.js";
import { suggestChart } from "./intelligence/suggest.js";
import { explainResult } from "./intelligence/explain.js";

/* ---------- Charts ---------- */
import { decideChart } from "./charts/decide.js";
import { transformData } from "./charts/transform.js";
import { renderChart } from "./charts/render.js";

/* -----------------------------------------
   Global App State
----------------------------------------- */
const state = {
  tables: {},
  schema: {},
  activeTable: null
};

/* -----------------------------------------
   DOM Helper
----------------------------------------- */
const $ = (id) => document.getElementById(id);

/* -----------------------------------------
   Data Load Handler
----------------------------------------- */
async function handleDataLoad({ file = null, sheetUrl = null }) {
  try {
    const result = await loadData({ file, sheetUrl });
    if (!result?.tables) throw new Error("Invalid data format");

    state.tables = result.tables;
    state.schema = result.schema || {};

    const tableNames = Object.keys(state.tables);
    if (!tableNames.length) throw new Error("No tables found");

    createTabs(state.tables, (tableName) => {
      state.activeTable = tableName;
      setActiveTab(tableName);

      updateDataAwareness({
        rows: state.tables[tableName],
        schema: state.schema[tableName]
      });

      const empty = $("emptyState");
      if (empty) empty.style.display = "none";
    });

    /* Default table */
    state.activeTable = tableNames[0];
    setActiveTab(state.activeTable);

    updateDataAwareness({
      rows: state.tables[state.activeTable],
      schema: state.schema[state.activeTable]
    });

    const empty = $("emptyState");
    if (empty) empty.style.display = "none";

  } catch (err) {
    alert(err.message || "Failed to load data");
  }
}

/* -----------------------------------------
   Query Execution
----------------------------------------- */
function executeQuery(queryText) {
  if (!queryText || !state.activeTable) return;

  const rows = state.tables[state.activeTable];
  const schema = state.schema[state.activeTable];
  if (!rows || !schema) return;

  const intent = parseQuery(queryText, schema);
  if (!intent) return;

  const chartType = decideChart(intent);
  const { data, meta } = transformData(rows, intent);

  if (!data.length) {
    updateDashboard({
      explanation: "No results found for this query.",
      suggestion: suggestChart(intent)
    });
    return;
  }

  renderChart({
    chartType,
    data,
    title: `${intent.aggregation.toUpperCase()} by ${intent.dimension}`,
    xLabel: intent.dimension,
    yLabel: intent.aggregation.toUpperCase()
  });

  updateDashboard({
    explanation: explainResult(intent, chartType, meta),
    suggestion: suggestChart(intent)
  });
}

/* -----------------------------------------
   Initialization
----------------------------------------- */
function init() {
  initInput();
  initQuery(executeQuery);

  /* Theme Toggle */
  initThemeToggle("themeToggle");

  /* Section Toggles (AUTO-WIRED) */
  initToggles();

  const csvInput = $("csvInput");
  const sheetInput = $("sheetInput");

  if (csvInput) {
    csvInput.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (file) handleDataLoad({ file });
    });
  }

  if (sheetInput) {
    const loadSheet = () => {
      const url = sheetInput.value.trim();
      if (url) handleDataLoad({ sheetUrl: url });
    };

    sheetInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        loadSheet();
      }
    });

    sheetInput.addEventListener("paste", () => setTimeout(loadSheet, 0));
    sheetInput.addEventListener("blur", loadSheet);
  }
}

/* -----------------------------------------
   Boot
----------------------------------------- */
document.addEventListener("DOMContentLoaded", init);
