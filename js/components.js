async function loadComponent(selector, path) {
  const target = document.querySelector(selector);

  if (!target) {
    return;
  }

  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Could not load component: ${path}`);
  }

  target.outerHTML = await response.text();
}

async function loadPageComponents() {
  await Promise.all([
    loadComponent("[data-component='header']", "components/header.html"),
    loadComponent("[data-component='footer']", "components/footer.html"),
  ]);
}

loadPageComponents().catch((error) => {
  console.error(error);
});
