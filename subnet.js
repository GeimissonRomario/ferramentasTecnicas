document.addEventListener('DOMContentLoaded', function() {
  const ipAddressInput  = document.getElementById('ipAddress');
  const subnetBits      = document.getElementById('subnetBits');
  const subnetValue     = document.getElementById('subnetValue');
  const calculateBtn    = document.getElementById('calculateBtn');
  const subnetMask      = document.getElementById('subnetMask');
  const networkAddress  = document.getElementById('networkAddress');
  const broadcastAddress = document.getElementById('broadcastAddress');
  const firstUsable     = document.getElementById('firstUsable');
  const lastUsable      = document.getElementById('lastUsable');
  const totalHosts      = document.getElementById('totalHosts');

  subnetBits.max = 32;

  subnetBits.addEventListener('input', function() {
    subnetValue.textContent = '/' + this.value;
  });

  calculateBtn.addEventListener('click', calculateSubnet);
  ipAddressInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') calculateSubnet();
  });

  function setupCopyButtons() {
    document.querySelectorAll('.result-card').forEach(card => {
      const existing = card.querySelector('.copy-result-btn');
      if (existing) existing.remove();

      const valueEl = card.querySelector('p');
      const btn = document.createElement('button');
      btn.className = 'copy-result-btn';
      btn.innerHTML = '📋';
      btn.title = 'Copiar valor';
      btn.addEventListener('click', () => {
        copyWithNotification(valueEl.textContent, "Valor copiado para a área de transferência!");
      });
      card.appendChild(btn);
    });
  }

  function ipToInt(ip) {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
  }

  function intToIp(n) {
    return [24, 16, 8, 0].map(shift => (n >>> shift) & 0xFF).join('.');
  }

  function calculateSubnet() {
    const ip   = ipAddressInput.value.trim();
    const cidr = parseInt(subnetBits.value);

    if (!isValidIP(ip)) {
      showNotification('Por favor, insira um endereço IP válido.', 'error');
      return;
    }

    const maskInt      = cidr === 0 ? 0 : (0xFFFFFFFF << (32 - cidr)) >>> 0;
    const ipInt        = ipToInt(ip);
    const networkInt   = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;

    subnetMask.textContent      = intToIp(maskInt);
    networkAddress.textContent  = intToIp(networkInt);
    broadcastAddress.textContent = intToIp(broadcastInt);

    if (cidr === 32) {
      // host único — sem broadcast separado
      firstUsable.textContent = intToIp(networkInt);
      lastUsable.textContent  = intToIp(networkInt);
      totalHosts.textContent  = '1';
    } else if (cidr === 31) {
      // ponto-a-ponto (RFC 3021) — dois endereços, ambos utilizáveis
      firstUsable.textContent = intToIp(networkInt);
      lastUsable.textContent  = intToIp(broadcastInt);
      totalHosts.textContent  = '2';
    } else {
      firstUsable.textContent = intToIp(networkInt + 1);
      lastUsable.textContent  = intToIp(broadcastInt - 1);
      totalHosts.textContent  = Math.pow(2, 32 - cidr) - 2 > 0
        ? (Math.pow(2, 32 - cidr) - 2).toLocaleString()
        : '0';
    }

    setupCopyButtons();
  }

  function isValidIP(ip) {
    const match = ip.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    if (!match) return false;
    return match.slice(1).every(o => { const n = parseInt(o); return n >= 0 && n <= 255; });
  }

  calculateSubnet();
});
