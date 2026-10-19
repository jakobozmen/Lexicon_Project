"use strict";
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const themeLabel = document.querySelector("#theme-label");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const cards = [...document.querySelectorAll("[data-category]")];
const filterStatus = document.querySelector("#filter-status");
const year = document.querySelector("#year");
const key = "jakob-portfolio-theme";

function readTheme() {
  try { return localStorage.getItem(key); }
  catch { return null; }
}
function saveTheme(theme) {
  try { localStorage.setItem(key, theme); }
  catch { /* Fungerar utan lagring. */ }
}
let theme = readTheme() === "light" ? "light" : "dark";
function renderTheme() {
  document.documentElement.dataset.theme = theme;
  themeIcon.textContent = theme === "dark" ? "☀" : "☾";
  themeLabel.textContent = theme === "dark" ? "Ljust läge" : "Mörkt läge";
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Byt till ljust tema" : "Byt till mörkt tema");
  themeToggle.setAttribute("aria-pressed", String(theme === "light"));
}
themeToggle.addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  saveTheme(theme);
  renderTheme();
});
function filterProjects(category) {
  let visible = 0;
  cards.forEach(card => {
    const show = category === "alla" || card.dataset.category === category;
    card.hidden = !show;
    if (show) visible++;
  });
  filterButtons.forEach(button => {
    const active = button.dataset.filter === category;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  filterStatus.textContent = "Visar " + visible + " projekt.";
}
filterButtons.forEach(button => button.addEventListener("click", () => filterProjects(button.dataset.filter)));
year.textContent = String(new Date().getFullYear());
renderTheme();
filterProjects("alla");
