document.addEventListener('DOMContentLoaded', function() {
  const ipAddressInput = document.getElementById('ipAddress');
  const subnetBits = document.getElementById('subnetBits');
  const subnetValue = document.getElementById('subnetValue');
  const calculateBtn = document.getElementById('calculateBtn');
  const subnetMask = document.getElementById('subnetMask');
  const networkAddress = document.getElementById('networkAddress');
  const broadcastAddress = document.getElementById('broadcastAddress');
  const firstUsable = document.getElementById('firstUsable');
  const lastUsable = document.getElementById('lastUsable');
  const totalHosts = document.getElementById('totalHosts');

  // Atualizar valor do range
  subnetBits.addEventListener('input', function() {
    subnetValue.textContent = '/' + this.value;
  });

  // Calcular sub-rede
  calculateBtn.addEventListener('click', calculateSubnet);

  // Calcular ao pressionar Enter no campo IP
  ipAddressInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      calculateSubnet();
    }
  });

  // Adicionar botões de copiar aos resultados
  function setupCopyButtons() {
    const resultCards = document.querySelectorAll('.result-card');
    
    resultCards.forEach(card => {
      // Remover botão existente se houver
      const existingBtn = card.querySelector('.copy-result-btn');
      if (existingBtn) {
        existingBtn.remove();
      }
      
      const valueElement = card.querySelector('p');
      const copyButton = document.createElement('button');
      copyButton.className = 'copy-result-btn';
      copyButton.innerHTML = '📋';
      copyButton.title = 'Copiar valor';
      
      copyButton.addEventListener('click', () => {
        const valueToCopy = valueElement.textContent;
        copyWithNotification(valueToCopy, "Valor copiado para a área de transferência!");
      });
      
      card.appendChild(copyButton);
    });
  }

  function calculateSubnet() {
    const ip = ipAddressInput.value.trim();
    const cidr = parseInt(subnetBits.value);
    
    // Validar IP
    if (!isValidIP(ip)) {
      showNotification('Por favor, insira um endereço IP válido.', 'error');
      return;
    }
    
    // Calcular máscara de sub-rede
    const mask = calculateSubnetMask(cidr);
    subnetMask.textContent = mask;
    
    // Calcular endereço de rede
    const network = calculateNetworkAddress(ip, mask);
    networkAddress.textContent = network;
    
    // Calcular broadcast
    const broadcast = calculateBroadcastAddress(network, mask);
    broadcastAddress.textContent = broadcast;
    
    // Calcular primeiro e último IP utilizável
    const first = calculateFirstUsable(network);
    const last = calculateLastUsable(broadcast);
    firstUsable.textContent = first;
    lastUsable.textContent = last;
    
    // Calcular total de hosts
    const hosts = calculateTotalHosts(cidr);
    totalHosts.textContent = hosts.toLocaleString();
    
    // Adicionar botões de copiar
    setTimeout(setupCopyButtons, 100);
  }

  function isValidIP(ip) {
    const ipRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = ip.match(ipRegex);
    
    if (!match) return false;
    
    return match.slice(1).every(octet => {
      const num = parseInt(octet);
      return num >= 0 && num <= 255;
    });
  }

  function calculateSubnetMask(cidr) {
    const mask = [];
    for (let i = 0; i < 4; i++) {
      const bits = Math.min(8, Math.max(0, cidr - i * 8));
      mask.push(256 - Math.pow(2, 8 - bits));
    }
    return mask.join('.');
  }

  function calculateNetworkAddress(ip, mask) {
    const ipParts = ip.split('.').map(Number);
    const maskParts = mask.split('.').map(Number);
    
    return ipParts.map((octet, i) => octet & maskParts[i]).join('.');
  }

  function calculateBroadcastAddress(network, mask) {
    const networkParts = network.split('.').map(Number);
    const maskParts = mask.split('.').map(Number);
    
    return networkParts.map((octet, i) => octet | (255 - maskParts[i])).join('.');
  }

  function calculateFirstUsable(network) {
    const parts = network.split('.').map(Number);
    parts[3] += 1;
    return parts.join('.');
  }

  function calculateLastUsable(broadcast) {
    const parts = broadcast.split('.').map(Number);
    parts[3] -= 1;
    return parts.join('.');
  }

  function calculateTotalHosts(cidr) {
    return Math.pow(2, 32 - cidr) - 2;
  }

  // Calcular automaticamente ao carregar a página
  calculateSubnet();
});