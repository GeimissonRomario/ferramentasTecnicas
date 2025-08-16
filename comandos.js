// ====== Dados das opções (26 do seu .BAT) ======
const comandos = [
  { id: 1,  nome: "Limpeza de temporários", desc: "Remove arquivos temporários do usuário e do Windows.",
    cmd: `Remove-Item -Path "$env:TEMP\\*" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "C:\\Windows\\Temp\\*" -Recurse -Force -ErrorAction SilentlyContinue` },

  { id: 2,  nome: "Limpeza de disco (cleanmgr)", desc: "Abre a ferramenta de limpeza de disco.",
    cmd: `cleanmgr /sagerun:1` },

  { id: 3,  nome: "SFC / Scannow", desc: "Verifica e tenta reparar arquivos do sistema.",
    cmd: `sfc /scannow` },

  { id: 4,  nome: "DISM (Check/Scan/Restore)", desc: "Repara a imagem do Windows com DISM.",
    cmd: `DISM /Online /Cleanup-Image /CheckHealth
DISM /Online /Cleanup-Image /ScanHealth
DISM /Online /Cleanup-Image /RestoreHealth` },

  { id: 5,  nome: "Reset Windows Update", desc: "Reinicia serviços e renomeia pastas do Windows Update.",
    cmd: `Stop-Service -Name wuauserv,cryptSvc,bits,msiserver -Force
Rename-Item -Path "C:\\Windows\\SoftwareDistribution" -NewName "SoftwareDistribution.old" -ErrorAction SilentlyContinue
Rename-Item -Path "C:\\Windows\\System32\\catroot2" -NewName "catroot2.old" -ErrorAction SilentlyContinue
Start-Service -Name wuauserv,cryptSvc,bits,msiserver` },

  { id: 6,  nome: "Reset de rede", desc: "Limpa DNS, renova IP e reseta Winsock/TCP-IP.",
    cmd: `ipconfig /flushdns
ipconfig /release
ipconfig /renew
netsh winsock reset
netsh int ip reset` },

  { id: 7,  nome: "Atualizar GPO", desc: "Força atualização das políticas de grupo.",
    cmd: `gpupdate /force` },

  { id: 8,  nome: "Limpar logs de eventos", desc: "Limpa todos os logs com wevtutil (PowerShell).",
    cmd: `wevtutil el | ForEach-Object { wevtutil cl $_ }` },

  { id: 9,  nome: "Informações do sistema", desc: "Abre o msinfo32.",
    cmd: `Start-Process msinfo32` },

  { id:10,  nome: "Gerenciador de Dispositivos", desc: "Abre o Device Manager.",
    cmd: `Start-Process devmgmt.msc` },

  { id:11,  nome: "Adaptadores de rede", desc: "Abre as conexões de rede (ncpa.cpl).",
    cmd: `Start-Process ncpa.cpl` },

  { id:12,  nome: "Programas instalados", desc: "Abre Programas e Recursos (appwiz.cpl).",
    cmd: `Start-Process appwiz.cpl` },

  { id:13,  nome: "Processos em execução", desc: "Lista processos (equivalente ao tasklist).",
    cmd: `Get-Process` },

  { id:14,  nome: "Status de serviços", desc: "Verifica status de serviços principais.",
    cmd: `Get-Service -Name wuauserv,bits,dhcp,dnscache,nlasvc,netprofm | Select-Object Name,Status` },

  { id:15,  nome: "CHKDSK C: /f /r", desc: "Agenda verificação de disco (pode pedir reinício).",
    cmd: `chkdsk C: /f /r` },

  { id:16,  nome: "IPConfig /all", desc: "Mostra informações detalhadas de rede.",
    cmd: `ipconfig /all` },

  { id:17,  nome: "Instalar impressora / Driver", desc: "Abre a pasta de drivers no servidor.",
    cmd: `Start-Process "\\\\brprt001"` },

  { id:18,  nome: "Espaço em disco", desc: "Lista espaço livre/tamanho dos discos.",
    cmd: `Get-CimInstance Win32_LogicalDisk | Select-Object DeviceID, FreeSpace, Size` },

  { id:19,  nome: "Status do antivírus (Defender)", desc: "Mostra status do Windows Defender.",
    cmd: `Get-MpComputerStatus | Select AMServiceEnabled,AntivirusEnabled,RealTimeProtectionEnabled` },

  { id:20,  nome: "Ping Google", desc: "Testa conectividade com 4 pacotes.",
    cmd: `Test-Connection -ComputerName www.google.com -Count 4` },

  { id:21,  nome: "Backup de logs", desc: "Exporta os logs Application e System para C:\\BackupLogs.",
    cmd: `New-Item -ItemType Directory -Path "C:\\BackupLogs" -Force
wevtutil epl Application "C:\\BackupLogs\\Application.evtx"
wevtutil epl System "C:\\BackupLogs\\System.evtx"` },

  { id:22,  nome: "Dispositivos USB", desc: "Lista dispositivos USB conectados.",
    cmd: `Get-CimInstance Win32_PnPEntity | Where-Object { $_.Description -like 'USB*' } | Select-Object Name, Description` },

  { id:23,  nome: "Uso de memória/CPU", desc: "Abre o Gerenciador de Tarefas.",
    cmd: `Start-Process taskmgr` },
];

