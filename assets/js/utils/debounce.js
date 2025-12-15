/* =========================================
   Debounce Utility (FINAL)
   ========================================= */

/**
 * Debounce a function
 * @param {Function} fn - function to debounce
 * @param {number} delay - delay in milliseconds
 * @returns {Function}
 */
export function debounce(fn, delay = 300) {
  if (typeof fn !== "function") {
    throw new TypeError("debounce expects a function");
  }

  let timerId = null;

  return function (...args) {
    const context = this;

    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
