const toggle = document.querySelector(".nav__toggle");
const menu = document.getElementById("nav-menu");
const yearEl = document.getElementById("footer-year");
const nav = document.querySelector(".nav");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (nav) {
  const updateNavScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  updateNavScroll();
  window.addEventListener("scroll", updateNavScroll, { passive: true });
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

const HERO_CODE_HTML = `<span class="code-kw">const</span> <span class="code-var">developer</span> = {
  <span class="code-key">name</span>: <span class="code-str">"Srikant Rochan Ragghu"</span>,
  <span class="code-key">role</span>: <span class="code-str">"Full Stack Developer"</span>,
  <span class="code-key">skills</span>: [<span class="code-str">"HTML"</span>, <span class="code-str">"CSS"</span>,
    <span class="code-str">"JavaScript"</span>, <span class="code-str">"React"</span>],
  <span class="code-key">passion</span>: <span class="code-str">"Turning ideas into
    polished products"</span>
};`;

function typeHeroCode(codeEl) {
  if (!codeEl) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    codeEl.innerHTML = `${HERO_CODE_HTML}<span class="code-cursor" aria-hidden="true"></span>`;
    codeEl.classList.add("is-typed");
    return;
  }

  let index = 0;
  let output = "";
  codeEl.classList.add("is-typing");

  function tick() {
    if (index >= HERO_CODE_HTML.length) {
      codeEl.innerHTML = `${output}<span class="code-cursor" aria-hidden="true"></span>`;
      codeEl.classList.remove("is-typing");
      codeEl.classList.add("is-typed");
      return;
    }

    if (HERO_CODE_HTML[index] === "<") {
      const end = HERO_CODE_HTML.indexOf(">", index);
      output += HERO_CODE_HTML.slice(index, end + 1);
      index = end + 1;
      codeEl.innerHTML = `${output}<span class="code-cursor" aria-hidden="true"></span>`;
      window.requestAnimationFrame(tick);
      return;
    }

    output += HERO_CODE_HTML[index];
    const char = HERO_CODE_HTML[index];
    index += 1;
    codeEl.innerHTML = `${output}<span class="code-cursor" aria-hidden="true"></span>`;

    const delay = char === "\n" ? 90 : char === " " ? 16 : 28;
    window.setTimeout(tick, delay);
  }

  tick();
}

const heroCode = document.getElementById("hero-code");

if (heroCode) {
  const codeBox = heroCode.closest(".hero__code");

  if ("IntersectionObserver" in window && codeBox) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            typeHeroCode(heroCode);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    observer.observe(codeBox);
  } else {
    typeHeroCode(heroCode);
  }
}
