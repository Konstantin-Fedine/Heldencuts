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

function setupMainReveal() {
  const main = document.querySelector("main");
  if (!main) return;

  const sections = main.querySelectorAll(":scope > section");
  main.classList.add("is-reveal-ready");
  sections[0]?.classList.add("is-visible");

  const revealVisibleSections = () => {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        section.classList.add("is-visible");
      }
    });
  };

  revealVisibleSections();
  window.addEventListener("scroll", revealVisibleSections, { passive: true });

  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10%", threshold: 0.08 },
  );

  sections.forEach((section) => observer.observe(section));
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
  setupMainReveal();
  scrollToHashTarget();
}

loadPage().catch((error) => console.error(error));