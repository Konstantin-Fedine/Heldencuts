import {
  loadSharedChrome,
  resetToPageHero,
  setupScrollReveals,
  setupSharedMenu,
} from "./site-loader.js?v=20260929";

resetToPageHero();

function createVideoDialog() {
  const dialog = document.createElement("dialog");
  dialog.className = "video-dialog";
  dialog.innerHTML = '<div class="video-dialog-shell"><button class="icon-button video-dialog-close" type="button" aria-label="Close video">&times;</button><div class="video-dialog-frame"></div></div>';
  document.body.append(dialog);
  return dialog;
}

function setupVideoButtons() {
  document.querySelectorAll(".video-frame img, .media-frame img").forEach((image) => {
    image.loading = "lazy";
  });
  const dialog = createVideoDialog();
  const frame = dialog.querySelector(".video-dialog-frame");
  const close = () => {
    dialog.close();
    frame.replaceChildren();
    document.body.classList.remove("has-video-dialog");
  };

  dialog.querySelector(".video-dialog-close").addEventListener("click", close);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });

  document.querySelectorAll("[data-video-id]").forEach((project) => {
    const button = project.querySelector(".video-play");
    const videoId = project.dataset.videoId;
    button?.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&playsinline=1`;
      iframe.title = project.dataset.videoTitle || "YouTube video";
      iframe.loading = "lazy";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      frame.replaceChildren(iframe);
      dialog.showModal();
      document.body.classList.add("has-video-dialog");
      dialog.querySelector(".video-dialog-close").focus();
    });
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog.open) close();
  });
}

function setupVideoLinks() {
  document.querySelectorAll("[data-video-id]").forEach((project) => {
    const title = project.querySelector(".case-copy h2");
    const videoId = project.dataset.videoId;
    if (!title || !videoId || title.querySelector("a")) return;

    const link = document.createElement("a");
    link.className = "case-video-link";
    link.href = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = title.textContent;
    title.replaceChildren(link);
  });
}

function setupWorkReveal() {
  const projects = document.querySelectorAll(".case-study");
  if (!projects.length) return;
  const workPage = document.querySelector(".work-page");
  workPage?.classList.add("is-ready");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("video[autoplay]").forEach((video) => {
      video.pause();
      video.removeAttribute("autoplay");
    });
  }
  if (!("IntersectionObserver" in window)) {
    projects.forEach((project) => project.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -10%", threshold: 0.12 });
  projects.forEach((project) => observer.observe(project));
}

loadSharedChrome()
  .then(() => {
    setupSharedMenu();
    setupWorkReveal();
    setupScrollReveals();
    setupVideoLinks();
    setupVideoButtons();
  })
  .catch((error) => console.error(error));
