const personas = [
  {
    id: "cto",
    name: "CTO",
    emoji: "🧠",
    focus: "Reliability architecture fit long term strategy",
    intro: "Focused on reliability architectural fit and long term technology strategy for SkyShop on Azure",
    metrics: [
      { label: "Availability", value: "99.98%", desc: "Multi region Front Door plus regional App Service with health probes" },
      { label: "Latency", value: "Under 100 ms", desc: "Closest region routing for web and API via Azure Front Door" },
      { label: "Modernisation", value: "Hybrid", desc: "App Service for core Functions for async workloads Static Web Apps for assets" }
    ],
    talkTrack: [
      "Start from users and explain why Front Door is the single global entry point",
      "Describe how the app tier separates synchronous traffic from asynchronous jobs",
      "Show how observability closes the loop with Monitor and Log Analytics feeding into SLO reviews"
    ],
    certs: [
      { label: "AZ 305 Azure Architect", emphasis: true },
      { label: "AWS Solutions Architect", emphasis: false },
      { label: "AZ 900 Azure Fundamentals", emphasis: false }
    ],
    highlight: [
      "nodeUsers","nodeFrontDoor","nodeAppService","nodeFunctions","nodeStaticWeb","nodeSql","nodeCosmos","nodeStorage","nodeMonitor",
      "lineUsersFrontDoor","lineFrontDoorAppService","lineFrontDoorFunctions","lineFrontDoorStatic","lineAppSql","lineFunctionsCosmos","lineStaticStorage","lineSqlMonitor","lineCosmosMonitor","lineStorageMonitor"
    ]
  },
  {
    id: "cfo",
    name: "CFO",
    emoji: "💸",
    focus: "Cost optimisation ROI predictable spend",
    intro: "Cares about cost predictability return on investment and where Azure saves money for SkyShop",
    metrics: [
      { label: "Infra savings", value: "18 percent lower", desc: "Reserved capacity for steady App Service load plus autoscale for peaks" },
      { label: "Serverless utilisation", value: "32M exec per day", desc: "Functions used for spikes instead of over provisioned VMs" },
      { label: "Storage optimisation", value: "22 percent lower", desc: "Tiered storage between hot and cool data" }
    ],
    talkTrack: [
      "Lead with how the design separates steady workloads from bursty ones to avoid paying for idle capacity",
      "Explain how Functions and Storage provide flexibility without locking into fixed VM sizes",
      "Show how observability is used to continuously right size and remove underused resources"
    ],
    certs: [
      { label: "FinOps Certified Practitioner", emphasis: true },
      { label: "AZ 305 Azure Architect", emphasis: false },
      { label: "Prosci Change Management", emphasis: false }
    ],
    highlight: [
      "nodeFrontDoor","nodeAppService","nodeFunctions","nodeStaticWeb","nodeSql","nodeCosmos","nodeStorage","nodeMonitor",
      "lineFrontDoorAppService","lineFrontDoorFunctions","lineFrontDoorStatic","lineAppSql","lineFunctionsCosmos","lineStaticStorage","lineSqlMonitor","lineCosmosMonitor","lineStorageMonitor"
    ]
  },
  {
    id: "ciso",
    name: "Security Officer",
    emoji: "🛡️",
    focus: "Zero trust compliance attack surface",
    intro: "Responsible for security posture compliance and reducing the attack surface without blocking delivery",
    metrics: [
      { label: "Edge protection", value: "WAF and DDoS", desc: "Front Door plus WAF policies with rate limiting and geo controls" },
      { label: "Identity and secrets", value: "Centralised", desc: "Managed identities and Key Vault used across App Service and Functions" },
      { label: "Security monitoring", value: "Unified", desc: "Logs streamed into Sentinel via Monitor and Log Analytics" }
    ],
    talkTrack: [
      "Highlight Front Door as the single controllable edge with WAF and DDoS protection",
      "Explain how identities and secrets are handled centrally rather than spread across apps",
      "Show how logs from data services and the app tier flow into Monitor and Sentinel for correlation"
    ],
    certs: [
      { label: "SC 200 Security Operations", emphasis: true },
      { label: "AZ 500 Azure Security Engineer", emphasis: true },
      { label: "Security Plus", emphasis: false }
    ],
    highlight: [
      "nodeFrontDoor","nodeAppService","nodeFunctions","nodeStaticWeb","nodeSql","nodeCosmos","nodeStorage","nodeMonitor",
      "lineUsersFrontDoor","lineFrontDoorAppService","lineFrontDoorFunctions","lineFrontDoorStatic","lineSqlMonitor","lineCosmosMonitor","lineStorageMonitor"
    ]
  },
  {
    id: "product",
    name: "Product Lead",
    emoji: "📈",
    focus: "Customer experience time to market experimentation",
    intro: "Wants fast iteration resilience under traffic spikes and freedom to experiment with new features",
    metrics: [
      { label: "Feature rollout", value: "Under 1 week", desc: "Decoupled services CI CD to App Service Functions for experiments" },
      { label: "Traffic spikes", value: "4x handled", desc: "Autoscale rules on App Service and Functions for promotions" },
      { label: "Experience", value: "Under 200 ms", desc: "Static assets via Static Web Apps close to users" }
    ],
    talkTrack: [
      "Connect Front Door routing and Static Web Apps to global low latency experiences",
      "Describe how Functions are used for experiment features with minimal risk to the core app",
      "Show how logging and metrics allow the team to observe release impact quickly"
    ],
    certs: [
      { label: "AZ 400 Azure DevOps", emphasis: true },
      { label: "Product analytics A B testing", emphasis: false },
      { label: "Prosci Change Management", emphasis: false }
    ],
    highlight: [
      "nodeUsers","nodeFrontDoor","nodeAppService","nodeFunctions","nodeStaticWeb","nodeMonitor",
      "lineUsersFrontDoor","lineFrontDoorAppService","lineFrontDoorFunctions","lineFrontDoorStatic","lineSqlMonitor","lineCosmosMonitor","lineStorageMonitor"
    ]
  }
];

