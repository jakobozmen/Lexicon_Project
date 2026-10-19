"use strict";

const themeButton = document.querySelector("#theme-toggle");
const incrementButton = document.querySelector("#increment-btn");
const resetButton = document.querySelector("#reset-btn");
const countOutput = document.querySelector("#click-count");
const counterMessage = document.querySelector("#counter-message");
const yearOutput = document.querySelector("#current-year");

const THEME_KEY = "lexicon-project-theme";
const COUNT_KEY = "lexicon-project-clicks";

function loadValue(key) {
  try { return localStorage.getItem(key); }
  catch { return null; }
}

function saveValue(key, value) {
  try { localStorage.setItem(key, value); }
  catch { /* Sidan fungerar även utan lokal lagring. */ }
}

let theme = loadValue(THEME_KEY) === "light" ? "light" : "dark";

function renderTheme() {
  document.documentElement.dataset.theme = theme;
  themeButton.textContent = theme === "dark" ? "☀ Ljust läge" : "☾ Mörkt läge";
  themeButton.setAttribute("aria-label", theme === "dark" ? "Växla till ljust tema" : "Växla till mörkt tema");
  themeButton.setAttribute("aria-pressed", String(theme === "light"));
}

themeButton.addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  saveValue(THEME_KEY, theme);
  renderTheme();
});

const storedClicks = Number(loadValue(COUNT_KEY));
let clicks = Number.isSafeInteger(storedClicks) && storedClicks >= 0 ? storedClicks : 0;

function renderCount() {
  countOutput.textContent = String(clicks);
  countOutput.value = String(clicks);
  resetButton.disabled = clicks === 0;
}

incrementButton.addEventListener("click", () => {
  if (clicks < Number.MAX_SAFE_INTEGER) clicks += 1;
  saveValue(COUNT_KEY, String(clicks));
  renderCount();
  counterMessage.textContent = "Snyggt! JavaScript fungerar.";
});

resetButton.addEventListener("click", () => {
  clicks = 0;
  saveValue(COUNT_KEY, "0");
  renderCount();
  counterMessage.textContent = "Räknaren har återställts.";
});

yearOutput.textContent = String(new Date().getFullYear());
renderTheme();
renderCount();
