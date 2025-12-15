/* =========================================
   Query Input Handling (FINAL)
   ========================================= */

/**
 * Initialize query input
 * @param {Function} onQueryExecute - callback to run analytics pipeline
 */
export function initQuery(onQueryExecute) {
  if (typeof onQueryExecute !== "function") {
    throw new TypeError("initQuery expects a function");
  }

  const queryInput = document.getElementById("queryInput");
  if (!queryInput) return;

  queryInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    if (event.repeat) return;

    const query = queryInput.value.trim();
    if (!query) return;

    onQueryExecute(query);
  });
}
