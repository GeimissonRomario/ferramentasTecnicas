// aplica dark-theme ao html antes do primeiro paint (via inline script no <head>)
// este arquivo sincroniza o ícone do toggle e move a classe para body
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const body = document.body;

  // a classe já foi aplicada ao <html> pelo script inline — propaga para body
  if (html.classList.contains('dark-theme')) {
    body.classList.add('dark-theme');
    if (themeToggle) themeToggle.textContent = '☀️';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const isDark = body.classList.toggle('dark-theme');
      html.classList.toggle('dark-theme', isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      themeToggle.textContent = isDark ? '☀️' : '🌙';
    });
  }
});
