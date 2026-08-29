document.addEventListener('DOMContentLoaded', function() {
  const sitesGrid = document.getElementById('sitesGrid');
  
  const sites = [
    // Suporte & Chamados
    { name: 'Portal de Chamados', url: 'https://portaldechamados.com.br/sign-in', icon: '📞', categoria: 'Suporte' },
    { name: 'WhatsApp Web', url: 'https://web.whatsapp.com', icon: '💬', categoria: 'Suporte' },
    { name: 'AnyDesk', url: 'https://my.anydesk.com', icon: '🖥️', categoria: 'Suporte' },

    // Diagnóstico de Rede
    { name: 'Speedtest', url: 'https://www.speedtest.net/', icon: '🚀', categoria: 'Rede' },
    { name: 'Fast.com', url: 'https://fast.com', icon: '⚡', categoria: 'Rede' },
    { name: 'MXToolbox', url: 'https://mxtoolbox.com', icon: '🔍', categoria: 'Rede' },
    { name: 'DNS Checker', url: 'https://dnschecker.org', icon: '🌐', categoria: 'Rede' },
    { name: 'WhatIsMyIP', url: 'https://www.whatismyip.com', icon: '📡', categoria: 'Rede' },

    // Segurança
    { name: 'VirusTotal', url: 'https://www.virustotal.com', icon: '🛡️', categoria: 'Segurança' },
    { name: 'AbuseIPDB', url: 'https://www.abuseipdb.com', icon: '🚫', categoria: 'Segurança' },
    { name: 'Have I Been Pwned', url: 'https://haveibeenpwned.com', icon: '🔓', categoria: 'Segurança' },
    { name: 'URLScan.io', url: 'https://urlscan.io', icon: '🔎', categoria: 'Segurança' },
    { name: 'Shodan', url: 'https://www.shodan.io', icon: '👁️', categoria: 'Segurança' },
    { name: 'CyberChef', url: 'https://gchq.github.io/CyberChef', icon: '🧪', categoria: 'Segurança' },

    // Cloud & Dev
    { name: 'Azure Portal', url: 'https://portal.azure.com', icon: '☁️', categoria: 'Cloud' },
    { name: 'AWS Console', url: 'https://console.aws.amazon.com', icon: '🟠', categoria: 'Cloud' },
    { name: 'Microsoft 365', url: 'https://office.com', icon: '📎', categoria: 'Cloud' },
    { name: 'GitHub', url: 'https://github.com', icon: '👨‍💻', categoria: 'Cloud' },
  ];

  sites.forEach(site => {
    const siteCard = document.createElement('a');
    siteCard.href = site.url;
    siteCard.target = '_blank';
    siteCard.className = 'site-card';
    siteCard.innerHTML = `
      <div class="site-icon">${site.icon}</div>
      <h3>${site.name}</h3>
      <small class="site-categoria">${site.categoria}</small>
    `;
    sitesGrid.appendChild(siteCard);
  });
});