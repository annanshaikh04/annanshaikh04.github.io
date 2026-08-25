/* ============================================
   ANNANAHMED SHAIKH — PORTFOLIO INTERACTIVITY
   Includes:
   - Dynamic Persona / Lens Filter
   - Solutions ROI & Pipeline Estimator
   - Interactive Terminal (CLI)
   - Real-time Neural Network Classifier
   - Particle Canvas & Smooth Scroll
   - Copy-to-Clipboard Toast
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initTypingEffect();
  initNavbar();
  initScrollReveal();
  initPersonaSwitcher();
  initRoiCalculator();
  initLabTabs();
  initPlayground();
  initTerminal();
  initCopyChips();
  initSmoothScroll();
});

/* ---------- 1. Dynamic Persona / Lens Switcher ---------- */
const personaData = {
  all: {
    phrases: [
      'Solutions Engineer & AI Specialist',
      'Technical Pre-Sales Consultant',
      'MS Data Science (4.0 GPA) · Interspeech Author',
      'Translating Deep AI into Enterprise Value',
    ],
    pitch: 'MS in Data Science <strong>(4.0 GPA)</strong> from Wentworth. <strong>Industry Showcase Award Winner</strong> & published researcher at <strong>Interspeech 2026</strong>. I bridge the gap between high-level client business objectives and deep AI architecture — building high-impact POCs, translating technical complexities for executive buyers, and deploying systems that scale.'
  },
  solutions: {
    phrases: [
      'Solutions Engineer & Pre-Sales Consultant',
      'Client Discovery & POC Architecture',
      'Technical Strategy & Executive Demos',
      'Translating Complex Tech to Measurable ROI'
    ],
    pitch: 'Specialized in <strong>Pre-Sales Engineering & Solution Consulting</strong> for AI-driven SaaS, Cloud Data Platforms, and Predictive Systems. Proven track record driving <strong>88% workflow automation</strong>, scoping enterprise POCs (Amazon collaboration), and translating complex models into closed deals and measurable client ROI.'
  },
  technical: {
    phrases: [
      'AI/ML Systems Specialist',
      'Published Researcher @ Interspeech 2026',
      'Deep Learning & Transformer Architectures',
      'Star Schema ETL & High-Throughput Pipelines'
    ],
    pitch: 'MS in Data Science <strong>(4.0 GPA)</strong>. Co-authored peer-reviewed research accepted at <strong>INTERSPEECH 2026</strong> on multi-terabyte biosignal sequence modeling. Architect of novel backward-attention mechanisms for GPT-2, LLM embedding pipelines, and production star-schema warehouses.'
  }
};

let currentPersona = 'all';

function initPersonaSwitcher() {
  const tabs = document.querySelectorAll('.persona-tab');
  const heroPitch = document.getElementById('heroPitchText');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-target');
      currentPersona = target;
      document.body.setAttribute('data-persona', target);

      // Update Pitch
      if (heroPitch && personaData[target]) {
        heroPitch.innerHTML = personaData[target].pitch;
      }

      // Filter projects & timeline items
      filterCardsByPersona(target);

      // Restart typing effect with new phrases
      restartTyping();
    });
  });
}

function filterCardsByPersona(persona) {
  const filterableItems = document.querySelectorAll('[data-category]');
  filterableItems.forEach(item => {
    const cats = item.getAttribute('data-category').split(' ');
    if (persona === 'all' || cats.includes(persona)) {
      item.style.display = '';
      item.style.opacity = '1';
    } else {
      item.style.display = 'none';
      item.style.opacity = '0';
    }
  });
}

/* ---------- 2. Typing Effect ---------- */
let typingTimeout = null;
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 50;

function initTypingEffect() {
  typeLoop();
}

function restartTyping() {
  if (typingTimeout) clearTimeout(typingTimeout);
  phraseIndex = 0;
  charIndex = 0;
  isDeleting = false;
  const element = document.getElementById('typed-text');
  if (element) element.textContent = '';
  typeLoop();
}

