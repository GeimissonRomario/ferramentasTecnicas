document.addEventListener('DOMContentLoaded', function() {
  const qrType = document.getElementById('qrType');
  const textInput = document.getElementById('textInput');
  const urlInput = document.getElementById('urlInput');
  const wifiInput = document.getElementById('wifiInput');
  const qrText = document.getElementById('qrText');
  const qrUrl = document.getElementById('qrUrl');
  const wifiName = document.getElementById('wifiName');
  const wifiPassword = document.getElementById('wifiPassword');
  const wifiEncryption = document.getElementById('wifiEncryption');
  const generateQrBtn = document.getElementById('generateQrBtn');
  const downloadQrBtn = document.getElementById('downloadQrBtn');
  const qrcodeElement = document.getElementById('qrcode');

  let qrcode = null;

  // Alternar entre tipos de QR Code
  qrType.addEventListener('change', toggleInputs);
  
  function toggleInputs() {
    const type = qrType.value;
    
    textInput.style.display = type === 'text' ? 'block' : 'none';
    urlInput.style.display = type === 'url' ? 'block' : 'none';
    wifiInput.style.display = type === 'wifi' ? 'block' : 'none';
  }

  // Gerar QR Code
  generateQrBtn.addEventListener('click', generateQRCode);

  function generateQRCode() {
    const type = qrType.value;
    let qrData = '';
    
    // Validar e preparar os dados com base no tipo
    try {
      switch(type) {
        case 'text':
          qrData = qrText.value.trim();
          if (!qrData) {
            showNotification('Por favor, insira algum texto para gerar o QR Code.', 'error');
            return;
          }
          break;
          
        case 'url':
          qrData = qrUrl.value.trim();
          if (!qrData) {
            showNotification('Por favor, insira uma URL para gerar o QR Code.', 'error');
            return;
          }
          // Garantir que a URL tenha o protocolo http/https
          if (!qrData.startsWith('http://') && !qrData.startsWith('https://')) {
            qrData = 'https://' + qrData;
          }
          break;
          
        case 'wifi':
          const ssid = wifiName.value.trim();
          const password = wifiPassword.value;
          const encryption = wifiEncryption.value;
          
          if (!ssid) {
            showNotification('Por favor, informe o nome da rede WiFi.', 'error');
            return;
          }
          
          // Formatar dados WiFi no formato padrão
          qrData = `WIFI:S:${ssid};T:${encryption};P:${password};;`;
          break;
      }
      
      // Limpar QR Code anterior
      qrcodeElement.innerHTML = '';
      
      // Verificar se a biblioteca QRCode está carregada
      if (typeof QRCode === 'undefined') {
        showNotification('Erro: Biblioteca QRCode não carregada. Verifique sua conexão.', 'error');
        return;
      }
      
      // Criar nova instância do QRCode
      qrcode = new QRCode(qrcodeElement, {
        text: qrData,
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
      
      // Habilitar botão de download
      downloadQrBtn.disabled = false;
      showNotification('QR Code gerado com sucesso!', 'success');
      
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
      showNotification('Erro ao gerar QR Code. Tente novamente.', 'error');
    }
  }

  // Download do QR Code
  downloadQrBtn.addEventListener('click', downloadQRCode);

  function downloadQRCode() {
    try {
      const canvas = qrcodeElement.querySelector('canvas');
      if (!canvas) {
        showNotification('Nenhum QR Code para download.', 'error');
        return;
      }
      
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showNotification('Download iniciado!', 'success');
    } catch (error) {
      console.error('Erro ao fazer download:', error);
      showNotification('Erro ao fazer download. Tente novamente.', 'error');
    }
  }

  // Preencher automaticamente com URL padrão e gerar QR Code inicial
  function initialize() {
    toggleInputs();
    
    // Preencher URL padrão e gerar QR code inicial
    if (qrUrl.value) {
      setTimeout(() => {
        generateQRCode();
      }, 500);
    }
  }

  // Inicializar
  initialize();
});