/* =========================================
   Debounce Utility
   ========================================= */

/**
 * Debounce a function
 * @param {Function} fn - function to debounce
 * @param {number} delay - delay in milliseconds
 */
export function debounce(fn, delay = 300) {
  let timer = null;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