function typeLoop() {
  const element = document.getElementById('typed-text');
  if (!element) return;

  const currentPhrases = personaData[currentPersona].phrases;
  const currentPhrase = currentPhrases[phraseIndex % currentPhrases.length];

  if (isDeleting) {
    element.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 25;
  } else {
    element.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 50;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    typingSpeed = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % currentPhrases.length;
    typingSpeed = 350;
  }

  typingTimeout = setTimeout(typeLoop, typingSpeed);
}

/* ---------- 3. Interactive Solutions ROI Calculator ---------- */
function initRoiCalculator() {
  const volSlider = document.getElementById('volSlider');
  const hoursSlider = document.getElementById('hoursSlider');
  const rateSlider = document.getElementById('rateSlider');

  const volDisplay = document.getElementById('volDisplay');
  const hoursDisplay = document.getElementById('hoursDisplay');
  const rateDisplay = document.getElementById('rateDisplay');

  const annualSavingsEl = document.getElementById('annualSavings');
  const hoursSavedEl = document.getElementById('hoursSaved');
  const paybackEl = document.getElementById('paybackPeriod');

  if (!volSlider || !hoursSlider || !rateSlider) return;

  function updateRoi() {
    const vol = parseInt(volSlider.value, 10);
    const hoursPerWeek = parseInt(hoursSlider.value, 10);
    const hourlyRate = parseInt(rateSlider.value, 10);

    volDisplay.textContent = `${vol.toLocaleString()} tx/day`;
    hoursDisplay.textContent = `${hoursPerWeek} hrs/wk`;
    rateDisplay.textContent = `$${hourlyRate} / hr`;

    // Benchmark based on Annan's 88% reduction in manual effort:
    const annualHours = hoursPerWeek * 52;
    const hoursSaved = Math.round(annualHours * 0.88);
    const dollarSavings = Math.round(hoursSaved * hourlyRate);

    // Payback calculation (assuming typical $20K POC implementation fee)
    const monthlySavings = dollarSavings / 12;
    const paybackMonths = monthlySavings > 0 ? (20000 / monthlySavings).toFixed(1) : '—';

    annualSavingsEl.textContent = `$${dollarSavings.toLocaleString()}`;
    hoursSavedEl.textContent = `${hoursSaved.toLocaleString()} hrs`;
    paybackEl.textContent = paybackMonths < 1 ? '< 1 Month' : `${paybackMonths} Months`;
  }

  volSlider.addEventListener('input', updateRoi);
  hoursSlider.addEventListener('input', updateRoi);
  rateSlider.addEventListener('input', updateRoi);

  updateRoi();
}

/* ---------- 4. Interactive Lab Tabs ---------- */
function initLabTabs() {
  const tabRoi = document.getElementById('tabRoiBtn');
  const tabNN = document.getElementById('tabNNBtn');
  const roiPane = document.getElementById('roiPane');
  const nnPane = document.getElementById('nnPane');

  if (!tabRoi || !tabNN) return;

  tabRoi.addEventListener('click', () => {
    tabRoi.classList.add('active');
    tabNN.classList.remove('active');
    roiPane.classList.add('active');
    nnPane.classList.remove('active');
  });

  tabNN.addEventListener('click', () => {
    tabNN.classList.add('active');
    tabRoi.classList.remove('active');
    nnPane.classList.add('active');
    roiPane.classList.remove('active');
    window.dispatchEvent(new Event('resize'));
  });
}

