import {
  getPathPrefix,
  loadSharedChrome,
  resetToPageHero,
  setupScrollReveals,
  setupSharedMenu,
} from "./site-loader.js?v=20260929";

resetToPageHero();

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

  const sections = [...main.children].filter(
    (child) => child.tagName === "SECTION",
  );
  main.classList.add("is-reveal-ready");

  const revealVisibleSections = () => {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        section.classList.add("is-visible");
      }
    });
  };

  requestAnimationFrame(() => {
    sections[0]?.classList.add("is-visible");
    revealVisibleSections();
  });
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

function setupHomepageHeroReveal() {
  const hero = document.querySelector("main > .hero");
  if (!hero) return;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => hero.classList.add("is-visible"));
  });
}

async function loadPage() {
  const prefix = getPathPrefix();
  const components = [
    ["[data-component='hero']", `${prefix}components/hero.html`],
    ["[data-component='trust']", `${prefix}components/trust.html`],
    ["[data-component='work']", `${prefix}components/work.html`],
    ["[data-component='about']", `${prefix}components/about.html`],
    ["[data-component='ratings']", `${prefix}components/ratings.html`],
    ["[data-component='process']", `${prefix}components/process.html`],
    ["[data-component='home-cta']", `${prefix}components/home-cta.html`],
  ];

  await Promise.all([
    loadSharedChrome(),
    ...components.map(async ([selector, path]) => {
      const target = document.querySelector(selector);
      if (!target) return;
      const response = await fetch(path, { cache: "no-store" });
      if (!response.ok) throw new Error(`Could not load component: ${path}`);
      target.outerHTML = await response.text();
    }),
  ]);

  setupSharedMenu();
  setupMainReveal();
  setupHomepageHeroReveal();
  setupScrollReveals();
  scrollToHashTarget();
}

loadPage().catch((error) => console.error(error));