import { loadSharedChrome, setupSharedMenu } from "./site-loader.js?v=20260918";

function applyServiceQuery() {
  const serviceSelect = document.querySelector('select[name="service"]');
  const service = new URLSearchParams(window.location.search).get("service");
  const serviceMap = {
    "video-editing": "Video Editing",
    "motion-design": "Motion Design",
    thumbnails: "Thumbnail",
  };
  const targetValue = serviceMap[service];
  if (serviceSelect && targetValue) serviceSelect.value = targetValue;
}

loadSharedChrome()
  .then(() => {
    setupSharedMenu();
    applyServiceQuery();
  })
  .catch((error) => console.error(error));
