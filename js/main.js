const toggle = document.querySelector(".nav__toggle");
const menu = document.getElementById("nav-menu");
const yearEl = document.getElementById("footer-year");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}
