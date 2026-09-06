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