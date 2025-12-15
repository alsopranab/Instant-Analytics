/* =========================================
   Query Input Handling (FINAL)
========================================= */

/**
 * Initialize query input
 * Triggers analytics execution on Enter key
 *
 * @param {Function} onQueryExecute
 */
export function initQuery(onQueryExecute) {
  if (typeof onQueryExecute !== "function") {
    throw new TypeError("initQuery expects a function");
  }

  const queryInput = document.getElementById("queryInput");
  if (!queryInput) return;

  queryInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    if (event.repeat) return;

    const query = queryInput.value.trim();
    if (!query) return;

    onQueryExecute(query);
  });
}
