document.addEventListener('DOMContentLoaded', function() {
  const atalhosGrid = document.getElementById('atalhosGrid');
  const searchAtalhos = document.getElementById('searchAtalhos');

  const atalhos = [
    // ===== WINDOWS / SISTEMA =====
    { comando: "Win + E", descricao: "Abrir Explorador de Arquivos" },
    { comando: "Win + D", descricao: "Mostrar/ocultar área de trabalho" },
    { comando: "Win + L", descricao: "Bloquear o computador" },
    { comando: "Win + R", descricao: "Abrir a caixa de diálogo Executar" },
    { comando: "Win + I", descricao: "Abrir Configurações do Windows" },
    { comando: "Win + S", descricao: "Abrir pesquisa do Windows" },
    { comando: "Win + X", descricao: "Abrir menu de acesso rápido (PowerShell, Gerenciador de Disco etc.)" },
    { comando: "Win + Tab", descricao: "Abrir Visualização de Tarefas / Áreas de Trabalho Virtuais" },
    { comando: "Win + Pause", descricao: "Abrir informações do sistema" },
    { comando: "Win + P", descricao: "Projetar tela (duplicar, estender, segundo monitor)" },
    { comando: "Win + K", descricao: "Conectar a dispositivos Bluetooth e wireless" },
    { comando: "Win + M", descricao: "Minimizar todas as janelas" },
    { comando: "Win + Shift + M", descricao: "Restaurar janelas minimizadas" },
    { comando: "Win + Home", descricao: "Minimizar todas as janelas exceto a ativa" },
    { comando: "Win + Seta Para Cima", descricao: "Maximizar a janela ativa" },
    { comando: "Win + Seta Para Baixo", descricao: "Minimizar/restaurar a janela ativa" },
    { comando: "Win + Seta Esquerda/Direita", descricao: "Encravar janela no lado esquerdo/direito da tela" },
    { comando: "Win + 1 a 9", descricao: "Abrir ou alternar para o programa fixado na barra de tarefas" },

    // ===== CAPTURAS DE TELA =====
    { comando: "Win + Shift + S", descricao: "Captura de tela recortada (Snipping Tool)" },
    { comando: "Win + Print Screen", descricao: "Capturar tela inteira e salvar em Imagens/Capturas" },
    { comando: "Alt + Print Screen", descricao: "Capturar apenas a janela ativa" },

    // ===== ÁREA DE TRANSFERÊNCIA =====
    { comando: "Win + V", descricao: "Abrir histórico da área de transferência" },
    { comando: "Ctrl + C", descricao: "Copiar o item selecionado" },
    { comando: "Ctrl + X", descricao: "Recortar o item selecionado" },
    { comando: "Ctrl + V", descricao: "Colar o item selecionado" },
    { comando: "Win + . ou ;", descricao: "Abrir painel de emojis e símbolos" },

    // ===== EDIÇÃO / TEXTO =====
    { comando: "Ctrl + Z", descricao: "Desfazer a última ação" },
    { comando: "Ctrl + Y", descricao: "Refazer a última ação desfeita" },
    { comando: "Ctrl + A", descricao: "Selecionar tudo" },
    { comando: "Ctrl + F", descricao: "Pesquisar texto na página ou documento" },
    { comando: "Ctrl + H", descricao: "Localizar e substituir texto" },
    { comando: "Ctrl + P", descricao: "Imprimir" },
    { comando: "Ctrl + S", descricao: "Salvar o documento atual" },
    { comando: "Ctrl + Shift + S", descricao: "Salvar como (na maioria dos programas)" },

    // ===== GERENCIAMENTO DE JANELAS =====
    { comando: "Alt + Tab", descricao: "Alternar entre janelas abertas" },
    { comando: "Alt + F4", descricao: "Fechar a janela ativa" },
    { comando: "Ctrl + Shift + Esc", descricao: "Abrir o Gerenciador de Tarefas diretamente" },
    { comando: "Alt + Enter", descricao: "Ver propriedades do item selecionado" },
    { comando: "F2", descricao: "Renomear o item selecionado" },
    { comando: "F5", descricao: "Atualizar a janela ativa" },

    // ===== EXPLORADOR DE ARQUIVOS =====
    { comando: "Ctrl + N", descricao: "Abrir nova janela do Explorador de Arquivos" },
    { comando: "Ctrl + Shift + N", descricao: "Criar nova pasta" },
    { comando: "Alt + D", descricao: "Selecionar a barra de endereços do Explorador" },
    { comando: "F3", descricao: "Abrir busca no Explorador de Arquivos" },
    { comando: "Backspace", descricao: "Voltar ao diretório anterior no Explorador" },
    { comando: "Shift + Delete", descricao: "Excluir permanentemente sem enviar para lixeira" },

    // ===== NAVEGADOR (Chrome / Edge) =====
    { comando: "Ctrl + T", descricao: "Abrir nova aba no navegador" },
    { comando: "Ctrl + W", descricao: "Fechar a aba atual" },
    { comando: "Ctrl + Shift + T", descricao: "Reabrir a última aba fechada" },
    { comando: "Ctrl + Tab", descricao: "Ir para a próxima aba" },
    { comando: "Ctrl + Shift + Tab", descricao: "Ir para a aba anterior" },
    { comando: "Ctrl + L ou F6", descricao: "Selecionar a barra de endereços do navegador" },
    { comando: "Ctrl + R ou F5", descricao: "Recarregar a página" },
    { comando: "Ctrl + Shift + R", descricao: "Recarregar a página ignorando o cache" },
    { comando: "Ctrl + D", descricao: "Adicionar página aos favoritos" },
    { comando: "Ctrl + Shift + Delete", descricao: "Abrir limpeza de histórico e cache do navegador" },
    { comando: "F12 ou Ctrl + Shift + I", descricao: "Abrir ferramentas do desenvolvedor (DevTools)" },

    // ===== TEAMS / REUNIÕES =====
    { comando: "Ctrl + Shift + M", descricao: "Ativar/desativar microfone no Microsoft Teams" },
    { comando: "Ctrl + Shift + O", descricao: "Ativar/desativar câmera no Microsoft Teams" },
    { comando: "Ctrl + Shift + H", descricao: "Levantar/baixar a mão no Microsoft Teams" },
    { comando: "Ctrl + Shift + F", descricao: "Colocar o Teams em foco (sem notificações)" },

    // ===== ACESSO REMOTO (RDP) =====
    { comando: "Ctrl + Alt + Break", descricao: "Alternar entre janela e tela cheia na sessão RDP" },
    { comando: "Ctrl + Alt + End", descricao: "Equivalente ao Ctrl+Alt+Del dentro de uma sessão RDP" },
    { comando: "Ctrl + Alt + Home", descricao: "Ativar a barra de conexão no topo da sessão RDP" },
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