/* ---------- 5. Interactive Terminal (CLI) ---------- */
function initTerminal() {
  const modal = document.getElementById('terminalModal');
  const openBtn = document.getElementById('terminalToggleBtn');
  const closeBtn = document.getElementById('closeTerminal');
  const input = document.getElementById('terminalInput');
  const output = document.getElementById('terminalOutput');
  const quickChips = document.querySelectorAll('.t-chip');

  if (!modal || !input || !output) return;

  const openTerminal = () => {
    modal.classList.add('open');
    input.focus();
  };

  const closeTerminal = () => {
    modal.classList.remove('open');
  };

  if (openBtn) openBtn.addEventListener('click', openTerminal);
  if (closeBtn) closeBtn.addEventListener('click', closeTerminal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeTerminal();
  });

  // Global Shortcut: Ctrl + ` or Cmd + K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === '`' || e.key === 'k')) {
      e.preventDefault();
      if (modal.classList.contains('open')) closeTerminal();
      else openTerminal();
    }
  });

  const commands = {
    help: () => `
      <div class="t-line">Available commands:</div>
      <div class="t-line">  <span class="t-highlight">roles</span>        - View target career roles</div>
      <div class="t-line">  <span class="t-highlight">metrics</span>      - Key career & project performance benchmarks</div>
      <div class="t-line">  <span class="t-highlight">experience</span>   - Summary of professional positions</div>
      <div class="t-line">  <span class="t-highlight">skills</span>       - List core technical & solution skills</div>
      <div class="t-line">  <span class="t-highlight">projects</span>     - Highlighted production projects & POCs</div>
      <div class="t-line">  <span class="t-highlight">contact</span>      - Get direct contact channels</div>
      <div class="t-line">  <span class="t-highlight">resume</span>       - Open Annan's PDF Resume</div>
      <div class="t-line">  <span class="t-highlight">clear</span>        - Clear terminal output</div>
    `,
    roles: () => `
      <div class="t-line"><span class="t-highlight">Target Positions:</span></div>
      <div class="t-line">  • Solutions Engineer / Pre-Sales Engineer (AI / SaaS / Cloud Data)</div>
      <div class="t-line">  • Technical Solutions Consultant / Forward Deployed Engineer</div>
      <div class="t-line">  • AI/ML Specialist / Machine Learning Engineer</div>
      <div class="t-line">  • Data Scientist / Decision Intelligence Architect</div>
    `,
    metrics: () => `
      <div class="t-line"><span class="t-highlight">Key Quantifiable Impact:</span></div>
      <div class="t-line">  • <strong>4.0 / 4.0 GPA</strong> - MS Data Science, Wentworth Institute of Technology</div>
      <div class="t-line">  • <strong>88%</strong> manual overhead reduction via automated Python ETL solutions</div>
      <div class="t-line">  • <strong>40%</strong> API latency reduction across 15+ REST endpoints</div>
      <div class="t-line">  • <strong>60%</strong> database query acceleration via Redis caching & Celery</div>
      <div class="t-line">  • <strong>47,847</strong> companies modeled with 0.74 ROC-AUC & 85.3% Top-10% precision</div>
      <div class="t-line">  • <strong>Interspeech 2026</strong> - Peer-reviewed author on biosignal sequence modeling</div>
    `,
    experience: () => `
      <div class="t-line"><span class="t-highlight">Work History:</span></div>
      <div class="t-line">  1. <strong>Research Assistant</strong> (Amazon Collab) - Wentworth (Jan '26 – Mar '26)</div>
      <div class="t-line">     Multi-TB biosignal workflows, discovery & stakeholder demos.</div>
      <div class="t-line">  2. <strong>Software Developer Intern</strong> - N & T Software Pvt. Ltd. (Nov '23 – Jul '24)</div>
      <div class="t-line">     10K+ tx/day ETL, 40% API speedup, 10K+ active users.</div>
      <div class="t-line">  3. <strong>Full Stack Developer Intern</strong> - Infosense Services (Jan '23 – Jun '23)</div>
      <div class="t-line">     Redis/Celery optimization, 8 Docker microservices, client analytics.</div>
    `,
    skills: () => `
      <div class="t-line"><span class="t-highlight">Core Competencies:</span></div>
      <div class="t-line">  • <strong>Solutions:</strong> Pre-Sales, Technical Discovery, POC Architecture, Client Demos</div>
      <div class="t-line">  • <strong>Platforms:</strong> Snowflake, Databricks, AWS (S3, EC2, Redshift), PostgreSQL, Redis</div>
      <div class="t-line">  • <strong>AI & ML:</strong> PyTorch, Hugging Face, LLMs, Scikit-Learn, SHAP, UMAP</div>
      <div class="t-line">  • <strong>Languages:</strong> Python, SQL, Java, JavaScript, R, Bash</div>
    `,
    projects: () => `
      <div class="t-line"><span class="t-highlight">Selected POCs:</span></div>
      <div class="t-line">  • <strong>VentureFlow AI:</strong> Investment intelligence SaaS (<a href="https://ventureflow-ai.streamlit.app/" target="_blank" style="color:var(--accent-cyan);">Live App</a>)</div>
      <div class="t-line">  • <strong>SoftSpeech:</strong> Interspeech 2026 publication (<a href="Softspeech_Interspeech_2026-12.pdf" target="_blank" style="color:var(--accent-cyan);">PDF</a>)</div>
      <div class="t-line">  • <strong>Backward Attention GPT-2:</strong> 40% math reasoning boost with 5% param training</div>
    `,
    contact: () => `
      <div class="t-line"><span class="t-highlight">Get in touch:</span></div>
      <div class="t-line">  • Email: <span class="t-highlight">annan.shaikh0404@gmail.com</span></div>
      <div class="t-line">  • LinkedIn: <a href="https://www.linkedin.com/in/annanahmed-shaikh" target="_blank" style="color:var(--accent-cyan);">linkedin.com/in/annanahmed-shaikh</a></div>
      <div class="t-line">  • Location: Boston, MA (Open to Relocation & Remote)</div>
    `,
    resume: () => {
      window.open('Shaikh_Annanahmed_Resume.pdf', '_blank');
      return '<div class="t-line">Opening Shaikh_Annanahmed_Resume.pdf in a new tab...</div>';
    },
    clear: () => {
      output.innerHTML = '';
      return '';
    }
  };

  const handleCommand = (cmd) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    const echo = document.createElement('div');
    echo.className = 't-line';
    echo.innerHTML = `<span class="t-prompt">annan@portfolio:~$</span> <span class="t-cmd-echo">${cmd}</span>`;
    output.appendChild(echo);

    if (commands[cleanCmd]) {
      const res = commands[cleanCmd]();
      if (res) {
        const responseEl = document.createElement('div');
        responseEl.innerHTML = res;
        output.appendChild(responseEl);
      }
    } else {
      const err = document.createElement('div');
      err.className = 't-line';
      err.innerHTML = `Command not recognized: <span style="color:#ef4444;">${cleanCmd}</span>. Type <span class="t-highlight">help</span> for a list of commands.`;
      output.appendChild(err);
    }

    output.scrollTop = output.scrollHeight;
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value;
      input.value = '';
      handleCommand(val);
    }
  });

  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      handleCommand(cmd);
      input.focus();
    });
  });
}

