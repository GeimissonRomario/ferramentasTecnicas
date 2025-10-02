// Sistema de notificações
function showNotification(message, type = 'success') {
  // Remover notificação existente
  const existingNotification = document.querySelector('.copy-notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Criar nova notificação
  const notification = document.createElement('div');
  notification.className = `copy-notification ${type}`;
  notification.textContent = message;
  
  // Adicionar ao documento
  document.body.appendChild(notification);

  requestAnimationFrame(() => notification.classList.add('show'));
  
  // Remover após 3 segundos
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 3000);
}

// Função para copiar texto com notificação
async function copyWithNotification(text, successMessage = 'Copiado para a área de transferência!') {
  try {
    await navigator.clipboard.writeText(text);
    showNotification(successMessage, 'success');
    return true;
  } catch (err) {
    showNotification('Falha ao copiar. Tente manualmente (Ctrl+C).', 'error');
    return false;
  }
}