const prompts = [
  {
    id: 1,
    nome: "Analisar log suspeito",
    desc: "Identifica padrões de ataque, anomalias e IPs suspeitos em logs brutos.",
    tip: "Use em logs de firewall, SIEM, IDS ou qualquer saída de sistema.",
    cmd: `Você é um analista de segurança sênior. Analise o log abaixo e responda:

1. Há evidências de ataque ou comportamento malicioso? Qual o tipo?
2. Quais IPs, usuários ou processos se destacam como suspeitos?
3. Existe padrão de tentativas repetidas (brute force, scan, exfiltração)?
4. Qual a severidade estimada (baixa / média / alta / crítica)?
5. Quais são os próximos passos recomendados?

LOG:
[cole o log aqui]`
  },
  {
    id: 2,
    nome: "Falso positivo ou ameaça real?",
    desc: "Avalia se um alerta de segurança é legítimo ou ruído do sistema.",
    tip: "Ideal para triagem de alertas de SIEM, EDR ou antivírus.",
    cmd: `Você é um analista de SOC. Avalie o alerta abaixo e determine:

1. Este alerta é um falso positivo ou uma ameaça real? Por quê?
2. Quais indicadores sustentam sua conclusão?
3. O comportamento descrito é típico de qual tipo de ataque ou ferramenta?
4. Recomenda escalar para investigação completa? Sim ou não, justifique.

ALERTA:
Ferramenta/sistema: [ex: CrowdStrike, Windows Defender, Wazuh]
Descrição: [cole a descrição do alerta]
Host afetado: [hostname ou IP]
Usuário: [nome do usuário]
Horário: [data e hora]`
  },
  {
    id: 3,
    nome: "Relatório de incidente",
    desc: "Gera um relatório estruturado de incidente de segurança.",
    tip: "Use após conter um incidente para documentar formalmente.",
    cmd: `Você é um analista de segurança. Com base nas informações abaixo, redija um relatório de incidente de segurança formal contendo:

- Resumo executivo (3 linhas para gestão não técnica)
- Linha do tempo do incidente
- Sistemas e dados afetados
- Causa raiz identificada
- Ações de contenção realizadas
- Lições aprendidas
- Recomendações para evitar recorrência

INFORMAÇÕES DO INCIDENTE:
Data/hora de detecção: [data]
Tipo de incidente: [ex: ransomware, phishing, acesso indevido]
Sistemas afetados: [lista]
Ações já realizadas: [descreva]
Impacto identificado: [descreva]`
  },
  {
    id: 4,
    nome: "Interpretar VirusTotal / AbuseIPDB",
    desc: "Explica em linguagem clara o resultado de uma análise de reputação.",
    tip: "Cole o JSON ou o texto do resultado diretamente no prompt.",
    cmd: `Você é um analista de threat intelligence. Interprete o resultado abaixo de forma clara:

1. Este [arquivo / URL / IP / domínio] é malicioso, suspeito ou seguro?
2. Quais engines ou fontes flagaram e por quê?
3. A que família de malware / campanha pertence, se identificável?
4. Quais IoCs (indicadores de comprometimento) foram identificados?
5. Recomenda bloquear, monitorar ou liberar? Justifique.

RESULTADO DA ANÁLISE:
Fonte: [VirusTotal / AbuseIPDB / URLScan / outro]
[cole o resultado aqui]`
  },
  {
    id: 5,
    nome: "Analisar e-mail de phishing",
    desc: "Avalia cabeçalho, remetente, links e corpo de e-mail suspeito.",
    tip: "Nunca clique nos links. Copie o cabeçalho via 'Mostrar original' no Gmail.",
    cmd: `Você é um especialista em análise de phishing. Analise o e-mail abaixo:

1. O remetente é legítimo? Há spoofing de domínio ou display name?
2. Os registros SPF, DKIM e DMARC passam ou falham?
3. Os links presentes são suspeitos? Para onde redirecionam?
4. Quais técnicas de engenharia social estão sendo usadas?
5. Classifique: phishing genérico, spear phishing, BEC ou smishing.
6. Recomendações: bloquear remetente, reportar, alertar usuários?

CABEÇALHO DO E-MAIL:
[cole o cabeçalho completo aqui]

CORPO DO E-MAIL:
[cole o conteúdo aqui]`
  },
  {
    id: 6,
    nome: "Explicar vulnerabilidade para gestão",
    desc: "Traduz um CVE ou vulnerabilidade técnica para linguagem executiva.",
    tip: "Útil para apresentações, e-mails de alerta ou reuniões de diretoria.",
    cmd: `Você é um analista de segurança comunicando um risco para gestores não técnicos. Explique a vulnerabilidade abaixo de forma clara e objetiva:

1. O que é essa vulnerabilidade? (máximo 3 linhas, sem jargão)
2. Como ela pode ser explorada? (cenário prático e simples)
3. Qual o impacto real para o negócio? (dados, operações, reputação)
4. Qual a probabilidade de ser explorada? (baixa / média / alta)
5. O que a empresa precisa fazer e em quanto tempo?

VULNERABILIDADE:
CVE ou nome: [ex: CVE-2024-XXXX / Log4Shell / PrintNightmare]
Sistemas afetados em nossa empresa: [descreva]
Status atual: [corrigido / em correção / não corrigido]`
  },
  {
    id: 7,
    nome: "Checklist de resposta a incidente",
    desc: "Gera checklist personalizado para resposta a um tipo específico de incidente.",
    tip: "Especifique bem o tipo de incidente para receber um checklist preciso.",
    cmd: `Você é um especialista em resposta a incidentes (IR). Crie um checklist detalhado e sequencial para responder ao incidente abaixo, cobrindo as fases:

1. Identificação e triagem
2. Contenção (curto e longo prazo)
3. Erradicação
4. Recuperação
5. Pós-incidente e lições aprendidas

Para cada item, indique: responsável sugerido, urgência (imediato / 1h / 24h) e ferramentas recomendadas.

TIPO DE INCIDENTE: [ex: ransomware / conta comprometida / vazamento de dados / DDoS]
AMBIENTE: [ex: Windows AD, Azure, AWS, híbrido]
TAMANHO DA EQUIPE DE TI: [ex: 3 pessoas]`
  },
  {
    id: 8,
    nome: "Analisar regra de firewall",
    desc: "Revisa regras de firewall em busca de brechas, excessos ou má configuração.",
    tip: "Cole as regras em texto, tabela ou formato de exportação do firewall.",
    cmd: `Você é um especialista em segurança de redes. Analise as regras de firewall abaixo:

1. Existe alguma regra excessivamente permissiva (ANY/ANY, portas desnecessárias abertas)?
2. Há regras que permitem tráfego de entrada da internet para serviços críticos sem MFA ou VPN?
3. As regras de saída (egress) estão adequadas? Há risco de exfiltração?
4. A ordem das regras está correta (mais específicas antes das genéricas)?
5. Liste as 3 principais melhorias recomendadas com justificativa.

REGRAS DO FIREWALL:
Dispositivo/Fabricante: [ex: Fortinet, pfSense, Cisco ASA, AWS Security Group]
[cole as regras aqui]`
  },
  {
    id: 9,
    nome: "Revisar script PowerShell suspeito",
    desc: "Analisa script PS para identificar comportamento malicioso ou ofuscação.",
    tip: "Nunca execute o script. Analise apenas em ambiente isolado ou via IA.",
    cmd: `Você é um analista de malware especializado em PowerShell. Analise o script abaixo:

1. O script possui técnicas de ofuscação? Quais? (base64, char(), concatenação, etc.)
2. Quais ações ele realiza? (download, execução, persistência, movimentação lateral, exfiltração)
3. Há IOCs identificáveis? (URLs, IPs, hashes, nomes de arquivo, chaves de registro)
4. A que família de malware ou ferramenta ofensiva se assemelha? (Mimikatz, Cobalt Strike, etc.)
5. Classifique o risco: baixo / médio / alto / crítico.
6. Recomendações de contenção imediata.

SCRIPT:
[cole o script PowerShell aqui]`
  },
  {
    id: 10,
    nome: "Comunicado de vazamento de dados",
    desc: "Redigir notificação oficial de incidente de dados para usuários ou ANPD.",
    tip: "Adequado para notificações à ANPD (LGPD) e comunicados a titulares.",
    cmd: `Você é um especialista em privacidade e conformidade (LGPD/GDPR). Redija um comunicado formal de vazamento de dados com base nas informações abaixo, incluindo:

- Notificação aos titulares afetados (linguagem clara e empática)
- Notificação à ANPD (formato técnico e legal conforme LGPD)
- Comunicado interno para colaboradores

Cada documento deve conter: o que aconteceu, quais dados foram afetados, riscos para os titulares, medidas já adotadas e próximos passos.

INFORMAÇÕES DO INCIDENTE:
Data do incidente: [data]
Data da descoberta: [data]
Tipo de dados expostos: [ex: CPF, e-mail, senhas, dados bancários]
Número estimado de titulares afetados: [quantidade]
Causa do incidente: [ex: ataque externo, erro interno, terceiro]
Medidas já adotadas: [descreva]`
  }
];

