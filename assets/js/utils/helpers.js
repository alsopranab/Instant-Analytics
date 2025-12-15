/* =========================================
   General Helpers (FINAL)
   ========================================= */

/**
 * Check if a value is a valid number
 */
export function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

/**
 * Safely convert a value to number
 */
export function toNumber(value) {
  if (value === null || value === undefined || value === "") return null;

  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

/**
 * Format number for display
 */
export function formatNumber(value, decimals = 2) {
  if (!isNumber(value)) return value;

  return value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  });
}

/**
 * Capitalize first letter
 */
export function capitalize(text) {
  if (typeof text !== "string" || !text.length) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Check for empty values
 */
export function isEmpty(value) {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "")
  );
}
