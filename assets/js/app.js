/* =========================================
   App Bootstrap & Orchestration (FINAL)
   ========================================= */

import { loadData } from "./data/load.js";
import { createTabs, setActiveTab } from "./data/tabs.js";

import { parseQuery } from "./intelligence/intent.js";
import { suggestChart } from "./intelligence/suggest.js";
import { explainResult } from "./intelligence/explain.js";

import { decideChart } from "./charts/decide.js";
import { transformData } from "./charts/transform.js";
import { renderChart } from "./charts/render.js";

import { initInput } from "./ui/input.js";
import { initQuery } from "./ui/query.js";
import { updateDashboard } from "./ui/dashboard.js";

/* -----------------------------------------
   Global App State
----------------------------------------- */
const state = {
  rawData: [],
  tables: {},
  schema: {},
  activeTable: null,
  lastQuery: null
};

/* -----------------------------------------
   DOM Helpers
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

    state.rawData = result.rawData;
    state.tables = result.tables;
    state.schema = result.schema;

    const tableNames = Object.keys(result.tables);
    if (!tableNames.length) return;

    createTabs(result.tables, (tableName) => {
      state.activeTable = tableName;
      setActiveTab(tableName);
      $("emptyState").style.display = "none";
    });

    state.activeTable = tableNames[0];
    setActiveTab(state.activeTable);
    $("emptyState").style.display = "none";
  } catch (error) {
    console.error(error);
    alert(error.message || "Failed to load data");
  }
}

/* -----------------------------------------
   Query Execution Pipeline
----------------------------------------- */
function executeQuery(queryText) {
  if (!state.activeTable) return;

  const data = state.tables[state.activeTable];
  const schema = state.schema[state.activeTable];

  const intent = parseQuery(queryText, schema);
  const chartType = decideChart(intent);
  const transformed = transformData(data, intent);
  const suggestion = suggestChart(intent);
  const explanation = explainResult(intent, chartType);

  renderChart({
    chartType,
    data: transformed
  });

  updateDashboard({
    explanation,
    suggestion
  });

  state.lastQuery = queryText;
}

/* -----------------------------------------
   Initialization
----------------------------------------- */
function init() {
  const csvInput = $("csvInput");
  const sheetInput = $("sheetInput");

  initInput();
  initQuery(executeQuery);

  if (csvInput) {
    csvInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) handleDataLoad({ file });
    });
  }

  if (sheetInput) {
    sheetInput.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      const url = sheetInput.value.trim();
      if (url) handleDataLoad({ sheetUrl: url });
    });
  }
}

init();