// ====== Ícones SVG ======
const IC_COPY  = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:5px"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
const IC_CHECK = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:5px"><path d="M20 6 9 17l-5-5"/></svg>';

// ====== Elementos DOM ======
const menuEl       = document.getElementById("menu");
const outputCard   = document.getElementById("outputCard");
const outTitle     = document.getElementById("outTitle");
const outDesc      = document.getElementById("outDesc");
const promptTip    = document.getElementById("promptTip");
const codeWrap     = document.getElementById("codeWrap");
const codeBlock    = document.getElementById("codeBlock");
const copyBtnCmd   = document.getElementById("copyBtnCmd");
const searchInput  = document.getElementById("searchInput");
const clearSearch  = document.getElementById("clearSearch");
const searchCounter = document.getElementById("searchCounter");
const noteDefault  = document.getElementById("noteDefault");

let filtered = [...prompts];

function init() {
  renderMenu();
  setupSearch();
  setupCopy();
}

function renderMenu() {
  menuEl.innerHTML = "";

  const total = prompts.length;
  searchCounter.textContent = searchInput.value.trim()
    ? `${filtered.length} de ${total} prompts`
    : `${total} prompts`;

  if (filtered.length === 0) {
    menuEl.innerHTML = `
      <div class="no-results">
        <p>Nenhum prompt encontrado para "${searchInput.value}"</p>
        <small>Tente usar termos diferentes</small>
      </div>`;
    return;
  }

  filtered.forEach(p => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.setAttribute("type", "button");
    btn.innerHTML = `<strong>${p.id}. ${p.nome}</strong><small>${p.desc}</small>`;
    btn.addEventListener("click", () => mostrar(p));
    menuEl.appendChild(btn);
  });
}

