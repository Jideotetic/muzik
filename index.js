document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector("label");
  const nav = document.querySelector("nav");
  const preferOSThemeMode = window.matchMedia("(prefers-color-scheme: dark)");
  const themeToggler = document.getElementById("toggle");
  console.log("index");

  // load correct theme on initial visit or repeated visit
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    themeToggler.checked = true;
    document.documentElement.classList.add("dark");
  } else {
    themeToggler.checked = false;
    document.documentElement.classList.remove("dark");
  }

  // change theme on change of OS theme
  preferOSThemeMode.addEventListener("change", (e) => {
    theme = e.matches ? "dark" : "light";
    if (theme === "dark") {
      themeToggler.checked = true;
      document.documentElement.classList.add("dark");
    } else {
      themeToggler.checked = false;
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  });

  // change theme on click of themeToggler
  themeToggler.addEventListener("change", () => {
    if (themeToggler.checked) {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
  });

  hamburger.addEventListener("change", (e) => {
    if (nav.classList.contains("w-0")) {
      nav.classList.remove("w-0");
      nav.classList.add("w-full");
    } else if (nav.classList.contains("w-full")) {
      nav.classList.remove("w-full");
      nav.classList.add("w-0");
    }
  });
});
