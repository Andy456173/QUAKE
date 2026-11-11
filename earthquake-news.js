// HTML elements 
const yearSelect = document.getElementById("yearSelect");
const calendarContainer = document.getElementById("calendarContainer");
const calendarHeading = document.getElementById("calendarHeading");
const reportsBox = document.getElementById("reports");
const resultsHeading = document.getElementById("resultsHeading");
const reportDialog = document.getElementById("articleDialog");
const articleContent = document.getElementById("articleContent");

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Store the current selection
let currentYear = 2026;
let currentMonth = 10; // Months start at 0, so 10 means November.
let selectedDate = "2026-11-08";
let fullYearView = false;
let pageNumber = 1;
const reportsPerPage = 4;

// Make a date such as "2015-07-10".
function makeDate(year, month, day) {
  let monthText = String(month + 1).padStart(2, "0");
  let dayText = String(day).padStart(2, "0");
  return year + "-" + monthText + "-" + dayText;
}

// Change "2015-07-10" into "10 July 2015".
function displayDate(dateText) {
  let parts = dateText.split("-");
  return Number(parts[2]) + " " + months[Number(parts[1]) - 1] + " " + parts[0];
}

// Keep report text safe when adding it to HTML
function safeText(text) {
  let element = document.createElement("span");
  element.textContent = text;
  return element.innerHTML;
}

// Find all reports for one date
function findReports(dateText) {
  let found = [];
  for (let i = 0; i < earthquakeReports.length; i++) {
    if (earthquakeReports[i].date === dateText) {
      found.push(earthquakeReports[i]);
    }
  }
  return found;
}

// calendar for one month
function makeMonth(month, smallCalendar) {
  let firstWeekday = new Date(currentYear, month, 1).getDay();
  let numberOfDays = new Date(currentYear, month + 1, 0).getDate();
  let html = '<div class="month">';

  if (smallCalendar) {
    html = '<div class="mini-month"><h4>' + months[month] + '</h4>';
  }

  html += '<ul class="weekdays" aria-hidden="true">';
  for (let i = 0; i < weekdays.length; i++) {
    html += '<li>' + weekdays[i] + '</li>';
  }
  html += '</ul><ul class="dates" aria-label="' + months[month] + ' ' + currentYear + '">';

  // Empty spaces put the first date under the correct weekday
  for (let i = 0; i < firstWeekday; i++) {
    html += '<li aria-hidden="true"></li>';
  }

  for (let day = 1; day <= numberOfDays; day++) {
    let dateText = makeDate(currentYear, month, day);
    let count = findReports(dateText).length;
    let dayClass = "day";
    if (count > 0) {
      dayClass += " has-report";
    }
    let selected = dateText === selectedDate;
    let reportWord = count === 1 ? "report" : "reports";

    // onclick runs selectDate when this date is clicked
    html += `<li>
      <button type="button" class="${dayClass}"
        onclick="selectDate('${dateText}')"
        aria-label="${displayDate(dateText)}, ${count} ${reportWord}"
        aria-pressed="${selected}">${day}</button>
    </li>`;
  }

  html += '</ul></div>';
  return html;
}

// Draw either one month or all twelve months
function showCalendar() {
  let html = "";
  if (fullYearView) {
    calendarHeading.textContent = currentYear;
    html = '<div class="year-grid">';
    for (let month = 0; month < 12; month++) {
      html += makeMonth(month, true);
    }
    html += '</div>';
  } else {
    calendarHeading.textContent = months[currentMonth] + " " + currentYear;
    html = makeMonth(currentMonth, false);
  }
  calendarContainer.innerHTML = html;

  document.querySelector(".archive-layout").classList.toggle("year-layout", fullYearView);
  document.getElementById("monthView").setAttribute("aria-pressed", !fullYearView);
  document.getElementById("yearView").setAttribute("aria-pressed", fullYearView);
  document.getElementById("calendarPrev").disabled = currentYear === 2015 && (fullYearView || currentMonth === 0);
  document.getElementById("calendarNext").disabled = currentYear === 2026 && (fullYearView || currentMonth === 11);
  document.getElementById("calendarPrev").setAttribute("aria-label", fullYearView ? "Previous year" : "Previous month");
  document.getElementById("calendarNext").setAttribute("aria-label", fullYearView ? "Next year" : "Next month");
  yearSelect.value = currentYear;

  let monthCount = 0;
  let yearCount = 0;
  for (let i = 0; i < earthquakeReports.length; i++) {
    let report = earthquakeReports[i];
    if (Number(report.date.slice(0, 4)) === currentYear) {
      yearCount++;
      if (Number(report.date.slice(5, 7)) === currentMonth + 1) {
        monthCount++;
      }
    }
  }
  document.getElementById("monthCount").textContent = monthCount + " reports in " + months[currentMonth];
  document.getElementById("coverage").textContent = "Myanmar only · " + yearCount + " saved reports in " + currentYear + ". Archive: 2015–2026. Updated 9 November 2026.";
}

