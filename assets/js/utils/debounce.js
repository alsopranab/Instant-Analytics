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

  return function (...args) {
    const context = this;

    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
