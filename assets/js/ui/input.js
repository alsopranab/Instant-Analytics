/* =========================================
   CSV Input UI
   ========================================= */

/**
 * Initialize CSV input interactions
 */
export function initInput() {
  const input = document.getElementById("csvInput");

  if (!input) return;

  input.addEventListener("click", () => {
    input.value = "";
  });
}
