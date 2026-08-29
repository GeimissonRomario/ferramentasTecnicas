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

    copyWithNotification(password, "Senha copiada para a área de transferência!")
      .then(success => {
        if (success) {
          copyPasswordBtn.textContent = '✅ Copiado!';
          setTimeout(() => {
            copyPasswordBtn.textContent = '📋 Copiar Senha';
          }, 2000);
        }
      });
  });
});
