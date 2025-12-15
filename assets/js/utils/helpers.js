/* =========================================
   General Helpers
   ========================================= */

/**
 * Check if value is a number
 */
export function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}

/**
 * Format number for display
 */
export function formatNumber(value) {
  if (!isNumber(value)) return value;
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 2
  });
}

/**
 * Capitalize first letter
 */
export function capitalize(text) {
  if (!text || typeof text !== "string") return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}
