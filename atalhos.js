document.addEventListener('DOMContentLoaded', function() {
  const atalhosGrid = document.getElementById('atalhosGrid');
  const searchAtalhos = document.getElementById('searchAtalhos');
  const searchCounter = document.getElementById('searchCounter');

  const atalhos = [
    // ===== WINDOWS / SISTEMA =====
    { comando: "Win + E",                descricao: "Abrir Explorador de Arquivos",                                       categoria: "Windows" },
    { comando: "Win + D",                descricao: "Mostrar/ocultar área de trabalho",                                   categoria: "Windows" },
    { comando: "Win + L",                descricao: "Bloquear o computador",                                              categoria: "Windows" },
    { comando: "Win + R",                descricao: "Abrir a caixa de diálogo Executar",                                  categoria: "Windows" },
    { comando: "Win + I",                descricao: "Abrir Configurações do Windows",                                     categoria: "Windows" },
    { comando: "Win + S",                descricao: "Abrir pesquisa do Windows",                                          categoria: "Windows" },
    { comando: "Win + X",                descricao: "Abrir menu de acesso rápido (PowerShell, Gerenciador de Disco etc.)",categoria: "Windows" },
    { comando: "Win + Tab",              descricao: "Abrir Visualização de Tarefas / Áreas de Trabalho Virtuais",        categoria: "Windows" },
    { comando: "Win + Pause",            descricao: "Abrir informações do sistema",                                       categoria: "Windows" },
    { comando: "Win + P",                descricao: "Projetar tela (duplicar, estender, segundo monitor)",                categoria: "Windows" },
    { comando: "Win + K",                descricao: "Conectar a dispositivos Bluetooth e wireless",                       categoria: "Windows" },
    { comando: "Win + M",                descricao: "Minimizar todas as janelas",                                         categoria: "Windows" },
    { comando: "Win + Shift + M",        descricao: "Restaurar janelas minimizadas",                                      categoria: "Windows" },
    { comando: "Win + Home",             descricao: "Minimizar todas as janelas exceto a ativa",                          categoria: "Windows" },
    { comando: "Win + Seta Para Cima",   descricao: "Maximizar a janela ativa",                                           categoria: "Windows" },
    { comando: "Win + Seta Para Baixo",  descricao: "Minimizar/restaurar a janela ativa",                                 categoria: "Windows" },
    { comando: "Win + Seta Esq/Dir",     descricao: "Encravar janela no lado esquerdo/direito da tela",                  categoria: "Windows" },
    { comando: "Win + 1 a 9",            descricao: "Abrir ou alternar para o programa fixado na barra de tarefas",       categoria: "Windows" },

    // ===== CAPTURAS DE TELA =====
    { comando: "Win + Shift + S",        descricao: "Captura de tela recortada (Snipping Tool)",                          categoria: "Capturas" },
    { comando: "Win + Print Screen",     descricao: "Capturar tela inteira e salvar em Imagens/Capturas",                 categoria: "Capturas" },
    { comando: "Alt + Print Screen",     descricao: "Capturar apenas a janela ativa",                                     categoria: "Capturas" },

    // ===== EDIÇÃO / TEXTO =====
    { comando: "Ctrl + C",               descricao: "Copiar o item selecionado",                                          categoria: "Edição" },
    { comando: "Ctrl + X",               descricao: "Recortar o item selecionado",                                        categoria: "Edição" },
    { comando: "Ctrl + V",               descricao: "Colar o item selecionado",                                           categoria: "Edição" },
    { comando: "Win + V",                descricao: "Abrir histórico da área de transferência",                           categoria: "Edição" },
    { comando: "Win + . ou ;",           descricao: "Abrir painel de emojis e símbolos",                                  categoria: "Edição" },
    { comando: "Ctrl + Z",               descricao: "Desfazer a última ação",                                             categoria: "Edição" },
    { comando: "Ctrl + Y",               descricao: "Refazer a última ação desfeita",                                     categoria: "Edição" },
    { comando: "Ctrl + A",               descricao: "Selecionar tudo",                                                    categoria: "Edição" },
    { comando: "Ctrl + F",               descricao: "Pesquisar texto na página ou documento",                             categoria: "Edição" },
    { comando: "Ctrl + H",               descricao: "Localizar e substituir texto",                                       categoria: "Edição" },
    { comando: "Ctrl + P",               descricao: "Imprimir",                                                           categoria: "Edição" },
    { comando: "Ctrl + S",               descricao: "Salvar o documento atual",                                           categoria: "Edição" },
    { comando: "Alt + Tab",              descricao: "Alternar entre janelas abertas",                                      categoria: "Edição" },
    { comando: "Alt + F4",               descricao: "Fechar a janela ativa",                                              categoria: "Edição" },
    { comando: "Ctrl + Shift + Esc",     descricao: "Abrir o Gerenciador de Tarefas diretamente",                         categoria: "Edição" },
    { comando: "Alt + Enter",            descricao: "Ver propriedades do item selecionado",                               categoria: "Edição" },
    { comando: "F2",                     descricao: "Renomear o item selecionado",                                         categoria: "Edição" },
    { comando: "F5",                     descricao: "Atualizar a janela ativa",                                            categoria: "Edição" },

    // ===== EXPLORADOR DE ARQUIVOS =====
    { comando: "Ctrl + N",               descricao: "Abrir nova janela do Explorador de Arquivos",                        categoria: "Arquivos" },
    { comando: "Ctrl + Shift + N",       descricao: "Criar nova pasta",                                                   categoria: "Arquivos" },
    { comando: "Alt + D",                descricao: "Selecionar a barra de endereços do Explorador",                      categoria: "Arquivos" },
    { comando: "F3",                     descricao: "Abrir busca no Explorador de Arquivos",                              categoria: "Arquivos" },
    { comando: "Backspace",              descricao: "Voltar ao diretório anterior no Explorador",                         categoria: "Arquivos" },
    { comando: "Shift + Delete",         descricao: "Excluir permanentemente sem enviar para lixeira",                    categoria: "Arquivos" },

    // ===== NAVEGADOR =====
    { comando: "Ctrl + T",               descricao: "Abrir nova aba no navegador",                                        categoria: "Navegador" },
    { comando: "Ctrl + W",               descricao: "Fechar a aba atual",                                                 categoria: "Navegador" },
    { comando: "Ctrl + Shift + T",       descricao: "Reabrir a última aba fechada",                                       categoria: "Navegador" },
    { comando: "Ctrl + Tab",             descricao: "Ir para a próxima aba",                                              categoria: "Navegador" },
    { comando: "Ctrl + Shift + Tab",     descricao: "Ir para a aba anterior",                                             categoria: "Navegador" },
    { comando: "Ctrl + L ou F6",         descricao: "Selecionar a barra de endereços do navegador",                       categoria: "Navegador" },
    { comando: "Ctrl + R ou F5",         descricao: "Recarregar a página",                                                categoria: "Navegador" },
    { comando: "Ctrl + Shift + R",       descricao: "Recarregar a página ignorando o cache",                              categoria: "Navegador" },
    { comando: "Ctrl + D",               descricao: "Adicionar página aos favoritos",                                     categoria: "Navegador" },
    { comando: "Ctrl + Shift + Delete",  descricao: "Abrir limpeza de histórico e cache do navegador",                    categoria: "Navegador" },
    { comando: "F12 / Ctrl + Shift + I", descricao: "Abrir ferramentas do desenvolvedor (DevTools)",                      categoria: "Navegador" },

    // ===== TEAMS =====
    { comando: "Ctrl + Shift + M",       descricao: "Ativar/desativar microfone no Microsoft Teams",                      categoria: "Teams" },
    { comando: "Ctrl + Shift + O",       descricao: "Ativar/desativar câmera no Microsoft Teams",                         categoria: "Teams" },
    { comando: "Ctrl + Shift + H",       descricao: "Levantar/baixar a mão no Microsoft Teams",                          categoria: "Teams" },
    { comando: "Ctrl + Shift + F",       descricao: "Colocar o Teams em foco (sem notificações)",                         categoria: "Teams" },

    // ===== RDP =====
    { comando: "Ctrl + Alt + Break",     descricao: "Alternar entre janela e tela cheia na sessão RDP",                   categoria: "RDP" },
    { comando: "Ctrl + Alt + End",       descricao: "Equivalente ao Ctrl+Alt+Del dentro de uma sessão RDP",               categoria: "RDP" },
    { comando: "Ctrl + Alt + Home",      descricao: "Ativar a barra de conexão no topo da sessão RDP",                    categoria: "RDP" },
  ];

  // Renderizar atalhos
  function renderAtalhos(atalhosParaRenderizar) {
    atalhosGrid.innerHTML = '';
    const total = atalhos.length;
    const encontrados = atalhosParaRenderizar.length;
    searchCounter.textContent = searchAtalhos.value.trim()
      ? `${encontrados} de ${total} atalhos`
      : `${total} atalhos`;
    
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
        <small class="site-categoria">${atalho.categoria}</small>
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