document.addEventListener('DOMContentLoaded', function() {
  const atalhosGrid = document.getElementById('atalhosGrid');
  const searchAtalhos = document.getElementById('searchAtalhos');

  const atalhos = [
    { comando: "Win + E", descricao: "Abrir Explorador de Arquivos" },
    { comando: "Win + D", descricao: "Mostrar/ocultar área de trabalho" },
    { comando: "Win + L", descricao: "Bloquear o computador" },
    { comando: "Win + R", descricao: "Abrir a caixa de diálogo Executar" },
    { comando: "Win + I", descricao: "Abrir Configurações do Windows" },
    { comando: "Win + Tab", descricao: "Abrir a Visualização de Tarefas" },
    { comando: "Alt + Tab", descricao: "Alternar entre janelas abertas" },
    { comando: "Alt + F4", descricao: "Fechar a janela ativa" },
    { comando: "Ctrl + Shift + Esc", descricao: "Abrir o Gerenciador de Tarefas" },
    { comando: "Ctrl + C", descricao: "Copiar o item selecionado" },
    { comando: "Ctrl + X", descricao: "Recortar o item selecionado" },
    { comando: "Ctrl + V", descricao: "Colar o item selecionado" },
    { comando: "Ctrl + Z", descricao: "Desfazer uma ação" },
    { comando: "Ctrl + Y", descricao: "Refazer uma ação" },
    { comando: "Ctrl + A", descricao: "Selecionar todos os itens em um documento ou janela" },
    { comando: "F2", descricao: "Renomear o item selecionado" },
    { comando: "F5", descricao: "Atualizar a janela ativa" },
    { comando: "Win + Print Screen", descricao: "Capturar tela e salvar automaticamente" },
    { comando: "Alt + Print Screen", descricao: "Capturar a janela ativa" },
    { comando: "Win + V", descricao: "Abrir histórico da área de transferência" },
    { comando: "Win + . ou ;", descricao: "Abrir painel de emojis" },
    { comando: "Win + Seta Esquerda/Direita", descricao: "Encravar janela no lado esquerdo/direito da tela" },
    { comando: "Win + Seta Para Cima", descricao: "Maximizar a janela" },
    { comando: "Ctrl + Shift + N", descricao: "Criar nova pasta no Explorador de Arquivos" },
    { comando: "Ctrl + Shift + T", descricao: "Reabrir guia fechada no navegador" },
  ];

  // Renderizar atalhos
  function renderAtalhos(atalhosParaRenderizar) {
    atalhosGrid.innerHTML = '';
    
    if (atalhosParaRenderizar.length === 0) {
      atalhosGrid.innerHTML = `
        <div class="no-results" style="grid-column: 1 / -1;">
          <p>Nenhum atalho encontrado para "${searchAtalhos.value}"</p>
          <small>Tente usar termos diferentes ou menos específicos</small>
        </div>
      `;
      return;
    }
    
    atalhosParaRenderizar.forEach(atalho => {
      const card = document.createElement('div');
      card.className = 'atalho-card';
      card.innerHTML = `
        <div class="atalho-comando">${atalho.comando}</div>
        <div class="atalho-descricao">${atalho.descricao}</div>
      `;
      atalhosGrid.appendChild(card);
    });
  }

  // Filtrar atalhos
  searchAtalhos.addEventListener('input', function() {
    const termo = this.value.toLowerCase();
    const atalhosFiltrados = atalhos.filter(atalho => 
      atalho.comando.toLowerCase().includes(termo) || 
      atalho.descricao.toLowerCase().includes(termo)
    );
    
    renderAtalhos(atalhosFiltrados);
  });

  // Renderizar inicialmente
  renderAtalhos(atalhos);
});