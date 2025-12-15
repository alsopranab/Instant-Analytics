/* =========================================
   Google Sheets Loader (Public Sheets)
========================================= */

/**
 * Extract Google Sheet ID from URL
 */
function extractSheetId(url) {
  if (typeof url !== "string") return null;

  const match = url.match(
    /https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/
  );

  return match?.[1] ?? null;
}

/**
 * Extract optional sheet GID
 */
function extractGid(url) {
  if (typeof url !== "string") return null;

  const match = url.match(/gid=([0-9]+)/);
  return match?.[1] ?? null;
}

/**
 * Fetch Google Sheet as CSV (public sheets only)
 */
export async function loadGoogleSheet(sheetUrl) {
  const sheetId = extractSheetId(sheetUrl);

  if (!sheetId) {
    throw new Error("Invalid Google Sheets URL");
  }

  const gid = extractGid(sheetUrl);

  const csvUrl =
    `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv` +
    (gid ? `&gid=${gid}` : "");

  let response;

  try {
    response = await fetch(csvUrl, { cache: "no-store" });
  } catch (_error) {
    // `_error` intentionally unused (Deno lint compliant)
    throw new Error("Network error while fetching Google Sheet");
  }

  if (!response.ok) {
    throw new Error(
      "Failed to fetch Google Sheet. Ensure the sheet is public (Viewer access)."
    );
  }

  return response.text();
}