const stakeholderList = document.getElementById("stakeholderList");
const personaTitle = document.getElementById("personaTitle");
const personaIntro = document.getElementById("personaIntro");
const metricsPanel = document.getElementById("metricsPanel");
const talkTrackList = document.getElementById("talkTrackList");
const certBadges = document.getElementById("certBadges");

const nodeIds = ["nodeUsers","nodeFrontDoor","nodeAppService","nodeFunctions","nodeStaticWeb","nodeSql","nodeCosmos","nodeStorage","nodeMonitor"];
const lineIds = ["lineUsersFrontDoor","lineFrontDoorAppService","lineFrontDoorFunctions","lineFrontDoorStatic","lineAppSql","lineFunctionsCosmos","lineStaticStorage","lineSqlMonitor","lineCosmosMonitor","lineStorageMonitor"];

const nodeElements = nodeIds.reduce((a,id)=>{ a[id]=document.getElementById(id); return a; }, {});
const lineElements = lineIds.reduce((a,id)=>{ a[id]=document.getElementById(id); return a; }, {});

function clearHighlights() {
  Object.values(nodeElements).forEach(el => el && el.classList.remove("highlight"));
  Object.values(lineElements).forEach(el => el && el.classList.remove("highlight"));
}

function applyPersona(p) {
  personaTitle.textContent = `Persona ${p.name}`;
  personaIntro.textContent = p.intro;

  metricsPanel.innerHTML = "";
  p.metrics.forEach(m => {
    const div = document.createElement("div");
    div.className = "metric-card";
    div.innerHTML = `
      <div>
        <div class="metric-label">${m.label}</div>
        <div class="metric-desc">${m.desc}</div>
      </div>
      <div class="metric-value">${m.value}</div>
    `;
    metricsPanel.appendChild(div);
  });

  talkTrackList.innerHTML = "";
  p.talkTrack.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    talkTrackList.appendChild(li);
  });

  certBadges.innerHTML = "";
  p.certs.forEach(c => {
    const span = document.createElement("span");
    span.className = "cert-badge" + (c.emphasis ? " emphasis" : "");
    span.textContent = c.label;
    certBadges.appendChild(span);
  });

  clearHighlights();
  p.highlight.forEach(id => {
    if (nodeElements[id]) nodeElements[id].classList.add("highlight");
    if (lineElements[id]) lineElements[id].classList.add("highlight");
  });
}

function buildStakeholderCards() {
  personas.forEach((p, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "stakeholder-card" + (idx === 0 ? " active" : "");
    btn.innerHTML = `
      <div class="stakeholder-icon">${p.emoji}</div>
      <div class="stakeholder-body">
        <div class="stakeholder-name">${p.name}</div>
        <div class="stakeholder-focus">${p.focus}</div>
      </div>
    `;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".stakeholder-card").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      applyPersona(p);
    });
    stakeholderList.appendChild(btn);
  });
}

buildStakeholderCards();
applyPersona(personas[0]);