/* ---------- 6. Copy to Clipboard Toast ---------- */
function initCopyChips() {
  const copyChips = document.querySelectorAll('.copy-chip');
  const toast = document.getElementById('toast');

  copyChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.getAttribute('data-copy');
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        if (toast) {
          toast.textContent = `Copied "${text}" to clipboard!`;
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 2500);
        }
      });
    });
  });
}

/* ---------- 7. Particle Canvas ---------- */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null, radius: 120 };

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.6 + 0.4;
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.speedY = (Math.random() - 0.5) * 0.35;
      this.opacity = Math.random() * 0.45 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= dx * force * 0.02;
          this.y -= dy * force * 0.02;
        }
      }

      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  function createParticles() {
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 11000), 75);
    particles = [];
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const opacity = ((110 - dist) / 110) * 0.12;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawConnections();
    requestAnimationFrame(animate);
  }

  createParticles();
  animate();
}

/* ---------- 8. Navbar Behavior ---------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }
}

/* ---------- 9. Scroll Reveal ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* ---------- 10. Smooth Scroll ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ---------- 11. Neural Network Playground ---------- */
function initPlayground() {
  const canvas = document.getElementById('playground-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const epochDisplay = document.getElementById('epochDisplay');
  const lossDisplay = document.getElementById('lossDisplay');
  const trainBtn = document.getElementById('trainBtn');
  const resetBtn = document.getElementById('resetBtn');
  const classABtn = document.getElementById('classABtn');
  const classBBtn = document.getElementById('classBBtn');

  let selectedClass = 'A';
  let dataPoints = [];
  let network = null;
  let training = false;
  let epoch = 0;
  let animFrameId = null;

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = 380;
    drawScene();
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  classABtn.addEventListener('click', () => {
    selectedClass = 'A';
    classABtn.classList.add('active');
    classBBtn.classList.remove('active');
  });
  classBBtn.addEventListener('click', () => {
    selectedClass = 'B';
    classBBtn.classList.add('active');
    classABtn.classList.remove('active');
  });

  canvas.addEventListener('click', (e) => {
    if (training) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / canvas.width;
    const y = (e.clientY - rect.top) / canvas.height;
    dataPoints.push({ x, y, label: selectedClass === 'A' ? 0 : 1 });
    drawScene();
  });

  trainBtn.addEventListener('click', () => {
    if (dataPoints.length < 2) return;
    if (training) {
      training = false;
      trainBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg> Train Network';
      if (animFrameId) cancelAnimationFrame(animFrameId);
      return;
    }

    const hasA = dataPoints.some(p => p.label === 0);
    const hasB = dataPoints.some(p => p.label === 1);
    if (!hasA || !hasB) return;

    training = true;
    epoch = 0;
    network = createNetwork();
    trainBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pause Training';
    trainLoop();
  });

  resetBtn.addEventListener('click', () => {
    training = false;
    dataPoints = [];
    network = null;
    epoch = 0;
    epochDisplay.textContent = 'Epoch: 0';
    lossDisplay.textContent = 'Loss: —';
    trainBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg> Train Network';
    if (animFrameId) cancelAnimationFrame(animFrameId);
    drawScene();
  });

  function createNetwork() {
    const rand = (fan_in, fan_out) => (Math.random() * 2 - 1) * Math.sqrt(6 / (fan_in + fan_out));
    const h1 = 8, h2 = 8;
    return {
      w1: Array.from({ length: h1 }, () => [rand(2, h1), rand(2, h1)]),
      b1: new Array(h1).fill(0),
      w2: Array.from({ length: h2 }, () => Array.from({ length: h1 }, () => rand(h1, h2))),
      b2: new Array(h2).fill(0),
      w3: Array.from({ length: h2 }, () => rand(h2, 1)),
      b3: 0,
    };
  }

  const sigmoid = x => 1 / (1 + Math.exp(-Math.max(-15, Math.min(15, x))));
  const relu = x => Math.max(0, x);
  const reluDeriv = x => x > 0 ? 1 : 0;

  function forward(net, x, y) {
    const h1 = net.w1.map((w, i) => relu(w[0] * x + w[1] * y + net.b1[i]));
    const h2 = net.w2.map((w, i) => {
      let sum = net.b2[i];
      for (let j = 0; j < h1.length; j++) sum += w[j] * h1[j];
      return relu(sum);
    });
    let out = net.b3;
    for (let i = 0; i < h2.length; i++) out += net.w3[i] * h2[i];
    return { h1, h2, out: sigmoid(out), raw: out };
  }

  function trainStep(net, lr) {
    let totalLoss = 0;
    const indices = dataPoints.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    for (const idx of indices) {
      const p = dataPoints[idx];
      const { h1, h2, out } = forward(net, p.x, p.y);
      const target = p.label;
      const clippedOut = Math.max(1e-7, Math.min(1 - 1e-7, out));
      totalLoss += -(target * Math.log(clippedOut) + (1 - target) * Math.log(1 - clippedOut));

      const dOut = out - target;
      const dw3 = h2.map(h => dOut * h);
      const db3 = dOut;
      const dh2 = net.w3.map(w => dOut * w);

      const dw2 = net.w2.map((w, i) => {
        const pre = net.b2[i] + w.reduce((s, wj, j) => s + wj * h1[j], 0);
        const dr = reluDeriv(pre) * dh2[i];
        return h1.map(h => dr * h);
      });
      const db2 = net.w2.map((w, i) => {
        const pre = net.b2[i] + w.reduce((s, wj, j) => s + wj * h1[j], 0);
        return reluDeriv(pre) * dh2[i];
      });

      const dh1 = h1.map((_, j) => {
        let grad = 0;
        for (let i = 0; i < net.w2.length; i++) {
          const pre = net.b2[i] + net.w2[i].reduce((s, wk, k) => s + wk * h1[k], 0);
          grad += reluDeriv(pre) * dh2[i] * net.w2[i][j];
        }
        return grad;
      });

      const dw1 = net.w1.map((w, i) => {
        const pre = w[0] * p.x + w[1] * p.y + net.b1[i];
        const dr = reluDeriv(pre) * dh1[i];
        return [dr * p.x, dr * p.y];
      });
      const db1 = net.w1.map((w, i) => {
        const pre = w[0] * p.x + w[1] * p.y + net.b1[i];
        return reluDeriv(pre) * dh1[i];
      });

      for (let i = 0; i < net.w3.length; i++) net.w3[i] -= lr * dw3[i];
      net.b3 -= lr * db3;
      for (let i = 0; i < net.w2.length; i++) {
        for (let j = 0; j < net.w2[i].length; j++) net.w2[i][j] -= lr * dw2[i][j];
        net.b2[i] -= lr * db2[i];
      }
      for (let i = 0; i < net.w1.length; i++) {
        net.w1[i][0] -= lr * dw1[i][0];
        net.w1[i][1] -= lr * dw1[i][1];
        net.b1[i] -= lr * db1[i];
      }
    }
    return totalLoss / dataPoints.length;
  }

  function trainLoop() {
    if (!training) return;
    let loss = 0;
    for (let i = 0; i < 10; i++) {
      loss = trainStep(network, 0.5);
      epoch++;
    }
    epochDisplay.textContent = `Epoch: ${epoch}`;
    lossDisplay.textContent = `Loss: ${loss.toFixed(4)}`;
    drawScene();
    animFrameId = requestAnimationFrame(trainLoop);
  }

  function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (network) {
      const res = 5;
      const imgData = ctx.createImageData(canvas.width, canvas.height);
      for (let py = 0; py < canvas.height; py += res) {
        for (let px = 0; px < canvas.width; px += res) {
          const nx = px / canvas.width;
          const ny = py / canvas.height;
          const { out } = forward(network, nx, ny);

          const r = Math.round(59 + (249 - 59) * out);
          const g = Math.round(130 + (115 - 130) * out);
          const b = Math.round(246 + (22 - 246) * out);
          const alpha = 50;

          for (let dy = 0; dy < res && py + dy < canvas.height; dy++) {
            for (let dx = 0; dx < res && px + dx < canvas.width; dx++) {
              const idx = ((py + dy) * canvas.width + (px + dx)) * 4;
              imgData.data[idx] = r;
              imgData.data[idx + 1] = g;
              imgData.data[idx + 2] = b;
              imgData.data[idx + 3] = alpha;
            }
          }
        }
      }
      ctx.putImageData(imgData, 0, 0);
    }

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }

    // Points
    dataPoints.forEach(p => {
      const px = p.x * canvas.width;
      const py = p.y * canvas.height;
      ctx.beginPath();
      ctx.arc(px, py, 12, 0, Math.PI * 2);
      ctx.fillStyle = p.label === 0 ? 'rgba(59, 130, 246, 0.2)' : 'rgba(249, 115, 22, 0.2)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fillStyle = p.label === 0 ? '#3b82f6' : '#f97316';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    if (dataPoints.length === 0 && !network) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.font = '14px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Click to add data points (Class A or Class B)', canvas.width / 2, canvas.height / 2);
    }
  }

  drawScene();
}
