const header = document.querySelector("header");
const h1 = document.querySelector("h1");
const hamburger = document.getElementById("mobile-menu-icon");
const hamburgerContainer = document.querySelector("label");
const form = document.querySelector("form");
const searchInput = document.getElementById("search");

const tracks = [];

document.addEventListener("DOMContentLoaded", fetchMusic);

function fetchMusic() {}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (header.classList.contains("fixed")) {
    //
  } else {
    header.classList.remove("h-screen", "relative");
    header.classList.add("h-20", "fixed", "inset-x-0");
    h1.classList.remove("top-1/4", "-translate-x-1/2", "left-1/2");
    h1.classList.add("top-3", "left-3");
    form.classList.remove("top-1/2", "translate-x-1/2", "right-1/2");
    form.classList.add("top-3", "right-3", "opacity-0", "md:opacity-100");
    hamburgerContainer.classList.remove("hidden");
    hamburgerContainer.classList.add("opacity-0");

    setTimeout(() => {
      header.classList.remove("h-20");
      header.classList.add("h-fit");
      h1.classList.remove("absolute", "top-3", "left-3");
      form.classList.remove("absolute", "top-3", "right-3");
      hamburgerContainer.classList.remove("opacity-0");
      form.classList.add(
        "fixed",
        "top-[60px]",
        "inset-x-0",
        "h-[calc(100vh-62px)]",
        "w-0",
        "opacity-100",
        "md:static",
        "md:h-fit",
        "md:w-fit"
      );
    }, 1000);
  }

  searchInput.value = "";
});

hamburger.addEventListener("change", () => {
  if (form.classList.contains("w-0")) {
    form.classList.remove("w-0", "opacity-0");
    form.classList.add("w-full");
  } else if (form.classList.contains("w-full")) {
    form.classList.add("w-0");
    form.classList.remove("w-full");
  }
});
