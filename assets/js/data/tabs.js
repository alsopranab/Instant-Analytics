/* =========================================
   Data Tabs Management
   ========================================= */

const tabsContainer = document.getElementById("dataTabs");

/**
 * Create tabs for tables
 */
export function createTabs(tables, onSelect) {
  tabsContainer.innerHTML = "";

  Object.keys(tables).forEach((tableName, index) => {
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
  const tabs = tabsContainer.querySelectorAll(".tab");

  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.textContent === activeName);
  });
}
