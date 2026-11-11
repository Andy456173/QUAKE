/* QUAKE / PREPAREDNESS
   Short, clear JavaScript for basic website interactions.
   The page has no extra libraries. */

// 2. Reusable tabs: one panel appears at a time.
function setupTabs(buttonSelector, panelPrefix, dataName) {
  const buttons = document.querySelectorAll(buttonSelector);

  function activateTab(button) {
    buttons.forEach(function (item) {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(panelPrefix + item.dataset[dataName]).hidden = !selected;
    });
  }

  buttons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      activateTab(button);
    });

    // Left/right arrow keys also work for keyboard users.
    button.addEventListener("keydown", function (event) {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1 : (index + direction + buttons.length) % buttons.length;
      buttons[nextIndex].focus();
      activateTab(buttons[nextIndex]);
    });
  });
}

setupTabs(".kit-tab", "panel-", "kit");
setupTabs(".scenario-tab", "place-", "place");

// 3. Search page topics without removing safety information.
const searchInput = document.getElementById("guideSearch");
const searchResults = document.getElementById("searchResults");
const sections = document.querySelectorAll(".searchable");

searchInput.addEventListener("input", function () {
  const query = searchInput.value.trim().toLowerCase();
  searchResults.replaceChildren();

  if (query.length < 2) {
    searchResults.hidden = true;
    return;
  }

  let matches = 0;
  sections.forEach(function (section) {
    if (!section.textContent.toLowerCase().includes(query)) return;
    if (matches >= 6) return;

    const link = document.createElement("a");
    const title = section.querySelector("h2");
    link.href = "#" + section.id;
    link.textContent = title ? title.textContent.replace(/\s+/g, " ").trim() : section.id;
    link.addEventListener("click", function () {
      searchInput.value = "";
      searchResults.hidden = true;
    });
    searchResults.appendChild(link);
    matches++;
  });

  if (matches === 0) {
    const message = document.createElement("p");
    message.textContent = document.documentElement.lang === 'my' ? 'မတွေ့ပါ။ အခြားစကားလုံးဖြင့် ရှာကြည့်ပါ။' : 'No matching section. Try kit, school, cane, or gas.';
    searchResults.appendChild(message);
  }
  searchResults.hidden = false;
});

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Escape") searchResults.hidden = true;
});

// 4. Highlight the current section in the guide menu.
const guideLinks = document.querySelectorAll("#topicLinks a");
function highlightCurrentSection() {
  let current = "prepare";
  sections.forEach(function (section) {
    if (section.getBoundingClientRect().top <= 170) current = section.id;
  });
  guideLinks.forEach(function (link) {
    const active = link.getAttribute("href") === "#" + current;
    link.classList.toggle("current", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
window.addEventListener("scroll", highlightCurrentSection, { passive: true });
highlightCurrentSection();

// 5. Readiness checklist and saved progress.
const taskCheckboxes = document.querySelectorAll(".check-row input");
const taskRows = document.querySelectorAll(".check-row");
const storageNote = document.getElementById("storageNote");
const storageKey = "quake-preparedness-checklist-v1";
const filterButtons = document.querySelectorAll(".filter-button");
let currentFilter = "all";

function updateChecklist() {
  let completed = 0;
  taskCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) completed++;
  });

  const total = taskCheckboxes.length;
  const percentage = Math.round(completed / total * 100);
  document.getElementById("checkCount").textContent = completed + " / " + total + (document.documentElement.lang === "my" ? " ပြီးမြောက်" : " completed");
  document.getElementById("checkPercent").textContent = percentage + "%";
  document.getElementById("checkProgress").value = completed;

  let visible = 0;
  taskRows.forEach(function (row) {
    const done = row.querySelector("input").checked;
    const show = currentFilter === "all" ||
      (currentFilter === "done" && done) ||
      (currentFilter === "todo" && !done);
    row.hidden = !show;
    if (show) visible++;
  });
  document.getElementById("emptyFilter").hidden = visible !== 0;
}

function saveChecklist() {
  const saved = [];
  taskCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) saved.push(checkbox.id);
  });
  try {
    localStorage.setItem(storageKey, JSON.stringify(saved));
  } catch (error) {
    storageNote.textContent = "Checkmarks work here but could not be saved in this browser.";
  }
  updateChecklist();
}

try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
  if (Array.isArray(saved)) {
    taskCheckboxes.forEach(function (checkbox) {
      checkbox.checked = saved.includes(checkbox.id);
    });
  }
} catch (error) {
  storageNote.textContent = "Saved checkmarks could not be loaded; you can still use the list.";
}

taskCheckboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", saveChecklist);
});
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;
    filterButtons.forEach(function (item) {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    updateChecklist();
  });
});

document.getElementById("resetChecklist").addEventListener("click", function () {
  taskCheckboxes.forEach(function (checkbox) {
    checkbox.checked = false;
  });
  currentFilter = "all";
  filterButtons.forEach(function (button) {
    const active = button.dataset.filter === "all";
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  saveChecklist();
});
updateChecklist();

// 6. Show full guidance and all tab panels when printing.
const printButton = document.getElementById("printButton");
const allDetails = document.querySelectorAll("details");
const allTabPanels = document.querySelectorAll(".kit-panel, .scenario-panel");
let printDetails = [];
let printPanels = [];
let printRows = [];

window.addEventListener("beforeprint", function () {
  printDetails = Array.from(allDetails, function (detail) { return detail.open; });
  printPanels = Array.from(allTabPanels, function (panel) { return panel.hidden; });
  printRows = Array.from(taskRows, function (row) { return row.hidden; });
  allDetails.forEach(function (detail) { detail.open = true; });
  allTabPanels.forEach(function (panel) { panel.hidden = false; });
  taskRows.forEach(function (row) { row.hidden = false; });
});

window.addEventListener("afterprint", function () {
  allDetails.forEach(function (detail, index) { detail.open = printDetails[index]; });
  allTabPanels.forEach(function (panel, index) { panel.hidden = printPanels[index]; });
  taskRows.forEach(function (row, index) { row.hidden = printRows[index]; });
});

printButton.addEventListener("click", function () {
  window.print();
});


// Refresh the generated checklist count after a language change.
document.querySelectorAll(".lang-option").forEach(function (button) {
  button.addEventListener("click", function () {
    requestAnimationFrame(updateChecklist);
  });
});
