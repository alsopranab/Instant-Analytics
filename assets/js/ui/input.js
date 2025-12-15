/* =========================================
   CSV Input UI (FINAL)
   ========================================= */

/**
 * Initialize CSV input interactions
 */
export function initInput() {
  const csvInput = document.getElementById("csvInput");
  const sheetInput = document.getElementById("sheetInput");

  if (!csvInput) return;

  /* ---------------------------------------
     Reset CSV input on click
     --------------------------------------- */
  csvInput.addEventListener("click", () => {
    csvInput.value = "";
  });

  /* ---------------------------------------
     Clear sheet input when CSV is chosen
     --------------------------------------- */
  csvInput.addEventListener("change", () => {
    if (sheetInput) {
      sheetInput.value = "";
    }
  });
}