// ====== Sites Úteis ======
const sitesUteis = [
  { nome: "Teste de Velocidade", url: "https://www.speedtest.net/" },
  { nome: "Portal de Chamados", url: "https://portaldechamados.com.br/sign-in" },
  { nome: "Fast.com", url: "https://fast.com" },
  { nome: "WhatsApp Web", url: "https://web.whatsapp.com" },
  { nome: "Microsoft 365", url: "https://office.com" }
];

// ====== Elementos DOM ======
const menuEl = document.getElementById("menu");
const outputCard = document.getElementById("outputCard");
const outTitle = document.getElementById("outTitle");
const outDesc = document.getElementById("outDesc");
const codeWrap = document.getElementById("codeWrap");
const codeBlock = document.getElementById("codeBlock");
const copyBtnCmd = document.getElementById("copyBtnCmd");
const passwordOutput = document.getElementById("passwordOutput");
const passwordResult = document.getElementById("passwordResult");
const generateBtn = document.getElementById("generateBtn");
const sitesOutput = document.getElementById("sitesOutput");
const sitesList = document.getElementById("sitesList");
const note = document.getElementById("note");
const tabButtons = document.querySelectorAll(".tab-btn");

// ====== Inicialização ======
function init() {
  setupTabs();
  setupCommands();
  setupPasswordGenerator();
  showTab("comandos"); // Mostra a aba de comandos por padrão
}

// ====== Configuração das abas ======
function setupTabs() {
  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      tabButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      showTab(button.dataset.tab);
    });
  });
}

// ====== Mostrar aba selecionada ======
function showTab(tabName) {
  switch(tabName) {
    case "comandos":
      menuEl.hidden = false;
      codeWrap.hidden = false;
      passwordOutput.hidden = true;
      sitesOutput.hidden = true;
      note.hidden = false;
      outTitle.textContent = "Selecione uma opção";
      outDesc.textContent = "Aqui aparecerão a descrição e o comando correspondente.";
      break;
      
    case "senhas":
      menuEl.hidden = true;
      codeWrap.hidden = true;
      passwordOutput.hidden = false;
      sitesOutput.hidden = true;
      note.hidden = true;
      outTitle.textContent = "Gerador de Senhas Fortes";
      outDesc.textContent = "Clique no botão para gerar uma nova senha segura.";
      generatePassword();
      break;
      
    case "sites":
      menuEl.hidden = true;
      codeWrap.hidden = true;
      passwordOutput.hidden = true;
      sitesOutput.hidden = false;
      note.hidden = true;
      outTitle.textContent = "Sites Úteis";
      outDesc.textContent = "Clique em um site para abri-lo em uma nova aba.";
      setupSitesList();
      break;
  }
}

// ====== Configuração dos comandos ======
function setupCommands() {
  comandos.forEach(c => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.setAttribute("type","button");
    btn.innerHTML = `<strong>${c.id}. ${c.nome}</strong><small>${c.desc}</small>`;
    btn.addEventListener("click", () => mostrar(c));
    menuEl.appendChild(btn);
  });
}

// ====== Mostrar comando selecionado ======
function mostrar(item){
  outTitle.textContent = `Opção ${item.id} — ${item.nome}`;
  outDesc.textContent = item.desc;
  codeBlock.textContent = item.cmd;
  codeWrap.hidden = false;

  // Animação suave
  outputCard.classList.remove("fade");
  void outputCard.offsetWidth;
  outputCard.classList.add("fade");

  // Reseta texto do botão de copiar
  copyBtnCmd.classList.remove("copied");
  copyBtnCmd.textContent = "📋 Copiar";
}

// ====== Configuração do gerador de senhas ======
function setupPasswordGenerator() {
  generateBtn.addEventListener("click", generatePassword);
}

function generatePassword() {
  const length = 16;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  
  passwordResult.textContent = password;
}

// ====== Configuração da lista de sites ======
function setupSitesList() {
  sitesList.innerHTML = "";
  sitesUteis.forEach(site => {
    const button = document.createElement("button");
    button.className = "site-btn";
    button.textContent = site.nome;
    button.addEventListener("click", () => window.open(site.url, "_blank"));
    sitesList.appendChild(button);
  });
}

// ====== Copiar comando ======
copyBtnCmd.addEventListener("click", async () => {
  const code = codeBlock.textContent.trim();
  if(!code) return;
  try{
    await navigator.clipboard.writeText(code);
    copyBtnCmd.textContent = "✅ Copiado!";
    copyBtnCmd.classList.add("copied");
    setTimeout(() => {
      copyBtnCmd.textContent = "📋 Copiar";
      copyBtnCmd.classList.remove("copied");
    }, 1800);
  }catch(e){
    alert("Não foi possível copiar. Selecione e copie manualmente (Ctrl+C).");
  }
});

// ====== Inicializar aplicação ======
init();