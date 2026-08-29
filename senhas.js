document.addEventListener('DOMContentLoaded', function() {
  const lengthRange       = document.getElementById('lengthRange');
  const lengthValue       = document.getElementById('lengthValue');
  const uppercase         = document.getElementById('uppercase');
  const lowercase         = document.getElementById('lowercase');
  const numbers           = document.getElementById('numbers');
  const symbols           = document.getElementById('symbols');
  const excludeAmbiguous  = document.getElementById('excludeAmbiguous');
  const generateBtn       = document.getElementById('generateBtn');
  const passwordResult    = document.getElementById('passwordResult');
  const passwordStrength  = document.getElementById('passwordStrength');
  const copyPasswordBtn   = document.getElementById('copyPasswordBtn');

  const AMBIGUOUS = /[0Ol1I]/g;

  lengthRange.addEventListener('input', function() {
    lengthValue.textContent = this.value;
  });

  generateBtn.addEventListener('click', generatePassword);
  generatePassword();

  function generatePassword() {
    const length    = parseInt(lengthRange.value);
    const hasUpper  = uppercase.checked;
    const hasLower  = lowercase.checked;
    const hasNumber = numbers.checked;
    const hasSymbol = symbols.checked;
    const noAmbig   = excludeAmbiguous.checked;

    if (!hasUpper && !hasLower && !hasNumber && !hasSymbol) {
      passwordResult.textContent = 'Selecione pelo menos um tipo';
      passwordStrength.textContent = '';
      copyPasswordBtn.disabled = true;
      return;
    }

    let charset = '';
    if (hasUpper)  charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (hasLower)  charset += 'abcdefghijklmnopqrstuvwxyz';
    if (hasNumber) charset += '0123456789';
    if (hasSymbol) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (noAmbig) charset = charset.replace(AMBIGUOUS, '');

    if (!charset) {
      passwordResult.textContent = 'Nenhum caractere disponível com essas opções';
      passwordStrength.textContent = '';
      copyPasswordBtn.disabled = true;
      return;
    }

    // usa crypto.getRandomValues — criptograficamente seguro
    const array    = new Uint32Array(length);
    crypto.getRandomValues(array);
    const password = Array.from(array)
      .map(n => charset[n % charset.length])
      .join('');

    passwordResult.textContent = password;
    copyPasswordBtn.disabled = false;
    renderStrength(password, charset.length);
  }

  function renderStrength(password, charsetSize) {
    const entropy = password.length * Math.log2(charsetSize);
    let label, cls;
    if (entropy < 40)       { label = '🔴 Fraca';          cls = 'strength-weak'; }
    else if (entropy < 60)  { label = '🟡 Moderada';       cls = 'strength-fair'; }
    else if (entropy < 80)  { label = '🟢 Forte';          cls = 'strength-good'; }
    else                    { label = '🟢 Muito forte';    cls = 'strength-great'; }

    passwordStrength.textContent = `Força: ${label}  (${Math.round(entropy)} bits de entropia)`;
    passwordStrength.className = 'password-strength ' + cls;
  }

  copyPasswordBtn.addEventListener('click', function() {
    const password = passwordResult.textContent;
    if (!password || password === 'Selecione pelo menos um tipo') return;

    const IC_COPY  = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;margin-right:6px"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
  const IC_CHECK = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;margin-right:6px"><path d="M20 6 9 17l-5-5"/></svg>';

  copyWithNotification(password, "Senha copiada para a área de transferência!")
      .then(success => {
        if (success) {
          copyPasswordBtn.innerHTML = IC_CHECK + 'Copiado!';
          setTimeout(() => {
            copyPasswordBtn.innerHTML = IC_COPY + 'Copiar Senha';
          }, 2000);
        }
      });
  });
});
