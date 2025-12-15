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

    // Default table
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
   Query Execution (CORE)
----------------------------------------- */
function executeQuery(queryText) {
  if (!queryText || !state.activeTable) return;

  const data = state.tables[state.activeTable];
  const schema = state.s
