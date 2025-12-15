/* =========================================
   Query Input Handling (FINAL – FIXED)
========================================= */

/**
 * Initialize query input
 * @param {Function} onQueryExecute
 */
export function initQuery(onQueryExecute) {
  if (typeof onQueryExecute !== "function") {
    throw new TypeError("initQuery expects a function");
  }

  const queryInput = document.getElementById("queryInput");
  if (!queryInput) return;

  const execute = () => {
    const query = queryInput.value.trim();
    if (!query) return;
    onQueryExecute(query);
  };

  queryInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();        // 🔥 REQUIRED
    if (event.repeat) return;

    execute();
  });

  /* 🔥 Expose programmatic execution safely */
  queryInput.executeQuery = execute;
}
