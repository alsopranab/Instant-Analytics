/* =========================================
   Debounce Utility (Deno + Browser Safe)
========================================= */

/**
 * Debounce a function call
 * @param {Function} fn
 * @param {number} delay
 */
export function debounce(fn, delay = 300) {
  let timerId = null;

  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
