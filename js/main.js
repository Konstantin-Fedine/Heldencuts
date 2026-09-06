async function loadComponent(selector, path) {
  const target = document.querySelector(selector);
  if (!target) return;

  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`Could not load component: ${path}`);
  target.outerHTML = await response.text();
}

function setupHeaderMenu() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".header-menu-toggle");

  if (!header || !toggle) return;

  const closeMenu = () => {
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  header.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target) && header.classList.contains("is-open")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("is-open")) {
      closeMenu();
    }
  });
}

function scrollToHashTarget() {
  const hash = window.location.hash.slice(1);
  if (!hash) return;

  const target = document.getElementById(decodeURIComponent(hash));
  if (!target) return;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.setTimeout(() => {
        const scrollContainer = document.scrollingElement;
        const top = target.getBoundingClientRect().top + scrollContainer.scrollTop - 90;
        const previousBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        scrollContainer.scrollTop = Math.max(0, top);
        document.documentElement.style.scrollBehavior = previousBehavior;
      }, 50);
    });
  });
}

async function loadPage() {
  const components = [
    ["[data-component='header']", "components/header.html"],
    ["[data-component='hero']", "components/hero.html"],
    ["[data-component='work']", "components/work.html"],
    ["[data-component='about']", "components/about.html"],
    ["[data-component='ratings']", "components/ratings.html"],
    ["[data-component='process']", "components/process.html"],
    ["[data-component='contact']", "components/contact.html"],
    ["[data-component='faq']", "components/faq.html"],
    ["[data-component='footer']", "components/footer.html"],
  ];

  await Promise.all(
    components.map(([selector, path]) => loadComponent(selector, path)),
  );

  setupHeaderMenu();
  scrollToHashTarget();
}

loadPage().catch((error) => console.error(error));