/* =========================================
   App Bootstrap & Orchestration (FINAL)
========================================= */

/* ---------- Data Loading ---------- */
import { loadData } from "./data/load.js";
import { createTabs, setActiveTab } from "./data/tabs.js";

/* ---------- Data Awareness ---------- */
import { updateDataAwareness } from "./ui/dataAwareness.js";

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
function $(id) {
  return document.getElementById(id);
}

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

      $("emptyState")?.style && ($("emptyState").style.display = "none");
    });

    // default table
    state.activeTable = tableNames[0];
    setActiveTab(state.activeTable);

    updateDataAwareness({
      rows: state.tables[state.activeTable],
      schema: state.schema[state.activeTable]
    });

    $("emptyState")?.style && ($("emptyState").style.display = "none");

  } catch (err) {
    alert(err.message || "Failed to load data");
  }
}

/* -----------------------------------------
   Query Execution (CORE)
----------------------------------------- */
function executeQuery(queryText) {
  if (!queryText || !state.activeTable) return;

  const data = state.tables[state.activeTable];
  const schema = state.schema[state.activeTable];
  if (!data || !schema) return;

  const intent = parseQuery(queryText, schema);
  const chartType = decideChart(intent);
  const transformed = transformData(data, intent);

  renderChart({
    chartType,
    data: transformed,
    title: "Result",
    xLabel: intent.dimension,
    yLabel: intent.aggregation.toUpperCase()
  });

  updateDashboard({
    explanation: explainResult(intent, chartType),
    suggestion: suggestChart(intent)
  });
}

/* -----------------------------------------
   Initialization
----------------------------------------- */
const _init = () => {
  initInput();
  initQuery(executeQuery);

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
};

/* -----------------------------------------
   Boot
----------------------------------------- */
document.addEventListener("DOMContentLoaded", _init);
