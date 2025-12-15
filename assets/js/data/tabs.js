/* =========================================
   Data Tabs Management (FINAL)
   ========================================= */

/**
 * Safely get tabs container
 */
function getTabsContainer() {
  return document.getElementById("dataTabs");
}

/**
 * Create tabs for tables
 */
export function createTabs(tables, onSelect) {
  const tabsContainer = getTabsContainer();
  if (!tabsContainer || !tables) return;

  if (typeof onSelect !== "function") {
    throw new TypeError("createTabs expects onSelect to be a function");
  }

  tabsContainer.innerHTML = "";

  const tableNames = Object.keys(tables);
  if (tableNames.length === 0) return;

  tableNames.forEach((tableName, index) => {
    const tab = document.createElement("div");
    tab.className = "tab";
    tab.textContent = tableName;

    tab.addEventListener("click", () => {
      onSelect(tableName);
    });

    tabsContainer.appendChild(tab);

    if (index === 0) {
      tab.classList.add("active");
    }
  });
}

/**
 * Set active tab visually
 */
export function setActiveTab(activeName) {
  const tabsContainer = getTabsContainer();
  if (!tabsContainer) return;

  const tabs = tabsContainer.querySelectorAll(".tab");

  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.textContent === activeName);
  });
}
