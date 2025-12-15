/* =========================================
   UI Tabs Handling
   ========================================= */

/**
 * Initialize tab interactions
 * @param {Function} onTabChange - callback when tab changes
 */
export function initTabs(onTabChange) {
  const tabsContainer = document.getElementById("dataTabs");

  if (!tabsContainer) return;

  tabsContainer.addEventListener("click", (event) => {
    const tab = event.target.closest(".tab");
    if (!tab) return;

    const tabName = tab.textContent.trim();
    onTabChange(tabName);
  });
}
