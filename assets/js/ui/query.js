/* =========================================
   Query Input Handling
   ========================================= */

/**
 * Initialize query input
 * @param {Function} onQueryExecute - callback to run analytics pipeline
 */
export function initQuery(onQueryExecute) {
  const queryInput = document.getElementById("queryInput");

  if (!queryInput) return;

  queryInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;

    const query = queryInput.value.trim();

    if (!query) return;

    onQueryExecute(query);
  });
}
