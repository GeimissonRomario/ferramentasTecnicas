document.addEventListener('DOMContentLoaded', function () {
  const area = document.getElementById('notasArea');
  const status = document.getElementById('notasStatus');
  const copiarBtn = document.getElementById('copiarBtn');
  const limparBtn = document.getElementById('limparBtn');

  const STORAGE_KEY = 'painel_notas';

  function carregar() {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (salvo) {
      area.value = salvo;
      atualizarStatus();
    }
  }

  function salvar() {
    localStorage.setItem(STORAGE_KEY, area.value);
    atualizarStatus();
  }

  function atualizarStatus() {
    const texto = area.value.trim();
    if (!texto) {
      status.textContent = 'Nenhuma nota ainda';
      status.className = 'notas-status';
      return;
    }
    const palavras = texto.split(/\s+/).filter(Boolean).length;
    const linhas = area.value.split('\n').length;
    const agora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    status.textContent = `Salvo às ${agora} · ${linhas} linha${linhas !== 1 ? 's' : ''} · ${palavras} palavra${palavras !== 1 ? 's' : ''}`;
    status.className = 'notas-status saved';
  }

  let debounceTimer;
  area.addEventListener('input', function () {
    status.textContent = 'Salvando...';
    status.className = 'notas-status saving';
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(salvar, 600);
  });

  copiarBtn.addEventListener('click', function () {
    const texto = area.value.trim();
    if (!texto) {
      showNotification('Nenhuma nota para copiar.', 'error');
      return;
    }
    copyWithNotification(texto, 'Notas copiadas para a área de transferência!');
  });

  limparBtn.addEventListener('click', function () {
    if (!area.value.trim()) return;
    if (!confirm('Deseja apagar todas as notas? Esta ação não pode ser desfeita.')) return;
    area.value = '';
    localStorage.removeItem(STORAGE_KEY);
    status.textContent = 'Nenhuma nota ainda';
    status.className = 'notas-status';
    area.focus();
  });

  carregar();
  area.focus();
});
