(function() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-bs-theme', theme);

  window.addEventListener('load', () => {
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  });
})();