// Show the selected day report
function showReports() {
  let reports = findReports(selectedDate);
  resultsHeading.textContent = displayDate(selectedDate);
  document.getElementById("resultCount").textContent = reports.length + (reports.length === 1 ? " report" : " reports");
  let html = "";
  let firstReport = (pageNumber - 1) * reportsPerPage;
  let lastReport = Math.min(firstReport + reportsPerPage, reports.length);

  for (let i = firstReport; i < lastReport; i++) {
    let report = reports[i];
    let image = "";
    if (report.image) {
      image = '<img src="' + report.image + '" alt="" loading="lazy"/>';
    }
    html += `<article class="report-card">
      <div class="report-visual">${image}
        <div class="mag"><small>MAGNITUDE</small><strong>${report.magnitude.toFixed(1)}</strong></div>
      </div>
      <div class="report-content">
        <div class="report-meta"><span class="source-tag">${report.source}</span> ${report.time} MMT</div>
        <h4>${safeText(report.title)}</h4>
        <p>${safeText(report.place)}</p>
        <div class="card-facts">Depth <strong>${report.depth} km</strong></div>
        <button type="button" class="read-more" onclick="openReport('${report.id}')">Read report <span aria-hidden="true">↗</span></button>
      </div>
    </article>`;
  }

  if (reports.length === 0) {
    html = `<div class="empty-state">
      <span class="empty-symbol" aria-hidden="true">— / —</span>
      <h4>No saved report for this date</h4>
      <p>Choose an orange-marked date. An empty date does not prove that no earthquake occurred.</p>
    </div>`;
  }
  reportsBox.innerHTML = html;

  // Previous and Next buttons 
  let totalPages = Math.ceil(reports.length / reportsPerPage);
  let pageHTML = "";
  if (totalPages > 1) {
    pageHTML = `<button type="button" onclick="changePage(-1)" ${pageNumber === 1 ? "disabled" : ""}>Previous</button>
      <span class="page-label">${pageNumber} / ${totalPages}</span>
      <button type="button" onclick="changePage(1)" ${pageNumber === totalPages ? "disabled" : ""}>Next</button>`;
  }
  document.getElementById("pagination").innerHTML = pageHTML;
}

function selectDate(dateText) {
  selectedDate = dateText;
  currentYear = Number(dateText.slice(0, 4));
  currentMonth = Number(dateText.slice(5, 7)) - 1;
  pageNumber = 1;
  showCalendar();
  showReports();
}

function changePage(direction) {
  pageNumber += direction;
  showReports();
}

function changeMonth(direction) {
  if (fullYearView) {
    currentYear += direction;
  } else {
    currentMonth += direction;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
  }
  selectDate(makeDate(currentYear, currentMonth, 1));
}

// full report 
function openReport(id) {
  let report;
  for (let i = 0; i < earthquakeReports.length; i++) {
    if (earthquakeReports[i].id === id) {
      report = earthquakeReports[i];
      break;
    }
  }
  if (!report) {
    return;
  }
  let image = "";
  if (report.image) {
    image = '<img class="bulletin-image" src="' + report.image + '" alt="Official DMH earthquake bulletin"/>';
  }
  articleContent.innerHTML = `<span class="source-tag">${report.source} · MYANMAR</span>
    <h2 id="articleTitle">${safeText(report.title)}</h2>
    <p class="article-text">${safeText(report.place)}</p>
    <dl class="detail-grid">
      <div>
        <dt>Date</dt>
        <dd>${displayDate(report.date)}</dd>
      </div>
      <div>
        <dt>Time (Myanmar)</dt>
        <dd>${report.time}</dd>
      </div>
      <div>
        <dt>Magnitude</dt>
        <dd>${report.magnitude.toFixed(1)}</dd>
      </div>
      <div>
        <dt>Depth</dt>
        <dd>${report.depth} km</dd>
      </div>
      <div>
        <dt>Latitude</dt>
        <dd>${report.latitude}°N</dd>
      </div>
      <div>
        <dt>Longitude</dt>
        <dd>${report.longitude}°E</dd>
      </div>
    </dl>${image}
    <p class="article-source">Source: ${report.source}. Saved 9 November 2026. Check the original report for full information and later revisions.</p>
    <a class="button orange" href="${report.url}" target="_blank" rel="noopener noreferrer">Open original report ↗</a>`;
  reportDialog.showModal();
}

// Connect main buttons to their functions
yearSelect.addEventListener("change", function () {
  currentYear = Number(yearSelect.value);
  selectDate(makeDate(currentYear, currentMonth, 1));
});
document.getElementById("calendarPrev").onclick = function () { changeMonth(-1); };
document.getElementById("calendarNext").onclick = function () { changeMonth(1); };
document.getElementById("monthView").onclick = function () {
  fullYearView = false;
  showCalendar();
};
document.getElementById("yearView").onclick = function () {
  fullYearView = true;
  showCalendar();
};
document.getElementById("latestButton").onclick = function () {
  // The data file is sorted from newest to oldest
  for (let i = 0; i < earthquakeReports.length; i++) {
    if (Number(earthquakeReports[i].date.slice(0, 4)) === currentYear) {
      selectDate(earthquakeReports[i].date);
      break;
    }
  }
};
document.getElementById("closeDialog").onclick = function () { reportDialog.close(); };
// Close the popup when its dark background is clicked.
reportDialog.addEventListener("click", function (event) {
  if (event.target === reportDialog) {
    let box = reportDialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right ||
        event.clientY < box.top || event.clientY > box.bottom) {
      reportDialog.close();
    }
  }
});

// Fade between hero images automatically. No visible slideshow controls.
const slides = document.querySelectorAll(".hero-image");
let currentSlide = 0;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function showNextImage() {
  if (document.hidden || reducedMotion.matches) {
    return;
  }

  slides[currentSlide].classList.remove("is-active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("is-active");
}

setInterval(showNextImage, 5000);

// Display the calendar and reports when the page loads.
showCalendar();
showReports();