function mostrar(item) {
  outTitle.textContent = `${item.id}. ${item.nome}`;
  outDesc.textContent = item.desc;
  promptTip.textContent = item.tip ? `💡 ${item.tip}` : "";
  codeBlock.textContent = item.cmd;
  codeWrap.hidden = false;
  noteDefault.hidden = true;

  outputCard.classList.remove("fade");
  void outputCard.offsetWidth;
  outputCard.classList.add("fade");

  copyBtnCmd.innerHTML = IC_COPY + "Copiar prompt";
  copyBtnCmd.classList.remove("copied");
}

function setupSearch() {
  searchInput.addEventListener("input", () => {
    const termo = searchInput.value.toLowerCase().trim();
    filtered = termo
      ? prompts.filter(p =>
          p.nome.toLowerCase().includes(termo) ||
          p.desc.toLowerCase().includes(termo) ||
          p.cmd.toLowerCase().includes(termo)
        )
      : [...prompts];
    clearSearch.style.display = termo ? "block" : "none";
    renderMenu();
  });

  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    filtered = [...prompts];
    clearSearch.style.display = "none";
    renderMenu();
  });

  clearSearch.style.display = "none";
}

function setupCopy() {
  copyBtnCmd.addEventListener("click", async () => {
    const text = codeBlock.textContent.trim();
    if (!text) return;
    const ok = await copyWithNotification(text, "Prompt copiado! Cole na IA e ajuste os campos entre [colchetes].");
    if (ok) {
      copyBtnCmd.innerHTML = IC_CHECK + "Copiado!";
      copyBtnCmd.classList.add("copied");
      setTimeout(() => {
        copyBtnCmd.innerHTML = IC_COPY + "Copiar prompt";
        copyBtnCmd.classList.remove("copied");
      }, 2000);
    }
  });
}

init();
