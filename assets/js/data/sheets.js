/* =========================================
   Google Sheets Loader (Public Sheets)
   ========================================= */

/**
 * Extract Sheet ID from Google Sheets URL
 */
function extractSheetId(url) {
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}

/**
 * Fetch Google Sheet as CSV
 */
export async function loadGoogleSheet(sheetUrl) {
  const sheetId = extractSheetId(sheetUrl);

  if (!sheetId) {
    throw new Error("Invalid Google Sheets URL");
  }

  const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

  const response = await fetch(csvUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch Google Sheet. Is it public?");
  }

  return await response.text();
}
