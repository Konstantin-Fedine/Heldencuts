async function loadFragment(selector, path) {
  const target = document.querySelector(selector);
  if (!target) return;
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`Could not load component: ${path}`);
  target.outerHTML = await response.text();
}

async function loadPageChrome() {
  const nested = window.location.pathname.includes("/work/");
  const prefix = nested ? "../" : "";
  await Promise.all([
    loadFragment("[data-page-header]", `${prefix}components/header.html`),
    loadFragment("[data-page-footer]", `${prefix}components/footer.html`),
  ]);
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".header-menu-toggle");
  header?.classList.add("is-visible");
  toggle?.addEventListener("click", () => {
    const open = header.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  header?.querySelectorAll(".nav-link").forEach((link) => link.addEventListener("click", () => header.classList.remove("is-open")));
  if (nested) {
    document.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      if (href && /^(index|services|about|contact)\.html$/.test(href)) link.setAttribute("href", `../${href}`);
      if (href === "work/") link.setAttribute("href", "./");
    });
  }
}

loadPageChrome().catch((error) => console.error(error));
