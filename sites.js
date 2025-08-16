document.addEventListener('DOMContentLoaded', function() {
  const sitesGrid = document.getElementById('sitesGrid');
  
  const sites = [
    { name: 'Teste de Velocidade', url: 'https://www.speedtest.net/', icon: '🚀' },
    { name: 'Portal de Chamados', url: 'https://portaldechamados.com.br/sign-in', icon: '📞' },
    { name: 'Fast.com', url: 'https://fast.com', icon: '⚡' },
    { name: 'WhatsApp Web', url: 'https://web.whatsapp.com', icon: '💬' },
    { name: 'Microsoft 365', url: 'https://office.com', icon: '📎' },
    { name: 'Google Drive', url: 'https://drive.google.com', icon: '📁' },
    { name: 'GitHub', url: 'https://github.com', icon: '👨‍💻' },
    { name: 'Trello', url: 'https://trello.com', icon: '📋' },
    { name: 'Slack', url: 'https://slack.com', icon: '💼' },
    { name: 'Zoom', url: 'https://zoom.us', icon: '📹' },
    { name: 'YouTube', url: 'https://youtube.com', icon: '🎥' },
    { name: 'Google Maps', url: 'https://maps.google.com', icon: '🗺️' },
    { name: 'Facebook', url: 'https://facebook.com', icon: '📘' },
    { name: 'Instagram', url: 'https://www.instagram.com/', icon: '📸' }
  ];

  sites.forEach(site => {
    const siteCard = document.createElement('a');
    siteCard.href = site.url;
    siteCard.target = '_blank';
    siteCard.className = 'site-card';
    siteCard.innerHTML = `
      <div class="site-icon">${site.icon}</div>
      <h3>${site.name}</h3>
    `;
    sitesGrid.appendChild(siteCard);
  });
});