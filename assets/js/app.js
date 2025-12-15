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
import { suggestChart as _suggestChart } from "./intelligence/suggest.js";
import { explainResult as _explainResult } from "./intelligence/explain.js";

/* ---------- Charts ---------- */
import { decideChart as _decideChart } from "./charts/decide.js";
import { transformData as _transformData } from "./charts/transform.js";
import { renderChart as _renderChart } from "./charts/render.js";

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
async function _handleDataLoad({ file = null, sheetUrl = null }) {
  try {
    const result = await loadData({ file, sheetUrl });
    if (!result || !result.tables) {
      throw new Error("Invalid data format");
    }

    state.tables = result.tables;
    state.schema = result.schema || {};

    const tableNames = Object.keys(state.tables);
    if (!tableNames.length) {
      throw new Error("No tables found");
    }

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
function _executeQuery(queryText) {
  if (!queryText || !state.activeTable) return;

  const _data = state.tables[state.activeTable];
  const _schema = state.schema[state.activeTable];
  if (!_data || !_schema) return;

  const intent = parseQuery(queryText, _schema);
  const chartType = _decideChart(intent);
  const transformed = _transformData(_data, intent);

  if (!Array.isArray(transformed) || transformed.length === 0) {
    updateDashboard({
      explanation: "No data available for this query.",
      suggestion: _suggestChart(intent)
    });
    return;
  }

  _renderChart({
    chartType,
    data: transformed,
    title: "Result",
    xLabel: intent.dimension,
    yLabel: intent.aggregation.toUpperCase()
  });

  updateDashboard({
    explanation: _explainResult(intent, chartType),
    suggestion: _suggestChart(intent)
  });
}

/* -----------------------------------------
   Initialization
----------------------------------------- */
const _init = () => {
  initInput();
  initQuery(_executeQuery);

  const csvInput = $("csvInput");
  const sheetInput = $("sheetInput");

  if (csvInput) {
    csvInput.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (file) _handleDataLoad({ file });
    });
  }

  if (sheetInput) {
    const loadSheet = () => {
      const url = sheetInput.value.trim();
      if (url) _handleDataLoad({ sheetUrl: url });
    };

    sheetInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        loadSheet();
      }
    });

    sheetInput.addEventListener("paste", () => {
      setTimeout(loadSheet, 0);
    });

    sheetInput.addEventListener("blur", loadSheet);
  }
};

/* -----------------------------------------
   Boot
----------------------------------------- */
document.addEventListener("DOMContentLoaded", _init);
