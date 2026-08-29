document.addEventListener('DOMContentLoaded', function() {
  const sitesGrid = document.getElementById('sitesGrid');
  
  const sites = [
    // Suporte & Chamados
    { name: 'Portal de Chamados', url: 'https://portaldechamados.com.br/sign-in', icon: '📞', categoria: 'Suporte',
      desc: 'Abertura e acompanhamento de chamados de suporte. Use para registrar ocorrências, verificar status e histórico de atendimentos.' },
    { name: 'WhatsApp Web', url: 'https://web.whatsapp.com', icon: '💬', categoria: 'Suporte',
      desc: 'Comunicação rápida com usuários durante o atendimento. Útil para receber prints, logs e orientar o usuário em tempo real.' },
    { name: 'AnyDesk', url: 'https://my.anydesk.com', icon: '🖥️', categoria: 'Suporte',
      desc: 'Acesso remoto ao computador do usuário. Solicite o ID do AnyDesk ao usuário e conecte para suporte direto na máquina.' },

    // Diagnóstico de Rede
    { name: 'Speedtest', url: 'https://www.speedtest.net/', icon: '🚀', categoria: 'Rede',
      desc: 'Mede velocidade de download, upload e latência. Use para confirmar se a lentidão relatada é problema de link ou do sistema.' },
    { name: 'Fast.com', url: 'https://fast.com', icon: '⚡', categoria: 'Rede',
      desc: 'Teste rápido de velocidade pela infraestrutura da Netflix. Boa segunda opinião quando o Speedtest apresentar resultado diferente do esperado.' },
    { name: 'MXToolbox', url: 'https://mxtoolbox.com', icon: '🔍', categoria: 'Rede',
      desc: 'Consulta registros DNS, MX e verifica se um domínio ou IP está em blacklists. Essencial para diagnóstico de problemas de e-mail.' },
    { name: 'DNS Checker', url: 'https://dnschecker.org', icon: '🌐', categoria: 'Rede',
      desc: 'Verifica a propagação de DNS em servidores ao redor do mundo. Use após alterar registros DNS para confirmar que propagou corretamente.' },
    { name: 'WhatIsMyIP', url: 'https://www.whatismyip.com', icon: '📡', categoria: 'Rede',
      desc: 'Exibe o IP público da máquina e informações de geolocalização. Use para confirmar o IP externo do usuário ou validar VPN ativa.' },

    // Segurança
    { name: 'VirusTotal', url: 'https://www.virustotal.com', icon: '🛡️', categoria: 'Segurança',
      desc: 'Analisa arquivos, URLs e hashes com mais de 70 antivírus simultaneamente. Use antes de abrir qualquer arquivo suspeito recebido por e-mail ou download.' },
    { name: 'AbuseIPDB', url: 'https://www.abuseipdb.com', icon: '🚫', categoria: 'Segurança',
      desc: 'Verifica se um IP está listado por abuso, ataques ou spam. Use ao investigar acessos suspeitos nos logs de firewall ou sistema.' },
    { name: 'Have I Been Pwned', url: 'https://haveibeenpwned.com', icon: '🔓', categoria: 'Segurança',
      desc: 'Verifica se um e-mail foi exposto em vazamentos de dados públicos. Use ao suspeitar de comprometimento de conta de usuário.' },
    { name: 'URLScan.io', url: 'https://urlscan.io', icon: '🔎', categoria: 'Segurança',
      desc: 'Analisa URLs suspeitas em sandbox e captura screenshot da página sem acessá-la diretamente. Ideal para checar links de phishing com segurança.' },
    { name: 'Shodan', url: 'https://www.shodan.io', icon: '👁️', categoria: 'Segurança',
      desc: 'Motor de busca para dispositivos conectados à internet. Use para verificar quais portas e serviços de um IP estão expostos publicamente.' },
    { name: 'CyberChef', url: 'https://gchq.github.io/CyberChef', icon: '🧪', categoria: 'Segurança',
      desc: 'Ferramenta de análise e transformação de dados: decode Base64, analisa hashes, decodifica JWT, converte formatos. Tudo no navegador, sem enviar dados.' },

    // Cloud & Dev
    { name: 'Azure Portal', url: 'https://portal.azure.com', icon: '☁️', categoria: 'Cloud',
      desc: 'Gerenciamento de usuários, grupos, políticas e recursos na nuvem Microsoft. Use para resetar senhas, verificar MFA, acessar logs do Entra ID e gerenciar VMs.' },
    { name: 'AWS Console', url: 'https://console.aws.amazon.com', icon: '🟠', categoria: 'Cloud',
      desc: 'Painel de gerenciamento de toda a infraestrutura AWS. Use para acessar EC2, S3, IAM, CloudWatch e demais serviços contratados.' },
    { name: 'Microsoft 365', url: 'https://office.com', icon: '📎', categoria: 'Cloud',
      desc: 'Suite Office online com Word, Excel, Teams, SharePoint e Outlook. Use para acessar documentos e comunicação sem precisar instalar o Office.' },
    { name: 'GitHub', url: 'https://github.com', icon: '👨‍💻', categoria: 'Cloud',
      desc: 'Repositório de código e controle de versão. Use para acessar scripts, projetos internos e documentação técnica versionada.' },
  ];

  sites.forEach(site => {
    const wrapper = document.createElement('div');
    wrapper.className = 'site-card-wrapper';

    const siteCard = document.createElement('a');
    siteCard.href = site.url;
    siteCard.target = '_blank';
    siteCard.className = 'site-card';
    siteCard.innerHTML = `
      <div class="site-icon">${site.icon}</div>
      <h3>${site.name}</h3>
      <small class="site-categoria">${site.categoria}</small>
    `;

    const infoBtn = document.createElement('button');
    infoBtn.className = 'site-info-btn';
    infoBtn.textContent = 'ℹ';
    infoBtn.title = 'Como usar';

    const descPanel = document.createElement('div');
    descPanel.className = 'site-desc-panel';
    descPanel.textContent = site.desc;

    infoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = descPanel.classList.contains('visible');
      document.querySelectorAll('.site-desc-panel.visible').forEach(p => p.classList.remove('visible'));
      if (!isOpen) descPanel.classList.add('visible');
    });

    wrapper.appendChild(siteCard);
    wrapper.appendChild(infoBtn);
    wrapper.appendChild(descPanel);
    sitesGrid.appendChild(wrapper);
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.site-desc-panel.visible').forEach(p => p.classList.remove('visible'));
  });
});