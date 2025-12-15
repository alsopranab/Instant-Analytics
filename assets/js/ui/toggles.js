/* =========================================
   UI Toggle Utility (Animated, Reusable)
========================================= */

/**
 * Initialize toggle behavior
 * @param {string} headerId - clickable header element id
 * @param {string} contentId - content container id
 */
export function initToggle(headerId, contentId) {
  const header = document.getElementById(headerId);
  const content = document.getElementById(contentId);

  if (!header || !content) return;

  // initial state
  content.style.overflow = "hidden";
  content.style.transition = "max-height 0.35s ease, opacity 0.25s ease";
  content.style.maxHeight = content.scrollHeight + "px";
  content.style.opacity = "1";

  header.addEventListener("click", () => {
    const isCollapsed = content.dataset.collapsed === "true";

    if (isCollapsed) {
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.opacity = "1";
      content.dataset.collapsed = "false";
      header.classList.remove("collapsed");
    } else {
      content.style.maxHeight = "0px";
      content.style.opacity = "0";
      content.dataset.collapsed = "true";
      header.classList.add("collapsed");
    }
  });
}
