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

// ====== Elementos DOM ======
const menuEl = document.getElementById("menu");
const outputCard = document.getElementById("outputCard");
const outTitle = document.getElementById("outTitle");
const outDesc = document.getElementById("outDesc");
const codeWrap = document.getElementById("codeWrap");
const codeBlock = document.getElementById("codeBlock");
const copyBtnCmd = document.getElementById("copyBtnCmd");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");

// ====== Variáveis de estado ======
let filteredComandos = [...comandos];

// ====== Inicialização ======
function init() {
  setupCommands();
  setupSearch();
  setupCopyButton();
}

// ====== Configuração dos comandos ======
function setupCommands() {
  renderComandos();
}

// ====== Configuração da busca ======
function setupSearch() {
  searchInput.addEventListener("input", filterComandos);
  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    filterComandos();
    clearSearch.style.display = "none";
  });
  
  // Esconder o botão de limpar inicialmente
  clearSearch.style.display = "none";
}

// ====== Filtrar comandos ======
function filterComandos() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  
  if (searchTerm === "") {
    filteredComandos = [...comandos];
    clearSearch.style.display = "none";
  } else {
    filteredComandos = comandos.filter(c => 
      c.nome.toLowerCase().includes(searchTerm) || 
      c.desc.toLowerCase().includes(searchTerm) ||
      c.cmd.toLowerCase().includes(searchTerm)
    );
    clearSearch.style.display = "block";
  }
  
  renderComandos();
}

// ====== Renderizar comandos ======
function renderComandos() {
  menuEl.innerHTML = "";
  
  if (filteredComandos.length === 0) {
    menuEl.innerHTML = `
      <div class="no-results">
        <p>Nenhum comando encontrado para "${searchInput.value}"</p>
        <small>Tente usar termos diferentes ou menos específicos</small>
      </div>
    `;
    return;
  }
  
  filteredComandos.forEach(c => {
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

// ====== Configuração do botão de copiar ======
function setupCopyButton() {
  copyBtnCmd.addEventListener("click", async () => {
    const code = codeBlock.textContent.trim();
    if(!code) return;
    
    // Usar o sistema de notificações melhorado
    const success = await copyWithNotification(code, "Comando copiado para a área de transferência!");
    
    if (success) {
      copyBtnCmd.textContent = "✅ Copiado!";
      copyBtnCmd.classList.add("copied");
      setTimeout(() => {
        copyBtnCmd.textContent = "📋 Copiar";
        copyBtnCmd.classList.remove("copied");
      }, 1800);
    }
  });
}

// ====== Inicializar aplicação ======
init();