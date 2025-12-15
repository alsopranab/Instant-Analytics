/* -----------------------------------------
   Initialization (DOM-Safe)
----------------------------------------- */
function init() {
  const csvInput = $("csvInput");
  const sheetInput = $("sheetInput");

  initInput();
  initQuery(executeQuery);

  // CSV upload (already correct)
  if (csvInput) {
    csvInput.addEventListener("change", (event) => {
      const file = event.target.files?.[0];
      if (file) handleDataLoad({ file });
    });
  }

  // Google Sheet – robust loader
  if (sheetInput) {
    const triggerSheetLoad = () => {
      const url = sheetInput.value.trim();
      if (url) {
        console.log("Loading Google Sheet:", url);
        handleDataLoad({ sheetUrl: url });
      }
    };

    // Enter key
    sheetInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        triggerSheetLoad();
      }
    });

    // Paste
    sheetInput.addEventListener("paste", () => {
      setTimeout(triggerSheetLoad, 0);
    });

    // Blur (click outside)
    sheetInput.addEventListener("blur", triggerSheetLoad);
  }
}
