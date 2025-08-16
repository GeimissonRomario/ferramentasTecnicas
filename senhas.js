document.addEventListener('DOMContentLoaded', function() {
  const lengthRange = document.getElementById('lengthRange');
  const lengthValue = document.getElementById('lengthValue');
  const uppercase = document.getElementById('uppercase');
  const lowercase = document.getElementById('lowercase');
  const numbers = document.getElementById('numbers');
  const symbols = document.getElementById('symbols');
  const generateBtn = document.getElementById('generateBtn');
  const passwordResult = document.getElementById('passwordResult');
  const copyPasswordBtn = document.getElementById('copyPasswordBtn');

  // Atualiza o valor exibido do range
  lengthRange.addEventListener('input', function() {
    lengthValue.textContent = this.value;
  });

  // Gera senha quando clicar no botão
  generateBtn.addEventListener('click', generatePassword);

  // Gera senha inicial
  generatePassword();

  function generatePassword() {
    const length = parseInt(lengthRange.value);
    const hasUpper = uppercase.checked;
    const hasLower = lowercase.checked;
    const hasNumber = numbers.checked;
    const hasSymbol = symbols.checked;

    // Verifica se pelo menos um tipo foi selecionado
    if (!hasUpper && !hasLower && !hasNumber && !hasSymbol) {
      passwordResult.textContent = 'Selecione pelo menos um tipo';
      copyPasswordBtn.disabled = true;
      return;
    }

    let charset = '';
    if (hasUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (hasLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (hasNumber) charset += '0123456789';
    if (hasSymbol) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    passwordResult.textContent = password;
    copyPasswordBtn.disabled = false;
  }

  // Copiar senha
  copyPasswordBtn.addEventListener('click', function() {
    const password = passwordResult.textContent;
    if (!password || password === 'Selecione pelo menos um tipo') return;

    navigator.clipboard.writeText(password).then(() => {
      copyPasswordBtn.textContent = '✅ Copiado!';
      setTimeout(() => {
        copyPasswordBtn.textContent = '📋 Copiar Senha';
      }, 2000);
    });
  });
});