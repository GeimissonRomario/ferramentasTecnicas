document.addEventListener('DOMContentLoaded', function () {
  const qrType = document.getElementById('qrType');

  const textInput = document.getElementById('textInput');
  const urlInput = document.getElementById('urlInput');
  const wifiInput = document.getElementById('wifiInput');
  const pixInput = document.getElementById('pixInput');

  const qrText = document.getElementById('qrText');
  const qrUrl = document.getElementById('qrUrl');

  const wifiName = document.getElementById('wifiName');
  const wifiPassword = document.getElementById('wifiPassword');
  const wifiEncryption = document.getElementById('wifiEncryption');

  const pixKey = document.getElementById('pixKey');
  const pixName = document.getElementById('pixName');
  const pixCity = document.getElementById('pixCity');
  const pixValue = document.getElementById('pixValue');

  const generateQrBtn = document.getElementById('generateQrBtn');
  const downloadQrBtn = document.getElementById('downloadQrBtn');
  const qrcodeElement = document.getElementById('qrcode');

  let qrcode = null;

  qrType.addEventListener('change', toggleInputs);
  generateQrBtn.addEventListener('click', generateQRCode);

  function toggleInputs() {
    const type = qrType.value;
    textInput.style.display = type === 'text' ? 'block' : 'none';
    urlInput.style.display = type === 'url' ? 'block' : 'none';
    wifiInput.style.display = type === 'wifi' ? 'block' : 'none';
    pixInput.style.display = type === 'pix' ? 'block' : 'none';
  }

  function generateQRCode() {
    const type = qrType.value;
    let qrData = '';

    try {
      switch (type) {
        case 'text':
          qrData = qrText.value.trim();
          if (!qrData) { showNotification('Digite algum texto.'); return; }
          break;

        case 'url':
          qrData = qrUrl.value.trim();
          if (!qrData) { showNotification('Digite uma URL.'); return; }
          if (!qrData.startsWith('http://') && !qrData.startsWith('https://')) qrData = 'https://' + qrData;
          break;

        case 'wifi':
          const ssid = wifiName.value.trim();
          const password = wifiPassword.value;
          const encryption = wifiEncryption.value;
          if (!ssid) { showNotification('Informe o nome da rede WiFi.'); return; }
          qrData = `WIFI:S:${ssid};T:${encryption};P:${password};;`;
          break;

        case 'pix':
          const chaveRaw = (pixKey.value || '').trim();
          const nome = (pixName.value || '').trim();
          const cidade = (pixCity.value || '').trim();
          const valor = (pixValue.value || '').trim();

          if (!chaveRaw) { showNotification('Informe a chave PIX.'); return; }
          if (!nome) { showNotification('Informe o nome do recebedor.'); return; }
          if (!cidade) { showNotification('Informe a cidade do recebedor.'); return; }

          const chave = normalizePixKey(chaveRaw);
          qrData = gerarPayloadPix(chave, nome, cidade, valor);
          if (!qrData) { showNotification('Erro ao montar payload PIX.'); return; }
          break;
      }

      qrcodeElement.innerHTML = '';
      if (typeof QRCode === 'undefined') { showNotification('Biblioteca QRCode não carregada.'); return; }

      qrcode = new QRCode(qrcodeElement, {
        text: qrData,
        width: 240,
        height: 240,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });

      downloadQrBtn.disabled = false;
    } catch (err) {
      console.error('Erro ao gerar QR Code:', err);
      showNotification('Erro ao gerar QR Code.');
    }
  }

  downloadQrBtn.addEventListener('click', function () {
    try {
      const canvas = qrcodeElement.querySelector('canvas');
      if (!canvas) { showNotification('Nenhum QR Code para download.'); return; }
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Erro ao baixar QR:', err);
      showNotification('Erro ao baixar QR Code.');
    }
  });

  // ---- Funções PIX (BR Code / EMV) ----
  function normalizePixKey(chave) {
    const onlyDigits = chave.replace(/\D/g, '');
    if (/^\d{11}$/.test(onlyDigits)) { // telefone celular brasileiro
      return '+55' + onlyDigits;
    }
    return chave; // CPF/CNPJ ou e-mail mantém
  }

  function gerarPayloadPix(chave, nome, cidade, valor) {
    function normalizeField(v) {
      return v.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
    }
    const nomeNorm = normalizeField(nome).slice(0, 25);
    const cidadeNorm = normalizeField(cidade).slice(0, 15);

    function field(id, value) {
      const v = String(value);
      const len = String(v.length).padStart(2, '0');
      return id + len + v;
    }

    let payload = '';
    payload += field('00', '01');
    const mai = field('00', 'BR.GOV.BCB.PIX') + field('01', chave);
    payload += field('26', mai);
    payload += field('52', '0000');
    payload += field('53', '986');
    if (valor) {
      const v = Number(valor).toFixed(2).replace(',', '.');
      payload += field('54', v);
    }
    payload += field('58', 'BR');
    payload += field('59', nomeNorm);
    payload += field('60', cidadeNorm);
    payload += field('62', field('05', '***'));

    const crc = calcularCRC16(payload + '6304');
    payload += '6304' + crc;

    return payload;
  }

  function calcularCRC16(str) {
    const polinomio = 0x1021;
    let crc = 0xFFFF;
    const bytes = new TextEncoder().encode(str);
    for (let b of bytes) {
      crc ^= (b << 8);
      for (let i = 0; i < 8; i++) {
        if ((crc & 0x8000) !== 0) crc = ((crc << 1) ^ polinomio) & 0xFFFF;
        else crc = (crc << 1) & 0xFFFF;
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
  }

  toggleInputs();
});
