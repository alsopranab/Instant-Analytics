/* =========================================
   CSV Parsing
   ========================================= */

/**
 * Normalize CSV header names
 */
function normalizeHeader(header) {
  return header
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^\w]/g, "")
    .toLowerCase();
}

/**
 * Parse CSV text into rows
 */
export function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length === 0) return [];

  const rawHeaders = lines[0].split(",");
  const headers = rawHeaders.map(normalizeHeader);

  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    const row = {};

    headers.forEach((header, index) => {
      const value = values[index] !== undefined ? values[index].trim() : "";
      row[header] = value;
    });

    rows.push(row);
  }

  return rows;
}
