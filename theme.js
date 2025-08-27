// Gerenciador de temas
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  // Verificar preferência salva ou do sistema
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Aplicar tema inicial
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark-theme');
    if (themeToggle) themeToggle.textContent = '☀️';
  }
  
  // Configurar toggle do tema
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  function toggleTheme() {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    if (themeToggle) {
      themeToggle.textContent = isDark ? '☀️' : '🌙';
    }
  }
});