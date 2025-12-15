/* =========================================
   CSV Parsing (FINAL)
   ========================================= */

/**
 * Normalize CSV header names
 */
function normalizeHeader(header) {
  return header
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\w]/g, "");
}

/**
 * Parse CSV text into rows
 */
export function parseCSV(text) {
  if (typeof text !== "string") return [];

  const lines = text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0);

  if (lines.length < 2) return [];

  const rawHeaders = lines[0].split(",");
  const headers = rawHeaders.map(normalizeHeader);

  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    const row = {};

    headers.forEach((header, index) => {
      row[header] =
        values[index] !== undefined ? values[index].trim() : "";
    });

    rows.push(row);
  }

  return rows;
}
