async function loadChrome() {
  const fragments = [
    ["[data-page-header]", "../components/header.html"],
    ["[data-page-footer]", "../components/footer.html"],
  ];

  await Promise.all(
    fragments.map(async ([selector, path]) => {
      const target = document.querySelector(selector);
      if (!target) return;
      const response = await fetch(path, { cache: "no-store" });
      if (!response.ok) throw new Error(`Could not load component: ${path}`);
      target.outerHTML = await response.text();
    }),
  );

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href?.startsWith("index.html") || href === "imprint.html" || href === "privacy-policy.html") {
      link.setAttribute("href", `../${href}`);
    }
  });

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".header-menu-toggle");
  if (!header) return;

  header.classList.add("is-visible");

  if (!toggle) return;

  const closeMenu = () => {
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  header.querySelectorAll(".nav-link").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("click", (event) => {
    if (!header.contains(event.target) && header.classList.contains("is-open")) closeMenu();
  });
}

function setupVideoButtons() {
  document.querySelectorAll("[data-video-id]").forEach((project) => {
    const button = project.querySelector(".video-play");
    const videoId = project.dataset.videoId;

    button?.addEventListener("click", () => {
      const frame = project.querySelector(".video-frame");
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&playsinline=1`;
      iframe.title = project.dataset.videoTitle || "YouTube video";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      frame.replaceChildren(iframe);
    });
  });
}

function setupWorkReveal() {
  const workPage = document.querySelector(".work-page");
  if (!workPage) return;

  workPage.classList.add("is-ready");
  const projects = workPage.querySelectorAll(".case-study");
  if (!("IntersectionObserver" in window)) {
    projects.forEach((project) => project.classList.add("is-visible"));
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
    { rootMargin: "0px 0px -10%", threshold: 0.12 },
  );

  projects.forEach((project) => observer.observe(project));
}

loadChrome()
  .then(() => {
    setupWorkReveal();
    setupVideoButtons();
  })
  .catch((error) => console.error(error));