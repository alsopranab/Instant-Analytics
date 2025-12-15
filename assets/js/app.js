/* =========================================
   App Bootstrap & Orchestration (ADVANCED)
========================================= */

/* ---------- Data Loading ---------- */
import { loadData } from "./data/load.js";
import { createTabs, setActiveTab } from "./data/tabs.js";

/* ---------- Data Awareness (SQL / df.info / df.head) ---------- */
import { updateDataAwareness } from "./ui/dataAwareness.js";

/* ---------- Persistent UI ---------- */
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
  rawData: [],
  tables: {},
  schema: {},
  activeTable: null,
  lastQuery: null
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

    state.rawData = result.rawData || [];
    state.tables = result.tables;
    state.schema = result.schema || {};

    const tableNames = Object.keys(state.tables);
    if (!tableNames.length) {
      throw new Error("No tables found");
    }

    createTabs(state.tables, (tableName) => {
      state.activeTable = tableName;
      setActiveTab(tableName);

      // 🔹 SINGLE SOURCE: update ALL data awareness views
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

    // 🔹 Initial awareness render
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
   Query Execution (SINGLE SOURCE OF TRUTH)
----------------------------------------- */
function executeQuery(queryText) {
  if (!queryText || !state.activeTable) return;

  const data = state.tables[state.activeTable];
  const schema = state.schema[state.activeTable];
  if (!data || !schema) return;

  // 1️⃣ Parse intent
  const intent = parseQuery(queryText, schema);

  // 2️⃣ Decide visualization
  const chartType = decideChart(intent);

  // 3️⃣ Transform data
  const transformed = transformData(data, intent);

  // 4️⃣ Render chart / table
  renderChart({
    chartType,
    data: transformed.data ?? transformed,
    title: "Result",
    xLabel: intent.dimension,
    yLabel: intent.aggregation.toUpperCase()
  });

  // 5️⃣ Explanation + suggestions
  updateDashboard({
    explanation: explainResult(intent, chartType),
    suggestion: suggestChart(intent)
  });

  state.lastQuery = queryText;
}

/* -----------------------------------------
   Initialization
----------------------------------------- */
const _init = () => {
  const csvInput = $("csvInput");
  const sheetInput = $("sheetInput");

  initInput();
  initQuery(executeQuery);

  // CSV upload
  if (csvInput) {
    csvInput.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (file) handleDataLoad({ file });
    });
  }

  // Google Sheet input
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
