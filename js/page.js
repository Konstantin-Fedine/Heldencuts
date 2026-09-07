import {
  loadSharedChrome,
  resetToPageHero,
  setupScrollReveals,
  setupSharedMenu,
} from "./site-loader.js?v=20260929";

resetToPageHero();

function applyServiceQuery() {
  const serviceSelect = document.querySelector('select[name="service"]');
  if (!serviceSelect) return;

  const service = new URLSearchParams(window.location.search).get("service");
  const serviceMap = {
    "video-editing": "Video Editing",
    "motion-design": "Motion Design",
    thumbnails: "Thumbnail",
  };

  const targetValue = serviceMap[service];
  if (targetValue) {
    serviceSelect.value = targetValue;
  }
}

loadSharedChrome()
  .then(() => {
    setupSharedMenu();
    setupScrollReveals();
    applyServiceQuery();
  })
  .catch((error) => console.error(error));
