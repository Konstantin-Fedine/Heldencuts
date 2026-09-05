async function loadComponent(selector, path) {
  const target = document.querySelector(selector);
  if (!target) return;

  const response = await fetch(path);
  if (!response.ok) throw new Error(`Could not load component: ${path}`);
  target.outerHTML = await response.text();
}

async function loadPage() {
  const components = [
    ["[data-component='header']", 'components/header.html'],
    ["[data-component='hero']", 'components/hero.html'],
    ["[data-component='work']", 'components/work.html'],
    ["[data-component='about']", 'components/about.html'],
    ["[data-component='ratings']", 'components/ratings.html'],
    ["[data-component='process']", 'components/process.html'],
    ["[data-component='contact']", 'components/contact.html'],
    ["[data-component='faq']", 'components/faq.html'],
    ["[data-component='footer']", 'components/footer.html']
  ];

  await Promise.all(components.map(([selector, path]) => loadComponent(selector, path)));
}

loadPage().catch((error) => console.error(error));