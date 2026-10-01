/* ==========================================================================
   ANNANAHMED SHAIKH — PORTFOLIO RUNTIME ENGINE (FAIL-SAFE & HIGH PERFORMANCE)
   Features:
   1. Interactive VentureFlow AI Model Simulator
   2. 2D Neural Network Classifier (Live Backprop & Smooth Decision Boundary)
   3. Mobile Navigation Controller
   4. Smooth Anchor Tracking
   ========================================================================== */

// Guaranteed Initialization (runs even if DOMContentLoaded already fired)
function initApp() {
  try { initMobileNav(); } catch (e) { console.warn('Nav init:', e); }
  try { initVentureFlowSimulator(); } catch (e) { console.warn('Simulator init:', e); }
  try { initNeuralLab(); } catch (e) { console.warn('Neural lab init:', e); }
  try { initSmoothScroll(); } catch (e) { console.warn('Scroll init:', e); }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

/* --------------------------------------------------------------------------
   1. MOBILE NAVIGATION CONTROLLER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    const isOpen = menu.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  menu.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --------------------------------------------------------------------------
   2. VENTUREFLOW AI LIVE MODEL INFERENCE SIMULATOR
   -------------------------------------------------------------------------- */
function initVentureFlowSimulator() {
  const sectorSelect = document.getElementById('sectorSelect');
  const fundingRound = document.getElementById('fundingRound');
  const simProb = document.getElementById('simProb');
  const simBar = document.getElementById('simBar');
  const simShap = document.getElementById('simShap');

  if (!sectorSelect || !fundingRound || !simProb || !simBar || !simShap) return;

  const profiles = {
    'enterprise-seed': {
      prob: '64.2%',
      shap: [
        { text: '+0.18 MPNet Semantic Fit', pos: true },
        { text: '+0.11 Star-Schema Syndicate Index', pos: true },
        { text: '-0.14 Early Stage Burn Volatility', pos: false }
      ]
    },
    'enterprise-seriesA': {
      prob: '78.4%',
      shap: [
        { text: '+0.22 MPNet Text Vector', pos: true },
        { text: '+0.14 Investor Syndicate Score', pos: true },
        { text: '-0.05 Burn Multiple', pos: false }
      ]
    },
    'enterprise-seriesB': {
      prob: '89.1%',
      shap: [
        { text: '+0.29 Revenue Velocity Vector', pos: true },
        { text: '+0.19 Dual-Embedding Consensus', pos: true },
        { text: '+0.08 Tier-1 Lead Participation', pos: true }
      ]
    },
    'fintech-seed': {
      prob: '58.7%',
      shap: [
        { text: '+0.15 Regulatory Moat Vector', pos: true },
        { text: '-0.16 High Early CAC Penalty', pos: false },
        { text: '+0.09 Founder Repeat Track', pos: true }
      ]
    },
    'fintech-seriesA': {
      prob: '73.5%',
      shap: [
        { text: '+0.21 Transaction Volume Yield', pos: true },
        { text: '+0.16 MiniLM Syntactic Relevance', pos: true },
        { text: '-0.08 Compliance Overhead', pos: false }
      ]
    },
    'fintech-seriesB': {
      prob: '86.4%',
      shap: [
        { text: '+0.27 Star-Schema Unit Economics', pos: true },
        { text: '+0.18 Dual Embedding Centroid', pos: true },
        { text: '+0.12 Multi-Market Expansion Score', pos: true }
      ]
    },
    'health-seed': {
      prob: '61.3%',
      shap: [
        { text: '+0.24 Clinical Patent Embedding', pos: true },
        { text: '-0.19 Extended Trial Timeline', pos: false },
        { text: '+0.10 Academic IP Transfer', pos: true }
      ]
    },
    'health-seriesA': {
      prob: '76.8%',
      shap: [
        { text: '+0.25 Trial Milestone Clearance', pos: true },
        { text: '+0.15 MPNet Biosignal Patent Vector', pos: true },
        { text: '-0.09 Regulatory Review Delay', pos: false }
      ]
    },
    'health-seriesB': {
      prob: '91.2%',
      shap: [
        { text: '+0.31 FDA Clearance Pathway', pos: true },
        { text: '+0.21 Dual Embedding Domain Weight', pos: true },
        { text: '+0.14 Health Systems Pilot Retention', pos: true }
      ]
    },
    'climate-seed': {
      prob: '56.9%',
      shap: [
        { text: '+0.19 Clean Tech Grant Correlation', pos: true },
        { text: '-0.20 Hardware CapEx Hurdle', pos: false },
        { text: '+0.08 Municipal Pilot Agreement', pos: true }
      ]
    },
    'climate-seriesA': {
      prob: '72.1%',
      shap: [
        { text: '+0.22 Grid Interconnect Contract', pos: true },
        { text: '+0.17 MiniLM Energy Density Vector', pos: true },
        { text: '-0.11 Commodity Supply Volatility', pos: false }
      ]
    },
    'climate-seriesB': {
      prob: '84.6%',
      shap: [
        { text: '+0.28 Commercial Fleet Scale', pos: true },
        { text: '+0.19 Carbon Credit Yield Vector', pos: true },
        { text: '+0.11 Utility PPA Commitments', pos: true }
      ]
    }
  };

  function updateSimulation() {
    const key = `${sectorSelect.value}-${fundingRound.value}`;
    const data = profiles[key] || profiles['enterprise-seriesA'];

    simProb.textContent = data.prob;
    simBar.style.width = data.prob;

    simShap.innerHTML = data.shap.map(item => `
      <span class="shap-tag ${item.pos ? 'pos' : 'neg'}">${item.text}</span>
    `).join('');
  }

  sectorSelect.addEventListener('change', updateSimulation);
  fundingRound.addEventListener('change', updateSimulation);

  // Run on initial load so values are populated immediately
  updateSimulation();
}

/* --------------------------------------------------------------------------
   3. 2D NEURAL DECISION BOUNDARY LAB (SMOOTH & FAIL-SAFE)
   -------------------------------------------------------------------------- */
function initNeuralLab() {
  const canvas = document.getElementById('neuralCanvas');
  const btnClassA = document.getElementById('btnClassA');
  const btnClassB = document.getElementById('btnClassB');
  const btnTrain = document.getElementById('btnTrain');
  const btnReset = document.getElementById('btnReset');
  const epochCount = document.getElementById('epochCount');
  const lossCount = document.getElementById('lossCount');
  const hint = document.getElementById('canvasHint');

  if (!canvas || !btnClassA || !btnClassB || !btnTrain || !btnReset) return;

  const ctx = canvas.getContext('2d');
  let currentClass = 0; // 0 = Class A, 1 = Class B
  let points = [];
  let isTraining = false;
  let animFrameId = null;
  let epoch = 0;

  function initDefaultPoints() {
    points = [
      // Class A Cluster (Azure - Top/Left)
      { x: 0.28, y: 0.32, label: 0 },
      { x: 0.32, y: 0.40, label: 0 },
      { x: 0.22, y: 0.48, label: 0 },
      { x: 0.38, y: 0.28, label: 0 },
      { x: 0.35, y: 0.52, label: 0 },
      // Class B Cluster (Amber - Bottom/Right)
      { x: 0.68, y: 0.65, label: 1 },
      { x: 0.74, y: 0.58, label: 1 },
      { x: 0.62, y: 0.72, label: 1 },
      { x: 0.78, y: 0.68, label: 1 },
      { x: 0.70, y: 0.78, label: 1 }
    ];
  }
  initDefaultPoints();

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const w = Math.floor(rect.width || canvas.parentElement.clientWidth || 800);
    const h = Math.floor(rect.height || 420);
    canvas.width = Math.max(300, w);
    canvas.height = Math.max(250, h);
    renderScene();
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function initWeights() {
    const rand = () => (Math.random() - 0.5) * 1.5;
    return {
      w1: Array.from({ length: 6 }, () => [rand(), rand()]),
      b1: new Array(6).fill(0),
      w2: Array.from({ length: 6 }, () => rand()),
      b2: 0
    };
  }
  let net = initWeights();

  const sigmoid = z => {
    if (isNaN(z)) return 0.5;
    return 1 / (1 + Math.exp(-Math.max(-12, Math.min(12, z))));
  };
  const relu = z => Math.max(0, z);

  function forward(x, y) {
    const h = net.w1.map((w, i) => relu(w[0] * x + w[1] * y + net.b1[i]));
    let z = net.b2;
    for (let i = 0; i < 6; i++) z += net.w2[i] * h[i];
    return { h, out: sigmoid(z) };
  }

  function trainEpoch(lr = 0.22) {
    if (points.length === 0) return 0;
    let totalLoss = 0;

    for (let p of points) {
      const { h, out } = forward(p.x, p.y);
      const target = p.label;
      const eps = 1e-7;
      const clipped = Math.max(eps, Math.min(1 - eps, out));
      totalLoss += -(target * Math.log(clipped) + (1 - target) * Math.log(1 - clipped));

      const dOut = out - target;
      for (let i = 0; i < 6; i++) {
        net.w2[i] -= lr * dOut * h[i];
      }
      net.b2 -= lr * dOut;

      for (let i = 0; i < 6; i++) {
        const dH = dOut * net.w2[i] * (h[i] > 0 ? 1 : 0);
        net.w1[i][0] -= lr * dH * p.x;
        net.w1[i][1] -= lr * dH * p.y;
        net.b1[i] -= lr * dH;
      }
    }
    const avgLoss = totalLoss / points.length;
    return isNaN(avgLoss) ? 0.35 : avgLoss;
  }

  // Fast, optimal grid rendering (no freeze on Retina/4K screens)
  function renderScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Grid Heatmap
    const cols = 45;
    const rows = 22;
    const cellW = canvas.width / cols;
    const cellH = canvas.height / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const normX = (c + 0.5) / cols;
        const normY = (r + 0.5) / rows;
        const { out } = forward(normX, normY);

        const red = Math.round(56 + (245 - 56) * out);
        const green = Math.round(189 + (158 - 189) * out);
        const blue = Math.round(248 + (11 - 248) * out);
        const alpha = Math.abs(out - 0.5) * 0.32;

        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        ctx.fillRect(c * cellW, r * cellH, cellW + 1, cellH + 1);
      }
    }

    // 2. Subtle Coordinate Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // 3. Draw Training Points
    points.forEach(p => {
      const cx = p.x * canvas.width;
      const cy = p.y * canvas.height;
      const isClassA = p.label === 0;

      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = isClassA ? 'rgba(56, 189, 248, 0.22)' : 'rgba(245, 158, 11, 0.22)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = isClassA ? '#38bdf8' : '#f59e0b';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    if (points.length > 0 && hint) {
      hint.style.opacity = '0';
    } else if (hint) {
      hint.style.opacity = '1';
    }
  }

  // Interactive Point Placement
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = Math.max(0.02, Math.min(0.98, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0.02, Math.min(0.98, (e.clientY - rect.top) / rect.height));
    points.push({ x, y, label: currentClass });
    renderScene();
  });

  // Switch Active Class
  btnClassA.addEventListener('click', () => {
    currentClass = 0;
    btnClassA.classList.add('active');
    btnClassB.classList.remove('active');
  });

  btnClassB.addEventListener('click', () => {
    currentClass = 1;
    btnClassB.classList.add('active');
    btnClassA.classList.remove('active');
  });

  // Training Loop
  function runTrainingStep() {
    if (!isTraining) return;
    let loss = 0;
    for (let i = 0; i < 6; i++) {
      loss = trainEpoch(0.22);
      epoch++;
    }
    epochCount.textContent = `Epoch: ${epoch}`;
    lossCount.textContent = `Loss: ${loss.toFixed(4)}`;
    renderScene();
    animFrameId = requestAnimationFrame(runTrainingStep);
  }

  btnTrain.addEventListener('click', () => {
    if (isTraining) {
      isTraining = false;
      btnTrain.innerHTML = `
        <svg class="icon-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        <span>Train Network</span>
      `;
      if (animFrameId) cancelAnimationFrame(animFrameId);
    } else {
      isTraining = true;
      btnTrain.innerHTML = `
        <svg class="icon-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        <span>Pause Training</span>
      `;
      runTrainingStep();
    }
  });

  btnReset.addEventListener('click', () => {
    isTraining = false;
    if (animFrameId) cancelAnimationFrame(animFrameId);
    points = [];
    net = initWeights();
    epoch = 0;
    epochCount.textContent = 'Epoch: 0';
    lossCount.textContent = 'Loss: —';
    btnTrain.innerHTML = `
      <svg class="icon-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      <span>Train Network</span>
    `;
    renderScene();
  });

  renderScene();
}

/* --------------------------------------------------------------------------
   4. SMOOTH SCROLLING CONTROLLER
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
