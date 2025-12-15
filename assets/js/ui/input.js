export function renderDataInput() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section>
      <h1>Instant Analytics</h1>
      <p>
        Paste a Google Sheet link or upload a CSV file to get started.
      </p>

      <div class="card">
        <label>
          Google Sheet link
          <input
            type="text"
            id="sheetLink"
            placeholder="https://docs.google.com/spreadsheets/..."
          />
        </label>

        <p>or</p>

        <label>
          Upload CSV file
          <input type="file" id="csvFile" accept=".csv" />
        </label>

        <button id="connectBtn">Connect Data</button>
      </div>
    </section>
  `;

  document
    .getElementById("connectBtn")
    .addEventListener("click", handleConnect);
}

function handleConnect() {
  const sheetLink = document.getElementById("sheetLink").value.trim();
  const csvFile = document.getElementById("csvFile").files[0];

  if (!sheetLink && !csvFile) {
    alert("Please provide a Google Sheet link or a CSV file.");
    return;
  }

  console.log("Data source connected:", sheetLink || csvFile.name);

  // NEXT STEP will route to tab selection
}
