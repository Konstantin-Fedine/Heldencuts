function getPathPrefix() {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const isDirectoryPage = window.location.pathname.endsWith("/");
  const depth = isDirectoryPage ? segments.length : Math.max(segments.length - 1, 0);
  return "../".repeat(depth);
}

async function loadFragment(selector, path) {
  const target = document.querySelector(selector);
  if (!target) return;
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`Could not load component: ${path}`);
  target.outerHTML = await response.text();
}

function rewriteRootLinks(prefix) {
  if (!prefix) return;

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || /^(?:[a-z]+:|\/|#)/i.test(href)) return;
    if (href.startsWith(prefix)) return;
    const isRootLink = /^(?:index\.html(?:#.*)?|work\/(?:#.*)?|services\.html(?:\?.*)?|about\.html(?:\?.*)?|contact\.html(?:\?.*)?|imprint\.html|privacy-policy\.html)$/.test(href);
    if (isRootLink) link.setAttribute("href", `${prefix}${href}`);
  });
}

export async function loadSharedChrome() {
  const prefix = getPathPrefix();
  await Promise.all([
    loadFragment("[data-component='header'], [data-page-header]", `${prefix}components/header.html`),
    loadFragment("[data-component='footer'], [data-page-footer]", `${prefix}components/footer.html`),
  ]);
  rewriteRootLinks(prefix);
}

export function setupSharedMenu() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".header-menu-toggle");
  if (!header) return;

  const navigation = header.querySelector(".header-nav");
  const mobileQuery = window.matchMedia("(max-width: 760px)");
  const syncNavigationAccessibility = () => {
    navigation?.setAttribute("aria-hidden", String(mobileQuery.matches && !header.classList.contains("is-open")));
  };

  header.classList.add("is-visible");
  syncNavigationAccessibility();
  if (!toggle) return;

  const closeMenu = () => {
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    syncNavigationAccessibility();
  };

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    syncNavigationAccessibility();
    if (isOpen) navigation?.querySelector(".nav-link")?.focus();
  });

  header.querySelectorAll(".nav-link").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("click", (event) => {
    if (!header.contains(event.target) && header.classList.contains("is-open")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  mobileQuery.addEventListener?.("change", syncNavigationAccessibility);
}
