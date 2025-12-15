/* =========================================
   App Bootstrap & Orchestration
   ========================================= */

import { loadCSV } from "./data/load.js";
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
  activeTable: null,
  schema: {},
  lastQuery: null
};

/* -----------------------------------------
   DOM References
   ----------------------------------------- */
const csvInput = document.getElementById("csvInput");
const emptyState = document.getElementById("emptyState");

/* -----------------------------------------
   CSV Upload Handler
   ----------------------------------------- */
csvInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const result = await loadCSV(file);

  state.rawData = result.rawData;
  state.tables = result.tables;
  state.schema = result.schema;

  createTabs(result.tables, (tableName) => {
    state.activeTable = tableName;
    setActiveTab(tableName);
    emptyState.style.display = "none";
  });

  state.activeTable = Object.keys(result.tables)[0];
  setActiveTab(state.activeTable);
  emptyState.style.display = "none";
});

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
    containerId: "dashboard",
    chartType,
    data: transformed,
    intent
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
  initInput();
  initQuery(executeQuery);
}

init();
